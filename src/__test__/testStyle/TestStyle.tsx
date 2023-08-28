import React, {useEffect, useState} from 'react';
import {Appearance, useColorScheme} from 'react-native';
import ScrollView from '../../component/view/ScrollView';
import View from '../../component/view/View';
import Text from '../../component/text/Text';
import {map} from 'lodash';
import {Switch} from 'react-native';

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

    return (
        <ScrollView className="w-100">
            <View className="w-100 justify-content-center align-center">
                <View
                    className="width-50 height-50  border-dashed border-primary my-3"
                    colorDarkMode="red"
                />
                <Text className="h5 label font-weight-bold">
                    width-50 height-50 border-dashed border-primary my-3
                    width-50 height-50 border-dashed border-primary my-3
                    width-50 height-50 border-dashed border-primary my-3
                </Text>
            </View>
            <View style={{gap: 10}} className="bg-green flex-row my-3">
                {map(new Array(10).fill(0), item => (
                    <View
                        className="flex-1"
                        style={{backgroundColor: 'red', height: 10}}
                    />
                ))}
            </View>
            <View style={{}} className="bg-green flex-row my-3 gap-col-20">
                {map(new Array(10).fill(0), item => (
                    <View
                        className="flex-1"
                        style={{backgroundColor: 'red', height: 10}}
                    />
                ))}
            </View>
            <View className="flex-center-y gap-20">
                <Text>Prefer dark mode</Text>
                <Switch
                    value={useSystemTheme}
                    onChange={() => {
                        setUseSystemTheme(!useSystemTheme);
                    }}
                />
                <Text>Use system theme</Text>
            </View>
        </ScrollView>
    );
};

export default TestStyle;
