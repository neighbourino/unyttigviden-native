import {
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { React, useState, useEffect } from "react";
import PagerView from "react-native-pager-view";
import { Avatar, Button, Card, Text, IconButton, useTheme } from "react-native-paper";
import FactCard from "./FactCard";

export default function FactCards({facts}) {
  const theme = useTheme();
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


  return (
    <>
      {factItems && factItems.length > 0 && (
        <PagerView
          style={styles.container}
          initialPage={0}
          onPageSelected={handlePageSelected}
          onPageScrollStateChanged={handlePageScrollStateChanged}
        >
          {factItems.map((item) => (
            <View style={styles.item} key={item.id}>
              <FactCard item={item} />
            </View>
          ))}
        </PagerView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    flex: 1,
  }
});