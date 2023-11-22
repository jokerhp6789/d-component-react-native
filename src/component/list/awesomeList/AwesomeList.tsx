/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/sort-comp */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable no-underscore-dangle */
import {FlashList, FlashListProps} from '@shopify/flash-list';
import _ from 'lodash';
import React, {Component} from 'react';
import {
    FlatList,
    FlatListProps,
    SectionList,
    SectionListProps,
    StyleProp,
    View,
    ViewStyle,
} from 'react-native';
import StyleContext, {IStyleStateContext} from '../../../context/StyleContext';
import {ThemeProps} from '../../../interface/iTheme';
import {
    getThemeBackgroundColor,
    IStyleTransformerProps,
    styleTransformer,
} from '../../../style/style';
import Text from '../../text/Text';
import AwesomeListMode from './AwesomeListMode';
import AwesomeListStyle from './AwesomeListStyle';
import {isArray, isString} from './AwesomeListUtils';
import EmptyView from './EmptyView';
import PagingView from './PagingView';
import Configs from '../../../style/config/_config';
import ObjectUtils from '../../../utils/ObjectUtils';

const DEFAULT_PAGE_SIZE = 20;

export interface IPaginationProps {
    pageIndex?: number;
    pageSize?: number;
    after?: string;
    before?: string;
    [key: string]: any;
}

//@ts-ignore
export interface IAwesomeListProps<T>
    extends Omit<
            Partial<FlatListProps<T>>,
            'data' | 'getItemLayout' | 'viewabilityConfig'
        >,
        Omit<
            Partial<SectionListProps<T>>,
            'data' | 'getItemLayout' | 'viewabilityConfig'
        >,
        ThemeProps {
    listStyle?: StyleProp<ViewStyle>;
    emptyViewStyle?: StyleProp<ViewStyle>;
    source: (props: IPaginationProps) => any;
    keyExtractor?: (props: any, index: number) => any;
    transformer?: (res: any) => any;
    isPaging?: boolean;
    isSectionList?: boolean;
    createSections?: (props: any) => any;
    renderEmptyView?: (props?: any) => Element;
    renderErrorView?: (props?: any) => Element;
    renderProgress?: (props?: any) => Element;
    emptyText?: string;
    filterEmptyText?: string;
    pageSize?: number;
    className?: IStyleTransformerProps;
    renderItem: SectionListProps<T>['renderItem'];
    renderFooterComponent?:
        | ((props: {loading: boolean; emptyMode?: AwesomeListMode}) => Element)
        | Element;
    data?: any;

    hideFooterInEmptyErrorMode?: boolean;
    hideFooterInEmptyMode?: boolean;
    hideFooterInErrorMode?: boolean;

    useFlashList?: boolean;
    flashListProps?: Partial<FlashListProps<any>>;
    getPagingData?: (
        prevPaging: IPaginationProps,
        data: Array<any>,
    ) => IPaginationProps;
}

export interface IAwesomeListState {
    data: Array<any>;
    sections: Array<any>;
    refreshing?: boolean;
    emptyMode: AwesomeListMode;
    pagingMode: AwesomeListMode;
}

class AwesomeList<T> extends Component<
    IAwesomeListProps<T>,
    IAwesomeListState
> {
    static contextType = StyleContext;
    static defaultProps: IAwesomeListProps<any> = {
        keyExtractor: (item: any) => {
            if (item.id) {
                return item.id;
            }

            if (isString(item)) return item;

            console.log('You need to provide a key extractor');
        },
        source: () => Promise.resolve([]),
        transformer: (response: any) => {
            return response;
        },
        renderItem: () => null,
        listStyle: AwesomeListStyle.listStyle,
        isPaging: false,
        isSectionList: false,
        emptyText: 'No result',
        filterEmptyText: 'No filter result',
        numColumns: 1,
        hideFooterInEmptyErrorMode: true,
    };

    DEFAULT_PAGING_DATA: IPaginationProps;

    private _unmounted: boolean | undefined;

    pagingData: any;

    noMoreData: any;

    originData: any;

    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            sections: [],
            refreshing: false,
            emptyMode: AwesomeListMode.PROGRESS,
            pagingMode: AwesomeListMode.HIDDEN,
        };

        this.DEFAULT_PAGING_DATA = {
            pageIndex: 1,
            pageSize:
                props?.pageSize ||
                Configs?.awesomeListConfig?.pageSize ||
                DEFAULT_PAGE_SIZE,
        };
    }

    UNSAFE_componentWillMount() {
        this._unmounted = false;
    }

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        this._unmounted = true;
    }

    public onRetry() {
        this.setState({emptyMode: AwesomeListMode.PROGRESS}, () =>
            this.start(),
        );
    }

    /**
     * actual refresh data list
     * set data list is empty list,
     * call start function to recall source function.
     */
    public refresh() {
        this.noMoreData = false;
        this.pagingData = null;
        this.setState(
            {
                data: [],
                sections: [],
                emptyMode: AwesomeListMode.PROGRESS,
                pagingMode: AwesomeListMode.HIDDEN,
            },
            () => this.start(),
        );
    }

    public updateItem(updateId: string, value: any) {
        if (this.state?.data?.length) {
            const updated = this.state.data.map(i =>
                i?.id === updateId ? {...i, ...(value || {})} : i,
            );
            this.setState({data: updated});
        }
    }

    public removeItem(removeId: string) {
        if (this.state?.data?.length) {
            this.setState({
                data: (this?.state?.data ?? []).filter(
                    item => item?.id !== removeId,
                ),
            });
        }
    }

    public moveItemToTop(item: any) {
        return this.moveItemToIndex(item, 0);
    }

    public moveItemToIndex(item: any, newIndex: number) {
        const foundIndex = _.findIndex(
            this.state.data,
            i => item?.id === i?.id,
        );
        if (foundIndex) {
            const movedArr = ObjectUtils.arrayMove(
                this.state.data,
                foundIndex,
                newIndex,
            );
            this.setState({data: movedArr});
        }
    }

    public pushData(items: any[], position: 'start' | 'end' = 'end') {
        if (position === 'end') {
            this.setState({
                data: (this?.state?.data ?? []).concat(items),
            });
        } else if (position === 'start') {
            this.setState({
                data: items.concat(this?.state?.data ?? []),
            });
        }
    }

    /**
     * Helpers
     */
    private isNoMoreData(newData: any) {
        if (
            !newData ||
            !isArray(newData) ||
            !this.props.isPaging ||
            this.isSectionsList()
        ) {
            return true;
        }
        return this.pagingData
            ? newData.length < this.pagingData.pageSize
            : false;
    }

    private isSectionsList() {
        return this.props.isSectionList;
    }

    private getNextPagingData(newData: any[]): IPaginationProps {
        if (this.props.getPagingData) {
            return this.props.getPagingData(this.pagingData, newData);
        }
        if (Configs.awesomeListConfig?.getPagingData) {
            return Configs.awesomeListConfig.getPagingData(
                this.pagingData,
                newData,
            );
        }
        return {
            ...this.pagingData,
            pageIndex: this.pagingData.pageIndex + 1,
        };
    }

    /**Controllers */

    /**
     * call API from source, and fill data to the list
     * if the component is unmounted => return;
     * if error, show emptyView with error mode, reset data to empty,
     *
     * if reponse is passed, fill data to the list, set empty mode is hidden
     */

    private start() {
        if (this.noMoreData) return;

        const {source, transformer} = this.props;
        /**
         * if the first load in paging list, construct to pagingData,
         */
        if (!this.pagingData) {
            this.pagingData = this.DEFAULT_PAGING_DATA;
        }

        source(this.pagingData)
            .then((response: any) => {
                const data = transformer && transformer(response);
                this.pagingData = this.getNextPagingData(data);
                let sections: Array<any> = [];
                this.noMoreData = this.isNoMoreData(data);

                if (!isArray(data)) {
                    // eslint-disable-next-line no-throw-literal
                    throw 'Data is not an array';
                }

                if (_.isEmpty(data) && this.state.data.length === 0) {
                    this.setState({
                        data: [],
                        sections,
                        pagingMode: AwesomeListMode.HIDDEN,
                        emptyMode: AwesomeListMode.EMPTY,
                        refreshing: false,
                    });
                    return;
                }

                if (this.isSectionsList()) {
                    sections =
                        this.props.createSections &&
                        this.props.createSections(data);
                }
                this.setState({
                    // eslint-disable-next-line react/no-access-state-in-setstate
                    data: this.state.data.concat(data),
                    sections,
                    pagingMode: AwesomeListMode.HIDDEN,
                    emptyMode: AwesomeListMode.HIDDEN,
                    refreshing: false,
                });
            })
            .catch((error: any) => {
                if (this._unmounted) return;
                /**
                 * if the first loading
                 * display emptyView with error mode
                 */
                if (
                    this.pagingData.pageIndex ===
                    this.DEFAULT_PAGING_DATA.pageIndex
                ) {
                    this.setState({
                        pagingMode: AwesomeListMode.HIDDEN,
                        emptyMode: AwesomeListMode.ERROR,
                        data: [],
                        sections: [],
                        refreshing: false,
                    });
                } else {
                    this.setState({
                        pagingMode: AwesomeListMode.ERROR,
                        emptyMode: AwesomeListMode.HIDDEN,
                        refreshing: false,
                    });
                }
            });
    }

    /**
     * this function help list refresh when list is scrolled down.
     * enable refreshing in list data
     * action refresh
     */

    private onRefresh() {
        if (
            this.state.refreshing ||
            this.state.emptyMode === AwesomeListMode.PROGRESS
        ) {
            return;
        }
        this.setState(
            {
                refreshing: true,
                emptyMode: AwesomeListMode.HIDDEN,
                pagingMode: AwesomeListMode.HIDDEN,
            },
            () => this.refresh(),
        );
    }

    private onEndReached() {
        if (
            this.noMoreData ||
            !this?.props?.isPaging ||
            this.state.data.length === 0 ||
            this.state.pagingMode === AwesomeListMode.PROGRESS
        ) {
            return;
        }

        this.setState({pagingMode: AwesomeListMode.PROGRESS}, () =>
            this.start(),
        );
    }

    /** Apply filter  to list*/
    private applyFilter(actionFilter: any) {
        if (
            (!this.state.data || this.state.data.length === 0) &&
            !this.originData
        ) {
            return;
        }
        if (!this.originData) {
            this.originData = this.state.data;
        }
        this.setState({emptyMode: AwesomeListMode.PROGRESS}, () =>
            this.calculateFilter(actionFilter),
        );
    }

    /**
     * should not be call in acestor component
     * @param {*} actionFilter
     */
    private calculateFilter(actionFilter: any) {
        const dataFilter = _.filter(this.originData, (item, index) => {
            return actionFilter(item, index);
        });

        if (!dataFilter || dataFilter.length === 0) {
            this.setState({
                data: [],
                sections: [],
                emptyMode: AwesomeListMode.FILTER_EMPTY,
                pagingMode: AwesomeListMode.HIDDEN,
            });
        } else {
            let sections = [];
            if (this.isSectionsList()) {
                sections =
                    this.props.createSections &&
                    this.props.createSections(dataFilter);
            }
            this.setState({
                data: dataFilter,
                sections,
                emptyMode: AwesomeListMode.HIDDEN,
                pagingMode: AwesomeListMode.HIDDEN,
            });
        }
    }

    private removeFilter() {
        if (!this.originData) {
            return;
        }
        let sections = [];
        if (this.isSectionsList()) {
            sections =
                this.props.createSections &&
                this.props.createSections(this.originData);
        }

        this.setState(
            {
                emptyMode: AwesomeListMode.HIDDEN,
                data: this.originData,
                sections,
            },
            () => {
                this.originData = null;
            },
        );
    }

    /**
     * Renders
     */
    private renderSectionHeader = (props: any = {}) => {
        const {renderSectionHeader} = this.props;
        if (renderSectionHeader) {
            return renderSectionHeader(props);
        }
        const title = props?.section?.title ?? 'N/A';
        return (
            <View style={styleTransformer('bg-primary p-2')}>
                <Text color="green">{title}</Text>
            </View>
        );
    };

    private renderFooterList = () => {
        const {
            renderFooterComponent,
            hideFooterInEmptyMode,
            hideFooterInErrorMode,
            hideFooterInEmptyErrorMode,
        } = this.props;
        const {emptyMode} = this.state;
        if (hideFooterInEmptyMode && emptyMode === AwesomeListMode.EMPTY) {
            return null;
        }
        if (hideFooterInErrorMode && emptyMode === AwesomeListMode.ERROR) {
            return null;
        }
        if (
            hideFooterInEmptyErrorMode &&
            (emptyMode === AwesomeListMode.ERROR ||
                emptyMode === AwesomeListMode.EMPTY)
        ) {
            return null;
        }
        if (renderFooterComponent) {
            if (typeof renderFooterComponent === 'function') {
                return renderFooterComponent({
                    loading: !!this.state.refreshing,
                    emptyMode,
                }) as any;
            }
            return renderFooterComponent as any;
        }
        return (
            <PagingView
                mode={this.state.pagingMode}
                retry={() => this.onRetry()}
            />
        );
    };

    private renderList = () => {
        const {
            listStyle,
            keyExtractor,
            renderItem,
            emptyText,
            renderProgress,
            className,
            pageSize,
            createSections,
            source,
            transformer,
            data,
            numColumns,
            renderFooterComponent,
            hideFooterInEmptyMode,
            hideFooterInErrorMode,
            hideFooterInEmptyErrorMode,
            useFlashList: useFlashListProps,
            flashListProps = {},
            ...rest
        } = this.props;
        const {awesomeListConfig} = Configs;
        const useFlashList =
            typeof useFlashListProps === 'boolean'
                ? useFlashListProps
                : awesomeListConfig?.useFlashList;
        if (this.isSectionsList()) {
            return (
                <SectionList
                    style={[{flex: 1}, listStyle]}
                    renderItem={renderItem}
                    keyExtractor={(item, index) =>
                        keyExtractor && keyExtractor(item, index)
                    }
                    stickySectionHeadersEnabled
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.refreshing}
                    renderSectionHeader={props =>
                        this.renderSectionHeader(props)
                    }
                    {...rest}
                    sections={this.state.sections}
                />
            );
        }

        if (useFlashList) {
            return (
                <FlashList
                    style={[{flex: 1}, listStyle]}
                    data={this.state.data}
                    renderItem={renderItem as any}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                    //@ts-ignore
                    onEndReached={() => this.onEndReached() as any}
                    ListFooterComponent={this.renderFooterList}
                    onEndReachedThreshold={0.5}
                    numColumns={numColumns}
                    {...(rest || ({} as any))}
                    {...(flashListProps || ({} as any))}
                />
            );
        }

        return (
            <FlatList
                style={[{flex: 1}, listStyle]}
                data={this.state.data}
                renderItem={renderItem as any}
                keyExtractor={(item, index) =>
                    keyExtractor && keyExtractor(item, index)
                }
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
                onEndReached={() => this.onEndReached()}
                ListFooterComponent={this.renderFooterList}
                onEndReachedThreshold={0.5}
                numColumns={numColumns}
                {...rest}
            />
        );
    };

    render() {
        const {
            style,
            emptyViewStyle,
            emptyText,
            filterEmptyText,
            className,
            renderEmptyView,
            renderErrorView,
            renderProgress,
            colorDarkMode,
            useLightColor,
            autoSwitchColor,
        } = this.props;
        const {emptyMode} = this.state;
        const {colorSchema} = this.context as IStyleStateContext;
        const isDarkMode = colorSchema === 'dark';
        const backgroundColor = getThemeBackgroundColor({
            isDarkMode,
            colorDarkMode,
            autoSwitchColor,
            useLightColor,
        });

        return (
            <View
                style={[
                    AwesomeListStyle.containerStyle,
                    {minHeight: 100, minWidth: 100},
                    style,
                    {backgroundColor},
                    styleTransformer(className),
                ]}>
                {this.renderList()}
                <EmptyView
                    style={emptyViewStyle}
                    mode={emptyMode}
                    retry={() => this.onRetry()}
                    renderEmptyView={renderEmptyView}
                    emptyText={emptyText}
                    renderErrorView={renderErrorView}
                    renderProgress={renderProgress}
                    filterEmptyText={filterEmptyText}
                />
            </View>
        );
    }
}

export default AwesomeList;
