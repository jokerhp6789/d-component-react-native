import React from 'react';
import Button from '../../component/button/Button';
import ProgressController from '../../component/progress/ProgressController';
import View from '../../component/view/View';

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

    const sleep = (ms: number) =>
        new Promise(resolve => setTimeout(resolve, ms));

    return (
        <View className="w-100 flex-1">
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
        </View>
    );
};

export default TestProgress;
