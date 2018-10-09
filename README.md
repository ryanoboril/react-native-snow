# react-native-snow
Fullscreen snow overlay component for React Native.  This can be used in any
view (but should only be used in one place) and this will place a fullscreen
overlay of snow on your app, making it easy to apply and remove.

If you are enthusiastic about winter weather or the winter holiday season, you
can make your app festive very easily with this component!

# Usage
To use, install the npm module:
```
npm install --save react-native-snow
```

Then import the Snow component:
```
import Snow from 'react-native-snow';
```

Then add it anywhere in your JSX (you should only do this in one place!):
```
export default class App extends Component<{}> {
  render() {
    return (
      <View>
        ...
        <Snow />
        ...
      </View>
    );
  }
}
```

<img src="https://s3.amazonaws.com/react-native-snow-screenshots/android.png" width="250" height="444" /> <img src="https://s3.amazonaws.com/react-native-snow-screenshots/ios.png" width="250" height="444" />

# Props
```
Snow.propTypes = {
  // Specify color of snowflakes.
  snowflakesStyle: { color: 'blue' },
  // Specify amount of snowflakes present ('light', 'medium')
  snowfall: 'medium',
};
```

# Thanks

This is heavily inspired by [CSS Snowflakes](https://pajasevi.github.io/CSSnowflakes/) (it is basically a React Native port with some tweaks).

Many thanks to Pavel Ševčík ([@pajasevi](https://twitter.com/pajasevi)) for the inspiration!
