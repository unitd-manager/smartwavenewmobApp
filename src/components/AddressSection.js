import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

const AddressSection = ({ profile }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#1c1c1e' : '#f6f6f6',
    },
    sectionHeader: {
      color: isDarkMode ? '#fff' : '#333',
    },
    address: {
      color: isDarkMode ? '#ccc' : '#555',
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.sectionHeader, dynamicStyles.sectionHeader]}>
        Address Details
      </Text>
      <Text style={[styles.address, dynamicStyles.address]}>
        {profile?.address1 || ''}{profile?.address1 && profile?.address2 ? ', ' : ''}
        {profile?.address2 || ''}
      </Text>
      <Text style={[styles.address, dynamicStyles.address]}>
        {[profile?.address_area, profile?.address_city].filter(Boolean).join(', ')}
      </Text>
      <Text style={[styles.address, dynamicStyles.address]}>
        {[profile?.address_state, profile?.address_po_code].filter(Boolean).join(' - ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    fontFamily: 'Outfit-Regular',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: 'Outfit-Regular',
  },
  address: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Outfit-Regular',
  },
});

export default AddressSection;
