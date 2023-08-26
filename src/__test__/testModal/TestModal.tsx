import React from "react";
import Button from "../../component/button/Button";
import View from "../../component/view/View";

export interface ITestModalProps {
  [key: string]: any;
}

const TestModal: React.FC<ITestModalProps> = ({ id, onPress }) => {
  return (
    <View className="my-4">
      <Button label="Open Modal" onPress={onPress} />
    </View>
  );
};

export default TestModal;
