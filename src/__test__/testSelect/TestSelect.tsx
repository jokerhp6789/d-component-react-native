import React, { useState } from "react";
import Select from "../../component/select/Select";
import ScrollView from "../../component/view/ScrollView";
import View from "../../component/view/View";
import { SELECT_DATA } from "../data/TestConstant";

export interface ITestSelectProps {
  [key: string]: any;
}

const TestSelect: React.FC<ITestSelectProps> = ({ id }) => {
  const [selectValue, setSelectValue] = useState();
  const [singleValue, setSingleValue] = useState();

  return (
    <ScrollView className="py-0 w-100">
      <View className="flex-1 bg-green h-100 w-100">
        <Select
          showSearch
          searchOffline
          keySearchOffline={["label"]}
          valueType="string"
          label="Select"
          placeholder="Placeholder"
          variant="standard"
          className="my-2"
          dataSource={SELECT_DATA}
          getLabel={(item) => item?.label}
          quickSelect
          value={selectValue}
          onChange={(v) => setSelectValue(v)}
        />
        <Select
          // showSearch
          // searchOffline
          // keySearchOffline={["label"]}
          valueType="string"
          label="Select"
          placeholder="Placeholder"
          variant="outline"
          className="my-2"
          transformer={(res) => SELECT_DATA}
          getLabel={(item) => item?.label}
          value={singleValue}
          onChange={(v) => setSingleValue(v)}
          multiple
          quickRemove
          // quickSelect
        />
      </View>
    </ScrollView>
  );
};

export default TestSelect;
