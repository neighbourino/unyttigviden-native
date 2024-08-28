import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useTheme, Headline, Appbar } from "react-native-paper";
import { getCategoryDetail } from "../services/api";
import FactCards from "../components/FactCards";
import { useNavigation } from "@react-navigation/native";
import { getHeaderTitle } from "@react-navigation/elements";

const CategoryDetailScreen = ({ navigation, route, options, back }) => {
  const { categoryId } = route.params; // Get the category ID from navigation parameters
  const [category, setCategory] = useState(null);
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        const response = await getCategoryDetail(categoryId);
        const data = response.data;
        setCategory(data);
        setFacts(data.facts);
      } catch (err) {
        setError(
          "Failed to load category details: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetail();
  }, [categoryId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </View>
    );
  }

  if (!category) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No details available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("Categories")} />
        <Appbar.Content title={category.title} />
      </Appbar.Header>
      <View
        style={{
          marginBottom: 0,
          backgroundColor: theme.colors.primary,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 0,
        }}
      >
        <Text
          style={{
            color: theme.colors.onPrimary,
            fontWeight: "medium",
            textAlign: "center",
          }}
        >
          {category.description}
        </Text>
      </View>

      <FactCards facts={facts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
});

export default CategoryDetailScreen;
