import {
    CommonActions,
    createNavigationContainerRef,
    NavigationState,
    StackActions,
    DrawerActions,
} from '@react-navigation/native';
import {TRootStacksParamList} from './INavigator';

export const navigationRef =
    createNavigationContainerRef<TRootStacksParamList>();

export const Navigator = {
    navigate(key: string, params?: any) {
        const isReady = navigationRef.isReady();
        if (isReady) {
            (navigationRef as any).navigate(
                key as unknown as never,
                params as unknown as never,
            );
        }
    },
    push(key: string, params?: any) {
        if (navigationRef.isReady()) {
            navigationRef.dispatch(StackActions.push(key, params));
        }
    },
    replace(key: string, params?: any) {
        const isReady = navigationRef.isReady();
        if (isReady) {
            navigationRef.dispatch(StackActions.replace(key, params));
        }
    },
    pop(count?: number) {
        if (navigationRef.isReady()) {
            navigationRef.dispatch(StackActions.pop(count));
        }
    },
    popToTop() {
        if (navigationRef.isReady()) {
            navigationRef.dispatch(StackActions.popToTop());
        }
    },
    reset(sate: Partial<NavigationState>) {
        if (navigationRef.isReady()) {
            navigationRef.dispatch(CommonActions.reset(sate as any));
        }
    },
    openDrawer() {
        if (navigationRef.isReady()) {
            navigationRef.dispatch(DrawerActions.openDrawer());
        }
    },
};
