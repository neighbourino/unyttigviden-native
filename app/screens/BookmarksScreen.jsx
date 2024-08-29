import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Text, ActivityIndicator, useTheme, Appbar } from "react-native-paper";
import { getBookmarks, getFacts } from "../services/api";
import FilterModal from "../components/FilterModal";
import FactCards from "../components/FactCards";
import { useNavigation } from "@react-navigation/native";

import ScreenAppbar from "../components/ScreenAppbar";
import FactModal from "../components/FactModal";

const BookmarksScreen = ({ route }) => {
  const theme = useTheme();
  const selectedCategories = useSelector((state) =>
    state.reducer.filters ? state.reducer.filters.selectedCategories : []
  );
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [factModalVisible, setFactModalVisible] = useState(false);
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [listView, setListView] = useState('list');

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
  </TouchableOpacity>
);

  useEffect(() => {
    setLoading(true);
    const fetchFacts = async () => {
      try {
        const response = await getBookmarks();
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
  }, []);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : theme.colors.background;
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => {
          // setSelectedId(item.id);
          setSelectedItem(item);
          setFactModalVisible(true);
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const toggleListView = () => {
    setListView(listView === 'list' ? 'cards' : 'list');
  };

  const toggleFactModal = () => {
    setFactModalVisible(!factModalVisible);
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
          <Appbar.Header>
          <Appbar.Action
            icon="menu" // Replace with your custom icon name
            color={theme.colors.accent} // Custom color for the icon
            onPress={() => navigation.toggleDrawer()}
          />
          <Appbar.Content title="Bogmærker" />
          <Appbar.Action icon={listView === 'list' ? 'view-list' : 'card-multiple'} onPress={toggleListView} />
        </Appbar.Header>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} size="large" />
          </View>
        ) : (
          <>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error.message}</Text>}
            {facts && facts.length > 0 && (
              
              <>

              {listView === 'list' && (<FlatList
                data={facts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
              />
              )} 
              {listView === 'cards' && (
                <FactCards facts={facts} />
              )}

              </>


            )} 
            {!facts || facts.length === 0 && (
              <Text style={{ flex: 1, textAlign: "center", padding: 20, justifyContent: "center" }}>
                Ingen bogmærker fundet
              </Text>
            )}

          </>
        )}

        {/* <FactCards facts={facts} /> */}

        <FactModal
          visible={factModalVisible}
          onDismiss={toggleFactModal}
          item={selectedItem}
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
    padding: 20,
    justifyContent: "start",
    alignItems: "center",
  },
  item: {
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f9f9f9',
    borderStyle: 'solid',
  },
  title: {
    fontSize: 14,
  },
});

export default BookmarksScreen;
