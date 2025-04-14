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
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/m6ai4rri.png"}} 
						resizeMode = {"stretch"}
						style={styles.image}
					/>
				</View>
				<View style={styles.row2}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/rwb1m9ss.png"}} 
						resizeMode = {"stretch"}
						style={styles.image2}
					/>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/vph876by.png"}} 
						resizeMode = {"stretch"}
						style={styles.image3}
					/>
				</View>
				<View style={styles.column}>
					<Text style={styles.text2}>
						{"Enter New Password"}
					</Text>
					<Text style={styles.text3}>
						{"Please enter new password "}
					</Text>
				</View>
				<Text style={styles.text4}>
					{"Password"}
				</Text>
				<View style={styles.row3}>
					<Text style={styles.text5}>
						{"......|"}
					</Text>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/g20g5jt0.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
				</View>
				<Text style={styles.text4}>
					{"Confirm Password"}
				</Text>
				<View style={styles.row4}>
					<Text style={styles.text6}>
						{"........"}
					</Text>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/r3hs46ot.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
				</View>
				<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
					<Text style={styles.text7}>
						{"Sign Up"}
					</Text>
				</TouchableOpacity>
				<View style={styles.view}>
					<Text style={styles.text8}>
						{"Already have an account?  Login "}
					</Text>
				</View>
				<View style={styles.view2}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/4cwwft9l.png"}} 
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
		marginBottom: 20,
		marginHorizontal: 30,
	},
	column: {
		marginBottom: 61,
		marginHorizontal: 34,
	},
	image: {
		width: 143,
		height: 54,
	},
	image2: {
		width: 24,
		height: 24,
		marginRight: 26,
	},
	image3: {
		width: 242,
		height: 242,
		marginTop: 18,
	},
	image4: {
		width: 16,
		height: 16,
		marginTop: 14,
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
		marginBottom: 39,
		marginLeft: 30,
	},
	row3: {
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
	row4: {
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
		color: "#595D64",
		fontSize: 16,
		marginBottom: 5,
		marginLeft: 42,
	},
	text5: {
		color: "#595E64",
	},
	text6: {
		color: "#595E64",
		fontSize: 40,
	},
	text7: {
		color: "#FFFFFF",
		fontSize: 18,
	},
	text8: {
		color: "#595D64",
		fontSize: 14,
	},
	view: {
		alignItems: "center",
		marginBottom: 60,
	},
	view2: {
		height: 1,
		alignItems: "center",
		marginBottom: 16,
	},
});