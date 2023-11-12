import React from 'react';
import Button from '../../component/button/Button';
import ProgressController from '../../component/progress/ProgressController';
import View from '../../component/view/View';
import Layout from '../testLayout/Layout';

export interface ITestProgressProps {
    [key: string]: any;
}

const TestProgress: React.FC<ITestProgressProps> = ({id}) => {
    const callApi = async () => {
        for (let i = 0; i <= 10000; i++) {
            console.log({});
        }
        return true;
    };

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    return (
        <Layout className="px-4 pt-3">
            <Button
                onPress={() => {
                    ProgressController.show(
                        {
                            method: sleep,
                            params: 350,
                        },
                        (res: any) => {},
                    );
                }}>
                On Progress
            </Button>
        </Layout>
    );
};

export default TestProgress;
