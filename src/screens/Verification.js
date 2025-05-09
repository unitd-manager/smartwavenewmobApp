// import React from "react";
// import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, } from "react-native";
// export default (props) => {
// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<ScrollView  style={styles.scrollView}>
// 				<View style={styles.row}>
// 					<Text style={styles.text}>
// 						{"9:41"}
// 					</Text>
// 					<Image
// 						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/448jnn63.png"}} 
// 						resizeMode = {"stretch"}
// 						style={styles.image}
// 					/>
// 				</View>
// 				<Image
// 					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/t79iv9au.png"}} 
// 					resizeMode = {"stretch"}
// 					style={styles.image2}
// 				/>
// 				<View style={styles.column}>
// 					<Text style={styles.text2}>
// 						{"Email Verification"}
// 					</Text>
// 					<Text style={styles.text3}>
// 						{"We need to register your mail before getting started !"}
// 					</Text>
// 				</View>
// 				<View style={styles.row2}>
// 					<View style={styles.view}>
// 						<Text style={styles.text4}>
// 							{"8"}
// 						</Text>
// 					</View>
// 					<View style={styles.view}>
// 						<Text style={styles.text4}>
// 							{"5"}
// 						</Text>
// 					</View>
// 					<View style={styles.view}>
// 						<Text style={styles.text5}>
// 							{"5"}
// 						</Text>
// 					</View>
// 					<View style={styles.view2}>
// 						<Text style={styles.text4}>
// 							{"3"}
// 						</Text>
// 					</View>
// 				</View>
// 				<View style={styles.view3}>
// 					<Text style={styles.text6}>
// 						{"Verify Email"}
// 					</Text>
// 				</View>
// 				<View style={styles.row3}>
// 					<Text style={styles.text7}>
// 						{"Change email id ?"}
// 					</Text>
// 					<Text style={styles.text8}>
// 						{"Send again"}
// 					</Text>
// 				</View>
// 				<Image
// 					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/hwytuxff.png"}} 
// 					resizeMode = {"stretch"}
// 					style={styles.image3}
// 				/>
// 			</ScrollView>
// 		</SafeAreaView>
// 	)
// }
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#FFFFFF",
// 	},
// 	column: {
// 		marginBottom: 73,
// 		marginHorizontal: 34,
// 	},
// 	image: {
// 		width: 143,
// 		height: 54,
// 	},
// 	image2: {
// 		width: 242,
// 		height: 242,
// 		marginBottom: 39,
// 	},
// 	image3: {
// 		width: 100,
// 		height: 1,
// 		marginBottom: 16,
// 	},
// 	row: {
// 		flexDirection: "row",
// 		marginBottom: 32,
// 	},
// 	row2: {
// 		flexDirection: "row",
// 		alignItems: "flex-start",
// 		marginBottom: 40,
// 		marginHorizontal: 30,
// 	},
// 	row3: {
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 		marginBottom: 154,
// 		marginHorizontal: 31,
// 	},
// 	scrollView: {
// 		flex: 1,
// 		backgroundColor: "#FFFFFF",
// 	},
// 	text: {
// 		color: "#373737",
// 		fontSize: 17,
// 		fontWeight: "bold",
// 		marginVertical: 18,
// 		marginLeft: 47,
// 		marginRight: 59,
// 	},
// 	text2: {
// 		color: "#000000",
// 		fontSize: 30,
// 		fontWeight: "bold",
// 		textAlign: "center",
// 		marginBottom: 15,
// 	},
// 	text3: {
// 		color: "#9CA7B7",
// 		fontSize: 16,
// 		textAlign: "center",
// 		marginHorizontal: 39,
// 	},
// 	text4: {
// 		color: "#1EB1C5",
// 		fontSize: 22,
// 		marginHorizontal: 24,
// 	},
// 	text5: {
// 		color: "#1EB1C5",
// 		fontSize: 22,
// 		marginHorizontal: 22,
// 	},
// 	text6: {
// 		color: "#FFFFFF",
// 		fontSize: 18,
// 	},
// 	text7: {
// 		color: "#595D64",
// 		fontSize: 14,
// 		textAlign: "center",
// 		marginRight: 4,
// 		flex: 1,
// 	},
// 	text8: {
// 		color: "#1EB1C5",
// 		fontSize: 14,
// 		textAlign: "right",
// 		flex: 1,
// 	},
// 	view: {
// 		flex: 1,
// 		backgroundColor: "#FFFFFF",
// 		borderColor: "#1EB1C5",
// 		borderRadius: 8,
// 		borderWidth: 1,
// 		paddingVertical: 21,
// 		marginRight: 34,
// 	},
// 	view2: {
// 		flex: 1,
// 		backgroundColor: "#FFFFFF",
// 		borderColor: "#1EB1C5",
// 		borderRadius: 8,
// 		borderWidth: 1,
// 		paddingVertical: 21,
// 	},
// 	view3: {
// 		alignItems: "center",
// 		backgroundColor: "#1EB1C5",
// 		borderRadius: 10,
// 		paddingVertical: 18,
// 		marginBottom: 10,
// 		marginHorizontal: 30,
// 	},
// });
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const EmailVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const verifyEmail = () => {
    const enteredOtp = otp.join('');
    // You can call your API here to verify
    console.log('Entered OTP:', enteredOtp);
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('./assets/email-icon.png')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      /> */}
      <Text style={styles.title}>
        <Text style={styles.titleBold}>Email </Text>
        <Text style={styles.titleBlue}>Verification</Text>
      </Text>
      <Text style={styles.subtitle}>We need to register your mail before getting started!</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpBox}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={verifyEmail}>
        <Text style={styles.verifyText}>Verify Email</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.changeEmail}>Change email id ? </Text>
        <TouchableOpacity>
          <Text style={styles.sendAgain}>Send again</Text>
        </TouchableOpacity>
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
    width: 140,
    height: 140,
    marginBottom: 30,
    fontFamily: 'Outfit-Regular',

  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: 'Outfit-Regular',

  },
  titleBold: {
    fontWeight: 'bold',
    fontFamily: 'Outfit-Regular',

  },
  titleBlue: {
    color: '#00B4D8',
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    fontFamily: 'Outfit-Regular',

  },
  footer: {
    flexDirection: 'row',
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
