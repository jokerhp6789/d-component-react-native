import React, { useMemo, useState } from "react";
import Button from "../../component/button/Button";
import TabBar from "../../component/tab/TabBar";
import TabStepper from "../../component/tab/TabStepper";
import SafeAreaView from "../../component/view/SafeAreaView";
import ScrollView from "../../component/view/ScrollView";
import View from "../../component/view/View";
import TestImages from "../testImage/TestImages";
import TestSelect from "../testSelect/TestSelect";
import TestList from "../testList/TestList";
import TestInput from "../testInput/TestInput";
import Text from "../../component/text/Text";

export interface ITestTabBarProps {
  [key: string]: any;
}

const TAB_STEPPER_DATA = [
  { id: 1, label: "Test Select", component: <TestSelect /> },
  { id: 2, label: "Test Image", component: <TestImages /> },
  { id: 3, label: "Test List", component: <TestList /> },
  { id: 4, label: "Test Input", component: <TestInput /> },
  { id: 5, label: "Step 5", component: <TestSelect /> },
  { id: 6, label: "Step 6", component: <TestSelect /> },
  { id: 7, label: "Step 7", component: <TestSelect /> },
  { id: 8, label: "Step 8", component: <TestSelect /> },
];

const TestTabBar: React.FC<ITestTabBarProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState(TAB_STEPPER_DATA[0]);
  return (
    <SafeAreaView className="flex-1 w-100">
      <TabBar
        className="mb-3"
        dataSource={TAB_STEPPER_DATA}
        value={activeTab}
        scrollable
        onChange={(item, index) => setActiveTab(item as any)}
      />
      {activeTab.component}
    </SafeAreaView>
  );
};

export default TestTabBar;
