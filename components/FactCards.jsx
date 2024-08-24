import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { React, useState, useEffect } from "react";
import PagerView from "react-native-pager-view";
import { Avatar, Button, Card, Text, IconButton } from "react-native-paper";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
  </TouchableOpacity>
);

export default function FactCards({facts}) {
  const [factItems, setFactItems] = useState([]);

  useEffect(() => {
    setFactItems(facts);
  }, [facts]);

  const handlePageSelected = (state) => {
    //console.log(`Page ${state} selected`, state);
  };

  const handlePageScrollStateChanged = (state) => {
    // console.log(`Page scroll state changed to ${state}`, state);
  };

  const LeftContent = (props) => (
    <Avatar.Icon {...props} icon="head-question" />
  );

  return (
    <>
      {facts && facts.length > 0 && (
        <PagerView
          style={styles.container}
          initialPage={0}
          onPageSelected={handlePageSelected}
          onPageScrollStateChanged={handlePageScrollStateChanged}
        >
          {facts.map((item) => (
            <View style={styles.page} key={item.id}>
              <Card style={styles.card} elevation={1}>
                <Card.Title title={item.title} left={LeftContent} />
                <Card.Content style={{ flexGrow: 1, flexShrink: 1, height: "80%" }}>
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
    backgroundColor: "transparent",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    border: 1,
    borderColor: '#f9f9f9',
    bprderRadius: 5,
  },
});
