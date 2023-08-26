/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Badge from '../component/items/Badge';
import Modal from '../component/modal/Modal';
import TabView, {ITabViewProps} from '../component/tab/TabView';
import Text from '../component/text/Text';
import SafeAreaView from '../component/view/SafeAreaView';
import View from '../component/view/View';
import StyleStateContext from '../context/StyleContext';
import './configurationStyle';
import DATA_SOURCE from './Source';
import TestModal from './testModal/TestModal';

interface ITestData {
  id: string;
  info: any;
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [openModal, setOpenModal] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderMainView = () => {
    return (
      <TabView
        variant="standard"
        dataSource={DATA_SOURCE}
        renderTabView={renderTabView}
        className="px-3"
        classNameLabel="flex-center-y"
        scrollEnabled
        colorIndicator="pink"
        colorActiveLabelText="pink"
        renderLabelSuffix={({route}) => {
          if (route.key === 'testInput') {
            return <Badge size="xx-large" className="m ml-5" />;
          }
          return null;
        }}
      />
    );
  };

  const renderTabView: ITabViewProps['renderTabView'] = ({
    route,
    tabIndex,
    jumpTo,
  }) => {
    if (Math.abs(tabIndex - DATA_SOURCE.indexOf(route)) > 2) {
      return <View />;
    }
    const foundItem = DATA_SOURCE.find((i: any) => i?.key === route.key);
    return (foundItem && foundItem?.component) || <View />;
  };

  return (
    <StyleStateContext.Provider value={{locale: 'th', useFontToLocale: true}}>
      <SafeAreaView className="bg-white flex-1 h-full">
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {renderMainView()}
        {/* <TestModal onPress={() => setOpenModal(true)} /> */}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          size="fullscreen"
          className="flex-1"
          showHeader
          showFooter>
          {renderMainView()}
        </Modal>
      </SafeAreaView>
    </StyleStateContext.Provider>
  );
};

export default App;
