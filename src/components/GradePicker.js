import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GradeSelector = ({
  product,
  selectedProductGrade,
  setSelectedProductGrade,
  setProductStock,
  setQuantityCount,
}) => {
  return (
    product?.grades?.length > 0 && (
      <View style={styles.container}>
        <Text style={styles.label}>Select Grade</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedProductGrade}
            onValueChange={(itemValue) => {
              const selectedData = product.grades.find((g) => g === itemValue);
              setSelectedProductGrade(itemValue);
              setProductStock(selectedData?.stock || 0);
              setQuantityCount(1);
            }}
            mode="dropdown"
            style={styles.picker}
            dropdownIconColor="#000" // Black icon color
          >
            <Picker.Item label="Select a grade" value="" color="#888" />
            {product.grades.map((grade, index) => (
              <Picker.Item key={index} label={grade} value={grade} color="#000" />
            ))}
          </Picker>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff', // White background
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000', // Ensure visible in all themes
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#ffffff', // White background for the dropdown
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#000000', // Selected item text color
    fontSize: 14,
    marginTop: Platform.OS === 'android' ? -4 : 0,
    backgroundColor: '#ffffff', // Override dark mode on Android
  },
});

export default GradeSelector;
