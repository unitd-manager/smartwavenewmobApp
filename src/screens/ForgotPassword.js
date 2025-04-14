import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, } from "react-native";
export default (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.row}>
					<Text style={styles.text}>
						{"9:41"}
					</Text>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/g7ccgay2.png"}} 
						resizeMode = {"stretch"}
						style={styles.image}
					/>
				</View>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/3cpghuc1.png"}} 
					resizeMode = {"stretch"}
					style={styles.image2}
				/>
				<View style={styles.column}>
					<Text style={styles.text2}>
						{"Forgot Password"}
					</Text>
					<Text style={styles.text3}>
						{"Select which contact details should we use to rest your password."}
					</Text>
				</View>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/r5ptcda9.png"}} 
					resizeMode = {"stretch"}
					style={styles.image3}
				/>
				<View style={styles.row2}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/ptle2c78.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
					<View style={styles.column2}>
						<Text style={styles.text4}>
							{"Send OTP via SMS"}
						</Text>
						<Text style={styles.text5}>
							{"(+1) 555-0104"}
						</Text>
					</View>
				</View>
				<View style={styles.row3}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/3tz20stc.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
					<View style={styles.column2}>
						<Text style={styles.text4}>
							{"Send OTP via Email"}
						</Text>
						<Text style={styles.text6}>
							{"smartwave@gmail.com"}
						</Text>
					</View>
				</View>
				<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
					<Text style={styles.text7}>
						{"Continue"}
					</Text>
				</TouchableOpacity>
				<View style={styles.view}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/6p7zgcxz.png"}} 
						resizeMode = {"stretch"}
						style={styles.image5}
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
		marginBottom: 83,
		marginHorizontal: 30,
	},
	column: {
		marginBottom: 66,
		marginHorizontal: 34,
	},
	column2: {
		alignItems: "center",
	},
	image: {
		width: 143,
		height: 54,
	},
	image2: {
		width: 24,
		height: 24,
		marginBottom: 28,
		marginLeft: 30,
	},
	image3: {
		height: 185,
		marginBottom: 54,
		marginHorizontal: 34,
	},
	image4: {
		width: 44,
		height: 44,
		marginRight: 38,
	},
	image5: {
		width: 100,
		height: 1,
	},
	row: {
		flexDirection: "row",
		marginBottom: 14,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderColor: "#EEEFEE",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 13,
		paddingHorizontal: 20,
		marginBottom: 28,
		marginHorizontal: 30,
	},
	row3: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderColor: "#1EB1C5",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 13,
		paddingHorizontal: 20,
		marginBottom: 46,
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
		color: "#D0D0D0",
		fontSize: 14,
		marginBottom: 6,
	},
	text5: {
		color: "#595D64",
		fontSize: 14,
	},
	text6: {
		color: "#595E64",
		fontSize: 14,
	},
	text7: {
		color: "#FFFFFF",
		fontSize: 18,
	},
	view: {
		height: 1,
		alignItems: "center",
		marginBottom: 16,
	},
});