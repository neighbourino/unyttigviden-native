import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Card,
  Avatar,
  IconButton,
} from "react-native-paper";

const FactModal = ({ visible, onDismiss, item }) => {

  if (!visible || !item) {
    return null;
  }

  const LeftContent = (props) => (
    <Avatar.Icon {...props} icon="head-question" />
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Card style={{ flex: 1, height: '100%' }} elevation={1}>
          <Card.Title title={item.title} left={LeftContent}/>
          <Card.Content style={{ flexGrow: 1, flexShrink: 1, height: "80%" }}>
            <Text style={{ fontSize: 16, lineHeight: 24 }}>{item.content}</Text>
          </Card.Content>

          <Card.Actions>
            <IconButton icon="check" onPress={onDismiss} />
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    borderRadius: 10,
    flex: 1,
    height: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default FactModal;
