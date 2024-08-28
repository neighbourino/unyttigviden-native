import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Button, Checkbox, Text, useTheme, Switch } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCategory, resetFilters } from '../services/filtersSlice';
import { getCategories } from '../services/api';

const FilterModal = ({ visible, onDismiss }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedCategories = useSelector( state =>  (state.reducer.filters ? state.reducer.filters.selectedCategories : []));
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      const data = response.data;
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleToggleCategory = (categoryId) => {
    dispatch(toggleCategory(categoryId));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <Text style={styles.title}>Kategorier</Text>
        {categories.map(category => (
          <View key={category.id} style={styles.checkboxContainer}>
            <Switch
              value={selectedCategories.includes(category.id)}
              onValueChange={() => handleToggleCategory(category.id)}
              color={theme.colors.primaryDark}
                focusable={true}
                style={styles.switch}
            />
            <Text style={{fontSize: 14}}>{category.title}</Text>
          </View>
        ))}
        <Button mode="outlined" onPress={handleResetFilters} style={styles.resetButton}>
          Reset Filters
        </Button>
        <Button mode="contained" onPress={onDismiss}>
          Apply
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
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
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  resetButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  switch: {
    marginRight: 10,
  }
});

export default FilterModal;
