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
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/2kbd5rfk.png"}} 
						resizeMode = {"stretch"}
						style={styles.image}
					/>
				</View>
				<View style={styles.row2}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/7owjzcpr.png"}} 
						resizeMode = {"stretch"}
						style={styles.image2}
					/>
					<Text style={styles.text2}>
						{"Enquiry Details"}
					</Text>
				</View>
				<View style={styles.view}>
					<View style={styles.column}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/ldk3qol3.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
						<Text style={styles.text3}>
							{"Welcome to"}
						</Text>
						<Text style={styles.text4}>
							{"Esther Howard"}
						</Text>
					</View>
				</View>
				<View style={styles.row3}>
					<View style={styles.column2}>
						<Text style={styles.text5}>
							{"Enquiry ID"}
						</Text>
						<Text style={styles.text6}>
							{"#ENQ-2025-0123"}
						</Text>
					</View>
					<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text7}>
							{"Active"}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.row4}>
					<Text style={styles.text8}>
						{"Created Date :"}
					</Text>
					<Text style={styles.text9}>
						{"Jan 15, 2025"}
					</Text>
				</View>
				<View style={styles.row4}>
					<Text style={styles.text8}>
						{"Expected Date :"}
					</Text>
					<Text style={styles.text9}>
						{"Jan 25, 2025"}
					</Text>
				</View>
				<View style={styles.row4}>
					<Text style={styles.text8}>
						{"Budget Range"}
					</Text>
					<Text style={styles.text10}>
						{"$50,00 - $60,00"}
					</Text>
				</View>
				<View style={styles.row5}>
					<Text style={styles.text8}>
						{"Preferred Contact"}
					</Text>
					<Text style={styles.text11}>
						{"Whatsapp"}
					</Text>
				</View>
				<Text style={styles.text12}>
					{"Payment Receipt"}
				</Text>
				<View style={styles.column3}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/qa0bw11n.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
					<Text style={styles.text13}>
						{"Upload your file here"}
					</Text>
				</View>
				<View style={styles.row6}>
					<View style={styles.row7}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/hwmyzywk.png"}} 
							resizeMode = {"stretch"}
							style={styles.image5}
						/>
						<Text style={styles.text14}>
							{"Payment-reciept.pdf"}
						</Text>
					</View>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/6ayelvu5.png"}} 
						resizeMode = {"stretch"}
						style={styles.image6}
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
		backgroundColor: "#DCFCE7",
		borderRadius: 9999,
		paddingVertical: 5,
		paddingHorizontal: 12,
	},
	column: {
		alignItems: "center",
		paddingHorizontal: 32,
	},
	column2: {
		paddingVertical: 1,
	},
	column3: {
		alignItems: "center",
		backgroundColor: "#F9FAFB",
		borderColor: "#9CA7B7",
		borderRadius: 10,
		borderWidth: 1,
		paddingTop: 20,
		paddingBottom: 40,
		paddingHorizontal: 113,
		marginBottom: 32,
		marginHorizontal: 30,
	},
	image: {
		width: 143,
		height: 54,
	},
	image2: {
		width: 24,
		height: 24,
		marginRight: 68,
	},
	image3: {
		width: 50,
		height: 50,
		marginBottom: 9,
	},
	image4: {
		width: 32,
		height: 32,
		marginBottom: 4,
	},
	image5: {
		width: 18,
		height: 18,
		marginRight: 5,
	},
	image6: {
		width: 15,
		height: 15,
	},
	row: {
		flexDirection: "row",
		marginBottom: 8,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 30,
		marginLeft: 30,
	},
	row3: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 17,
		marginHorizontal: 30,
	},
	row4: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 20,
		paddingHorizontal: 10,
		marginHorizontal: 30,
	},
	row5: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 20,
		paddingHorizontal: 10,
		marginBottom: 30,
		marginHorizontal: 30,
	},
	row6: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 91,
		marginHorizontal: 30,
	},
	row7: {
		flexDirection: "row",
		alignItems: "center",
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	text: {
		color: "#000000",
		fontSize: 17,
		fontWeight: "bold",
		marginVertical: 18,
		marginLeft: 31,
		marginRight: 12,
	},
	text2: {
		color: "#000000",
		fontSize: 20,
		margin: 10,
	},
	text3: {
		color: "#000000",
		fontSize: 12,
		marginBottom: 5,
	},
	text4: {
		color: "#000000",
		fontSize: 14,
	},
	text5: {
		color: "#9CA7B7",
		fontSize: 14,
		marginBottom: 4,
	},
	text6: {
		color: "#000000",
		fontSize: 16,
		fontWeight: "bold",
	},
	text7: {
		color: "#15803D",
		fontSize: 14,
	},
	text8: {
		color: "#9CA7B7",
		fontSize: 14,
		marginRight: 4,
		flex: 1,
	},
	text9: {
		color: "#000000",
		fontSize: 14,
		textAlign: "right",
		flex: 1,
	},
	text10: {
		color: "#1EB1C5",
		fontSize: 14,
		textAlign: "right",
		flex: 1,
	},
	text11: {
		color: "#200E32",
		fontSize: 14,
		textAlign: "right",
		flex: 1,
	},
	text12: {
		color: "#000000",
		fontSize: 18,
		marginBottom: 24,
		marginLeft: 32,
	},
	text13: {
		color: "#000000",
		fontSize: 12,
		width: 115,
	},
	text14: {
		color: "#000000",
		fontSize: 12,
	},
	view: {
		alignItems: "center",
		marginBottom: 30,
	},
});