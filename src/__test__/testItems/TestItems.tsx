import React from "react";
import { CheckBox, ScrollView } from "../..";
import Avatar from "../../component/avatar/Avatar";
import Icon from "../../component/icon/Icon";
import Badge from "../../component/items/Badge";
import Text from "../../component/text/Text";
import View from "../../component/view/View";
import images from "../testImage/Images";
import ProgressBar from "../../component/items/ProgressBar";

export interface ITestItemsProps {
    [key: string]: any;
}

const TestItems: React.FC<ITestItemsProps> = ({ id }) => {
    const renderRow = (label: string, component: any) => {
        return (
            <View className="flex-center-y my-2">
                <Text className="h4">{label} : </Text>
                {component}
            </View>
        );
    };
    return (
        <ScrollView className="my-4 w-100">
            <Text className="label font-weight-bold">Badge</Text>
            {renderRow(
                "Size: xx-small Position: top-right",
                <Badge
                    size="xx-large"
                    variant="icon"
                    width={30}
                    height={30}
                    styleBadge={{ right: -10 }}
                >
                    <Avatar
                        avatar={images.birthdayCake}
                        size="medium"
                        className="my-2"
                    />
                </Badge>
            )}
            {renderRow(
                "Size xx-small Position: top-right",
                <Badge size="xx-small">
                    <Icon name="filter" className="my-2" />
                </Badge>
            )}
            {renderRow(
                "Size x-small Position: top-right",
                <Badge size="small" styleBadge={{ right: -3 }}>
                    <Icon name="filter" className="my-2" />
                </Badge>
            )}
            {renderRow(
                "Size x-small Position: bottom-left",
                <Badge size="small" position="bottom-left">
                    <Icon name="filter" className="my-2" />
                </Badge>
            )}
            {renderRow(
                "Size medium Position: top-right Variant: label",
                <Badge
                    size="xx-large"
                    position="top-right"
                    variant="label"
                    label="+99"
                    color="secondary"
                    shape="rounded"
                    width={20}
                    showBorder={false}
                >
                    <Icon name="filter" className="my-2" />
                </Badge>
            )}
            {renderRow(
                "Size medium Position: top-right Variant: label",
                <Badge
                    size="xx-large"
                    position="top-right"
                    variant="label"
                    shape="pill"
                    label="+9"
                    color="secondary"
                    width={25}
                >
                    <Icon name="filter" className="my-2" />
                </Badge>
            )}
            <Text className="label font-weight-bold">Icon</Text>
            {renderRow(
                "Pressable Icon",
                <Icon
                    name="bag-check-outline"
                    type="ionicon"
                    onPress={() => {}}
                    size={25}
                />
            )}
            {renderRow(
                "Progress Bar",
                <ProgressBar
                    trailColor={"#252525" as any}
                    size="x-large"
                    height={15}
                    percent={0.25}
                    rounded={false}
                />
            )}
            {renderRow(
                "Check Box",
                <CheckBox checked size={40} iconSize={30} />
            )}
            {renderRow(
                "Check Box",
                <CheckBox pressEnable={false} disabled checked variant="radio" />
            )}
        </ScrollView>
    );
};

export default TestItems;
