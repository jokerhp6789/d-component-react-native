import React from 'react';
import {DEFAULT_HEADER, MainStackGroup, MainStackScreen} from './MainStacks';
import {HomeTabStack} from './TabStacks';
import TestStyle from '../../testStyle/TestStyle';
import TestInput from '../../testInput/TestInput';
import TestSelect from '../../testSelect/TestSelect';
import TestButton from '../../testButton/TestButton';
import TestBenchmark from '../../testBenchmark/TestBenchmark';
import TestItems from '../../testItems/TestItems';
import TestView from '../../testView/TestView';
import TestImages from '../../testImage/TestImages';
import TestAvatar from '../../testAvatar/TestAvatar';
import TestHeader from '../../testHeader/TestHeader';
import TestCalendar from '../../testCalendar/TestCalendar';
import TestList from '../../testList/TestList';
import TestProgress from '../../testProgress/TestProgress';
import TestTabBar from '../../testTab/TestTabBar';
import TestTabStepper from '../../testTab/TestTabStepper';
import TestForm from '../../testForm/TestForm';
import TestBottomSheet from '../../testBottomSheet/TestBottomSheet';
import Text from '../../../component/text/Text';
import {join} from 'lodash';

export function commonStacksCreator<T extends typeof HomeTabStack>(Stack: T) {
    return (
        <Stack.Group
            screenOptions={{
                ...DEFAULT_HEADER,
                headerTitle: ({children}) => {
                    let result =
                        typeof children === 'string'
                            ? children.split(/(?=[A-Z])/)
                            : 'Screen';

                    if (Array.isArray(result) && result.length) {
                        result = join(
                            result.map(word => {
                                return (
                                    word.charAt(0)?.toUpperCase() +
                                    word.slice(1)
                                );
                            }),
                            ' ',
                        );
                    }

                    return (
                        <Text className="h3 font-weight-bold text-primary">
                            {result}
                        </Text>
                    );
                },
            }}>
            <Stack.Screen name="testStyleScreen" component={TestStyle} />
            <Stack.Screen name="testInputScreen" component={TestInput} />
            <Stack.Screen name="testSelectScreen" component={TestSelect} />
            <Stack.Screen name="testButtonScreen" component={TestButton} />
            <Stack.Screen
                name="testBenchmarksScreen"
                component={TestBenchmark}
            />
            <Stack.Screen name="testItemsScreen" component={TestItems} />
            <Stack.Screen name="testViewScreen" component={TestView} />
            <Stack.Screen name="testImageScreen" component={TestImages} />
            <Stack.Screen name="testAvatarScreen" component={TestAvatar} />
            <Stack.Screen name="testHeaderScreen" component={TestHeader} />
            <Stack.Screen name="testCalendarScreen" component={TestCalendar} />
            <Stack.Screen name="testListScreen" component={TestList} />
            <Stack.Screen name="testProgressScreen" component={TestProgress} />
            <Stack.Screen name="testTabBarScreen" component={TestTabBar} />
            <Stack.Screen
                name="testTabStepperScreen"
                component={TestTabStepper}
            />
            <Stack.Screen name="testFormScreen" component={TestForm} />
            <Stack.Screen name="testBottomSheet" component={TestBottomSheet} />
        </Stack.Group>
    );
}
