import React, {memo} from 'react';
import {Image, View} from 'react-native';

export const Loader = memo(() => (
  <View style={{flex: 1, alignContent: 'stretch', justifyContent: 'center'}}>
    <Image
      style={{height: 30, width: 30, alignSelf: 'center'}}
      source={require('./assets/loader.gif')}
    />
  </View>
));
