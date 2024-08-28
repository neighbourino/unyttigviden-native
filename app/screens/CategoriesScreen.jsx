import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme, Text, Appbar } from "react-native-paper";
import CategoryTile from "../components/CategoryTile";
import { getCategories } from "../services/api";

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const data = response.data;

        setCategories(data);
      } catch (err) {
        setError(
          "Failed to load categories: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderItem = ({ item }) => (
    <CategoryTile
      category={item}
      onPress={() =>
        navigation.navigate("CategoryDetail", { categoryId: item.id })
      }
    />
  );

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

  return (
    <View style={styles.container}>
      <Appbar.Header>
        {/* Custom Drawer Icon */}
        <Appbar.Action
          icon="menu" // Replace with your custom icon name
          color={theme.colors.accent} // Custom color for the icon
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content title="Categories" />
      </Appbar.Header>

      <View style={styles.contentContainer}>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 10
  },
});

export default CategoriesScreen;
