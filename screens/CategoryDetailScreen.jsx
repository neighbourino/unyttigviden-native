import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useTheme, Headline } from 'react-native-paper';
import { getCategoryDetail } from '../services/api';
import FactCards from '../components/FactCards';

const CategoryDetailScreen = ({ route }) => {
  const { categoryId } = route.params; // Get the category ID from navigation parameters
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        const response = await getCategoryDetail(categoryId);
        const data = response.data;
        setCategory(data);
      } catch (err) {
        setError('Failed to load category details: ' + (err.response?.data?.message || err.message));
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

      <View
        style={{
          marginBottom: 0,
          backgroundColor: theme.colors.primary,
          paddingTop: 30,
          paddingBottom: 30,
          borderRadius: 0,
        }}
      >
        <Headline
          style={{
            color: theme.colors.onPrimary,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {category.title}
        </Headline>
              <Text style={{
            color: theme.colors.onPrimary,
            fontWeight: "medium",
            textAlign: "center",
          }}>{category.description}</Text>
      </View>

      <FactCards facts={category.facts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default CategoryDetailScreen;