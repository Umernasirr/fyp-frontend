import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import Theme from '../../helper/theme';
import Style from './PopupStyle';

class Popup extends Component {
  static popupInstance;

  static show({ ...config }) {
    this.popupInstance.start(config);
  }

  static hide() {
    this.popupInstance.hidePopup();
  }

  state = {
    isVisible: false,
  };

  start({ ...config }) {
    this.setState({
      isVisible: true,
      type: config.type,
      text: config.text,
      progressBar: config.progressBar,
      actions: config.actions || [],
      callback: config.callback ? config.callback : this.defaultCallback(),
      timing: config.timing,
      autoClose: config.autoClose || false,
    });

    if (config.autoClose && config.timing !== 0) {
      const duration = config.timing > 0 ? config.timing : 3000;
      setTimeout(() => {
        this.hidePopup();
        this.state.callback && this.state.callback();
      }, duration);
    }
  }

  hidePopup() {
    this.setState({ isVisible: false });
  }

  defaultCallback() {
    return this.hidePopup();
  }

  handleImage(type) {
    switch (type) {
      case 'Logo':
        return require('../../assets/icons/logo-icon.png');
      case 'Success':
        return require('../../assets/icons/ico_checkBox_on_dark.png');
      case 'Info':
        return require('../../assets/icons/info.png');
      case 'Danger':
        return require('../../assets/icons/cross_icon_red.png');
      case 'Warning':
        return require('../../assets/icons/cross_icon_red.png');
      case 'GPS':
        return require('../../assets/icons/marker1.png');
    }
  }

  render() {
    const { type, text, progressBar, actions } = this.state;
    return (
      <Modal isVisible={this.state.isVisible}>
        <View ref={(c) => (this._root = c)} style={Style.container}>
          <View style={Style.message}>
            <View style={Style.imageContainer}>
              {type ? (
                <Image
                  source={this.handleImage(type)}
                  resizeMode="contain"
                  style={type === 'Logo' ? Style.logoIcon : Style.image}
                />
              ) : null}
              {progressBar && (<View>
                <ActivityIndicator style={Style.loader} animating={true} size={80} color={Theme.colors.primary} />
                <Text>Please wait...</Text>
              </View>)}
            </View>
            <View style={Style.content}>
              <Text style={[Style.text, !type && Style.text2]}>{text}</Text>
              {actions && actions.length ? (
                <View
                  style={[Style.buttons, !type && Style.buttonContainerStyle]}>
                  {actions.map((action, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[Style.button, !type && Style.buttonStyle]}
                        onPress={action.callback}>
                        <Text
                          style={[
                            Style.buttonText,
                            !type && Style.buttonTextStyle,
                          ]}>
                          {action.text}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default Popup;
