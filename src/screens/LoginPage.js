import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import api from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(text);
    setEmailValid(isValid);
    if (text === '') {
      setEmailError('Email is required');
    } else if (!isValid) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
    const isValid = text.length >= 6;
    setPasswordValid(isValid);
    if (text === '') {
      setPasswordError('Password is required');
    } else if (!isValid) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSignIn = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }
    if (!emailValid) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }
    if (!passwordValid) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (isValid) {
		let signinData={
			email,password
		}
		api.post("/api/login", signinData).then((res) => {
            if (res && res.status === "400") {
             
			  Alert.alert("Invalid Username or Password");
            } 
            else {
              AsyncStorage.setItem("user", JSON.stringify(res.data.data));
              AsyncStorage.setItem("token", JSON.stringify(res.data.token));
			  Alert.alert('Success', 'Logged in successfully!');
              setTimeout(()=>{
  navigation.navigate(" ")
              },300)
            }
          }).catch((err)=>{
			Alert.alert("Invalid Username or Password");
          });
      
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔽 Image Above Title */}
      <Image
        source={require('../assets/signin/logscreen.png')} // Make sure this path is correct
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        Please <Text style={styles.highlight}>Sign In</Text>
      </Text>
      <Text style={styles.subtitle}>
        Enter your Dipstore account details for a personalised experience
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#9E9E9E" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={validateEmail}
        />
        {emailValid && (
          <Icon name="checkmark-circle" size={20} color="green" style={styles.iconRight} />
        )}
      </View>
      {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#9E9E9E" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={validatePassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#9E9E9E"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      </View>
      {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => Alert.alert('Forgot Password')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.footer}>
        <Text>First time here </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.highlight}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
  },
  highlight: {
    color: '#00B4D8',
    fontFamily: 'Outfit-Regular',
  },
  subtitle: {
    textAlign: 'center',
    color: '#9E9E9E',
    marginVertical: 10,
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    paddingVertical: 4,
    fontFamily: 'Outfit-Regular',
  },
  icon: {
    marginRight: 5,
  },
  iconRight: {
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: 'Outfit-Regular',
  },
  forgotPassword: {
    color: '#00B4D8',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Outfit-Regular',
  },
  button: {
    backgroundColor: '#00B4D8',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'Outfit-Regular',
  },
});
