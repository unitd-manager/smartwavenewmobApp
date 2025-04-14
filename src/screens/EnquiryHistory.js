import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, } from "react-native";
export default (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.column}>
					<View style={styles.row}>
						<Text style={styles.text}>
							{"9:41"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/p914nldc.png"}} 
							resizeMode = {"stretch"}
							style={styles.image}
						/>
					</View>
					<View style={styles.row2}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/45f10auz.png"}} 
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
						<Text style={styles.text2}>
							{"Enquiry History"}
						</Text>
					</View>
				</View>
				<View style={styles.row3}>
					<View style={styles.column2}>
						<View style={styles.view}>
							<Text style={styles.text3}>
								{"Total Enquiries"}
							</Text>
						</View>
						<View style={styles.view2}>
							<Text style={styles.text4}>
								{"24"}
							</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.buttonColumn} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text5}>
							{"Pending"}
						</Text>
						<Text style={styles.text6}>
							{"3"}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.column3}>
					<View style={styles.row4}>
						<View style={styles.column4}>
							<Text style={styles.text7}>
								{"E-ID #2025-0123"}
							</Text>
							<Text style={styles.text8}>
								{"Jan 15, 2025"}
							</Text>
						</View>
						<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
							<Text style={styles.text9}>
								{"Approved"}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row5}>
						<Text style={styles.text10}>
							{"Preferred Contact"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/bdres8r8.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
					</View>
				</View>
				<View style={styles.column3}>
					<View style={styles.row4}>
						<View style={styles.column4}>
							<Text style={styles.text7}>
								{"Order #2458"}
							</Text>
							<Text style={styles.text8}>
								{"Jan 15, 2025"}
							</Text>
						</View>
						<TouchableOpacity style={styles.button2} onPress={()=>alert('Pressed!')}>
							<Text style={styles.text11}>
								{"Rejected"}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row5}>
						<Text style={styles.text10}>
							{"Preferred Contact"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/f8h5vkr3.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
					</View>
				</View>
				<View style={styles.column3}>
					<View style={styles.row4}>
						<View style={styles.column4}>
							<Text style={styles.text7}>
								{"Order #2458"}
							</Text>
							<Text style={styles.text8}>
								{"Jan 15, 2025"}
							</Text>
						</View>
						<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
							<Text style={styles.text9}>
								{"Approved"}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row5}>
						<Text style={styles.text10}>
							{"Preferred Contact"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/wag3lu8d.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
					</View>
				</View>
				<View style={styles.column3}>
					<View style={styles.row4}>
						<View style={styles.column4}>
							<Text style={styles.text7}>
								{"Order #2458"}
							</Text>
							<Text style={styles.text8}>
								{"Jan 15, 2025"}
							</Text>
						</View>
						<TouchableOpacity style={styles.button3} onPress={()=>alert('Pressed!')}>
							<Text style={styles.text12}>
								{"Pending"}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row5}>
						<Text style={styles.text10}>
							{"Preferred Contact"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/nuj3qtnu.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
					</View>
				</View>
				<View style={styles.column3}>
					<View style={styles.row4}>
						<View style={styles.column4}>
							<Text style={styles.text7}>
								{"Order #2458"}
							</Text>
							<Text style={styles.text8}>
								{"Jan 15, 2025"}
							</Text>
						</View>
						<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
							<Text style={styles.text9}>
								{"Approved"}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row5}>
						<Text style={styles.text10}>
							{"Preferred Contact"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/zmxu49pm.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
					</View>
				</View>
				<View style={styles.column5}>
					<View style={styles.row4}>
						<View style={styles.column4}>
							<Text style={styles.text7}>
								{"Order #2458"}
							</Text>
							<Text style={styles.text8}>
								{"Jan 15, 2025"}
							</Text>
						</View>
						<TouchableOpacity style={styles.button4} onPress={()=>alert('Pressed!')}>
							<Text style={styles.text12}>
								{"Pending"}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row5}>
						<Text style={styles.text10}>
							{"Preferred Contact"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/fx92g9y1.png"}} 
							resizeMode = {"stretch"}
							style={styles.image4}
						/>
					</View>
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
		paddingVertical: 4,
		paddingHorizontal: 12,
	},
	button2: {
		backgroundColor: "#FEE2E2",
		borderRadius: 9999,
		paddingVertical: 4,
		paddingHorizontal: 12,
	},
	button3: {
		backgroundColor: "#FEF9C3",
		borderRadius: 9999,
		paddingVertical: 5,
		paddingHorizontal: 18,
	},
	button4: {
		backgroundColor: "#FEF9C3",
		borderRadius: 9999,
		paddingVertical: 4,
		paddingHorizontal: 18,
	},
	buttonColumn: {
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		paddingVertical: 16,
		shadowColor: "#0000000D",
		shadowOpacity: 0.1,
		shadowOffset: {
		    width: 0,
		    height: 1
		},
		shadowRadius: 2,
		elevation: 2,
	},
	column: {
		alignItems: "flex-start",
		backgroundColor: "#FFFFFF",
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
		paddingBottom: 10,
		marginBottom: 30,
	},
	column2: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		paddingVertical: 16,
		marginRight: 12,
		shadowColor: "#0000000D",
		shadowOpacity: 0.1,
		shadowOffset: {
		    width: 0,
		    height: 1
		},
		shadowRadius: 2,
		elevation: 2,
	},
	column3: {
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		paddingVertical: 12,
		marginBottom: 10,
		marginHorizontal: 30,
		shadowColor: "#0000000D",
		shadowOpacity: 0.1,
		shadowOffset: {
		    width: 0,
		    height: 1
		},
		shadowRadius: 2,
		elevation: 2,
	},
	column4: {
		alignItems: "center",
		paddingVertical: 1,
	},
	column5: {
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		paddingTop: 12,
		marginHorizontal: 30,
		shadowColor: "#0000000D",
		shadowOpacity: 0.1,
		shadowOffset: {
		    width: 0,
		    height: 1
		},
		shadowRadius: 2,
		elevation: 2,
	},
	image: {
		width: 143,
		height: 54,
	},
	image2: {
		width: 24,
		height: 24,
		marginRight: 67,
	},
	image3: {
		width: 24,
		height: 24,
	},
	image4: {
		width: 24,
		height: 23,
	},
	row: {
		flexDirection: "row",
		marginBottom: 8,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 30,
	},
	row3: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 30,
		marginHorizontal: 30,
	},
	row4: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
		marginHorizontal: 16,
	},
	row5: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 16,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#F9FAFB",
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
		color: "#6B7280",
		fontSize: 14,
		marginRight: 43,
	},
	text4: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		marginRight: 115,
	},
	text5: {
		color: "#6B7280",
		fontSize: 14,
		marginTop: 1,
		marginBottom: 5,
		marginLeft: 16,
		marginRight: 87,
	},
	text6: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 2,
		marginLeft: 16,
		marginRight: 127,
	},
	text7: {
		color: "#000000",
		fontSize: 14,
		marginBottom: 5,
	},
	text8: {
		color: "#9CA7B7",
		fontSize: 12,
	},
	text9: {
		color: "#16A34A",
		fontSize: 12,
	},
	text10: {
		color: "#000000",
		fontSize: 14,
		flex: 1,
	},
	text11: {
		color: "#DC2626",
		fontSize: 12,
	},
	text12: {
		color: "#CA8A04",
		fontSize: 12,
	},
	view: {
		alignItems: "flex-end",
		paddingVertical: 1,
		marginBottom: 4,
		marginHorizontal: 16,
	},
	view2: {
		alignItems: "flex-end",
		paddingVertical: 2,
		marginHorizontal: 16,
	},
});