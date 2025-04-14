import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, } from "react-native";
export default (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.row}>
					<Text style={styles.text}>
						{"9:41"}
					</Text>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/448jnn63.png"}} 
						resizeMode = {"stretch"}
						style={styles.image}
					/>
				</View>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/t79iv9au.png"}} 
					resizeMode = {"stretch"}
					style={styles.image2}
				/>
				<View style={styles.column}>
					<Text style={styles.text2}>
						{"Email Verification"}
					</Text>
					<Text style={styles.text3}>
						{"We need to register your mail before getting started !"}
					</Text>
				</View>
				<View style={styles.row2}>
					<View style={styles.view}>
						<Text style={styles.text4}>
							{"8"}
						</Text>
					</View>
					<View style={styles.view}>
						<Text style={styles.text4}>
							{"5"}
						</Text>
					</View>
					<View style={styles.view}>
						<Text style={styles.text5}>
							{"5"}
						</Text>
					</View>
					<View style={styles.view2}>
						<Text style={styles.text4}>
							{"3"}
						</Text>
					</View>
				</View>
				<View style={styles.view3}>
					<Text style={styles.text6}>
						{"Verify Email"}
					</Text>
				</View>
				<View style={styles.row3}>
					<Text style={styles.text7}>
						{"Change email id ?"}
					</Text>
					<Text style={styles.text8}>
						{"Send again"}
					</Text>
				</View>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/hwytuxff.png"}} 
					resizeMode = {"stretch"}
					style={styles.image3}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	column: {
		marginBottom: 73,
		marginHorizontal: 34,
	},
	image: {
		width: 143,
		height: 54,
	},
	image2: {
		width: 242,
		height: 242,
		marginBottom: 39,
	},
	image3: {
		width: 100,
		height: 1,
		marginBottom: 16,
	},
	row: {
		flexDirection: "row",
		marginBottom: 32,
	},
	row2: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 40,
		marginHorizontal: 30,
	},
	row3: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 154,
		marginHorizontal: 31,
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
		marginHorizontal: 39,
	},
	text4: {
		color: "#1EB1C5",
		fontSize: 22,
		marginHorizontal: 24,
	},
	text5: {
		color: "#1EB1C5",
		fontSize: 22,
		marginHorizontal: 22,
	},
	text6: {
		color: "#FFFFFF",
		fontSize: 18,
	},
	text7: {
		color: "#595D64",
		fontSize: 14,
		textAlign: "center",
		marginRight: 4,
		flex: 1,
	},
	text8: {
		color: "#1EB1C5",
		fontSize: 14,
		textAlign: "right",
		flex: 1,
	},
	view: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		borderColor: "#1EB1C5",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 21,
		marginRight: 34,
	},
	view2: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		borderColor: "#1EB1C5",
		borderRadius: 8,
		borderWidth: 1,
		paddingVertical: 21,
	},
	view3: {
		alignItems: "center",
		backgroundColor: "#1EB1C5",
		borderRadius: 10,
		paddingVertical: 18,
		marginBottom: 10,
		marginHorizontal: 30,
	},
});