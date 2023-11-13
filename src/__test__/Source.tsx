import React from 'react';
import {ITabViewProps} from '../component/tab/TabView';
import TestAvatar from './testAvatar/TestAvatar';
import TestBenchmark from './testBenchmark/TestBenchmark';
import TestBottomSheet from './testBottomSheet/TestBottomSheet';
import TestButton from './testButton/TestButton';
import TestCalendar from './testCalendar/TestCalendar';
import TestForm from './testForm/TestForm';
import TestHeader from './testHeader/TestHeader';
import TestImages from './testImage/TestImages';
import TestInput from './testInput/TestInput';
import TestItems from './testItems/TestItems';
import TestList from './testList/TestList';
import TestProgress from './testProgress/TestProgress';
import TestSelect from './testSelect/TestSelect';
import TestStyle from './testStyle/TestStyle';
import TestTabBar from './testTab/TestTabBar';
import TestTabStepper from './testTab/TestTabStepper';
import TestView from './testView/TestView';

const DATA_SOURCE: ITabViewProps['dataSource'] = [
    {
        key: 'testStyle',
        label: 'Style',
        action: 'testStyleScreen',
        component: <TestStyle />,
    },
    {
        key: 'testInput',
        action: 'testInputScreen',
        label: 'Input',
        component: <TestInput />,
    },
    {
        key: 'testSelect',
        action: 'testSelectScreen',
        label: 'Select',
        component: <TestSelect />,
    },
    {
        key: 'testButton',
        action: 'testButtonScreen',
        label: 'Button',
        component: <TestButton />,
    },
    {
        key: 'testBenchmarks',
        action: 'testBenchmarksScreen',
        label: 'Benchmarks',
        component: <TestBenchmark />,
    },
    {
        key: 'testItems',
        action: 'testItemsScreen',
        label: 'Items',
        component: <TestItems />,
    },
    {
        key: 'testView',
        action: 'testViewScreen',
        label: 'View',
        component: <TestView />,
    },
    {
        key: 'testImage',
        action: 'testImageScreen',
        label: 'Image',
        component: <TestImages />,
    },
    {
        key: 'testAvatar',
        action: 'testAvatarScreen',
        label: 'Avatar',
        component: <TestAvatar />,
    },
    {
        key: 'testHeader',
        action: 'testHeaderScreen',
        label: 'Header',
        component: <TestHeader />,
    },
    {
        key: 'testCalendar',
        action: 'testCalendarScreen',
        label: 'Calendar',
        component: <TestCalendar />,
    },
    {
        key: 'testList',
        action: 'testListScreen',
        label: 'List',
        component: <TestList />,
    },
    {
        key: 'testProgress',
        action: 'testProgressScreen',
        label: 'Progress',
        component: <TestProgress />,
    },
    {
        key: 'testBottomSheet',
        action: 'testBottomSheetScreen',
        label: 'Bottom Sheet',
        component: <TestBottomSheet />,
    },
    {
        key: 'testTabBar',
        action: 'testTabBarScreen',
        label: 'Tab Bar',
        component: <TestTabBar />,
    },
    {
        key: 'testTabStepper',
        action: 'testTabStepperScreen',
        label: 'Tab Stepper',
        component: <TestTabStepper />,
    },
    {
        key: 'testForm',
        action: 'testFormScreen',
        label: 'Form',
        component: <TestForm />,
    },
];

export default DATA_SOURCE;
