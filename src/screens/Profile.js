import React, { useState, useEffect,useRef } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Alert, ActivityIndicator,TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text, Avatar, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../constants/api';
import imageBase from '../constants/imageBase';
import AddressSection from '../components/AddressSection';
import CountryPicker from 'react-native-country-picker-modal';

const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [originalProfile, setOriginalProfile] = useState({});
const [countryCode, setCountryCode] = useState('IN');
const [callingCode, setCallingCode] = useState('91');
const [allCountries, setAllCountries] = useState([]);

const countryPickerRef = useRef(null);
  const getUser = () => {
    api.post("/contact/getContactsById", { contact_id: user.contact_id })
      .then((res) => {
        setProfile(res.data.data[0]);
        setOriginalProfile(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };
useEffect(() => {
  api.get('/commonApi/getCountry')
    .then(res => setAllCountries(res.data.data))
    .catch(err => console.log(err));
}, []);

    // Validation helpers
    const validatePAN = (pan) => {
      if (!pan) return true; // allow empty
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;
      return panRegex.test(pan.trim());
    };

    const validateFSSAI = (fssai) => {
      if (!fssai) return true; // allow empty
      const fssaiRegex = /^\d{14}$/;
      return fssaiRegex.test(fssai.trim());
    };

  const updateContact = () => {
    // Validate PAN
    if (!validatePAN(profile?.pan)) {
      Alert.alert('Invalid PAN', 'Please enter a valid PAN (e.g. ABCDE1234F)');
      return;
    }

    // Validate FSSAI (14 digits)
    if (!validateFSSAI(profile?.fssai)) {
      Alert.alert('Invalid FSSAI', 'Please enter a valid 14-digit FSSAI number');
      return;
    }

    // Prepare payload (uppercase PAN)
    const payload = { ...profile, pan: profile?.pan ? profile.pan.toUpperCase().trim() : profile?.pan };

    const Address = {
      contact_id: payload.contact_id,
      address1: payload.address1,
      address2: payload.address2,
      address_area: payload.address_area,
      address_city: payload.address_city,
      address_state: payload.address_state,
      address_po_code: payload.address_po_code,
      address_country_code: payload.address_country_code,
    };

    api.post("/contact/editContactData", payload)
      .then(() => api.post("/contact/editContactAddress", Address))
      .then(() => {
        Alert.alert("Account Info Updated successfully");
        setEditing(false);
        getUser();
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Unable to Edit the Account Info");
      });
  };

  const handleChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const cancelEdit = () => {
    setProfile(originalProfile);
    setEditing(false);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const user = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUser(user);
        if (user) {
          setLoading(true);
          api.post("/contact/getContactsById", { contact_id: user.contact_id })
            .then((res) => {
              setProfile(res.data.data[0]);
              setOriginalProfile(res.data.data[0]);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        }
      } catch (e) {
        console.error('Error reading user from AsyncStorage:', e);
      }
    };
    initialize();
  }, []);

  return loading ? (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#1E90FF" />
    </View>
  ) : (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={[styles.container, { flexGrow: 1, paddingBottom: 200 }]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
      <View style={styles.avatarContainer}>
        <Avatar.Icon 
          size={100} 
          icon={profile?.avatar ? "account" : "account-outline"}
          source={profile?.avatar ? { uri: profile.avatar } : undefined}
          backgroundColor={profile?.avatar ? "#fff" : "#e1e1e1"}
        />
      </View>

      {editing ? (
        <>
          {renderInput('first_name', 'Name')}
          {/* {renderInput('bio', 'Bio')} */}
          {renderInput('company_name', 'Company Name')}

          {renderInput('email', 'Email', 'email-address')}
          {/* {renderInput('mobile', 'Mobile', 'phone-pad')} */}
       <View style={{ flexDirection: 'row', alignItems: 'center' }}>

  {/* 🔥 HIDDEN Country Picker (logic only) */}
  <CountryPicker
    ref={countryPickerRef}
    countryCode={countryCode}
    withFilter
    withFlag={false}
    withEmoji={false}
    withCallingCode={false}
    withCallingCodeButton={false}
    visible={false}
    onSelect={(country) => {
      setCountryCode(country.cca2);
      setCallingCode(country.callingCode[0]);
      handleChange('mobile_country_code', `+${country.callingCode[0]}`);
    }}
  />

  {/* ✅ CLICKABLE +91 */}
  <TouchableOpacity
    onPress={() => countryPickerRef.current?.open()}
    style={styles.countryCodeButton}
  >
    <Text style={styles.countryCodeText}>+{callingCode}</Text>
  </TouchableOpacity>

  {/* 📞 MOBILE INPUT */}
  <TextInput
    style={[styles.input, styles.mobileInput, { flex: 1 }]}
    placeholder="Mobile Number"
    keyboardType="phone-pad"
    value={profile?.mobile || ''}
    onChangeText={(text) => handleChange('mobile', text)}
  />
</View>

          {renderInput('gst', 'GST/Tax Registration Number')}
          {renderInput('fssai', 'FSSAI Number')}
          {renderInput('iec', 'Import Export License')}
          {renderInput('pan', 'PAN/BRC')}

          <Text style={styles.sectionHeader}>Address Details</Text>
          {renderInput('address1', 'Address Line 1')}
          {renderInput('address2', 'Address Line 2')}
          {renderInput('address_area', 'Area')}
          {renderInput('address_city', 'City')}
          {renderInput('address_state', 'State')}
          {renderInput('address_po_code', 'Zip Code', 'number-pad')}
         <View style={{ marginBottom: 15 }}>
  <Text style={{ color: '#000', marginBottom: 5 }}>Country</Text>

  <View style={{ borderBottomWidth: 1, borderBottomColor: '#999' }}>
    <Picker
      selectedValue={profile?.address_country_code}
      onValueChange={(value) => handleChange('address_country_code', value)}
      style={{ color: '#000' }}
    >
      <Picker.Item label="Please Select" value="" />

      {allCountries.map((country) => (
        <Picker.Item
          key={country.country_code}
          label={country.name}
          value={country.country_code}
        />
      ))}
    </Picker>
  </View>
</View>

          <View style={styles.buttonGroup}>
            <Button mode="contained" onPress={updateContact} style={styles.button}>Save</Button>
            <Button mode="contained" onPress={cancelEdit} style={styles.button}>Cancel</Button>
          </View>
        </>
      ) : (
        <>
          <View style={{ alignItems: 'center' }}>
  <Text style={styles.name}>{profile?.first_name}</Text>
  {/* <Text style={styles.bio}>{profile?.bio}</Text> */}
  <Text style={styles.text}>{profile?.company_name}</Text>

  <Text style={styles.text}>{profile?.email}</Text>
  
{/* 
  <Text style={styles.text}>{profile?.mobile}</Text> */}

  <AddressSection profile={profile} />
</View>

          <View style={styles.editButtonWrapper}>
            <Button mode="contained" onPress={() => setEditing(true)} style={styles.button}>Edit Profile</Button>
          </View>
        </>
      )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

  function renderInput(key, placeholder, keyboardType = 'default') {
    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={profile?.[key] || ''}
        onChangeText={text => handleChange(key, text)}
        keyboardType={keyboardType}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingBottom: 80,
    fontFamily: 'Outfit-Regular',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Outfit-Regular',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    fontFamily: 'Outfit-Regular',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    marginBottom: 15,
    fontSize: 16,
    paddingVertical: 8,
    color: '#000',
    fontFamily: 'Outfit-Regular',
  },
  countryCodeButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingHorizontal: 12,
    marginRight: 10,
    minWidth: 60,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 44,
    textAlign: 'center',
  },
  mobileInput: {
    height: 44,
    paddingVertical: 0,
    textAlignVertical: 'center',
    marginBottom: 0,
  },
  sectionHeader: {
    fontSize: 18,
    //fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
    fontFamily: 'Outfit-Regular',
  },
  name: {
    fontSize: 22,
    //fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
    fontFamily: 'Outfit-Regular',
  },
  bio: {
    fontSize: 16,
    marginTop: 4,
    color: '#000',
    fontFamily: 'Outfit-Regular',
  },
  text: {
    fontSize: 16,
    marginTop: 2,
    color: '#000',
    fontFamily: 'Outfit-Regular',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    fontFamily: 'Outfit-Regular',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 10,
    backgroundColor: '#00B4D8',
    fontFamily: 'Outfit-Regular',
  },
  editButtonWrapper: {
    marginTop: 30,
    fontFamily: 'Outfit-Regular',
  },
});

export default Profile;
