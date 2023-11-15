import React, {useEffect, useMemo, useState} from 'react';
import Header from '../../component/header/Header';
import Select from '../../component/select/Select';
import ScrollView from '../../component/view/ScrollView';
import View from '../../component/view/View';
import StringUtils from '../../utils/StringUtils';
import {SELECT_DATA, SIMPLE_CHOICES} from '../data/TestConstant';
import Layout from '../testLayout/Layout';

export interface ITestSelectProps {
    [key: string]: any;
}

const TestSelect: React.FC<ITestSelectProps> = ({id}) => {
    const [selectValue, setSelectValue] = useState();
    const [singleValue, setSingleValue] = useState();
    const data = useMemo(
        () =>
            new Array(50).fill(0).map(i => {
                return {
                    id: StringUtils.getUniqueID(),
                    label: StringUtils.generateDummyText(undefined, 10),
                };
            }),
        [],
    );

    return (
        <Layout>
            <ScrollView className="mt-3 px-4 w-100">
                <Select
                    showSearch
                    quickSelect
                    searchOffline
                    variant="standard"
                    keySearchOffline={['label']}
                    valueType="string"
                    label="Select"
                    placeholder="Placeholder"
                    classNameContent="bg-light"
                    classNameTextContent="text-dark"
                    className="my-2"
                    dataSource={data}
                    getLabel={item => item?.label}
                    value={selectValue}
                    onChange={v => setSelectValue(v)}
                />
                <Select
                    showSearch
                    searchOffline
                    quickSelect
                    popupVariant="bottom-sheet"
                    keySearchOffline={['label']}
                    classNameContent="bg-white"
                    classNameTextContent="text-dark"
                    valueType="string"
                    label="Select"
                    placeholder="Placeholder"
                    className="my-2"
                    dataSource={data}
                    getLabel={item => item?.label}
                    value={selectValue}
                    onChange={v => setSelectValue(v)}
                />
                <Select
                    // showSearch
                    // searchOffline
                    // keySearchOffline={["label"]}
                    // valueType="string"
                    label="Select String Value"
                    placeholder="Select String Value"
                    variant="outline"
                    className="my-2"
                    valueType="string"
                    popupVariant="bottom-sheet"
                    transformer={res => data}
                    getLabel={item => item?.label}
                    value={singleValue}
                    onChange={v => setSingleValue(v)}
                    quickRemove
                    dataSource={SIMPLE_CHOICES}
                    // listProps={{useFlashList: false}}
                    // quickSelect
                />

                <Select
                    showSearch
                    searchOffline
                    quickSelect
                    multiple
                    popupVariant="bottom-sheet"
                    listProps={{useFlashList: true}}
                    classNameContent="bg-white"
                    labelPosition="inside"
                    keySearchOffline={['label']}
                    valueType="string"
                    label="Multiselect Popup Bottom Sheet"
                    placeholder="Label Inside"
                    className="my-2"
                    dataSource={SELECT_DATA}
                    getLabel={item => item?.label}
                    value={selectValue}
                    onChange={v => setSelectValue(v)}
                    error="123"
                />
                <Select
                    showSearch
                    searchOffline
                    quickSelect
                    multiple
                    // popupVariant="bottom-sheet"
                    listProps={{useFlashList: true}}
                    classNameContent="bg-white"
                    labelPosition="inside"
                    keySearchOffline={['label']}
                    valueType="string"
                    label="Select Label Inside"
                    placeholder="Label Inside"
                    className="my-2"
                    dataSource={SELECT_DATA}
                    getLabel={item => item?.label}
                    value={selectValue}
                    onChange={v => setSelectValue(v)}
                    error="123"
                />
            </ScrollView>
        </Layout>
    );
};

export default TestSelect;
