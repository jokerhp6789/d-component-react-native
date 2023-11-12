import React from 'react';
import Header from '../../component/header/Header';
import Icon from '../../component/icon/Icon';
import ScrollView from '../../component/view/ScrollView';
import View from '../../component/view/View';
import Layout from '../testLayout/Layout';

export interface ITestHeaderProps {
    [key: string]: any;
}

const TestHeader: React.FC<ITestHeaderProps> = ({id}) => {
    return (
        <Layout>
            <ScrollView className="w-100 px-4 mt-3">
                <Header
                    title="Default"
                    onLeftPress={() => {}}
                    onRightPress={() => {}}
                    className="my-3"
                />

                <Header
                    title="Theme Dark"
                    classNameTitle="font-weight-bold"
                    onLeftPress={() => {}}
                    onRightPress={() => {}}
                    className="my-3"
                    theme="dark"
                    colorDarkMode="blue"
                />

                <Header
                    className="my-3"
                    title="Primary Small"
                    theme="primary"
                    onLeftPress={() => {}}
                    onRightPress={() => {}}
                    size="small"
                />
                <Header
                    className="my-3"
                    title="Primary Medium"
                    theme="primary"
                    onLeftPress={() => {}}
                    onRightPress={() => {}}
                />
                <Header
                    className="my-3"
                    title="Primary Large"
                    theme="primary"
                    onLeftPress={() => {}}
                    onRightPress={() => {}}
                    size="large"
                />
                <Header
                    className="my-3"
                    title="Header"
                    theme="primary"
                    leftText="Left"
                    onLeftPress={() => {}}
                    onRightPress={() => {}}
                    customRight={
                        <View className="flex-center-y bg-transparent">
                            <Icon
                                name="filter-list"
                                classNameWrapper="mr-2"
                                onPress={() => {}}
                            />
                            <Icon name="explore" />
                        </View>
                    }
                    showSearch
                />
            </ScrollView>
        </Layout>
    );
};

export default TestHeader;
