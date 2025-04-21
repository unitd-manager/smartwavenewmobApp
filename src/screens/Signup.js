import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import api from "../constants/api"; // make sure this is your actual API setup

export default ({ navigation }) => {
  const [signupData, setSignupData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mailId, setMailId] = useState("");
  const [otp, setOTP] = useState("");

  useEffect(() => {
    getEmail();
    generateOTP();
  }, []);

  const generateOTP = () => {
    const min = 1000;
    const max = 9999;
    const newOTP = Math.floor(Math.random() * (max - min + 1)) + min;
    setOTP(newOTP.toString());
  };

  const getEmail = () => {
    api.get("/setting/getMailId").then((res) => {
      setMailId(res.data.data[0]);
    });
  };

  const handleSignUp = async () => {
    // Name validation
    const nameRegex = /^[a-zA-Z ]+$/;
    if (!signupData.name || !nameRegex.test(signupData.name)) {
      Alert.alert("Validation Error", "Please enter a valid name.");
      return;
    }

    // Mobile validation
    const mobileRegex = /^(\+91[-\s]?)?[6-9]\d{9}$/; // Indian mobile format example: +91-XXXXXXXXXX
    if (!signupData.mobile || !mobileRegex.test(signupData.mobile)) {
      Alert.alert("Validation Error", "Please enter a valid mobile number.");
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!signupData.email || !emailRegex.test(signupData.email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!signupData.password || signupData.password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters long.");
      return;
    }

    const formData = {
      first_name: signupData.name,
      mobile: signupData.mobile,
      email: signupData.email,
      password: signupData.password,
    };

    try {
      const res = await api.post("/api/register", formData);
      Alert.alert("Success", "Account created successfully!");
      sendMail();
      navigation.navigate("LoginPage");
    } catch (error) {
      console.error("Signup error", error);
      Alert.alert("Error", "Something went wrong while signing up.");
    }
  };

  const sendMail = () => {
    const to = mailId.email;
    const text = JSON.stringify(signupData);
    const subject = "Registration";
    const dynamic_template_data = {
      first_name: signupData.name,
      email: signupData.email,
      password: signupData.password,
    };
    api
      .post("/commonApi/sendregisteremail", {
        to,
        text,
        subject,
        dynamic_template_data,
      })
      .then(() => {
        Alert.alert("Success", "Registration Email has been sent successfully.");
      })
      .catch((err) => {
        console.error("Email error", err);
        Alert.alert("Error", "Error sending email.");
      });
  };

  const handleChange = (field, value) => {
    setSignupData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
          <Text style={styles.text2}>Create New Account</Text>
          <Text style={styles.text3}>
            Looks like you don't have an account or connect with social networks
          </Text>
        </View>

        <Text style={styles.text4}>Full Name</Text>
        <TextInput
          placeholder="John Watson"
          value={signupData.name}
          onChangeText={(value) => handleChange("name", value)}
          style={styles.input}
        />

        <Text style={styles.text4}>Mobile No.</Text>
        <TextInput
          placeholder="+91- XXX XXXX XXX"
          value={signupData.mobile}
          onChangeText={(value) => handleChange("mobile", value)}
          style={styles.input2}
        />

        <Text style={styles.text4}>Email Id</Text>
        <TextInput
          placeholder="eg: smartwave@gmail.com"
          value={signupData.email}
          onChangeText={(value) => handleChange("email", value)}
          style={styles.input3}
        />

        <Text style={styles.text7}>Password</Text>
        <View style={styles.row2}>
          <TextInput
            placeholder="Enter your password"
            value={signupData.password}
            onChangeText={(value) => handleChange("password", value)}
            secureTextEntry={!passwordVisible}
            style={[styles.passinput, { flex: 1 }]}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image
              source={{
                uri: passwordVisible
                  ? "https://cdn-icons-png.flaticon.com/512/2767/2767146.png"
                  : "https://cdn-icons-png.flaticon.com/512/565/565655.png",
              }}
              resizeMode="contain"
              style={styles.passimage}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.text9}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.view2}>
          <Text
            style={styles.text10}
            onPress={() => navigation.navigate("LoginPage")}
          >
            Already have an account? Login
          </Text>
        </View>

        <View style={styles.view3}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/jq40nop0.png",
            }}
            resizeMode="stretch"
            style={styles.image3}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	button: {
		alignItems: "center",
		backgroundColor: "#1EB1C5",
		borderRadius: 10,
		paddingVertical: 17,
		marginBottom: 20,
		marginHorizontal: 30,
	},
	column: {
		marginBottom: 75,
		marginHorizontal: 34,
	},
	image: {
		width: 143,
		height: 54,
	},
	image2: {
		width: 16,
		height: 16,
		marginTop: 14,
	},
	image3: {
		width: 86,
		height: 1,
	},
	input: {
		color: "#595E64",
		fontSize: 14,
		marginBottom: 20,
		marginHorizontal: 30,
		backgroundColor: "#FFFFFF",
		borderColor: "#EEEFEE",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 16,
		paddingLeft: 12,
		paddingRight: 24,
	},
	input2: {
		color: "#9CA7B7",
		fontSize: 14,
		marginBottom: 20,
		marginHorizontal: 30,
		backgroundColor: "#FFFFFF",
		borderColor: "#EEEFEE",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 16,
		paddingLeft: 12,
		paddingRight: 24,
	},
	input3: {
		color: "#9CA7B7",
		fontSize: 14,
		marginBottom: 20,
		marginHorizontal: 30,
		backgroundColor: "#FFFFFF",
		borderColor: "#EEEFEE",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 16,
		paddingLeft: 12,
		paddingRight: 24,
	},
	row: {
		flexDirection: "row",
		marginBottom: 66,
	},
	row2: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#FFFFFF",
		borderColor: "#EEEFEE",
		borderRadius: 8,
		borderWidth: 1,
		paddingTop: 3,
		paddingBottom: 17,
		paddingLeft: 12,
		paddingRight: 26,
		marginBottom: 20,
		marginHorizontal: 30,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	text: {
		color: "#373737",
		fontSize: 17,
		fontWeight: "bold",
		marginVertical: 18,
		marginLeft: 47,
		marginRight: 59,
	},
	text2: {
		color: "#000000",
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 15,
	},
	text3: {
		color: "#9CA7B7",
		fontSize: 16,
		textAlign: "center",
	},
	text4: {
		color: "#595D64",
		fontSize: 16,
		marginBottom: 5,
		marginLeft: 30,
	},
	text5: {
		color: "#595D64",
		fontSize: 16,
		marginBottom: 5,
		marginLeft: 33,
	},
	text6: {
		color: "#595E64",
		fontSize: 14,
		marginLeft: 12,
	},
	text7: {
		color: "#595D64",
		marginBottom: 5,
		marginLeft: 30,
	},
	text8: {
		color: "#595E64",
	},
	text9: {
		color: "#FFFFFF",
		fontSize: 18,
	},
	text10: {
		color: "#595D64",
		fontSize: 14,
	},
	view: {
		backgroundColor: "#FFFFFF",
		borderColor: "#EEEFEE",
		borderRadius: 8,
		borderWidth: 1,
		paddingTop: 16,
		paddingBottom: 41,
		marginBottom: 20,
		marginHorizontal: 30,
	},
	view2: {
		alignItems: "center",
		marginBottom: 51,
	},
	view3: {
		height: 18,
		alignItems: "center",
		marginBottom: 18,
	},
	passtext: {
        color: "#595D64",
        marginBottom: 5,
        marginLeft: 30,
    },
    passrow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderColor: "#EEEFEE",
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical: 10,
        paddingLeft: 12,
        paddingRight: 10,
        marginBottom: 20,
        marginHorizontal: 30,
    },
    passinput: {
        color: "#595E64",
        fontSize: 14,
        backgroundColor: "#FFFFFF",
        flex: 1,
        paddingVertical: 12,
        paddingLeft: 10,
    },
    passimage: {
        width: 24,
        height: 24,
        tintColor: "#595D64", // Adjust icon color if needed
    },
});