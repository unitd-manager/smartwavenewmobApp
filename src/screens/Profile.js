import React, { useState,useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert,useColorScheme,ActivityIndicator } from 'react-native';
import { Text, Button, Avatar, Divider } from 'react-native-paper';
import api from '../constants/api';
import imageBase from '../constants/imageBase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddressSection from '../components/AddressSection';

const Profile = ({ navigation }) => {

  const colorScheme = useColorScheme();
const isDarkMode = colorScheme === 'dark';
const textColor = isDarkMode ? '#fff' : '#000'; 
const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState();
  const [profileImg, setProfileImg] = useState();
  const [allcountries, setallCountries] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [profile, setProfile] = useState({
    // first_name: '',
    // bio: '',
    // email: '',
    // avatar: '',
    // mobile: '',
    // gst: '',
    // fssai: '',
    // iec: '',
    // pan: '',
    // address1: '',
    // address2: '',
    // address_area: '',
    // address_city: '',
    // address_state: '',
    // address_po_code: '',
  });
  const getUser = () => {
    api
      .post("/contact/getContactsById", { contact_id: user.contact_id })
      .then((res) => {
        setProfile(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const getAllCountries = () => {
    api
      .get('/commonApi/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
         });
  };
  const updateContact=()=>{
    const Address={
        contact_id:profile.contact_id,
        address1: profile.address1,
        address2: profile.address2,
        address_area:profile.address_area,
        address_city: profile.address_city,
        address_state: profile.address_state,
        address_po_code: profile.address_po_code,
    }
    api
      .post("/contact/editContactData", profile)
      .then((res) => {
        api
        .post("/contact/editContactAddress", Address)
        
      }).then(()=>{
        Alert.alert("Account Info Updated successfully");
        getUser();
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Unable to Edit the Account Info");
      });
  }

  useEffect(() => {
    api
      .post("/contact/getContactsById", { contact_id: user.contact_id })
      .then((res) => {
        console.log('profile',res.data.data[0])
        setProfile(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  useEffect(() => {
    if (profile && profile.length > 0) {
      setImageUrl(`${imageBase}/${profile[0].name}`);
    } else {
      setImageUrl("");
    }
  }, [profile, imageBase]);
  useEffect(() => {
    const initialize = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem('user');
            const user = jsonValue != null ? JSON.parse(jsonValue) : null;
            setUser(user);
            if (user) {
              setLoading(true); 
                api
                .post("/contact/getContactsById", { contact_id: user.contact_id })
                .then((res) => {
                  console.log('profile',res.data.data[0])
                  setProfile(res.data.data[0]);
                  setLoading(false);
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });
                getAllCountries();
            }
          
          } catch (e) {
            console.error('Error reading user from AsyncStorage:', e);
          }
        };
      
        initialize();
   
    
  }, []);
  useEffect(() => {
    api
      .post("/file/getListOfFiles", {
        record_id: user.contact_id,
        room_name: "profile",
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.contact_id]);

  return loading ? (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
       
      <TouchableOpacity disabled={!editing}>
        <Avatar.Image size={100} source={{ uri: profile?.avatar }} />
      </TouchableOpacity>

      {editing ? (
        <>
          {/* Personal & Business Info */}
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.first_name} onChangeText={text => handleChange('first_name', text)} placeholder="Name" placeholderTextColor={isDarkMode ? '#aaa' : '#888'} />
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.bio} onChangeText={text => handleChange('bio', text)} placeholder="Bio" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.email} onChangeText={text => handleChange('email', text)} placeholder="Email" keyboardType="email-address" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.mobile} onChangeText={text => handleChange('mobile', text)} placeholder="Mobile" keyboardType="phone-pad" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.gst} onChangeText={text => handleChange('gst', text)} placeholder="GST Number" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.fssai} onChangeText={text => handleChange('fssai', text)} placeholder="FSSAI Number" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.iec} onChangeText={text => handleChange('iec', text)} placeholder="IEC Code" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.pan} onChangeText={text => handleChange('pan', text)} placeholder="PAN Number" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>

          {/* Address Section Header */}
          <Text style={styles.sectionHeader}>Address Details</Text>
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.address1} onChangeText={text => handleChange('address1', text)} placeholder="Address Line 1" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.address2} onChangeText={text => handleChange('address2', text)} placeholder="Address Line 2" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.address_area} onChangeText={text => handleChange('address_area', text)} placeholder="Area" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.address_city} onChangeText={text => handleChange('address_city', text)} placeholder="City" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.address_state} onChangeText={text => handleChange('address_state', text)} placeholder="State" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>
          <TextInput style={[
    styles.input,
    {
      color: isDarkMode ? '#fff' : '#000',
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
      placeholderTextColor: isDarkMode ? '#aaa' : '#888'
    }
  ]} value={profile?.address_po_code} onChangeText={text => handleChange('address_po_code', text)} placeholder="Postal Code" keyboardType="number-pad" placeholderTextColor={isDarkMode ? '#aaa' : '#888'}/>
        </>
      ) : (
        <>
          {/* Personal & Business Info Display */}
          <Text style={[styles.name, { color: textColor }]}>{profile?.first_name}</Text>
<Text style={[styles.bio, { color: textColor }]}>{profile?.bio}</Text>
<Text style={[styles.email, { color: textColor }]}>{profile?.email}</Text>
<Text style={[styles.info, { color: textColor }]}>Mobile: {profile?.mobile}</Text>
<Text style={[styles.info, { color: textColor }]}>GST: {profile?.gst}</Text>
<Text style={[styles.info, { color: textColor }]}>FSSAI: {profile?.fssai}</Text>
<Text style={[styles.info, { color: textColor }]}>IEC: {profile?.iec}</Text>
<Text style={[styles.info, { color: textColor }]}>PAN: {profile?.pan}</Text>


        

          <AddressSection profile={profile} />
        </>
      )}

{!editing &&<Button
        mode="contained"
        style={styles.button}
        onPress={() => setEditing(!editing)}
      >
        {'Edit'}
      </Button>}
      {editing &&<Button
        mode="contained"
        style={styles.button}
        onPress={() => {updateContact(); setEditing(!editing)}}
      >
        {'Save'}
      </Button>}
     
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor:'#f7f7f7',
    flexGrow: 1,
    fontFamily: 'Outfit-Regular',
  },  
  name: {
    fontSize: 24,
    marginVertical: 8,
    fontWeight: '600',
    fontFamily: 'Outfit-Regular',

  },
  bio: {
    fontSize: 16,
    color: 'gray',
    fontFamily: 'Outfit-Regular',

  },
  email: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 12,
    fontFamily: 'Outfit-Regular',

  },
  address: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Outfit-Regular',

  },
  info: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Outfit-Regular',

  },
  button: {
    marginTop: 20,
    width: 120,
    fontFamily: 'Outfit-Regular',
    backgroundColor:'#1EB1C5'
  },
  input: {
    width: '90%',
    borderBottomWidth: 1,
    marginBottom: 12,
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
  sectionHeader: {
    fontSize: 18,
    marginTop: 24,
    marginBottom: 12,
    fontWeight: '600',
    color: '#444',
    alignSelf: 'flex-start',
    fontFamily: 'Outfit-Regular',
  },
});

export default Profile;
