import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

type CartItem = {
  productId: number;
  quantity: number;
};

type Cart = {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
};

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchCart();
    fetchProducts();
  }, []);

  const fetchCart = async () => {
    try {
      // For this example, we're fetching a single cart (ID: 1)
      const response = await fetch("https://fakestoreapi.com/carts/1");
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProductDetails = (productId: number) => {
    return products.find((product) => product.id === productId);
  };

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const product = getProductDetails(item.productId);
    if (!product) return null;

    return (
      <StyledView className="flex-row items-center bg-white p-4 mb-2 rounded-lg">
        <StyledImage
          source={{ uri: product.image }}
          className="w-20 h-20 mr-4"
          resizeMode="contain"
        />
        <StyledView className="flex-1">
          <StyledText
            className="font-semibold text-neutral-800 mb-1"
            numberOfLines={2}
          >
            {product.title}
          </StyledText>
          <StyledText className="text-primary font-bold">
            ${product.price.toFixed(2)}
          </StyledText>
        </StyledView>
        <StyledView className="flex-row items-center">
          <StyledTouchableOpacity className="bg-neutral-200 p-2 rounded">
            <StyledText>-</StyledText>
          </StyledTouchableOpacity>
          <StyledText className="mx-2">{item.quantity}</StyledText>
          <StyledTouchableOpacity className="bg-neutral-200 p-2 rounded">
            <StyledText>+</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    );
  };

  const calculateTotal = () => {
    if (!cart) return 0;
    return cart.products.reduce((total, item) => {
      const product = getProductDetails(item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  if (isLoading) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </StyledView>
    );
  }

  return (
    <StyledView
      className="flex-1 bg-neutral-300"
      style={{ paddingTop: insets.top }}
    >
      <StyledView className="flex-row mb-5 align-middle justify-between px-4">
        <StyledTouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-neutral-200 rounded-full justify-center items-center"
        >
          <Ionicons name="arrow-back" size={24} color="#2196f3" />
        </StyledTouchableOpacity>
        <StyledText className="text-2xl font-bold text-primary self-center">
          Your Cart
        </StyledText>
        <StyledView className="w-10 h-10" />
      </StyledView>

      <StyledScrollView className="bg-white p-4 rounded-t-xl flex-1">
        {cart && cart.products.length > 0 ? (
          <>
            <FlatList
              data={cart.products}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.productId.toString()}
              scrollEnabled={false}
            />
            <StyledView className="mt-4 border-t border-neutral-200 pt-4">
              <StyledText className="text-xl font-bold text-neutral-800 mb-2">
                Total: ${calculateTotal().toFixed(2)}
              </StyledText>
              <StyledTouchableOpacity
                className="bg-primary py-3 px-6 rounded-full"
                onPress={() => {
                  // TODO: Implement checkout functionality
                  console.log("Proceed to checkout");
                }}
              >
                <StyledText className="text-white text-center font-bold">
                  Checkout
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </>
        ) : (
          <StyledText className="text-center text-neutral-500 mt-4">
            Your cart is empty
          </StyledText>
        )}
      </StyledScrollView>
    </StyledView>
  );
};

export default CartScreen;
