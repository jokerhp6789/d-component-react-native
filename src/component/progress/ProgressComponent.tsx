/* eslint-disable class-methods-use-this */
import React, {Component} from 'react';
import {
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Platform,
    Modal,
} from 'react-native';
import _ from 'lodash';
import AppSizes from '../../style/constant/AppSizes';
import AppColors from '../../style/constant/AppColors';

const {width, height} = Dimensions.get('window');

const DefaultConfig = {
    maxWidthPercentage: 0.8,
    maxHeightPercentage: 0.8,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    dialog: {
        backgroundColor: '#fff',
        width:
            Math.min(AppSizes.screenWidth, AppSizes.screenHeight) *
            DefaultConfig.maxWidthPercentage,
        maxHeight: height * DefaultConfig.maxHeightPercentage,
        borderRadius: 5,
        borderWidth: 0,
    },
    title: {
        alignSelf: 'stretch',
        textAlign: 'center',
        margin: AppSizes.paddingSml,
        color: AppColors.textColor,
    },
    textContent: {
        padding: AppSizes.paddingMedium,
        color: AppColors.textColor,
        textAlign: 'center',
        marginVertical: AppSizes.paddingSml,
    },
    divider: {
        backgroundColor: AppColors.primaryColor,
        alignSelf: 'stretch',
    },
    button: {
        flex: 1,
    },
    buttonText: {
        textAlign: 'center',
        padding: AppSizes.paddingSml,
        backgroundColor: 'transparent',
        color: AppColors.primaryColor,
        marginVertical: Platform.OS === 'ios' ? 0 : AppSizes.paddingXXTiny,
    },
    buttonStyle: {
        flex: 1,
    },
    textLoading: {
        paddingLeft: AppSizes.paddingMedium,
        paddingTop: AppSizes.padding,
        paddingBottom: AppSizes.padding,
        color: AppColors.textColor,
        fontSize: AppSizes.fontXXMedium,
        textAlign: 'center',
        height: '100%',
        justifyContent: 'center',
    },
    loadingContainer: {
        height: 100,
        backgroundColor: 'transparent',
        padding: AppSizes.paddingXXSml,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottieView: {
        width: AppSizes.paddingLarge * 5,
        height: AppSizes.paddingLarge * 5,
    },
});

enum LoadingState {
    INIT = 'INIT',
    ERROR = 'ERROR',
    LOADING = 'LOADING',
}

export interface IProgressFunctionProps {
    method: (props?: any, paging?: any, index?: any) => any;
    params: any;
}

export interface IResponseAPI {
    data?: {data?: any; pagination?: any; [key: string]: any};
    error?: any;
    message?: any;
    status?: any;
    [key: string]: any;
}

export interface IProgressTaskProps {
    promiseFunction: Array<IProgressFunctionProps> | IProgressFunctionProps;
    onSuccess?: (res?: Array<IResponseAPI> | IResponseAPI) => any;
    onError?: (props?: any) => any;
    handleError?: (props?: any) => any;
}

export interface IProgressComponentProps {
    loadingView?: ((props?: any) => React.ReactNode) | React.ReactNode;
}

export interface IProgressComponentState extends Partial<IProgressTaskProps> {
    error?: any;
    loadingState: LoadingState;
}

const DEFAULT_PROGRESS_STATE: IProgressComponentState = {
    error: undefined,
    loadingState: LoadingState.INIT,
    promiseFunction: undefined,
    onSuccess: undefined,
    onError: undefined,
    handleError: undefined,
};

class ProgressComponent extends Component<
    IProgressComponentProps,
    IProgressComponentState
> {
    unmounted: any;

    constructor(props: any) {
        super(props);
        this.state = {
            ...DEFAULT_PROGRESS_STATE,
        };
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    private setError(error: any) {
        if (this.state.handleError && this.state.handleError(error)) {
            this.dismiss();
            return;
        }
        if (error && error.response && error.response.data) {
            this.setState({
                error: error.response.data,
                loadingState: LoadingState.ERROR,
            });
            return;
        }
        if (error?.data?.message) {
            this.setState({
                error: error?.data,
                loadingState: LoadingState.ERROR,
            });
            return;
        }
        this.setState({error, loadingState: LoadingState.ERROR});
    }

    private generatePromiseFunc = (proFunc: IProgressFunctionProps) => {
        const {method, params} = proFunc;
        let taskItem: any;
        if (!_.isArray(params)) {
            taskItem = method(params);
        } else {
            taskItem = method(...params);
        }
        return taskItem;
    };

    private cancel() {
        this.dismiss();
        if (this.state.onError) {
            this.state.onError(this.state.error);
        }
    }

    dismiss() {
        this.setState({loadingState: LoadingState.INIT});
    }

    public show(
        promiseFunction: Array<IProgressFunctionProps> | IProgressFunctionProps,
        onSuccess?: (res?: Array<IResponseAPI> | IResponseAPI) => any,
        onError?: (props?: any) => any,
        handleError?: (props?: any) => any,
    ) {
        this.setState({promiseFunction, onSuccess, onError, handleError}, () =>
            this.doTask(),
        );
    }

    private doTask() {
        this.setState({error: null, loadingState: LoadingState.LOADING}, () => {
            const {promiseFunction, onError, onSuccess, handleError} =
                this.state;
            let promiseAll;
            const isArrayFunc = _.isArray(promiseFunction);
            if (isArrayFunc) {
                promiseAll = promiseFunction.map(func =>
                    this.generatePromiseFunc(func),
                );
            } else {
                promiseAll = [this.generatePromiseFunc(promiseFunction as any)];
            }
            const task = Promise.all(promiseAll);
            task.then((result: any) => {
                if (result) {
                    this.dismiss();
                    if (onSuccess) {
                        onSuccess(isArrayFunc ? result : result?.[0]);
                    }
                } else {
                    this.setError({
                        message: 'No response from sever !',
                    });
                }
            }).catch((error: any) => {
                if (this.unmounted) {
                    throw error;
                }
                this.setError(error);
            });
        });
    }

    private retry() {
        this.doTask();
    }

    renderLoadingView() {
        const {loadingView} = this.props;
        if (loadingView) {
            if (typeof loadingView === 'function') {
                return loadingView();
            }
            return loadingView;
        }
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator />
                <Text style={[styles.textLoading, {color: 'white'}]}>
                    Loading...
                </Text>
            </View>
        );
    }

    renderHorizontalDivider() {
        return <View style={[styles.divider, {height: 1}]} />;
    }

    renderVerticalDivider() {
        return <View style={[styles.divider, {width: 1}]} />;
    }

    render() {
        const {error, loadingState} = this.state;
        if (loadingState === LoadingState.INIT) {
            return null;
        }
        return (
            <Modal visible transparent>
                <View style={styles.container}>
                    {!error && this.renderLoadingView()}
                    {error && (
                        <View style={styles.dialog}>
                            <Text style={styles.title}>Error</Text>
                            <Text style={styles.textContent}>
                                {error.message}
                            </Text>

                            {this.renderHorizontalDivider()}
                            <View
                                style={{
                                    flexDirection: 'row-reverse',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={() => this.retry()}>
                                    <Text style={styles.buttonText}>Retry</Text>
                                </TouchableOpacity>
                                {this.renderVerticalDivider()}
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={() => this.cancel()}>
                                    <Text style={styles.buttonText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </Modal>
        );
    }
}
export default ProgressComponent;
