import React from "react";
import {
    TabBar as RNTabBar,
    TabViewProps,
    TabBarProps,
} from "react-native-tab-view";
import { getStyleProps } from "../../style/style";

export interface ITabBarComponentProps extends TabBarProps<any> {
    className?: string;
    classNameTab?: string;
}

const TabBarComponent: React.FC<ITabBarComponentProps> = ({
    style,
    tabStyle,
    ...rest
}) => {
    const transStyle = getStyleProps(rest);
    const transTabStyle = getStyleProps(rest, "classNameTab");
    return (
        <RNTabBar
            style={[transStyle, style]}
            tabStyle={[transTabStyle, tabStyle]}
            {...rest}
        />
    );
};

export default TabBarComponent;
