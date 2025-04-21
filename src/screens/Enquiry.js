import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, } from "react-native";
export default (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				
				<View style={styles.row2}>
					{/* <Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/u4xcvyyi.png"}} 
						resizeMode = {"stretch"}
						style={styles.image2}
					/>
					<Text style={styles.text2}>
						{"Enquiry"}
					</Text> */}
				</View>
				<View style={styles.view}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/4snqu74a.png"}} 
						resizeMode = {"stretch"}
						style={styles.image3}
					/>
				</View>
				<View style={styles.view2}>
					<View style={styles.column}>
						<Text style={styles.text3}>
							{"Enquiry Successful!"}
						</Text>
						<Text style={styles.text4}>
							{"We will get back to you soon..."}
						</Text>
					</View>
				</View>
				{/* <View style={styles.column2}>
					<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text5}>
							{"View Enquiries"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button2} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text6}>
							{"View -E- Receipt"}
						</Text>
					</TouchableOpacity>
				</View> */}
				<View style={styles.column2}>
					<TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("home")}>
						<Text style={styles.text5}>
							{"Go To Home"}
						</Text>
					</TouchableOpacity>
					
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
		paddingVertical: 11,
		marginBottom: 10,
		marginHorizontal: 34,
	},
	button2: {
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		paddingVertical: 11,
		marginHorizontal: 34,
	},
	column: {
		alignItems: "center",
	},
	column2: {
		backgroundColor: "#FFFFFF",
		borderColor: "#DFF6FB",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		borderWidth: 1,
		paddingVertical: 25,
		shadowColor: "#959DA533",
		shadowOpacity: 0.2,
		shadowOffset: {
		    width: 8,
		    height: 0
		},
		shadowRadius: 24,
		elevation: 24,
	},
	image: {
		width: 143,
		height: 54,
	},
	image2: {
		width: 24,
		height: 24,
		marginRight: 103,
	},
	image3: {
		width: 187,
		height: 187,
	},
	row: {
		flexDirection: "row",
		marginBottom: 8,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 145,
		marginLeft: 30,
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
		fontSize: 26,
		fontWeight: "bold",
		marginBottom: 10,
	},
	text4: {
		color: "#9CA7B7",
		fontSize: 16,
	},
	text5: {
		color: "#FFFFFF",
		fontSize: 16,
	},
	text6: {
		color: "#1EB1C5",
		fontSize: 16,
	},
	view: {
		alignItems: "center",
		marginBottom: 30,
	},
	view2: {
		alignItems: "center",
		marginBottom: 202,
	},
});