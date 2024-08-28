import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import {
  Text,
  ActivityIndicator,
  useTheme,
  Appbar,
} from "react-native-paper";
import { getFacts } from "../services/api";
import FilterModal from "../components/FilterModal";
import FactCards from "../components/FactCards";
import { useNavigation } from "@react-navigation/native";

import ScreenAppbar from "../components/ScreenAppbar";

const FactsScreen = ({ route }) => {
  const theme = useTheme();
  const selectedCategories = useSelector((state) =>
    state.reducer.filters ? state.reducer.filters.selectedCategories : []
  );
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const fetchFacts = async () => {
      try {
        const response = await getFacts({ selectedCategories });
        const data = response.data;
        setFacts(data);
      } catch (err) {
        setError("Failed to load facts: " + err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };
    fetchFacts();
  }, [selectedCategories]);

  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ScreenAppbar title="Facts" />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} size="large" />
          </View>
        ) : (
          <FactCards facts={facts} />
        )}

        {/* <FactCards facts={facts} /> */}

        <FilterModal
          visible={filterModalVisible}
          onDismiss={toggleFilterModal}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  factItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "start",
    alignItems: "center",
  },
});

export default FactsScreen;
