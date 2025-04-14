import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, Text, Image, TouchableOpacity, StyleSheet, } from "react-native";
import api from "../constants/api";
import imageBase from "../constants/imageBase";

export default ({route}) => {
	const { productId } = route.params || {};
	
const[product,setProduct]=useState({});

	useEffect(() => {
	
		api
		  .post("/product/getProductbyproductId", { product_id: productId })
		  .then((res) => {
			res.data.data[0].tag = String(res.data.data[0].tag).split(",");
			res.data.data[0].images = String(res.data.data[0].images).split(",");
			setProduct(res.data.data[0]);
			console.log('product',res.data.data[0]);
		  })
		  .catch((err) => {
			console.log(err);
		  });
	  }, [productId]);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<ImageBackground 
					source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/yp2hw732.png"}} 
					resizeMode = {'stretch'}
					style={styles.column}
					>
					
					<View style={styles.row2}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/o94ug29m.png"}} 
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
						<Text style={styles.text2}>
							{"Product Details"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/o94ug29m.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
					</View>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/hhra1eqf.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
				</ImageBackground>
				<View style={styles.row3}>
					<Text style={styles.text3}>
						{product?.product_type}
					</Text>
					<View style={styles.row4}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/n1jclbe5.png"}} 
							resizeMode = {"stretch"}
							style={styles.image5}
						/>
						<Text style={styles.text4}>
							{"4.9"}
						</Text>
					</View>
				</View>
				<View style={styles.row5}>
					<Text style={styles.text5}>
						{product?.title}
					</Text>
					<View style={styles.row4}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/74exovt6.png"}} 
							resizeMode = {"stretch"}
							style={styles.image6}
						/>
						<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
							<Text style={styles.text6}>
								{"1"}
							</Text>
						</TouchableOpacity>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/h20mzbsi.png"}} 
							resizeMode = {"stretch"}
							style={styles.image7}
						/>
					</View>
				</View>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/6hl7r52x.png"}} 
					resizeMode = {"stretch"}
					style={styles.image8}
				/>
				<View style={styles.row6}>
					<Text style={styles.text7}>
						{"Product Detail"}
					</Text>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/3h07bbwo.png"}} 
						resizeMode = {"stretch"}
						style={styles.image9}
					/>
				</View>
				<Text style={styles.text8}>
					{product?.description}
				</Text>
				<View style={styles.view}>
					<TouchableOpacity style={styles.buttonRow} onPress={()=>alert('Pressed!')}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/pev9ywvi.png"}} 
							resizeMode = {"stretch"}
							style={styles.image10}
						/>
						<Text style={styles.text9}>
							{"Add to bag"}
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
		backgroundColor: "#FFFFFF",
		borderColor: "#EEEFEE",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 13,
		marginRight: 15,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#1EB1C5",
		borderRadius: 10,
		paddingVertical: 11,
		marginHorizontal: 32,
	},
	column: {
		alignItems: "center",
		paddingBottom: 19,
		marginBottom: 32,
	},
	image: {
		width: 143,
		height: 54,
	},
	image2: {
		width: 24,
		height: 24,
		marginTop: 7,
		marginRight: 68,
	},
	image3: {
		width: 40,
		height: 40,
		marginVertical: 8,
	},
	image4: {
		width: 43,
		height: 6,
	},
	image5: {
		width: 14,
		height: 14,
		marginRight: 4,
	},
	image6: {
		width: 12,
		height: 1,
		marginRight: 15,
	},
	image7: {
		width: 12,
		height: 12,
	},
	image8: {
		height: 1,
		marginBottom: 25,
		marginHorizontal: 31,
	},
	image9: {
		width: 24,
		height: 24,
	},
	image10: {
		width: 24,
		height: 24,
		marginRight: 9,
	},
	row: {
		flexDirection: "row",
		marginBottom: 8,
	},
	row2: {
		flexDirection: "row",
		marginBottom: 215,
		marginHorizontal: 30,
	},
	row3: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
		marginHorizontal: 32,
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
	},
	row5: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		marginLeft: 32,
	},
	row6: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		marginHorizontal: 32,
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
		textAlign: "center",
		marginVertical: 10,
		marginLeft: 10,
		marginRight: 22,
		flex: 1,
	},
	text3: {
		color: "#9CA7B7",
		fontSize: 14,
		flex: 1,
	},
	text4: {
		color: "#9CA7B7",
		fontSize: 14,
	},
	text5: {
		color: "#000000",
		fontSize: 18,
		marginRight: 25,
		width: 216,
	},
	text6: {
		color: "#000000",
		fontSize: 14,
		fontWeight: "bold",
	},
	text7: {
		color: "#000000",
		fontSize: 18,
		flex: 1,
	},
	text8: {
		color: "#595E64",
		fontSize: 14,
		marginBottom: 163,
		marginLeft: 31,
		width: 310,
	},
	text9: {
		color: "#FFFFFF",
		fontSize: 16,
	},
	view: {
		backgroundColor: "#FFFFFF",
		borderColor: "#DFF6FB",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		borderWidth: 1,
		paddingVertical: 19,
		shadowColor: "#959DA533",
		shadowOpacity: 0.2,
		shadowOffset: {
		    width: 8,
		    height: 0
		},
		shadowRadius: 24,
		elevation: 24,
	},
});