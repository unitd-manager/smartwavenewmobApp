import React from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.contentContainer}>
				<View style={styles.mainContent}>
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
				</View>
				
				<View style={styles.column2}>
					<TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Home")}>
						<Text style={styles.text5}>
							{"Go To Home"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button2} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text6}>
							{"View -E- Receipt"}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		fontFamily: 'Outfit-Regular',
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'space-between',
	},
	mainContent: {
		flex: 1,
		justifyContent: 'center',
	},
	button: {
		alignItems: "center",
		backgroundColor: "#1EB1C5",
		borderRadius: 10,
		paddingVertical: 11,
		marginBottom: 10,
		marginHorizontal: 34,
		fontFamily: 'Outfit-Regular',
	},
	button2: {
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		paddingVertical: 11,
		marginHorizontal: 34,
		fontFamily: 'Outfit-Regular',
	},
	column: {
		alignItems: "center",
		fontFamily: 'Outfit-Regular',
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
		fontFamily: 'Outfit-Regular',
		shadowOffset: {
			width: 8,
			height: 0
		},
		shadowRadius: 24,
		elevation: 24,
	},
	image3: {
		width: 187,
		height: 187,
	},
	text3: {
		color: "#000000",
		fontSize: 26,
		marginBottom: 10,
		fontFamily: 'Outfit-Regular',
	},
	text4: {
		color: "#9CA7B7",
		fontSize: 16,
		fontFamily: 'Outfit-Regular',
	},
	text5: {
		color: "#FFFFFF",
		fontSize: 16,
		fontFamily: 'Outfit-Regular',
	},
	text6: {
		color: "#1EB1C5",
		fontSize: 16,
		fontFamily: 'Outfit-Regular',
	},
	view: {
		alignItems: "center",
		marginBottom: 30,
		fontFamily: 'Outfit-Regular',
	},
	view2: {
		alignItems: "center",
		marginBottom: 20,
		fontFamily: 'Outfit-Regular',
	},
});