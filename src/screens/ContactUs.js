import React, { useState,useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import api from '../constants/api';

const ContactUs = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    comments: "",
    enquiry_code: ""
  });


  const handleChange = (key, value) => {
    setUser(prev => ({ ...prev, [key]: value }));
  };

//   const handleSubmit = () => {
//     // Add your submission logic here (API, validation, etc.)
//     Alert.alert('Success', 'Your message has been submitted.');
//     setForm({
//         first_name: "",
//         last_name: "",
//         email: "",
//         comments: "",
//         enquiry_code: ""
//     });
//   };
  const applyChanges = () => {};
  const [contact, setContact] = useState();
  const [contacts, setContacts] = useState();
  const [email, setEmail] = useState();
  const [website, setWebsite] = useState();
  const [address, setAddress] = useState();
  const [mailId, setmailId] = useState("");
  const [googlemapdata, setGoogleMapData] = useState('');

  const getEnquiryEmail = () => {
    api.get("/setting/getEnquiryMailId").then((res) => {
      setmailId(res.data.data[0]);
    });
  };
  const getContact = () => {
    api.get("/contact/getContacts").then((res) => {
      setContact(res.data.data[0]);
    });
  };

  const getEmail = () => {
    api.get("/contact/getEmail").then((res) => {
      setEmail(res.data.data[0]);
    });
  };

  const getWebsite = () => {
    api.get("/contact/getWebsite").then((res) => {
      setWebsite(res.data.data[0]);
    });
  };

  const getAddress = () => {
    api.get("/contact/getAddress").then((res) => {
      setAddress(res.data.data[0]);
    });
  };

  const getMobile = () => {
    api.get("/contact/getMobileContacts").then((res) => {
      setContacts(res.data.data[0]);
    });
  };

  const getGoogleMap = () =>{
    api.get('/setting/getSettingsForGoogleMap').then(res=>{
      setGoogleMapData(res.data.data[0])
     })
  }

  const ContactSubmit = (code) => {
    api
      .post("/commonApi/addEnquiry", {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        comments: user.comments,
        enquiry_code: code,
      })
      .then((res) => {
        console.log(res);
        Alert.alert("Thank you for your enquiry submission!");
  
        // Reset form after successful submission
        setUser({
          first_name: "",
          last_name: "",
          email: "",
          comments: "",
          enquiry_code: "",
        });
      })
      .catch((err) => {
        Alert.alert("Enquiry submission failed!");
      });
  };


  const generateCode = () => {
    api
      .post('/commonApi/getCodeValues', { type: 'enquiry' })
      .then((res) => {
        ContactSubmit(res.data.data);
      })
      .catch(() => {
        ContactSubmit('');
      });
  };
  
 
  const sendMail = () => {
    Alert.alert(
        'Confirm Submission',
        'Are you sure you want to send Mail?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => console.log('User cancelled'),
          },
          {
            text: 'Yes',
            onPress: () => {
                const to = mailId.email;
                const text = user.comments;
                const subject = user.email;
                const dynamic_template_data = {
                  first_name: user.first_name,
                  email: user.email,
                  comments: user.comments,
                };
            
                api
                  .post("/commonApi/sendemail", {
                    to,
                    text,
                    subject,
                    dynamic_template_data,
                  })
                  .then(() => {
                    Alert.alert("Email has been sent successfully!");
            
                    // Reset form after successful email
                    setUser({
                      first_name: "",
                      last_name: "",
                      email: "",
                      comments: "",
                    });
                  })
                  .catch((err) => {
                    Alert.alert("Unable to send Email");
                  });
            },
          },
        ],
        { cancelable: true }
      );
    
  };
  
  useEffect(() => {
    getMobile();
    getContact();
    getAddress();
    getWebsite();
    getEmail();
    getEnquiryEmail();
    getGoogleMap();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>

     

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={user.firstName}
          onChangeText={text => handleChange('firstName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={user.lastName}
          onChangeText={text => handleChange('lastName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={user.email}
          onChangeText={text => handleChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact No"
          keyboardType="phone-pad"
          value={user.contactNo}
          onChangeText={text => handleChange('contactNo', text)}
        />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Message"
          value={user.comments}
          multiline
          numberOfLines={4}
          onChangeText={text => handleChange('comments', text)}
        />

        <Button mode="contained" onPress={()=>{sendMail(); generateCode();}} style={styles.button}>
          Submit
        </Button>
      </View>
       {/* Contact Info */}
       <View style={styles.infoBox}>
        <Text style={styles.label}>📞 Phone:</Text>
        <Text style={styles.info}>{contact && contact.mobile}</Text>
        <Text style={styles.label}>📧 Email:</Text>
        <Text style={styles.info}>{email && email.mailId}</Text>
        
        <Text style={styles.label}>🌐 Website:</Text>
        <Text style={styles.info}>{website && website.web}</Text>
        <Text style={styles.label}>📍 Address:</Text>
        <Text style={styles.info}>
        {address && address.addr}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
    fontFamily: 'Outfit-Regular',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Outfit-Regular',
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    fontFamily: 'Outfit-Regular',
  },
  label: {
    fontWeight: '600',
    color: '#555',
    marginTop: 8,
    fontFamily: 'Outfit-Regular',
  },
  info: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Outfit-Regular',
  },
  form: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    elevation: 3,
    fontFamily: 'Outfit-Regular',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
    fontFamily: 'Outfit-Regular',
  },
  button: {
    marginTop: 16,
    borderRadius: 4,
    paddingVertical: 6,
    backgroundColor:'#1EB1C5',
    fontFamily: 'Outfit-Regular',
  },
});

export default ContactUs;
