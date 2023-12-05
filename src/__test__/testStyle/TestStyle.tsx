import React, {Fragment, useEffect, useState} from 'react';
import {
    Appearance,
    ScrollView,
    useColorScheme,
    View as RNView,
} from 'react-native';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import switchTheme from 'react-native-theme-switch-animation';
import View from '../../component/view/View';
import Text from '../../component/text/Text';
import {map} from 'lodash';
import {Switch} from 'react-native';
import {styleTransformer} from '../../style/style';
import Button from '../../component/button/Button';
import Layout from '../testLayout/Layout';

export interface ITestStyleProps {
    [key: string]: any;
}

const TestStyle: React.FC<ITestStyleProps> = ({id}) => {
    const appScheme = useColorScheme();
    const [useSystemTheme, setUseSystemTheme] = useState(true);

    useEffect(() => {
        if (!useSystemTheme) {
            Appearance.setColorScheme('dark');
        } else {
            Appearance.setColorScheme(undefined);
        }
    }, [useSystemTheme]);

    const renderSwitchTheme = () => {
        return (
            <RNView style={[{flex: 1, marginVertical: 20}]}>
                <Button
                    label="Switch Theme"
                    className="my-3"
                    onPress={(e: any) => {
                        e.currentTarget.measure(
                            //@ts-ignore
                            (x1, y1, width, height, px, py) => {
                                switchTheme({
                                    switchThemeFunction: () => {
                                        Appearance.setColorScheme(
                                            appScheme === 'light'
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
            </RNView>
        );
    };

    return (
        <Layout>
            <ScrollView
                style={styleTransformer('px-4')}
                overScrollMode="always">
                <ReactNativeZoomableView
                    maxZoom={20}
                    style={styleTransformer('border')}>
                    {renderSwitchTheme()}
                    <View className="justify-content-center align-center bg-[rgba(12,12,12,0.3)] max-width-[250] p-[30]">
                        <View className="width-[60] height-[60]  border-dashed border-primary my-3" />
                        <Text
                            className={styleTransformer(
                                'h5 label font-weight-bold border-[20] border-green',
                            )}
                            style={{fontWeight: '800'}}>
                            width-50 height-50 border-dashed border-primary my-3
                            width-50 height-50 border-dashed border-primary my-3
                            width-50 height-50 border-dashed border-primary my-3
                        </Text>
                    </View>
                </ReactNativeZoomableView>

                <View
                    style={{gap: 10}}
                    className="bg-green flex-row my-3 max-h-10">
                    {map(new Array(10).fill(0), item => (
                        <View
                            className="flex-1"
                            style={{backgroundColor: 'red', height: 10}}
                        />
                    ))}
                </View>
                <View style={{}} className="bg-green my-3 gy-3 max-w-30 z-[10]">
                    {map(new Array(10).fill(0), item => (
                        <View
                            className="flex-1"
                            style={{backgroundColor: 'red', height: 10}}
                        />
                    ))}
                </View>
                <View className="flex-center-y g-[20]">
                    <Text>Prefer dark mode</Text>
                    <Switch
                        value={useSystemTheme}
                        onChange={() => {
                            setUseSystemTheme(!useSystemTheme);
                        }}
                    />
                    <Text>Use system theme</Text>
                </View>
                <View className="flex-center-y g-[20]  bg-red bottom-[200] l-[25] z-[0]">
                    <Text>Prefer dark mode</Text>
                    <Switch
                        value={useSystemTheme}
                        onChange={() => {
                            setUseSystemTheme(!useSystemTheme);
                        }}
                    />
                    <Text>Use system theme</Text>
                </View>
                <View className="mt-3 h-[200] border items-center justify-center">
                    <Text>Style Position Special Value</Text>
                    <View className="absolute border-2 border-green h-[20] w-[20] top-[-10] bg-red my-5" />
                    <View className="absolute border-2 border-green h-[20] w-[20] left-[-10]" />
                    <View className="absolute border-2 border-green h-[20] w-[20] right-[-10]" />
                    <View className="absolute border-2 border-green h-[20] w-[20] b-[-10]" />
                </View>
                <View className="mt-3">
                    <Text>Text Style</Text>
                    <Text className="h0 mt-3 font-weight-bold">
                        Text Style h0
                    </Text>
                    <Text className="h1 mt-3">Text Style h1</Text>
                    <Text className="h2 mt-3">Text Style h2</Text>
                    <Text className="h3 mt-3">Text Style h3</Text>
                    <Text className="h4 mt-3">Text Style h4</Text>
                    <Text className="h5 mt-3">Text Style h5</Text>
                </View>

                <View className="h-[200]" />
            </ScrollView>
        </Layout>
    );
};

export default TestStyle;
