import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { React, useState, useEffect } from "react";
import { Avatar, Card, Text, IconButton, useTheme } from "react-native-paper";
import { upvoteFact, downvoteFact, unvoteFact } from '../services/api';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
  </TouchableOpacity>
);

export default function FactCard({item}) {
  const theme = useTheme();
  const [fact, setFact] = useState(null);
  const [voteStatus, setVoteStatus] = useState(item.user_vote);


  useEffect(() => {
    setFact(item);
  }, [item]);

  const LeftContent = (props) => (
    <Avatar.Icon {...props} icon="head-question" />
  );

  const handleUpvote = async (factId) => {
    try {
      const data = await upvoteFact(factId);
      // Update UI based on the response
      // For example, update the fact's vote count locally if needed
      // console.log('handleUpvote', data);
      setVoteStatus('upvoted');
    } catch (err) {
      console.error('Failed to upvote fact:', err);
    }
  };

  const handleDownvote = async (factId) => {
    try {
      const data = await downvoteFact(factId);
      setVoteStatus('downvoted');
      // Update UI based on the response
    } catch (err) {
      console.error('Failed to downvote fact:', err);
    }
  };

  const handleUnvote = async (factId) => {
    try {
      const data = await unvoteFact(factId);
      setVoteStatus(null);
      // Update UI based on the response
    } catch (err) {
        
      console.error('Failed to unvote fact:', err);
    }
  };

  return (
            
              <Card style={styles.card} elevation={1}>
                <Card.Title title={item.title} left={LeftContent} />
                <Card.Content style={{ flexGrow: 1, flexShrink: 1, height: "80%" }}>
                  <Text style={{ fontSize: 16, lineHeight: 24 }}>
                    {item.content}
                  </Text>
                </Card.Content>
                <Card.Actions>
                   <IconButton
                  icon="thumb-up"
                  iconColor={voteStatus == 'upvoted' ? theme.colors.onPrimary : theme.colors.primary}
                  backgroundColor={voteStatus == 'upvoted' ? theme.colors.primary : theme.colors.onPrimary}                  
                  size={20}
                  mode="contained"
                  onPress={() =>
                    voteStatus == 'upvoted' ? handleUnvote(item.id) : handleUpvote(item.id)
                  }
                />
                <IconButton
                  icon="thumb-down"
                  iconColor={voteStatus == 'downvoted' ? theme.colors.onPrimary : theme.colors.primary}
                  backgroundColor={voteStatus == 'downvoted' ? theme.colors.primary : theme.colors.onPrimary}
                  size={20}
                  mode="contained"
                  onPress={() =>
                    voteStatus == 'downvoted' ? handleUnvote(item.id) : handleDownvote(item.id)
                  }
                />
                <IconButton icon="bookmark-outline" mode="contained" onPress={() => console.log('Bookmark Toggle') } />
                </Card.Actions>
              </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    border: 1,
    borderColor: '#f9f9f9',
    bprderRadius: 5,
  },
});