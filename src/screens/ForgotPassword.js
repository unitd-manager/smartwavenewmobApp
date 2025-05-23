import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import api from '../constants/api';

const ForgotPasswordScreen = ({navigation}) => {
 const [email, setEmail] = useState("");
  const [contactMails, setContactMails] = useState([]);

 const handleContinue = () => {
      if (!email) {
      Alert.alert("Please enter your email.");
      return;
    }
  
    // Extract email values from contactMails
    const emailList = contactMails.map((contact) => contact.email);
  
    if (!emailList.includes(email)) {
      Alert.alert("This email is not registered.");
      return;
    }
    api
      .post("api/forgotpass", { email: email })
      .then((res) => {
        Alert.alert("otp to reset password is sent to the mail.");
		navigation.navigate('Verification', { email });
      })
      .catch(() => {
        console.log("error");
      });
  };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!email) {
//       Alert.alert("Please enter your email.");
//       return;
//     }
  
//     // Extract email values from contactMails
//     const emailList = contactMails.map((contact) => contact.email);
  
//     if (!emailList.includes(email)) {
//       Alert.alert("This email is not registered.");
//       return;
//     }
//     api
//       .post("api/forgot", { email: email })
//       .then((res) => {
//         Alert.alert("otp to reset password is sent to the mail.");
//       })
//       .catch(() => {
//         console.log("error");
//       });
//   };
useEffect(()=>{

  api
  .get("api/getAllContactMails")
  .then((res) => {
    setContactMails(res.data.data)
  })
  .catch(() => {
    console.log("error");
  });
},[])
 
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Forgot <Text style={styles.highlight}>Password</Text>
      </Text>
      <Text style={styles.subText}>
        Select which contact details should we use to reset your password.
      </Text>

      <Image
        //source={require('./assets/forgot-password-illustration.png')} // Add your image to assets
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.inputBox}>
        <Text style={styles.label}>Send OTP via Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'flex-start',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  highlight: {
    color: '#00bcd4',
  },
  subText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 20,
  },
  image: {
    height: 160,
    width: '100%',
    marginBottom: 20,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#00bcd4',
    borderRadius: 10,
    padding: 12,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#00bcd4',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
