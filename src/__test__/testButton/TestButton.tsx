import React, {useState} from 'react';
import Button from '../../component/button/Button';
import Text from '../../component/text/Text';
import ScrollView from '../../component/view/ScrollView';
import TouchableOpacity from '../../component/view/TouchableOpacity';

export interface ITestButtonProps {
    [key: string]: any;
}

const TestButton: React.FC<ITestButtonProps> = ({id}) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <ScrollView className="w-100">
            <Button size="xx-large" className="my-2" colorDarkMode="red">
                Button XX Large
            </Button>
            <Button
                disabled
                size="xx-large"
                className="my-2"
                colorDarkMode="red">
                Button Disabled
            </Button>
            <Button size="x-large" className="my-2 border-#319710">
                Button X Large
            </Button>
            <Button
                size="large"
                className="my-2 align-self-start"
                iconName="refresh"
                // disabled
                // disableColor="blueLight"
                loading={loading}
                onPress={() => {
                    setLoading(true);
                    setInterval(() => setLoading(false), 1500);
                }}>
                Button Large
            </Button>
            <Button
                size="medium"
                className="my-2 align-self-start"
                colorText="red"
                // iconName="refresh"
            >
                Medium
            </Button>
            <Button size="small" className="my-2 align-self-start">
                Button Small
            </Button>
            <Button size="x-small" className="my-2">
                Button X Small
            </Button>
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'red',
                }}>
                <Text>Test</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default TestButton;
