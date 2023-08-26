import React, { useState } from "react";
import Button from "../../component/button/Button";
import Calendar from "../../component/calendar/Calendar";
import ModalCalendar from "../../component/calendar/ModalCalendar";
import ScrollView from "../../component/view/ScrollView";

export interface ITestCalendarProps {
  [key: string]: any;
}

const TestCalendar: React.FC<ITestCalendarProps> = ({ id }) => {
  const [openCalendarModal, setOpenCalendarModal] = useState(false);
  return (
    <ScrollView className="my-4 w-100">
      <Calendar />
      <ModalCalendar
        open={openCalendarModal}
        onClose={() => setOpenCalendarModal(false)}
      />
      <Button onPress={() => setOpenCalendarModal(true)}>Open Calendar</Button>
    </ScrollView>
  );
};

export default TestCalendar;
