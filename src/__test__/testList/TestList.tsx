import React from "react";
import { FlatList } from "react-native";
import { Image } from "../..";
import AwesomeList from "../../component/list/awesomeList/AwesomeList";
import AwesomeListMode from "../../component/list/awesomeList/AwesomeListMode";
import Text from "../../component/text/Text";
import View from "../../component/view/View";
import images from "../testImage/Images";

export interface ITestListProps {
  [key: string]: any;
}

export interface IListFooterComponentProps {
  className?: string;
}

const ListFooterComponent: React.FC<IListFooterComponentProps> = ({
  className,
}) => {
  return (
    <View
      className={`w-100 align-items-center justify-content-center py-5 ${className}`}
    >
      <Image source={images.birthdayCake} className="width-50 height-50" />
      <Text className="text-disabled text-center mt-3">
        You are Up to date!
      </Text>
    </View>
  );
};

const TestList: React.FC<ITestListProps> = ({ id }) => {
  const renderList = () => {
    return (
      <AwesomeList
        renderItem={({ item }) => (
          <View>
            <Text>123</Text>
          </View>
        )}
        source={() => Promise.reject()}
        transformer={(res) => []}
        renderFooterComponent={({ loading, emptyMode }) => {
          return <ListFooterComponent />;
        }}
        style={{ flex: 1 }}
        hideFooterInEmptyErrorMode
        emptyViewStyle={{
          paddingVertical: 100,
          backgroundColor: "green",
          width: "100%",
          height: "100%",
        }}
      />
    );
  };

  return <View style={{ flex: 1 }}>{renderList()}</View>;
};

export default TestList;
