import {
  Animated,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../../../constants';
import {VictoryPie} from 'victory-native';

type CategoryType = 'List' | 'Chart';

const CategoriesSection = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('List');

  const isList = selectedCategory === 'List';
  return (
    <View>
      <CategoryHeader
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />

      {!isList && <RenderChart />}
      {isList && <RenderList />}
    </View>
  );
};

export default CategoriesSection;

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
interface IExpensesSection {
  selectedCategory: ListItemType;
}
const ExpensesSection = ({selectedCategory}: IExpensesSection) => {
  const {expenses, icon} = selectedCategory;
  const expensesLength = expenses.length;
  const [incomingExpenses, setIncomingExpenses] = useState(
    expenses.filter(exp => exp.status === dummyData.pendingStatus) || [],
  );

  useEffect(() => {
    setIncomingExpenses(
      expenses.filter(exp => exp.status === dummyData.pendingStatus),
    );
  }, [expenses]);

  const incomingExpensesLength = incomingExpenses.length;

  return (
    <View>
      <View style={{marginTop: SIZES.font, marginHorizontal: SIZES.padding}}>
        <Text style={{...FONTS.h3, color: COLORS.primary}}>
          INCOMING EXPENSES
        </Text>
        <Text style={{...FONTS.h4, color: COLORS.darkgray}}>
          {expensesLength} total
        </Text>
      </View>

      {!!incomingExpensesLength && (
        <FlatList
          data={incomingExpenses}
          keyExtractor={item => `incoming-expenses-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginVertical: SIZES.font}}
          renderItem={({item, index}) => {
            const first = index === 0;
            const last = index === incomingExpensesLength - 1;
            return (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  minHeight: 250,
                  width: 320,
                  paddingTop: SIZES.font,
                  marginLeft: first ? SIZES.padding : 10,
                  marginRight: last ? SIZES.padding : 10,
                  justifyContent: 'space-between',
                  borderRadius: 20,
                  overflow: 'hidden',
                }}>
                <View style={{paddingHorizontal: SIZES.padding}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        backgroundColor: COLORS.lightGray,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={icon}
                        resizeMode="contain"
                        style={{
                          height: 30,
                          width: 30,
                          tintColor: COLORS.secondary,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        ...FONTS.h3,
                        color: COLORS.secondary,
                        marginLeft: SIZES.font,
                      }}>
                      {item.title}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: 4,
                    }}>
                    <Text style={{...FONTS.h2, color: COLORS.primary}}>
                      {item.title}
                    </Text>
                    <Text style={{...FONTS.body4, color: COLORS.darkgray}}>
                      {item.description}
                    </Text>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      paddingHorizontal: SIZES.padding,
                      marginTop: SIZES.base,
                    }}>
                    <Text style={{...FONTS.body4, color: COLORS.primary}}>
                      Location
                    </Text>
                    <Text style={{...FONTS.body4, color: COLORS.darkgray}}>
                      {item.location}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: COLORS.secondary,
                      paddingVertical: SIZES.font,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: SIZES.base,
                    }}>
                    <Text
                      style={{
                        ...FONTS.h4,
                        color: COLORS.white,
                      }}>
                      CONFIRM {item.total} USD
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

type ListItemType = typeof dummyData.categoriesData[0];

const RenderList = () => {
  const [categories, setCategories] = useState(dummyData.categoriesData);
  const [selectedCategory, setSelectedCategory] = useState<ListItemType>(
    categories[0],
  );
  const [showMoreToggle, setShowMoreToggle] = useState(false);
  const categoryListHeightAnimationValue = useRef(
    new Animated.Value(115),
  ).current;

  const renderItem = ({item, index}: {item: ListItemType; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item)}
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 5,
          paddingVertical: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <Image
          source={item.icon}
          style={{height: 20, width: 20, tintColor: item.color}}
        />
        <Text
          style={{marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={{marginHorizontal: SIZES.padding, marginTop: SIZES.radius}}>
        <Animated.View style={{height: categoryListHeightAnimationValue}}>
          <FlatList
            data={categories}
            scrollEnabled={false}
            keyExtractor={item => `list-item-${item.id}`}
            numColumns={2}
            renderItem={renderItem}
          />
        </Animated.View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginVertical: SIZES.base,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (showMoreToggle) {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 115,
                duration: 500,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 172.5,
                duration: 500,
                useNativeDriver: false,
              }).start();
            }
            setShowMoreToggle(ps => !ps);
          }}>
          <Text style={{...FONTS.body4}}>
            {showMoreToggle ? 'LESS' : 'MORE'}
          </Text>
          <Image
            source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
            style={{marginLeft: 5, width: 15, height: 15, alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
      <ExpensesSection selectedCategory={selectedCategory} />
    </View>
  );
};

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
