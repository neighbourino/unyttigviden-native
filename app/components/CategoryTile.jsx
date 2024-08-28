import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

const CategoryTile = ({ category, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <View style={[styles.tileContent, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.tileText}>{category.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    margin: 10,
    aspectRatio: 1, // Ensures the tile is square
  },
  tileContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  tileText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CategoryTile;