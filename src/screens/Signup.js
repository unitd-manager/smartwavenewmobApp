import React, {useState} from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TextInput, TouchableOpacity, StyleSheet, } from "react-native";
export default ({navigation}) => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [password, setPassword] = useState("");


	const [textInput1, onChangeTextInput1] = useState('');
	const [textInput2, onChangeTextInput2] = useState('');
	const [textInput3, onChangeTextInput3] = useState('');
	const [textInput4, onChangeTextInput4] = useState('');
	const [textInput5, onChangeTextInput5] = useState('');
	const [textInput6, onChangeTextInput6] = useState('');


	
const handleSignUp = async () => {
	// Required fields check
	if (!textInput1 || !textInput2 || !textInput5 || !textInput6) {
	  Alert.alert("Validation Error", "Please fill all required fields.");
	  return;
	}
  
	const formData = {
	  customerName: textInput1,
	  address: textInput2,
	  userId: textInput3 || null,
	  password: password || null,
	  iecNo: textInput3 || null,
	  gstNo: textInput4 || null,
	  mobile: textInput5,
	  email: textInput6,
	};
  
	
	//   // Save user data to AsyncStorage
	//   await AsyncStorage.setItem('user', JSON.stringify(formData));
	api
	.post("/api/register", formData)
	.then((res) => {
	  Alert.alert("Success", "Account created successfully!");
  
	  // Optional: Navigate to Login or Home
	  navigation.navigate('LoginPage');}).catch((error)=>{
		console.error("Signup error", error);
		Alert.alert("Error", "Something went wrong while signing up.");
	  })
	
	  
	
  };
  


	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				
				<View style={styles.column}>
					<Text style={styles.text2}>
						{"Create New Account"}
					</Text>
					<Text style={styles.text3}>
						{"Looks Like you don't have an account or connect with social networks"}
					</Text>
				</View>
				<Text style={styles.text4}>
					{"Customer Name / Company Name"}
				</Text>
				<TextInput
					placeholder={"John watson"}
					value={textInput1}
					onChangeText={onChangeTextInput1}
					style={styles.input}
				/>
				<Text style={styles.text5}>
					{"Address"}
				</Text>
				<View style={styles.view}>
					
						<TextInput
					placeholder={"Enter address here"}
					value={textInput2}
					onChangeText={onChangeTextInput2}
					style={styles.text6}
				/>
				</View>
				<Text style={styles.text7}>
					{"User-Id (Optional)"}
				</Text>
				<TextInput
					placeholder={"HUS-BADRI21"}
					value={textInput3}
					onChangeText={onChangeTextInput3}
					style={styles.input}
				/>
				<Text style={styles.text7}>
					{"Password (Optional)"}
				</Text>
				<View style={styles.row2}>
					<Text style={styles.text8}>
						{"......|"}
					</Text>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/f1dq2jhk.png"}} 
						resizeMode = {"stretch"}
						style={styles.image2}
					/>
				</View>
				<View>
            <Text style={styles.text7}>{"Password (Optional)"}</Text>
            <View style={styles.row2}>
                <TextInput
                    placeholder={"Enter your password"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible} // Controls visibility
                    style={[styles.image2, { flex: 1 }]}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Image
                        source={{
                            uri: passwordVisible
                                ? "https://cdn-icons-png.flaticon.com/512/2767/2767146.png"  // Eye open icon
                                : "https://cdn-icons-png.flaticon.com/512/565/565655.png",  // Eye closed icon
                        }}
                        resizeMode="contain"
                        style={styles.passimage}
                    />
                </TouchableOpacity>
            </View>
        </View>

				<Text style={styles.text7}>
					{"IEC NO: (Optional No)"}
				</Text>
				<TextInput
					placeholder={"eg : 1234567890"}
					value={textInput3}
					onChangeText={onChangeTextInput3}
					style={styles.input2}
				/>
				<Text style={styles.text7}>
					{"GST NO: (Optional No)"}
				</Text>
				<TextInput
					placeholder={"eg: 27AAAPA1234A1Z5"}
					value={textInput4}
					onChangeText={onChangeTextInput4}
					style={styles.input2}
				/>
				<Text style={styles.text4}>
					{"Mobile  No."}
				</Text>
				<TextInput
					placeholder={"+91- XXX XXXX XXX"}
					value={textInput5}
					onChangeText={onChangeTextInput5}
					style={styles.input2}
				/>
				<Text style={styles.text4}>
					{"Email Id:"}
				</Text>
				<TextInput
					placeholder={"eg: smartwave@gmail.com"}
					value={textInput6}
					onChangeText={onChangeTextInput6}
					style={styles.input3}
				/>
				<TouchableOpacity style={styles.button} onPress={()=>handleSignUp()}>
					<Text style={styles.text9}>
						{"Sign Up"}
					</Text>
				</TouchableOpacity>
				<View style={styles.view2}>
					<Text style={styles.text10} onPress={()=>navigation.navigate('LoginPage')}>
						{"Already have an account?  Login "}
					</Text>
				</View>
				<View style={styles.view3}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/jq40nop0.png"}} 
						resizeMode = {"stretch"}
						style={styles.image3}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
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
		marginBottom: 98,
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