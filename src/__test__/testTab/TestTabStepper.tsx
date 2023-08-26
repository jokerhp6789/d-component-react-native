import React, { useMemo, useState } from "react";
import Button from "../../component/button/Button";
import TabStepper from "../../component/tab/TabStepper";
import SafeAreaView from "../../component/view/SafeAreaView";
import ScrollView from "../../component/view/ScrollView";
import View from "../../component/view/View";

export interface ITestTabStepperProps {
  [key: string]: any;
}

const TAB_STEPPER_DATA = [
  { id: 1, label: "Personal Information" },
  { id: 2, label: "Step 2" },
  { id: 3, label: "Step 3" },
  { id: 4, label: "Step 4" },
  { id: 5, label: "Step 5" },
  { id: 6, label: "Step 6" },
  { id: 7, label: "Step 7" },
  { id: 8, label: "Step 8" },
];

const TestTabStepper: React.FC<ITestTabStepperProps> = ({ id }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = useMemo(() => {
    return TAB_STEPPER_DATA[activeIndex];
  }, [activeIndex]);
  return (
    <SafeAreaView style={{ height: 200 }}>
      <TabStepper
        dataSource={TAB_STEPPER_DATA}
        value={activeTab}
        scrollable
        onPressItem={(item, index) => setActiveIndex(index)}
        getItemProps={() => ({ tabLineLength: 50 })}
        className="px-5"
        variant="icon"
        firstDistance={30}
      />
      <View className="flex-center-y justify-content-between mt-5">
        <Button
          onPress={() => {
            setActiveIndex(activeIndex > 0 ? activeIndex - 1 : 0);
          }}
        >
          Previous
        </Button>
        <Button
          onPress={() => {
            setActiveIndex(activeIndex + 1);
          }}
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default TestTabStepper;
