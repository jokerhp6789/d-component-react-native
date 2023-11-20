import React, {Fragment} from 'react';
import Text from '../../component/text/Text';
import CollapseView from '../../component/view/CollapseView';
import ScrollView from '../../component/view/ScrollView';
import TextAreaView from '../../component/view/TextAreaView';
import View from '../../component/view/View';
import {styleTransformer} from '../../style/style';
import Layout from '../testLayout/Layout';

export interface ITestViewProps {
    [key: string]: any;
}

const TestText: React.FC<ITestViewProps> = ({id}) => {
    return (
        <Layout>
            <ScrollView className="my-3 px-4 w-100">
                <Text
                    className={[{'font-weight-bold': true}]}
                    style={styleTransformer({})}>
                    Technology lookup Find out what websites are built with
                    Instantly reveal the technology stack any website, such as
                    CMS, ecommerce platform or payment processor, as well as
                    company and contact details.
                </Text>
            </ScrollView>
        </Layout>
    );
};

export default TestText;
