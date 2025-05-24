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
            dropdownIconColor="#000"
            itemStyle={Platform.OS === 'ios' ? styles.itemStyle : undefined}
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
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 3,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    height: 52,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: {
    height: 52,
    color: '#000',
    backgroundColor: '#ffffff', // Ensures white background even in dark mode
  },
  itemStyle: {
    color: '#000',
    backgroundColor: '#fff',
  },
});

export default GradeSelector;
