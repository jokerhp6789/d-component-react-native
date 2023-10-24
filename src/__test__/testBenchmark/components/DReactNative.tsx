// import View from "../../../component/view/View";

import {View} from 'react-native';
import {styleTransformer} from '../../../style/style';

const DReactNative = () => {
    return (
        <View style={styleTransformer('flex-center-y')}>
            {new Array(1000).fill(0).map((_, i) => (
                <View
                    key={i}
                    style={styleTransformer('border-1 p-2 border-red')}
                />
            ))}
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
