import React from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';

const EnquiryDetails = ({ route }) => {
	const { enquiry } = route.params || {};
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enquiry Details</Text>
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.name}>{enquiry?.name}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Enquiry ID</Text>
        <Text style={styles.enquiryId}>{enquiry?.enquiry_id}</Text>
        <Text style={styles.status}>{enquiry?.status}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Created Date :</Text>
        <Text style={styles.value}>{enquiry?.enquiry_date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Expected Date :</Text>
        <Text style={styles.value}>{enquiry?.expectedDate}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Budget Range</Text>
        <Text style={styles.budget}>${enquiry?.budgetMin},00 - ${enquiry?.budgetMax},00</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Preferred Contact</Text>
        <Text style={styles.value}>{enquiry?.contact}</Text>
      </View>

      <Text style={[styles.header, { marginTop: 20 }]}>Payment Receipt</Text>
      <TouchableOpacity style={styles.uploadBox}>
        <Text style={styles.uploadText}>Upload your file here</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: isDarkMode ? '#121212' : '#fff',
      minHeight: '100%',
    },
    header: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 16,
    },
    welcome: {
      fontSize: 14,
      textAlign: 'center',
      color: isDarkMode ? '#ccc' : '#444',
    },
    name: {
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 6,
      alignItems: 'center',
    },
    label: {
      color: isDarkMode ? '#aaa' : '#888',
      fontSize: 14,
    },
    value: {
      color: isDarkMode ? '#eee' : '#222',
      fontSize: 14,
    },
    enquiryId: {
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 15,
    },
    status: {
      backgroundColor: '#D0F5D7',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      fontSize: 12,
      color: '#007F00',
      marginLeft: 10,
    },
    budget: {
      color: '#00C3D2',
      fontWeight: '600',
      fontSize: 14,
    },
    uploadBox: {
      marginTop: 10,
      paddingVertical: 30,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadText: {
      color: '#888',
    },
  });

export default EnquiryDetails;
