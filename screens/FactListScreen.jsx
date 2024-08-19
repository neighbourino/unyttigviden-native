import { Button, SafeAreaView, Text,
  View,
  FlatList,
  StyleSheet,
  StatusBar, TouchableOpacity } from "react-native";
import AuthContext from "../contexts/AuthContext";
import { React, useContext, useEffect, useState } from "react";

import axios from "../utils/axios";



const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

export default function PostListScreen() {
    const [selectedId, setSelectedId] = useState();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios('/facts');
        setPosts(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


    const renderItem = ({item}) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        const color = item.id === selectedId ? 'white' : 'black';

        console.log('item', item);
        return (
        <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
            backgroundColor={backgroundColor}
            textColor={color}
        />
        );
    };


    console.log('posts', posts);

  
    return (
        <SafeAreaView>
            {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      { posts.data && posts.data.length > 0 && (
        <FlatList
        data={posts.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
      )}
            
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 14,
  },
});