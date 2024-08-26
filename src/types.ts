import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: number };
  Cart: undefined;
};

export type ProductListScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductList'>;
export type ProductDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;
export type CartScreenProps = NativeStackScreenProps<RootStackParamList, 'Cart'>;