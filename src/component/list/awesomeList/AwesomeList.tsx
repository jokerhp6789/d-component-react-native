/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/sort-comp */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import React, {Component} from 'react';
import {
    FlatList,
    SectionList,
    ViewStyle,
    FlatListProps,
    SectionListProps,
    StyleProp,
} from 'react-native';
import {ThemeProps} from '../../../interface/iTheme';
import Text from '../../text/Text';
import View from '../../view/View';
import AwesomeListMode from './AwesomeListMode';
import AwesomeListStyle from './AwesomeListStyle';
import {isArray, isString} from './AwesomeListUtils';
import EmptyView from './EmptyView';
import PagingView from './PagingView';

const DEFAULT_PAGE_SIZE = 20;

export interface IPaginationProps {
    pageIndex: number;
    pageSize: number;
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
    containerStyle?: StyleProp<ViewStyle>;
    listStyle?: StyleProp<ViewStyle>;
    emptyViewStyle?: StyleProp<ViewStyle>;
    source: (props: IPaginationProps) => any;
    keyExtractor?: (props: any, index: number) => any;
    renderSeparator?: () => SectionListProps<T>['ItemSeparatorComponent'];
    transformer?: (res: any) => any;
    isPaging?: boolean;
    isSectionList?: boolean;
    createSections?: (props: any) => any;
    renderEmptyView?: (props?: any) => Element;
    renderErrorView?: (props?: any) => Element;
    renderProgress?: (props?: any) => Element;
    listHeaderComponent?: FlatListProps<any>['ListHeaderComponent'];
    emptyText?: string;
    filterEmptyText?: string;
    pageSize?: number;
    className?: string;
    renderItem: SectionListProps<T>['renderItem'];
    renderFooterComponent?:
        | ((props: {loading: boolean; emptyMode?: AwesomeListMode}) => Element)
        | Element;
    data?: any;

    hideFooterInEmptyErrorMode?: boolean;
    hideFooterInEmptyMode?: boolean;
    hideFooterInErrorMode?: boolean;
}

class AwesomeList<T> extends Component<IAwesomeListProps<T>, any> {
    static defaultProps = {
        keyExtractor: (item: any) => {
            if (item.id) {
                return item.id;
            }

            if (isString(item)) return item;

            console.log('You need to provide a key extractor');
        },
        renderSeparator: () => <View />,
        source: Promise.resolve([]),
        transformer: (response: any) => {
            return response;
        },

        containerStyle: AwesomeListStyle.containerListStyle,
        listStyle: AwesomeListStyle.listStyle,

        isPaging: false,
        isSectionList: false,

        renderSectionHeader: null,
        createSections: null,
        renderEmptyView: null,
        listHeaderComponent: null,
        emptyText: 'No result',
        filterEmptyText: 'No filter result',
        renderErrorView: null,
        renderProgress: null,
        numColumns: 1,
        pageSize: DEFAULT_PAGE_SIZE,

        hideFooterInEmptyErrorMode: true,
    };

    DEFAULT_PAGING_DATA: {pageIndex: number; pageSize: any};

    private _unmounted: boolean | undefined;

    pagingData: any;

    noMoreData: any;

    originData: any;

    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            refreshing: true,
            emptyMode: AwesomeListMode.PROGRESS,
            pagingMode: AwesomeListMode.HIDDEN,
            sections: [],
        };

        this.DEFAULT_PAGING_DATA = {
            pageIndex: 1,
            pageSize: props.pageSize,
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

    /**
     * Logic
     */
    isNoMoreData(newData: any) {
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

    isSectionsList() {
        return this.props.isSectionList;
    }

    /**CONTROL VIEW */

    /**
     * call API from source, and fill data to the list
     * if the component is unmounted => return;
     * if error, show emptyView with error mode, reset data to empty,
     *
     * if reponse is passed, fill data to the list, set empty mode is hidden
     */

    start() {
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
                this.pagingData = {
                    ...this.pagingData,
                    pageIndex: this.pagingData.pageIndex + 1,
                };
                const data = transformer && transformer(response);
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
                console.log(error);
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

    onRetry() {
        this.setState(
            {emptyMode: AwesomeListMode.PROGRESS},
            this.start() as any,
        );
    }
    /**
     * this function help list refresh when list is scrolled down.
     * enable refreshing in list data
     * action refresh
     */

    onRefresh() {
        this.setState(
            {
                refreshing: true,
                emptyMode: AwesomeListMode.HIDDEN,
                pagingMode: AwesomeListMode.HIDDEN,
            },
            () => this.refresh(),
        );
    }

    /**
     * actual refresh data list
     * set data list is empty list,
     * call start function to recall source function.
     */
    refresh() {
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

    onEndReached() {
        if (
            this.noMoreData ||
            !this.props.isPaging ||
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
    applyFilter(actionFilter: any) {
        if (
            (!this.state.data || this.state.data.length === 0) &&
            !this.originData
        ) {
            console.log('Cannot apply filter case the data is empty');
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
    calculateFilter(actionFilter: any) {
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

    removeFilter() {
        if (!this.originData) {
            console.log('You have not apply any filter data');
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

    renderSectionHeader = (props: any = {}) => {
        const {renderSectionHeader} = this.props;
        if (renderSectionHeader) {
            return renderSectionHeader(props);
        }
        const title = props?.section?.title ?? 'N/A';
        return (
            <View className="bg-primary p-2">
                <Text color="white">{title}</Text>
            </View>
        );
    };

    render() {
        const {
            containerStyle = {},
            listStyle,
            style,
            emptyViewStyle,
            keyExtractor,
            renderItem,
            renderSeparator,
            renderEmptyView,
            listHeaderComponent,
            emptyText,
            renderErrorView,
            renderProgress,
            filterEmptyText,
            className,
            pageSize,
            createSections,
            source,
            transformer,
            data,
            numColumns,
            colorDarkMode,
            useLightColor,
            renderFooterComponent,
            hideFooterInEmptyMode,
            hideFooterInErrorMode,
            hideFooterInEmptyErrorMode,
            ...rest
        } = this.props;

        const {emptyMode} = this.state;

        return (
            <View
                className={className}
                style={[{minHeight: 100}, style]}
                colorDarkMode={colorDarkMode}
                useLightColor={useLightColor}>
                {this.isSectionsList() ? (
                    <SectionList
                        style={listStyle}
                        renderItem={renderItem}
                        keyExtractor={(item, index) =>
                            keyExtractor && keyExtractor(item, index)
                        }
                        ItemSeparatorComponent={() =>
                            renderSeparator && (renderSeparator() as any)
                        }
                        stickySectionHeadersEnabled
                        onRefresh={() => this.onRefresh()}
                        ListHeaderComponent={listHeaderComponent}
                        refreshing={this.state.refreshing}
                        renderSectionHeader={props =>
                            this.renderSectionHeader(props)
                        }
                        {...rest}
                        sections={this.state.sections}
                    />
                ) : (
                    <FlatList
                        style={listStyle}
                        data={this.state.data}
                        renderItem={renderItem as any}
                        keyExtractor={(item, index) =>
                            keyExtractor && keyExtractor(item, index)
                        }
                        ItemSeparatorComponent={() =>
                            renderSeparator && (renderSeparator() as any)
                        }
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                        onEndReached={() => this.onEndReached()}
                        ListFooterComponent={() => {
                            if (
                                hideFooterInEmptyMode &&
                                emptyMode === AwesomeListMode.EMPTY
                            ) {
                                return null;
                            }
                            if (
                                hideFooterInErrorMode &&
                                emptyMode === AwesomeListMode.ERROR
                            ) {
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
                                if (
                                    typeof renderFooterComponent === 'function'
                                ) {
                                    return renderFooterComponent({
                                        loading: this.state.refreshing,
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
                        }}
                        onEndReachedThreshold={0.5}
                        ListHeaderComponent={listHeaderComponent}
                        numColumns={numColumns}
                        {...rest}
                    />
                )}
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
