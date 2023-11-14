/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React, {ElementRef, useEffect, useRef} from 'react';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Badge from '../component/items/Badge';
import ProgressComponent from '../component/progress/ProgressComponent';
import ProgressController from '../component/progress/ProgressController';
import TabView, {ITabViewProps} from '../component/tab/TabView';
import View from '../component/view/View';
import StyleStateContext from '../context/StyleContext';
import DATA_SOURCE from './Source';
import './configurationStyle';
import Routes from './testRoutes/TestRoutes';
import InitComponents from './InitComponents';

const App = (props: any) => {
    const colorSchema = useColorScheme();
    const progressRef = useRef<ElementRef<typeof ProgressComponent>>(null);
    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {
        if (progressRef.current) {
            ProgressController.initialize(progressRef.current);
        }
    }, [progressRef.current]);

    const renderMainView = () => {
        return <Routes {...props} />;
        return (
            <TabView
                variant="standard"
                dataSource={DATA_SOURCE}
                renderTabView={renderTabView}
                className="px-3 pt-3"
                backgroundColorDarkMode="dark"
                backgroundColor="muted"
                classNameLabel="flex-center-y"
                scrollEnabled
                colorIndicator="pink"
                colorActiveLabelText="pink"
                renderLabelSuffix={({route}) => {
                    if (route.key === 'testInput') {
                        return <Badge size="xx-large" className="m ml-5" />;
                    }
                    return null;
                }}
            />
        );
    };

    const renderTabView: ITabViewProps['renderTabView'] = ({
        route,
        tabIndex,
        jumpTo,
    }) => {
        if (Math.abs(tabIndex - DATA_SOURCE.indexOf(route)) > 0) {
            return <View className="" />;
        }
        const foundItem = DATA_SOURCE.find((i: any) => i?.key === route.key);
        return (foundItem && foundItem?.component) || <View />;
    };

    return (
        <SafeAreaProvider>
            <StyleStateContext.Provider
                value={{locale: 'th', useFontToLocale: true, colorSchema}}>
                <BottomSheetModalProvider>
                    <NavigationContainer onReady={() => {}}>
                        {renderMainView()}
                        <InitComponents />
                    </NavigationContainer>
                </BottomSheetModalProvider>
            </StyleStateContext.Provider>
        </SafeAreaProvider>
    );
};

export default App;
