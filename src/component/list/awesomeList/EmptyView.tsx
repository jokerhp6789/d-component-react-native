/* eslint-disable react/sort-comp */
import PropTypes from "prop-types";
import React, { Component } from "react";
import { ActivityIndicator, ViewStyle } from "react-native";
import Text from "../../text/Text";
import TouchableOpacity from "../../view/TouchableOpacity";
import View from "../../view/View";
import AwesomeListMode from "./AwesomeListMode";
import AwesomeListStyle from "./AwesomeListStyle";

export interface IEmptyViewProps {
  mode?: any;
  renderEmptyView?: (props?: any) => Element;
  renderProgress?: (props?: any) => Element;
  renderErrorView?: (props?: any) => Element;
  renderFilterEmptyView?: (props?: any) => Element;
  retry?: (props?: any) => any;
  emptyText?: string;
  filterEmptyText?: string;
  style?: ViewStyle;
  styleErrorView?: ViewStyle;
  styleEmptyView?: ViewStyle;
}

// create a component
class EmptyView extends Component<IEmptyViewProps, any> {
  static propTypes = {
    mode: PropTypes.any,
    renderEmptyView: PropTypes.func,
    renderProgress: PropTypes.func,
    renderErrorView: PropTypes.func,
    retry: PropTypes.func,
    emptyText: PropTypes.string,
    filterEmptyText: PropTypes.string,
  };

  static defaultProps = {
    mode: AwesomeListMode.HIDDEN,
    renderEmptyView: null,
    renderProgress: null,
    renderErrorView: null,
    retry: null,
    emptyText: "No result",
    filterEmptyText: "No filter results",
  };

  /**
   * Should not be override this method
   */
  renderEmptyViewInternal() {
    if (this.props.mode !== AwesomeListMode.EMPTY) return null;
    return this.props.renderEmptyView
      ? this.props.renderEmptyView()
      : this.renderEmptyView();
  }

  /**
   * Should not be override this method
   */
  renderFilterEmptyViewInternal() {
    if (this.props.mode !== AwesomeListMode.FILTER_EMPTY) return null;
    return this.props.renderFilterEmptyView
      ? this.props.renderFilterEmptyView()
      : this.renderFilterEmptyView();
  }

  /**
   * Should not be override this method
   */
  renderProgressInternal() {
    if (this.props.mode === AwesomeListMode.PROGRESS) {
      if (!this.props.renderProgress) {
        return this.renderProgress();
      }
      return this.props.renderProgress();
    }
    return null;
  }

  retryInternal() {
    if (this.props.retry) {
      this.props.retry();
    }
  }

  /**
   * Should not be override this method
   */
  renderErrorViewInternal() {
    if (this.props.mode === AwesomeListMode.ERROR) {
      if (!this.props.renderErrorView) {
        return this.renderErrorView();
      }
      return this.props.renderErrorView();
    }
    return null;
  }

  /**
   * Override incase build another EmptyView in whole system
   * Incase change only few cases, we should use props.renderEmptyView
   */
  renderEmptyView() {
    const { styleEmptyView } = this.props;
    return (
      <Text style={[AwesomeListStyle.textEmpty, styleEmptyView]}>
        {this.props.emptyText}
      </Text>
    );
  }

  /**
   * Override incase build another EmptyView in whole system
   * Incase change only few cases, we should use props.renderFilterEmptyView
   */
  renderFilterEmptyView() {
    return (
      <Text style={AwesomeListStyle.textEmpty}>
        {this.props.filterEmptyText}
      </Text>
    );
  }

  /**
   * Override incase build another EmptyView in whole system
   * Incase change only few cases, we should use props.renderProgress
   */
  renderProgress = () => {
    return <ActivityIndicator />;
  };

  /**
   * Override incase build another EmptyView in whole system
   * Incase change only few cases, we should use props.renderErrorView
   */
  renderErrorView() {
    const { styleErrorView } = this.props;
    return (
      <View style={styleErrorView}>
        <Text style={AwesomeListStyle.textError}>No result</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.retryInternal()}
          style={AwesomeListStyle.buttonRetry}
        >
          <Text style={AwesomeListStyle.textButtonRetry}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { style } = this.props;
    // If mode not set or hidden do not render EmptyView
    if (!this.props.mode || this.props.mode === AwesomeListMode.HIDDEN) {
      return null;
    }
    // Render EmptyView coresponds with it's mode
    return (
      // pointerEvents to prevent touch to EmptyView and pass through to under component.
      // But still accept its children view receive touch.
      <View
        style={[AwesomeListStyle.emptyContainer, style]}
        pointerEvents="box-none"
      >
        {this.renderEmptyViewInternal()}
        {this.renderErrorViewInternal()}
        {this.renderProgressInternal()}
        {this.renderFilterEmptyViewInternal()}
      </View>
    );
  }
}

export default EmptyView;
