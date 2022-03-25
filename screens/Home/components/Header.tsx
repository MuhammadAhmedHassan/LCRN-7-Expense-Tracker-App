import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, icons, SIZES} from '../../../constants';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  const renderIcon = (icon: ImageSourcePropType, onPress?: () => void) => (
    <TouchableOpacity
      onPress={() => {
        // As we've only one screen
        // onPress && onPress()
      }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{height: 20, width: 20, tintColor: COLORS.primary}}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: SIZES.padding,
        marginTop: SIZES.padding,
      }}>
      {renderIcon(icons.back_arrow, navigation.goBack)}
      {renderIcon(icons.more)}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
