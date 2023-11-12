import React from 'react';
import ScrollView from '../../component/view/ScrollView';
import TextAreaView from '../../component/view/TextAreaView';
import Layout from '../testLayout/Layout';

export interface ITestViewProps {
    [key: string]: any;
}

const TestView: React.FC<ITestViewProps> = ({id}) => {
    return (
        <Layout>
            <ScrollView className="my-3 px-4 w-100">
                <TextAreaView limitedLength={100} variant="expand">
                    Technology lookup Find out what websites are built with
                    Instantly reveal the technology stack any website, such as
                    CMS, ecommerce platform or payment processor, as well as
                    company and contact details.
                </TextAreaView>
                <TextAreaView limitedLength={100} variant="modal">
                    Technology lookup Find out what websites are built with
                    Instantly reveal the technology stack any website, such as
                    CMS, ecommerce platform or payment processor, as well as
                    company and contact details.
                </TextAreaView>
            </ScrollView>
        </Layout>
    );
};

export default TestView;
