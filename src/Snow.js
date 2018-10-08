import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { shape, string } from 'prop-types';
import Snowflake from './Snowflake';

const windowHeight = Dimensions.get('window').height + (Dimensions.get('window').height * .1);

export default class Snow extends Component {
  render() {
    const { snowflakesStyle } = this.props;
    return (
        <View style={styles.view} pointerEvents="none">
          <Snowflake glyph='❆' size={14} offset='1%' fallDelay={0} shakeDelay={0} style={snowflakesStyle} />
          <Snowflake glyph='❅' size={24} offset='5%' fallDelay={1000} shakeDelay={1000} style={snowflakesStyle} />
          <Snowflake glyph='❆' size={14} offset='10%' fallDelay={6000} shakeDelay={500} style={snowflakesStyle} />
          <Snowflake glyph='❅' size={18} offset='15%' fallDelay={4000} shakeDelay={2000} style={snowflakesStyle} />
          <Snowflake glyph='❆' size={14} offset='20%' fallDelay={2000} shakeDelay={2000} style={snowflakesStyle} />
          <Snowflake glyph='❆' size={24} offset='25%' fallDelay={8000} shakeDelay={3000} style={snowflakesStyle} />
          <Snowflake glyph='❆' size={14} offset='30%' fallDelay={6000} shakeDelay={2000} style={snowflakesStyle} />
          <Snowflake glyph='❅' size={18} offset='35%' fallDelay={2500} shakeDelay={1000} style={snowflakesStyle} />
          <Snowflake glyph='❆' size={14} offset='40%' fallDelay={3000} shakeDelay={1500} style={snowflakesStyle} />
        </View>
    );
  }
}

Snow.propTypes = {
  snowflakesStyle: shape({
    color: string,
  }),
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
