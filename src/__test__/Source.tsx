import React from "react";
import { ITabViewProps } from "../component/tab/TabView";
import TestAvatar from "./testAvatar/TestAvatar";
import TestButton from "./testButton/TestButton";
import TestCalendar from "./testCalendar/TestCalendar";
import TestForm from "./testForm/TestForm";
import TestHeader from "./testHeader/TestHeader";
import TestImages from "./testImage/TestImages";
import TestInput from "./testInput/TestInput";
import TestItems from "./testItems/TestItems";
import TestList from "./testList/TestList";
import TestSelect from "./testSelect/TestSelect";
import TestStyle from "./testStyle/TestStyle";
import TestTabBar from "./testTab/TestTabBar";
import TestTabStepper from "./testTab/TestTabStepper";
import TestView from "./testView/TestView";

const DATA_SOURCE: ITabViewProps["dataSource"] = [
  { key: "testStyle", label: "Style", component: <TestStyle /> },
  { key: "testItems", label: "Items", component: <TestItems /> },
  { key: "testInput", label: "Input", component: <TestInput /> },
  { key: "testView", label: "View", component: <TestView /> },
  { key: "testSelect", label: "Select", component: <TestSelect /> },
  { key: "testButton", label: "Button", component: <TestButton /> },
  { key: "testImage", label: "Image", component: <TestImages /> },
  { key: "testAvatar", label: "Avatar", component: <TestAvatar /> },
  { key: "testHeader", label: "Header", component: <TestHeader /> },
  { key: "testCalendar", label: "Calendar", component: <TestCalendar /> },
  { key: "testList", label: "List", component: <TestList /> },
  {
    key: "testTabBar",
    label: "Tab Bar",
    component: <TestTabBar />,
  },
  {
    key: "testTabStepper",
    label: "Tab Stepper",
    component: <TestTabStepper />,
  },
  {
    key: "testForm",
    label: "Form",
    component: <TestForm />,
  },
];

export default DATA_SOURCE;
