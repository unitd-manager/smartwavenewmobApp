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
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/p9aljluq.png"}} 
						resizeMode = {"stretch"}
						style={styles.image}
					/>
				</View>
				<View style={styles.row2}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/gv9yeut1.png"}} 
						resizeMode = {"stretch"}
						style={styles.image2}
					/>
					<Text style={styles.text2}>
						{"Shipping Address"}
					</Text>
				</View>
				<Text style={styles.text3}>
					{"Shipping Address"}
				</Text>
				<View style={styles.row3}>
					<View style={styles.row4}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/u07pt03j.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
						<View style={styles.column}>
							<Text style={styles.text4}>
								{"Home"}
							</Text>
							<Text style={styles.text5}>
								{"112 Castle Street, Rolla Sharjah, UAE\n85213"}
							</Text>
						</View>
					</View>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/g4dupy84.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
				</View>
				<View style={styles.row3}>
					<View style={styles.row4}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/bk1dp1ow.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
						<View style={styles.column}>
							<Text style={styles.text4}>
								{"Office"}
							</Text>
							<Text style={styles.text5}>
								{"221 Tiger Building, Shaikh Zayed Road, Dubai UAE, 85214"}
							</Text>
						</View>
					</View>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/p95knpx2.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
				</View>
				<View style={styles.row5}>
					<View style={styles.row4}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/wm9bhn6g.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
						<View style={styles.column}>
							<Text style={styles.text4}>
								{"Friends"}
							</Text>
							<Text style={styles.text5}>
								{"221 Naif Street, Deira Dubai, UAE,\n85213"}
							</Text>
						</View>
					</View>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/w2s85tqe.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
				</View>
				<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
					<View style={styles.row6}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/pliu891v.png"}} 
							resizeMode = {"stretch"}
							style={styles.image5}
						/>
						<Text style={styles.text6}>
							{"Add New Shipping Address"}
						</Text>
					</View>
				</TouchableOpacity>
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
		backgroundColor: "#DFF6FB80",
		borderColor: "#1EB1C5",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: 7,
		marginBottom: 410,
		marginHorizontal: 34,
	},
	column: {
		flex: 1,
	},
	image: {
		width: 143,
		height: 54,
	},
	image2: {
		width: 24,
		height: 24,
		marginRight: 66,
	},
	image3: {
		width: 24,
		height: 24,
		marginRight: 10,
	},
	image4: {
		width: 24,
		height: 24,
	},
	image5: {
		width: 32,
		height: 32,
		marginRight: 5,
	},
	row: {
		flexDirection: "row",
		marginBottom: 8,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 25,
		marginLeft: 30,
	},
	row3: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		paddingVertical: 14,
		marginHorizontal: 30,
	},
	row4: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		marginRight: 12,
	},
	row5: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		paddingVertical: 14,
		marginBottom: 20,
		marginHorizontal: 30,
	},
	row6: {
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
		fontSize: 18,
		margin: 10,
	},
	text3: {
		color: "#000000",
		fontSize: 18,
		marginBottom: 20,
		marginLeft: 31,
	},
	text4: {
		color: "#000000",
		fontSize: 14,
		marginBottom: 5,
	},
	text5: {
		color: "#595E64",
		fontSize: 12,
	},
	text6: {
		color: "#1EB1C5",
		fontSize: 14,
		width: 172,
	},
});