import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { oneOf, shape, string } from 'prop-types';
import { lightSnowflakes, mediumSnowflakes } from '../config/snowflakeStrategies';
import Snowflake from './Snowflake';

const windowHeight = Dimensions.get('window').height + (Dimensions.get('window').height * .1);

export default class Snow extends Component {
  render() {
    const { snowfall, snowflakesStyle } = this.props;
    const snowflakes = snowfall === 'medium' ? mediumSnowflakes : lightSnowflakes;
    return (
      <View style={styles.view} pointerEvents="none">
        {
          snowflakes.map((snowflake, i) => {
            const { glyph, size, offset, fallDelay, shakeDelay } = snowflake;
            return (
              <Snowflake
                key={`snowflake-${i}`}
                glyph={glyph}
                size={size}
                offset={offset}
                fallDelay={fallDelay}
                shakeDelay={shakeDelay}
                style={snowflakesStyle}
              />
            );
          })
        }
      </View>
    );
  }
}

Snow.propTypes = {
  snowfall: oneOf(['light', 'medium']),
  snowflakesStyle: shape({
    color: string,
  }),
};

Snow.defaultProps = {
  snowfall: 'light',
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    zIndex: 9999,
    elevation: 9999,
    position: 'absolute',
    top: 0,
    left: -30,
    width: Dimensions.get('window').width + 30,
    height: windowHeight,
    backgroundColor: 'transparent'
  }
});
