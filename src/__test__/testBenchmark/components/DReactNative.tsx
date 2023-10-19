import View from "../../../component/view/View";

const DReactNative = () => {
  return (
    <View className ="flex-center-y">
      {new Array(1000).fill(0).map((_, i) => (
        <View key={i} className="border-1 border-red p-2" />
      ))}
    </View>
  );
};

export default DReactNative;
