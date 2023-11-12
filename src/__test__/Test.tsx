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
import React, {ElementRef, Fragment, useEffect, useRef, useState} from 'react';
import switchTheme from 'react-native-theme-switch-animation';
import {NavigationContainer} from '@react-navigation/native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Badge from '../component/items/Badge';
import Modal from '../component/modal/Modal';
import TabView, {ITabViewProps} from '../component/tab/TabView';
import View from '../component/view/View';
import StyleStateContext from '../context/StyleContext';
import './configurationStyle';
import DATA_SOURCE from './Source';
import TestModal from './testModal/TestModal';
import {AppColors, Button} from '..';
import InputComment from '../component/input/InputComment';
import ProgressComponent from '../component/progress/ProgressComponent';
import ProgressController from '../component/progress/ProgressController';
import {styleTransformer} from '../style/style';
import Routes from './testRoutes/TestRoutes';

const App = (props: any) => {
    const colorSchema = useColorScheme();

    const progressRef = useRef<ElementRef<typeof ProgressComponent>>(null);
    const isDarkMode = useColorScheme() === 'dark';
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (progressRef.current) {
            ProgressController.initialize(progressRef.current);
        }
    }, [progressRef]);

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

    const renderSwitchTheme = () => {
        return (
            <Fragment>
                <Button
                    label="Switch Theme"
                    onPress={(e: any) => {
                        e.currentTarget.measure(
                            (x1, y1, width, height, px, py) => {
                                switchTheme({
                                    switchThemeFunction: () => {
                                        Appearance.setColorScheme(
                                            colorSchema === 'light'
                                                ? 'dark'
                                                : 'light',
                                        );
                                    },
                                    animationConfig: {
                                        type: 'circular',
                                        duration: 900,
                                        startingPoint: {
                                            cy: py + height / 2,
                                            cx: px + width / 2,
                                        },
                                    },
                                });
                            },
                        );
                    }}
                />
                <View className="h-[100] bg-red" colorDarkMode="green" />
            </Fragment>
        );
    };

    return (
        <SafeAreaProvider>
            <StyleStateContext.Provider
                value={{locale: 'th', useFontToLocale: true, colorSchema}}>
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor: isDarkMode
                            ? AppColors.dark
                            : AppColors.light,
                    }}
                    edges={['top', 'bottom']}>
                    <NavigationContainer>
                        <ProgressComponent ref={progressRef} />
                        {/* <Button
                        onPress={() => {
                            // bottomSheetRef.current?.expand();
                            setOpenModal(!openModal);
                        }}>
                        Open Bottom Sheet
                    </Button> */}
                        {renderMainView()}
                        {/* <InputComment user={{}} useAnimation /> */}
                        {/* <TestModal onPress={() => setOpenModal(true)} /> */}
                        {/* <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    size="fullscreen"
                    className="flex-1"
                    showHeader
                    showFooter>
                    {renderMainView()}
                </Modal> */}
                        {/* <BottomSheet
                            backdropComponent={BottomSheetBackdrop}
                            ref={bottomSheetRef}
                            snapPoints={snapPoints}
                            enablePanDownToClose
                            onChange={handleSheetChanges}>
                            <View style={styleTransformer('')}>
                                <Text>Awesome 🎉</Text>
                            </View>
                        </BottomSheet> */}
                    </NavigationContainer>
                </SafeAreaView>
            </StyleStateContext.Provider>
        </SafeAreaProvider>
    );
};

export default App;
