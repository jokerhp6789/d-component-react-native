import React, { useState } from "react";
import Form, { IFormItemData } from "../../component/form/Form";
import SafeAreaView from "../../component/view/SafeAreaView";
import ScrollView from "../../component/view/ScrollView";
import { SELECT_DATA } from "../data/TestConstant";

export interface ITestFormProps {
  [key: string]: any;
}

const FORM_DATA: IFormItemData<any>[] = [
  {
    rowsId: "citizenId",
    label: "citizenId",
    type: "inputText",
    key: "citizenId",
  },
  {
    rowsId: "nationality",
    label: "nationality",
    key: "nationality",
    type: "select",
    dataSource: [],
  },
  {
    rowsId: "passportId",
    label: "passportId",
    key: "passportId",
    type: "inputText",
  },
  {
    rowsId: "birthDay",
    label: "birthDay",
    type: "date",
    key: "birthDay",
  },
  {
    rowsId: "passportExp",
    label: "passportExp",
    type: "time-range",
    key: "passportExp",
  },
  {
    rowsId: "religion",
    label: "religion",
    key: "religion",
    type: "multi-select",
    dataSource: SELECT_DATA,
    getLabel: (item) => item?.label,
  },
  {
    rowsId: "maritalStatus",
    label: "maritalStatus",
    key: "maritalStatus",
    type: "inputText",
    inputProps: { useKeyboardAvoidingView: true },
  },
  {
    rowsId: "maritalStatusTest",
    label: "maritalStatus",
    key: "maritalStatus",
    type: "inputText",
    inputProps: { useKeyboardAvoidingView: true },
  },
  {
    rowsId: "maritalStatusTest123",
    label: "maritalStatus",
    key: "maritalStatus",
    type: "inputText",
    inputProps: { useKeyboardAvoidingView: true },
  },
];

const TestForm: React.FC<ITestFormProps> = ({ id }) => {
  const [formState, setFormState] = useState<any>({});
  return (
    <SafeAreaView className="w-100">
      <Form
        scrollable
        dataSource={FORM_DATA}
        value={formState}
        onChange={(key, value) => setFormState({ ...formState, [key]: value })}
      />
    </SafeAreaView>
  );
};

export default TestForm;
