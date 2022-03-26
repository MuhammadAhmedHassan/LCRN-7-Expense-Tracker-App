import {
  Animated,
  FlatList,
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../../../constants';
import {VictoryPie} from 'victory-native';
import {Svg} from 'react-native-svg';

type CategoryType = 'List' | 'Chart';

const CategoriesSection = () => {
  const [selectedCategoryType, setSelectedCategoryType] =
    useState<CategoryType>('List');
  const [categories, setCategories] = useState(dummyData.categoriesData);
  const [selectedCategory, setSelectedCategory] = useState<ListItemType>(
    categories[0],
  );

  const isList = selectedCategoryType === 'List';
  return (
    <View>
      <CategoryHeader
        selected={selectedCategoryType}
        setSelected={setSelectedCategoryType}
      />

      {!isList && (
        <RenderChart
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {isList && (
        <RenderList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
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

interface IRenderList {
  categories: typeof dummyData.categoriesData;
  selectedCategory: ListItemType;
  setSelectedCategory: (item: ListItemType) => void;
}

const RenderList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: IRenderList) => {
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

interface IRenderChart {
  categories: typeof dummyData.categoriesData;
  selectedCategory: ListItemType;
  setSelectedCategory: (item: ListItemType) => void;
}

const RenderChart = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}: IRenderChart) => {
  const isIOS = Platform.OS === 'ios';
  const setSelectCategoryByName = (name: string) => {
    let category = categories.find(a => a.name == name);
    if (category) setSelectedCategory(category);
  };
  const processChartData = () => {
    const chartData = dummyData.categoriesData.map(item => {
      const confirmExpenses = item.expenses.filter(
        a => a.status === dummyData.confirmStatus,
      );
      const total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);

      return {
        name: item.name,
        y: total,
        expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
      };
    });

    // filter out categories with no data/expenses
    const filterChartData = chartData.filter(a => a.y > 0);

    // Calculate the total expenses
    const totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate chart data
    const finalChartData = filterChartData.map(item => {
      const percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        ...item,
      };
    });

    return finalChartData;
  };

  const chartData = processChartData();
  const colorScales = chartData.map(item => item.color);
  const totalExpenseCount = chartData.reduce(
    (a, b) => a + (b.expenseCount || 0),
    0,
  );

  console.log('check chart data');
  console.log(chartData);

  const getPieChar = () => {
    return (
      <VictoryPie
        data={chartData}
        labels={datum => `${datum.y}`}
        radius={({datum}) =>
          selectedCategory.name === datum.name
            ? SIZES.width * 0.4
            : SIZES.width * 0.4 - 10
        }
        innerRadius={70}
        labelRadius={({innerRadius}) => {
          if (typeof innerRadius === 'number')
            return (SIZES.width * 0.4 + innerRadius) / 2.5;
          return (SIZES.width * 0.4 + 0) / 2.5;
        }}
        style={{
          labels: {fill: 'white', ...FONTS.body3},
          parent: {
            boxShadow: '2px 2px 3.84px rgba(0, 0, 0, .25)',
          },
        }}
        width={SIZES.width * 0.8}
        height={SIZES.width * 0.8}
        colorScale={colorScales}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onPress: () => {
                return [
                  {
                    target: 'labels',
                    mutation: props => {
                      let categoryName = chartData[props.index].name;
                      setSelectCategoryByName(categoryName);
                    },
                  },
                ];
              },
            },
          },
        ]}
      />
    );
  };

  return (
    <View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {getPieChar()}
        {/* {isIOS ? (
        getPieChar()
      ) : (
        <Svg
          width={SIZES.width}
          // height={SIZES.width}
          style={{}}>
          {getPieChar()}
        </Svg>
      )} */}
        <View style={{position: 'absolute', top: '42%', left: '42%'}}>
          <Text style={{...FONTS.h1, textAlign: 'center'}}>
            {totalExpenseCount}
          </Text>
          <Text style={{...FONTS.body3, textAlign: 'center'}}>Expenses</Text>
        </View>
      </View>

      <View style={{padding: SIZES.padding}}>
        <FlatList
          scrollEnabled={false}
          pagingEnabled={false}
          data={chartData}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 40,
                paddingHorizontal: SIZES.radius,
                borderRadius: 10,
                backgroundColor:
                  selectedCategory && selectedCategory.name == item.name
                    ? item.color
                    : COLORS.white,
              }}
              onPress={() => {
                let categoryName = item.name;
                setSelectCategoryByName(categoryName);
              }}>
              {/* Name/Category */}
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor:
                      selectedCategory && selectedCategory.name == item.name
                        ? COLORS.white
                        : item.color,
                    borderRadius: 5,
                  }}
                />

                <Text
                  style={{
                    marginLeft: SIZES.base,
                    color:
                      selectedCategory && selectedCategory.name == item.name
                        ? COLORS.white
                        : COLORS.primary,
                    ...FONTS.h3,
                  }}>
                  {item.name}
                </Text>
              </View>

              {/* Expenses */}
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    color:
                      selectedCategory && selectedCategory.name == item.name
                        ? COLORS.white
                        : COLORS.primary,
                    ...FONTS.h3,
                  }}>
                  {item.y} USD - {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    </View>
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
