// import View from "../../../component/view/View";

import {View} from 'react-native';
import {styleTransformer} from '../../../style/style';
import Text from '../../../component/text/Text';

const DReactNative = () => {
    return (
        <View style={styleTransformer('flex-center-y')}>
            {new Array(1000).fill(0).map((_, i) => {
                return (
                    <View
                        key={i}
                        style={styleTransformer(
                            'border-1 p-1 border-red w-[30] h-[30] justify-center items-center',
                        )}>
                        <Text>{i}</Text>
                    </View>
                );
            })}
        </View>
    );
    //   return (
    //     <View className ="flex-center-y">
    //       {new Array(10000).fill(0).map((_, i) => (
    //         <View key={i} className="border-1 border-red p-2" />
    //       ))}
    //     </View>
    //   );
};

export default DReactNative;
