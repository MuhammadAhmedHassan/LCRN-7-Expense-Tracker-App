import {StackNavigationProp} from '@react-navigation/stack';

export type HomeProductType = {
  productId: number;
  productName: string;
  price: number;
  image: ImageSourcePropType;
};
export type RootStackParamList = {
  Home: undefined;
  ItemDetail: {
    item: HomeProductType;
  };
};
export type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type ItemDetailsScreenProp = StackNavigationProp<
  RootStackParamList,
  'ItemDetail'
>;