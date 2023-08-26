import React, { ElementRef, useRef, useState } from "react";
import DatePicker from "react-native-date-picker";
import CheckBox from "../../component/checkbox/CheckBox";
import InputDate from "../../component/input/InputDate";
import InputDateRange from "../../component/input/InputDateRange";
import InputSearch from "../../component/input/InputSearch";
import InputText from "../../component/input/InputText";
import Text from "../../component/text/Text";
import ScrollView from "../../component/view/ScrollView";
import TouchableOpacity from "../../component/view/TouchableOpacity";
import View from "../../component/view/View";
import ViewTextArea from "../../component/view/ViewTextArea";

export interface ITestViewProps {
  [key: string]: any;
}

const TestView: React.FC<ITestViewProps> = ({ id }) => {
  const dateRef = useRef<ElementRef<typeof DatePicker>>(null);
  const [openDateModal, setOpenDateModal] = useState(false);
  const [date, setDate] = useState<any>();
  const [dateRange, setDateRange] = useState<any[]>([]);

  return (
    <ScrollView className="my-4 w-100">
      <ViewTextArea limitedLength={100} variant="expand">
        Technology lookup Find out what websites are built with Instantly reveal
        the technology stack any website, such as CMS, ecommerce platform or
        payment processor, as well as company and contact details.
      </ViewTextArea>
      <ViewTextArea limitedLength={100} variant="modal">
        Technology lookup Find out what websites are built with Instantly reveal
        the technology stack any website, such as CMS, ecommerce platform or
        payment processor, as well as company and contact details.
      </ViewTextArea>
    </ScrollView>
  );
};

export default TestView;
