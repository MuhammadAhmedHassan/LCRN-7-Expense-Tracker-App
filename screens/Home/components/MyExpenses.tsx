import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';

const MyExpenses = () => {
  return (
    <View
      style={{
        marginHorizontal: SIZES.padding,
        marginTop: SIZES.padding,
        paddingBottom: SIZES.font,
      }}>
      <Text style={{...FONTS.h2, color: COLORS.primary}}>My Expenses</Text>
      <Text style={{...FONTS.h4, color: COLORS.darkgray}}>
        Summary (private)
      </Text>

      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.lightGray,
            borderRadius: 20,
          }}>
          <Image
            source={icons.calendar}
            resizeMode="contain"
            style={{width: 20, height: 20, tintColor: COLORS.lightBlue}}
          />
        </View>

        <View style={{marginLeft: SIZES.font}}>
          <Text style={{...FONTS.h3, color: COLORS.primary}}>07 Feb, 2019</Text>
          <Text style={{...FONTS.h4, color: COLORS.darkgray}}>
            18% more than last month
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MyExpenses;

const styles = StyleSheet.create({});
