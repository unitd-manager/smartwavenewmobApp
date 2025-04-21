import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GradeSelector = ({ product, selectedProductGrade, setSelectedProductGrade, setProductStock, setQuantityCount }) => {
  return (
    product?.grades && product.grades.length > 0 && (
      <View style={styles.container}>
        <Text style={styles.label}>Select Grade</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedProductGrade}
            onValueChange={(itemValue) => {
              const selectedData = product.grades.find((g) => g.name === itemValue);
              setSelectedProductGrade(itemValue);
              setProductStock(selectedData?.stock || 0);
              setQuantityCount(1);
            }}
            mode="dropdown"
          >
            <Picker.Item label="Select a grade" value="" />
            {product.grades.map((grade, index) => (
              <Picker.Item key={index} label={grade.name} value={grade.name} />
            ))}
          </Picker>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default GradeSelector;
