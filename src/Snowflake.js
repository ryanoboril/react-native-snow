import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types';

const windowHeight = Dimensions.get('window').height + (Dimensions.get('window').height * .1);

export default class Snowflake extends Component {
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
    };
  }

  componentDidMount() {
    setTimeout( () => {
      Animated.loop(
        Animated.timing(
          this.state.translateY,
          {
            toValue: 1,
            easing: Easing.linear,
            duration: this.state.fallDuration,
            useNativeDriver: true,
          }
        )
      ).start();
    }, this.state.fallDelay);

    setTimeout( () => {
      Animated.loop(
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
      ).start();
    }, this.state.shakeDelay);
  }

  render() {
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
      }]}>
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
};

const styles = StyleSheet.create({
  text: {
    top: '-10%',
    height: windowHeight,
    color: 'white',
    backgroundColor: 'transparent',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  }
});
