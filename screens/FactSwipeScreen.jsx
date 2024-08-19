import { Button, SafeAreaView, Text,
  View,
  FlatList,
  StyleSheet,
  StatusBar, TouchableOpacity } from "react-native";
import AuthContext from "../contexts/AuthContext";
import { React, useContext, useEffect, useState } from "react";
import PagerView from 'react-native-pager-view';
import axios from "../utils/axios";



const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
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

  
    return (
      <>
       {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      { posts.data && posts.data.length > 0 && (
        <PagerView style={styles.container} initialPage={0}>

          {posts.data.map((item) => 
            <View style={styles.page} key={item.id}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.content}</Text>
        </View>
            )}
        
      </PagerView>
      )}
      </>
      
       
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    marginTop: 20,
    borderRadius: 10,
    dropShadowColor: '#000',
    dropShadowOffset: { width: 0, height: 2 },
    dropShadowRadius: 10,
    borderWidth: 1,
      borderColor: '#eee',
  },
});