import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  AppState
} from 'react-native';
import PropTypes, { shape } from 'prop-types';

const topOffset = Dimensions.get('window').height * .1;
const windowHeight = Dimensions.get('window').height + topOffset;

export default class Snowflake extends Component {

  _fallAnimation = null;
  _shakeAnimation = null;

  constructor(props) {
    super(props);

    this.state = {
      glyph: props.glyph || '❅',
      visible: props.visible || false,
      size: props.size || 12,
      amplitude: props.amplitude || 60, //80,
      fallDuration: props.fallDuration || 10000,
      shakeDuration: props.shakeDuration || 4000,
      fallDelay: props.fallDelay || 0,
      shakeDelay: props.shakeDelay || 0,
      offset: props.offset || 0,
      translateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
      appState: AppState.currentState,
    };
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      // App is coming into foreground
      this._initAnimation();
    }
    if (this.state.appState.match(/^active|foreground/) && nextAppState === 'inactive') {
      // App is going into background
      this._stopAnimation();
    }
    this.setState({appState: nextAppState});
  }

  _stopAnimation() {
    if (this._fallAnimation) {
      this._fallAnimation.stop();
      this._fallAnimation = null;
      this.setState({
        translateY: new Animated.Value(0),
      });
    }

    if (this._shakeAnimation) {
      this._shakeAnimation.stop();
      this._shakeAnimation = null;
      this.setState({
        translateX: new Animated.Value(0),
      });
    }
  }

  _initAnimation() {
    this._fallAnimation = Animated.loop(
      Animated.timing(
        this.state.translateY,
        {
          toValue: 1,
          easing: Easing.linear,
          duration: this.state.fallDuration,
          useNativeDriver: true,
        }
      )
    );

    this._shakeAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.translateX,
          {
            toValue: 1,
            easing: Easing.easeInOutSine,
            duration: this.state.shakeDuration / 2,
            useNativeDriver: true,
          }
        ),
        Animated.timing(
          this.state.translateX,
          {
            toValue: 0,
            easing: Easing.easeInOutSine,
            duration: this.state.shakeDuration / 2,
            useNativeDriver: true,
          }
        )
      ])
    );

    setTimeout( () => {
      this._fallAnimation && this._fallAnimation.start();
    }, this.state.fallDelay);

    setTimeout( () => {
      this._shakeAnimation && this._shakeAnimation.start();
    }, this.state.shakeDelay);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this._initAnimation();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  render() {
    const { style } = this.props;
    const translateX = this.state.translateX.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.state.amplitude]
    });

    const translateY = this.state.translateY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, windowHeight]
    });

    return (
      <Animated.Text style={[styles.text, {
        fontSize: this.state.size,
        left: this.state.offset,
        transform: [{translateX}, {translateY}]
      }, style]}>
        {this.state.glyph}
      </Animated.Text>
    );
  }
}

Snowflake.propTypes = {
  glyph: PropTypes.string,
  visible: PropTypes.bool,
  size: PropTypes.number,
  offset: PropTypes.string,
  amplitude: PropTypes.number,
  fallDuration: PropTypes.number,
  shakeDuration: PropTypes.number,
  fallDelay: PropTypes.number,
  shakeDelay: PropTypes.number,
  style: shape({
    color: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  text: {
    top: -topOffset,
    height: windowHeight,
    color: 'white',
    backgroundColor: 'transparent',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  }
});
