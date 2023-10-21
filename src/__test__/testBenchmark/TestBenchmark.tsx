import React, {useState} from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import Colors from '../../style/color/_color';
import DReactNative from './components/DReactNative';
import ReactNative from './components/ReactNative';
import TimedRender from './components/TimedRender';
import TWReactNativeClassName from './components/TWReactNativeClassName';

export interface ITestBenchmarkProps {
    [key: string]: any;
}

const TestBenchmark: React.FC<ITestBenchmarkProps> = ({id}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [styleType, setStyleType] = useState<any>(undefined);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const onStyleTypePress = (curry: any) => () => {
        setStyleType(curry);
    };

    const renderStyleLibrary = () => {
        switch (styleType) {
            case 'React Native':
                return <ReactNative />;
            case 'DReactNative':
                return <DReactNative />;
            case 'Tailwind React Native ClassName':
                return <TWReactNativeClassName />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <Header />
                <View style={{paddingHorizontal: 10}}>
                    <Button
                        title="React Native"
                        onPress={onStyleTypePress('React Native')}
                    />
                    <Button
                        title="D Component React Native"
                        onPress={onStyleTypePress('DReactNative')}
                    />
                    <Button
                        title="Tailwind React Native ClassName"
                        onPress={onStyleTypePress(
                            'Tailwind React Native ClassName',
                        )}
                    />
                    {styleType ? (
                        <TimedRender key={styleType}>
                            <Text style={styles.text}>
                                Rendering with{' '}
                                <Text style={styles.bold}>{styleType}</Text>
                                {` src/__test__/testBenchmark/components/${styleType}.tsx`}{' '}
                            </Text>
                        </TimedRender>
                    ) : null}
                    {renderStyleLibrary()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TestBenchmark;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        marginVertical: 12,
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
