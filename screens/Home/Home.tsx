import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import {CategoriesSection, Header, MyExpenses} from './components';
import {COLORS} from '../../constants';

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={{backgroundColor: COLORS.white, ...styles.shadow}}>
          <Header />
          <MyExpenses />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.lightGray,
          }}>
          <CategoriesSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
