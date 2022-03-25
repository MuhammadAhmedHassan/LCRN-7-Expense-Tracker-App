import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';
import {VictoryPie} from 'victory-native';

type CategoryType = 'List' | 'Chart';

const CategoriesSection = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('Chart');

  const isList = selectedCategory === 'List';
  return (
    <View>
      <CategoryHeader
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />

      {!isList && <RenderChart />}
      <Text>CategoriesSection</Text>
    </View>
  );
};

export default CategoriesSection;

const styles = StyleSheet.create({});

const RenderChart = () => {
  return (
    <VictoryPie
      padAngle={({datum}) => datum.y}
      innerRadius={100}
      data={[
        {x: 1, y: 2, label: 'one'},
        {x: 2, y: 3, label: 'two'},
        {x: 3, y: 5, label: 'three'},
      ]}
    />
  );
};

interface ICategoryHeader {
  selected: CategoryType;
  setSelected: (type: CategoryType) => void;
}

const CategoryHeader = ({selected, setSelected}: ICategoryHeader) => {
  const isList = selected === 'List';
  const renderIcon = (
    icon: ImageSourcePropType,
    selectedIcon: boolean,
    type: CategoryType,
  ) => (
    <TouchableOpacity
      onPress={() => setSelected(type)}
      style={{
        height: 40,
        width: 40,
        backgroundColor: selectedIcon ? COLORS.secondary : COLORS.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginLeft: SIZES.font,
      }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          height: 20,
          width: 20,
          tintColor: selectedIcon ? COLORS.white : COLORS.gray,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
      }}>
      <View>
        <Text style={{...FONTS.h3, color: COLORS.primary}}>My Expenses</Text>
        <Text style={{...FONTS.h4, color: COLORS.darkgray}}>
          Summary (private)
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {renderIcon(icons.chart, !isList, 'Chart')}
        {renderIcon(icons.menu, isList, 'List')}
      </View>
    </View>
  );
};
