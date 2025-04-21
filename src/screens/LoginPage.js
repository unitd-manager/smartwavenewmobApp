import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import api from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ navigation }) {
	const [email, setEmail] = useState("smartwave@gmail.com");
	const [password, setPassword] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [errors, setErrors] = useState({});

    const validateInputs = () => {
        let valid = true;
        let newErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email";
            valid = false;
        }

        if (!password) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = () => {
		const signinData={email:email, password:password}
        if (validateInputs()) {
			api.post("/api/login", signinData).then((res) => {
				if (res && res.status === "400") {
				  alert("Invalid Username or Password");
				  
				} 
				else {
				  AsyncStorage.setItem("user", JSON.stringify(res.data.data));
				  AsyncStorage.setItem("token", JSON.stringify(res.data.token));
		
				  setTimeout(()=>{
		navigation.navigate(' ')
				  },300)
				}
			  }).catch((err)=>{
				alert("Invalid Username or Password");
			  });
        }
    };
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				

				{/* Logo */}
				{/* <Image
					source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/grso2jue.png" }}
					resizeMode="stretch"
					style={styles.image2}
				/> */}

				{/* Icon */}
				{/* <View style={styles.view}>
					<Image
						source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/uxnnbz22.png" }}
						resizeMode="stretch"
						style={styles.image3}
					/>
				</View> */}

				{/* Sign-in Heading */}
				<View style={styles.column}>
					<Text style={styles.text2}>{"Please Sign In"}</Text>
					<Text style={styles.text3}>{"Enter your Dipstore account details for a personalised experience"}</Text>
				</View>

				{/* Email Input */}
				<View style={styles.column2}>
					<Text style={styles.text4}>{"Email"}</Text>
					<View style={styles.buttonRow}>
						<Image
							source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/vaf8uvi2.png" }}
							resizeMode="stretch"
							style={styles.image4}
						/>
						<TextInput
							style={styles.textInput}
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
						/>
						<Image
							source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/66n4tj2x.png" }}
							resizeMode="stretch"
							style={styles.image5}
						/>
					</View>
					{errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
					{/* Password Input */}
					<Text style={styles.text4}>{"Password"}</Text>
					<View style={styles.row2}>
						<TextInput
							placeholder="Enter password"
							value={password}
							onChangeText={setPassword}
							secureTextEntry={!passwordVisible}
							style={[styles.textInput, { flex: 1 }]}
						/>
						<TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
							<Image
								source={{
									uri: passwordVisible
										? "https://cdn-icons-png.flaticon.com/512/2767/2767146.png" // Eye open
										: "https://cdn-icons-png.flaticon.com/512/565/565655.png", // Eye closed
								}}
								resizeMode="contain"
								style={styles.image7}
							/>
						</TouchableOpacity>
					</View>
					{errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
					{/* Forgot Password */}
					<View style={styles.view2}>
						<Text style={styles.text7} onPress={() => navigation.navigate('ForgotPassword')}>
							{"Forgot Password?"}
						</Text>
					</View>

					{/* Sign-in Button */}
					<TouchableOpacity style={styles.button} onPress={handleLogin}>
						<Text style={styles.text8}>{"Sign In"}</Text>
					</TouchableOpacity>
				</View>

				{/* Signup Link */}
				<View style={styles.view3}>
					<Text style={styles.text9} onPress={() => navigation.navigate('Signup')}>
						{"First time here? Sign Up"}
					</Text>
				</View>

				{/* Bottom Image */}
				<View style={styles.view4}>
					<Image
						source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/5zqjo0rm.png" }}
						resizeMode="stretch"
						style={styles.image8}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

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
		marginHorizontal: 1,
	},
	buttonRow: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderColor: "#EEEFEE",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 16,
		paddingHorizontal: 12,
		marginBottom: 20,
	},
	column: {
		marginBottom: 55,
		marginHorizontal: 34,
	},
	column2: {
		marginBottom: 20,
		marginHorizontal: 30,
	},
	image: { width: 143, height: 54 },
	image2: { width: 24, height: 24, marginBottom: 14, marginLeft: 30 },
	image3: { width: 232, height: 232 },
	image4: { width: 16, height: 16, marginRight: 10 },
	image5: { width: 16, height: 16 },
	image7: { width: 24, height: 24, tintColor: "#595D64" },
	image8: { width: 100, height: 1 },
	row: {
		flexDirection: "row",
		marginBottom: 14,
	},
	row2: {
		flexDirection: "row",
		backgroundColor: "#FFFFFF",
		borderColor: "#1EB1C5",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 12,
		paddingHorizontal: 12,
		marginBottom: 9,
		alignItems: "center",
	},
	textInput: {
		color: "#595E64",
		fontSize: 14,
		flex: 1,
		paddingVertical: 12,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	errorText: { color: "red", fontSize: 12, marginBottom: 10, marginLeft: 12 },
	text: { color: "#373737", fontSize: 17, fontWeight: "bold", marginVertical: 18, marginLeft: 47 },
	text2: { color: "#000000", fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
	text3: { color: "#9CA7B7", fontSize: 16, textAlign: "center" },
	text4: { color: "#595D64", fontSize: 16, marginBottom: 5, marginLeft: 12 },
	text5: { color: "#595E64", fontSize: 14, textAlign: "center", flex: 1 },
	text7: { color: "#1EB1C5", fontSize: 14 },
	text8: { color: "#FFFFFF", fontSize: 18 },
	text9: { color: "#595D64", fontSize: 14 },
	view: { alignItems: "center", marginBottom: 36 },
	view2: { alignItems: "flex-end", marginBottom: 40 },
	view3: { alignItems: "center", marginBottom: 22 },
	view4: { height: 1, alignItems: "center", marginBottom: 16 },
});
