import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { React, useContext, useEffect, useState } from "react";
import PagerView from "react-native-pager-view";
import axios from "../utils/axios";
import { Avatar, Card, Text, IconButton } from "react-native-paper";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
  </TouchableOpacity>
);

export default function FactSwipeScreen() {
  const [selectedId, setSelectedId] = useState();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios("/facts");
        setPosts(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageSelected = (state) => {
    //console.log(`Page ${state} selected`, state);
  };

  const handlePageScrollStateChanged = (state) => {
    // console.log(`Page scroll state changed to ${state}`, state);
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    console.log("item", item);
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const LeftContent = (props) => (
    <Avatar.Icon {...props} icon="head-question" />
  );

  return (
    <>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {posts.data && posts.data.length > 0 && (
        <PagerView
          style={styles.container}
          initialPage={0}
          onPageSelected={handlePageSelected}
          onPageScrollStateChanged={handlePageScrollStateChanged}
        >
          {posts.data.map((item) => (
            <View style={styles.page} key={item.id}>
              <Card style={styles.card}>
                <Card.Title title={item.title} left={LeftContent} />
                <Card.Content style={{ flexGrow: 1, height: "80%" }}>
                  <Text style={{ fontSize: 16, lineHeight: 24 }}>
                    {item.content}
                  </Text>
                </Card.Content>
                <Card.Actions>
                  <IconButton icon="thumb-up" mode="contained" onPress={() => console.log('Thumb Up') } />
                    <IconButton icon="thumb-down" mode="contained" onPress={() => console.log('Thumb Down') } />
                  <IconButton icon="bookmark-outline" mode="contained" onPress={() => console.log('Bookmark Toggle') } />
                </Card.Actions>
              </Card>
            </View>
          ))}
        </PagerView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    marginTop: 20,
  },
  card: {
    flex: 1,
  },
});
