import { StyleSheet, TouchableOpacity, View } from "react-native";
import { React, useState, useEffect } from "react";
import {
  Avatar,
  Card,
  Text,
  IconButton,
  useTheme,
  Modal,
  Portal,
  Button,
} from "react-native-paper";
import { upvoteFact, downvoteFact, unvoteFact, toggleBookmark } from "../services/api";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function FactCard({ item }) {
  const theme = useTheme();
  const [fact, setFact] = useState(null);
  const [voteStatus, setVoteStatus] = useState(item.user_vote);
  const [bookmarkStatus, setBookmarkStatus] = useState(item.user_bookmark);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const showLoginModal = () => setLoginModalVisible(true);
  const hideLoginModal = () => setLoginModalVisible(false);

  const token = useSelector((state) =>
    state.reducer.auth ? state.reducer.auth.token : null
  );


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (err) {
        setError("Failed to load user data: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const LeftContent = (props) => (
    <Avatar.Icon {...props} icon="head-question" />
  );

  const handleUpvote = async (factId) => {
    try {
      const data = await upvoteFact(factId);
      // Update UI based on the response
      // For example, update the fact's vote count locally if needed
      // console.log('handleUpvote', data);
      setVoteStatus("upvoted");
    } catch (err) {
      console.error("Failed to upvote fact:", err);
    }
  };

  const handleDownvote = async (factId) => {
    try {
      const data = await downvoteFact(factId);
      setVoteStatus("downvoted");
      // Update UI based on the response
    } catch (err) {
      console.error("Failed to downvote fact:", err);
    }
  };

  const handleUnvote = async (factId) => {
    try {
      const data = await unvoteFact(factId);
      setVoteStatus(null);
      // Update UI based on the response
    } catch (err) {
      console.error("Failed to unvote fact:", err);
    }
  };

  const handleToggleBookmark = async (factId) => {
    try {
      const data = await toggleBookmark(factId);
      setBookmarkStatus(!bookmarkStatus);
      // Update UI based on the response
    } catch (err) {
      console.error("Failed to toggle bookmark on fact:", err);
    }
  };

  return (
    <Card style={styles.card} elevation={1}>
      <Card.Title title={item.title} left={LeftContent} />
      <Card.Content style={{ flexGrow: 1, flexShrink: 1, height: "80%" }}>
        <Text style={{ fontSize: 16, lineHeight: 24 }}>{item.content}</Text>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="thumb-up"
          iconColor={
            voteStatus == "upvoted"
              ? theme.colors.onPrimary
              : theme.colors.primary
          }
          backgroundColor={
            voteStatus == "upvoted"
              ? theme.colors.primary
              : theme.colors.onPrimary
          }
          size={20}
          mode="contained"
          onPress={function () {
            if (token) {
              voteStatus == "upvoted"
                ? handleUnvote(item.id)
                : handleUpvote(item.id);
            } else {
              showLoginModal();
            }
          }}
        />
        <IconButton
          icon="thumb-down"
          iconColor={
            voteStatus == "downvoted"
              ? theme.colors.onPrimary
              : theme.colors.primary
          }
          backgroundColor={
            voteStatus == "downvoted"
              ? theme.colors.primary
              : theme.colors.onPrimary
          }
          size={20}
          mode="contained"
          onPress={() =>
            voteStatus == "downvoted"
              ? handleUnvote(item.id)
              : handleDownvote(item.id)
          }
        />
        <IconButton
          icon="bookmark-outline"
          iconColor={
            bookmarkStatus
              ? theme.colors.onPrimary
              : theme.colors.primary
          }
          backgroundColor={
            bookmarkStatus
              ? theme.colors.primary
              : theme.colors.onPrimary
          }
          mode="contained"
          onPress={() => handleToggleBookmark(item.id)}
        />
      </Card.Actions>
      <Portal>
        <Modal
          visible={loginModalVisible}
          onDismiss={hideLoginModal}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.title}>Log ind for at stemme og gemme dine favoritter</Text>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={function() {
                navigation.navigate("Login");
                hideLoginModal();
              }}
              style={styles.logoutButton}
            >
              Log ind / registrer
            </Button>
            <Button
              mode="outlined"
              onPress={hideLoginModal}
              style={styles.cancelButton}
            >
              Ikke lige nu
            </Button>
          </View>
        </Modal>
      </Portal>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    border: 1,
    borderColor: "#f9f9f9",
    bprderRadius: 5,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  logoutButton: {
    marginRight: 10,
  },
  cancelButton: {
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  }
});


