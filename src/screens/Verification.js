import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import api from '../constants/api';

const EmailVerificationScreen = ({route,navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = useRef([]);
  const { email } = route.params;

  const handleOtpChange = (value, index) => {
    // Only allow digits
    const numericValue = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Auto-focus next input if current input has value and not the last input
    if (numericValue && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleContinue = () => {
    api
      .post("api/forgotpass", { email: email })
      .then((res) => {
        Alert.alert("otp to reset password is sent to the mail.");
      })
      .catch(() => {
        console.log("error");
      });
  };

  const verifyEmail = () => {
    const enteredOtp = otp.join('');
    
    api.post('api/checkMailOtp', { email, otp_no:enteredOtp },{
      headers: { 'Content-Type': 'application/json' }
    }).then((res)=>{
      Alert.alert('OTP verified Successfully');
      navigation.navigate('NewPassword', { email });
    }).catch((err)=>{
      console.error(err);
      Alert.alert(
        'OTP',
        'Incorrect OTP, please enter correct OPT or click Send again for a new OTP'
      );
    }) 
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/banner/verify.png')}  // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        <Text style={styles.titleBold}>Email </Text>
        <Text style={styles.titleBlue}>Verification</Text>
      </Text>
      <Text style={styles.subtitle}>We need to register your mail before getting started!</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (otpRefs.current[index] = ref)}
            style={styles.otpBox}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>
      <TouchableOpacity 
        style={[
          styles.verifyButton,
          {opacity: otp.every(digit => digit !== '') ? 1 : 0.5}
        ]} 
        onPress={verifyEmail}
        disabled={!otp.every(digit => digit !== '')}
      >
        <Text style={styles.verifyText}>Verify Email</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.changeEmail} onPress={()=>navigation.navigate('ForgotPassword')}>OTP not received ? </Text>
        <Text style={styles.sendAgain} onPress={handleContinue}>Send again</Text>
      </View>
    </View>
  );
};

export default EmailVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Outfit-Regular',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
    fontFamily: 'Outfit-Regular',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: 'Outfit-Regular',
  },
  titleBold: {
    fontFamily: 'Outfit-Regular',
  },
  titleBlue: {
    color: '#00B4D8',
    fontFamily: 'Outfit-Regular',
  },
  subtitle: {
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Outfit-Regular',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    fontFamily: 'Outfit-Regular',
  },
  otpBox: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: '#00B4D8',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    marginHorizontal: 8,
    fontFamily: 'Outfit-Regular',
  },
  verifyButton: {
    backgroundColor: '#00B4D8',
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginBottom: 20,
    fontFamily: 'Outfit-Regular',
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 20,
    fontFamily: 'Outfit-Regular',
  },
  changeEmail: {
    color: '#555',
    fontFamily: 'Outfit-Regular',
  },
  sendAgain: {
    color: '#00B4D8',
    fontWeight: '500',
    fontFamily: 'Outfit-Regular',
  },
});
