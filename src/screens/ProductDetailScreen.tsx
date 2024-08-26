import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
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
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      const data = await response.json();
      console.log("data", data);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!product) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText>Loading...</StyledText>
      </StyledView>
    );
  }

  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <StyledView className="flex-row">
        {[...Array(fullStars)].map((_, i) => (
          <Ionicons key={`full-${i}`} name="star" size={16} color="#FFD700" />
        ))}
        {halfStar && <Ionicons name="star-half" size={16} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Ionicons
            key={`empty-${i}`}
            name="star-outline"
            size={16}
            color="#FFD700"
          />
        ))}
      </StyledView>
    );
  };

  return (
    <StyledView
      className="mb-3 bg-neutral-300"
      style={{ paddingTop: insets.top }}
    >
      <StyledView className="flex-row mb-5 align-middle justify-center">
        <StyledTouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-neutral-200 rounded-full justify-center items-center ml-4"
        >
          <Ionicons name="arrow-back" size={24} color="#2196f3" />
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="w-10 h-10 bg-neutral-200 rounded-full justify-center items-center ml-52">
          <Ionicons name="heart-circle-outline" size={24} color="red" />
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="w-10 h-10 bg-neutral-200 rounded-full justify-center items-center ml-8">
          <Ionicons name="share" size={24} color="#2196f3" />
        </StyledTouchableOpacity>
      </StyledView>

      <StyledImage
        source={{ uri: product.image }}
        className="w-full h-80 mb-4 rounded"
        resizeMode="contain"
      />
      <StyledScrollView className="bg-white p-4 h-full rounded-t-xl">
        <StyledText className="text-2xl font-bold text-neutral-800 mb-2">
          {product.title}
        </StyledText>

        <StyledText className="text-xl font-bold text-primary mb-2">
          ${product.price.toFixed(2)}
        </StyledText>
        <StyledView className="flex-row items-center mb-2">
          {renderStars(product.rating.rate)}
          <StyledText className="ml-2 text-neutral-600">
            ({product.rating.count} reviews)
          </StyledText>
        </StyledView>
        <StyledText className="text-neutral-600 mb-2">
          Category: {product.category}
        </StyledText>
        <StyledText className="text-neutral-600 mb-6">
          {product.description}
        </StyledText>
        <StyledTouchableOpacity
          className="bg-primary py-3 px-6 rounded-full"
          onPress={() => {
            // TODO: Implement add to cart functionality
            navigation.navigate("Cart");
          }}
        >
          <StyledText className="text-white text-center font-bold">
            Add to cart
          </StyledText>
        </StyledTouchableOpacity>
      </StyledScrollView>
    </StyledView>
  );
};

export default ProductDetailScreen;
