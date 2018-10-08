import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { oneOf, shape, string } from 'prop-types';
import Snowflake from './Snowflake';

const windowHeight = Dimensions.get('window').height + (Dimensions.get('window').height * .1);

const lightSnowflakes = [
  { size: 14, offset: '1%', fallDelay: 0, shakeDelay: 0, }, { size: 24, offset: '5%', fallDelay: 1000, shakeDelay: 1000, },
  { size: 14, offset: '10%', fallDelay: 6000, shakeDelay: 500, }, { size: 18, offset: '15%', fallDelay: 4000, shakeDelay: 2000, },
  { size: 14, offset: '20%', fallDelay: 2000, shakeDelay: 2000, }, { size: 24, offset: '25%', fallDelay: 8000, shakeDelay: 3000, },
  { size: 14, offset: '30%', fallDelay: 6000, shakeDelay: 2000, }, { size: 18, offset: '35%', fallDelay: 2500, shakeDelay: 1000, },
  { size: 14, offset: '40%', fallDelay: 3000, shakeDelay: 1500, },
];

const mediumSnowflakes = [
  { size: 14, offset: '1%', fallDelay: 0, shakeDelay: 0, }, { size: 24, offset: '5%', fallDelay: 1000, shakeDelay: 1000, },
  { size: 14, offset: '10%', fallDelay: 6000, shakeDelay: 500, }, { size: 18, offset: '15%', fallDelay: 4000, shakeDelay: 2000, },
  { size: 14, offset: '20%', fallDelay: 2000, shakeDelay: 2000, }, { size: 24, offset: '25%', fallDelay: 8400, shakeDelay: 3000, },
  { size: 14, offset: '30%', fallDelay: 6000, shakeDelay: 2000, }, { size: 18, offset: '35%', fallDelay: 2500, shakeDelay: 1000, },
  { size: 14, offset: '40%', fallDelay: 3000, shakeDelay: 1500, }, { size: 24, offset: '7%', fallDelay: 600, shakeDelay: 500 },
  { size: 18, offset: '22%', fallDelay: 1700, shakeDelay: 1700 }, { size: 18, offset: '34%', fallDelay: 3350, shakeDelay: 3000 },
  { size: 24, offset: '13%', fallDelay: 4300, shakeDelay: 4000 }, { size: 16, offset: '22%', fallDelay: 4760, shakeDelay: 1500 },
  { size: 16, offset: '27%', fallDelay: 6100, shakeDelay: 900 }, { size: 16, offset: '38%', fallDelay: 7800, shakeDelay: 2500 },
];

export default class Snow extends Component {
  render() {
    const { snowfall, snowflakesStyle } = this.props;
    const snowflakes = snowfall === 'medium' ? mediumSnowflakes : lightSnowflakes;
    return (
      <View style={styles.view} pointerEvents="none">
        {
          snowflakes.map((snowflake, i) => {
            const { size, offset, fallDelay, shakeDelay } = snowflake;
            return (
              <Snowflake
                key={`snowflake-${i}`}
                glyph='❆'
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
