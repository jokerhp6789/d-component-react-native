import React, {Fragment} from 'react';
import CollapseView from '../../component/view/CollapseView';
import ScrollView from '../../component/view/ScrollView';
import TextAreaView from '../../component/view/TextAreaView';
import Layout from '../testLayout/Layout';

export interface ITestViewProps {
    [key: string]: any;
}

const TestView: React.FC<ITestViewProps> = ({id}) => {
    const renderTextAreaView = () => {
        return (
            <Fragment>
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
            </Fragment>
        );
    };
    return (
        <Layout>
            <ScrollView className="my-3 px-4 w-100">
                {renderTextAreaView()}
                <CollapseView title="This is collapse view" showIcon={false}>
                    {renderTextAreaView()}
                </CollapseView>
            </ScrollView>
        </Layout>
    );
};

export default TestView;
