import React, {useState} from 'react';
import Button from '../../component/button/Button';
import Calendar from '../../component/calendar/Calendar';
import ModalCalendar from '../../component/calendar/ModalCalendar';
import ScrollView from '../../component/view/ScrollView';
import Layout from '../testLayout/Layout';

export interface ITestCalendarProps {
    [key: string]: any;
}

const TestCalendar: React.FC<ITestCalendarProps> = ({id}) => {
    const [openCalendarModal, setOpenCalendarModal] = useState(false);
    return (
        <Layout className="px-4">
            <ScrollView className="mt-3 w-100">
                <Calendar />
                <ModalCalendar
                    useCalendarList
                    open={openCalendarModal}
                    onClose={() => setOpenCalendarModal(false)}
                />
                <Button onPress={() => setOpenCalendarModal(true)}>
                    Open Calendar
                </Button>
            </ScrollView>
        </Layout>
    );
};

export default TestCalendar;
