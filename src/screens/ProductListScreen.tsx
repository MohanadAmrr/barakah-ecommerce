import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
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

type Props = NativeStackScreenProps<RootStackParamList, "ProductList">;

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

// Add a mapping for category images
const categoryImages: { [key: string]: string } = {
  electronics: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  jewelery: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  "men's clothing":
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  "women's clothing": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
};

const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <StyledTouchableOpacity
      className="w-1/2 p-2 "
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: item.id })
      }
    >
      <StyledView className="bg-neutral-300 rounded-lg shadow p-4">
        <StyledImage
          source={{ uri: item.image }}
          className="w-full h-40 mb-2 rounded"
          resizeMode="contain"
        />
        <StyledText
          className="text-sm font-semibold mb-1 text-neutral-800"
          numberOfLines={2}
        >
          {item.title}
        </StyledText>
        <StyledText className="text-lg font-bold text-primary">
          ${item.price.toFixed(2)}
        </StyledText>
      </StyledView>
    </StyledTouchableOpacity>
  );

  const renderCategoryItem = (category: string) => (
    <StyledTouchableOpacity
      key={category}
      className={`mr-4 items-center mb-4 w-28 h-28 rounded-full bg-neutral-200 justify-center ${
        selectedCategory === category
          ? "border-2 border-primary"
          : "border-2 border-transparent"
      }`}
      onPress={() =>
        setSelectedCategory(category === selectedCategory ? null : category)
      }
    >
      <StyledImage
        source={{ uri: categoryImages[category] }}
        className="w-14 h-14"
        resizeMode="contain"
      />
      <StyledText className="text-xs w-20 text-center mt-1 text-neutral-600">
        {category}
      </StyledText>
    </StyledTouchableOpacity>
  );

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <StyledView className="bg-neutral-200 flex-1">
      <StyledView
        className="p-4 bg-white mb-3 rounded-b-2xl"
        style={{ paddingTop: insets.top }}
      >
        <StyledView className="flex-row justify-between items-center mb-4">
          <StyledView className="w-10 h-10 bg-neutral-200 rounded-full justify-center items-center">
            <Ionicons name="notifications-outline" size={24} color="#2196f3" />
          </StyledView>
          <StyledView className="flex-1 mx-2">
            <StyledText className="text-xs text-neutral-500 text-center">
              Delivery to
            </StyledText>
            <StyledText
              className="text-sm font-semibold text-neutral-800 text-center"
              numberOfLines={1}
            >
              82 High Street London
            </StyledText>
          </StyledView>
          <StyledView className="w-10 h-10 bg-neutral-200 rounded-full justify-center items-center">
            <Ionicons name="pricetag-outline" size={24} color="#2196f3" />
          </StyledView>
        </StyledView>
        <StyledView className="flex-row items-center bg-neutral-200 rounded-full p-4 mb-4 justify-center">
          <Ionicons
            name="search-outline"
            size={20}
            color="#9e9e9e"
            style={{ marginLeft: 8 }}
          />
          <StyledText className="text-neutral-400 ml-2">
            Search the entire shop
          </StyledText>
        </StyledView>
      </StyledView>
      <StyledView className="p-4 bg-white mt-3 rounded-t-2xl flex-1">
        <StyledScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pb-10 mb-4"
        >
          {categories.map(renderCategoryItem)}
        </StyledScrollView>
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 8 }}
        />
      </StyledView>
    </StyledView>
  );
};

export default ProductListScreen;
