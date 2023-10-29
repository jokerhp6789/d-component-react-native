import {StyleSheet, Text, View} from 'react-native';

const ReactNative = () => {
    return (
        <View style={{display: 'flex', flexDirection: 'row'}}>
            {new Array(1000).fill(0).map((_, i) => (
                <View key={i} style={styles.styledView}>
                    <Text>{i}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    styledView: {
        borderColor: 'red',
        borderWidth: 1,
        padding: 5,
        width: 30,
        height: 30,
    },
});

export default ReactNative;
