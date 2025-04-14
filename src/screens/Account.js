import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../constants/api'; // your API setup

const AccountScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
      setUserData(null);
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const user = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (user?.contact_id) {
        setIsLoggedIn(true);
        // Get full user data from API
        const res = await api.post("/contact/getContactsById", {
          contact_id: user.contact_id,
        });
        setUserData(res.data.data[0]);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.error('Error fetching user:', e);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const menuItems = [
    { icon: 'user', label: 'Your Profile', screen: 'Profile' },
    { icon: 'file-text', label: 'Enquiry History', screen: 'EnquiryHistory' },
    { icon: 'lock', label: 'Change password', screen: 'ChangePassword' },
    { icon: 'truck', label: 'Shipping Address', screen: 'ShippingAddress' },
    { icon: 'log-out', label: 'Logout', screen: 'Logout' },
  ];

  if (!isLoggedIn) {
    return (
      <View style={styles.menu}>
  <TouchableOpacity
    style={styles.menuItem}
    onPress={() => navigation.navigate('LoginPage')}
  >
    <View style={styles.menuIconText}>
      <Icon name="sign-in" size={20} color="#00BCD4" />
      <Text style={styles.menuText}>Login</Text>
    </View>
    <Icon name="chevron-right" size={20} color="#888" />
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.menuItem}
    onPress={() => navigation.navigate('Signup')}
  >
    <View style={styles.menuIconText}>
      <Icon name="user-plus" size={20} color="#00BCD4" />
      <Text style={styles.menuText}>Signup</Text>
    </View>
    <Icon name="chevron-right" size={20} color="#888" />
  </TouchableOpacity>
</View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} />
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: userData?.image || 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData?.name || 'Loading...'}</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.menuItem}
            onPress={() => {
              if (item.label === 'Logout') {
                handleLogout();
              } else {
                navigation.navigate(item.screen);
              }
            }}
          >
            <View style={styles.menuIconText}>
              <Icon name={item.icon} size={20} color="#00BCD4" />
              <Text style={styles.menuText}>{item.label}</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backBtn: { margin: 20 },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  menu: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuIconText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  menuText: {
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 18,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#00BCD4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  signupButton: {
    borderColor: '#00BCD4',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupText: {
    color: '#00BCD4',
    fontWeight: 'bold',
  },
});

export default AccountScreen;
