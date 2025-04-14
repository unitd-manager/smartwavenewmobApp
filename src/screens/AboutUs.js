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
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/wgiv5igx.png"}} 
						resizeMode = {"stretch"}
						style={styles.image}
					/>
				</View>
				<View style={styles.row2}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/eamgmf4j.png"}} 
						resizeMode = {"stretch"}
						style={styles.image2}
					/>
					<Text style={styles.text2}>
						{"About Us"}
					</Text>
				</View>
				<View style={styles.column}>
					<Text style={styles.text3}>
						{"Our Story"}
					</Text>
					<Text style={styles.text4}>
						{"Founded in 2020, Smart Wave has revolutionized the way people shop online. We believe in making quality products accessible to everyone while providing an exceptional shopping experience."}
					</Text>
				</View>
				<View style={styles.row3}>
					<View style={styles.column2}>
						<Text style={styles.text5}>
							{"5M+"}
						</Text>
						<Text style={styles.text4}>
							{"Customers"}
						</Text>
					</View>
					<View style={styles.column3}>
						<Text style={styles.text5}>
							{"50K+"}
						</Text>
						<Text style={styles.text4}>
							{"Products"}
						</Text>
					</View>
					<View style={styles.column4}>
						<Text style={styles.text5}>
							{"100+"}
						</Text>
						<Text style={styles.text4}>
							{"Countries"}
						</Text>
					</View>
				</View>
				<View style={styles.column5}>
					<View style={styles.row4}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/qitoo4r3.png"}} 
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
						<Text style={styles.text6}>
							{"Our Mission"}
						</Text>
					</View>
					<Text style={styles.text4}>
						{"To provide innovative shopping solutions that make life easier for our customers while maintaining the highest standards of quality and service."}
					</Text>
				</View>
				<Text style={styles.text7}>
					{"Our Values"}
				</Text>
				<View style={styles.row5}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/58mq8kqo.png"}} 
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
					<View >
						<Text style={styles.text8}>
							{"Quality First"}
						</Text>
						<Text style={styles.text9}>
							{"We never compromise on the quality of our products and services."}
						</Text>
					</View>
				</View>
				<View style={styles.row5}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/421vh3sd.png"}} 
						resizeMode = {"stretch"}
						style={styles.image5}
					/>
					<View >
						<Text style={styles.text8}>
							{"Customer Centric"}
						</Text>
						<Text style={styles.text10}>
							{"Our customers are at the heart of everything we do."}
						</Text>
					</View>
				</View>
				<View style={styles.row6}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/ykac42nq.png"}} 
						resizeMode = {"stretch"}
						style={styles.image6}
					/>
					<View >
						<Text style={styles.text8}>
							{"Sustainability"}
						</Text>
						<Text style={styles.text10}>
							{"Committed to environmental responsibility in our operations."}
						</Text>
					</View>
				</View>
				<View style={styles.column6}>
					<View style={styles.view}>
						<Text style={styles.text11}>
							{"Get in Touch"}
						</Text>
					</View>
					<View style={styles.column7}>
						<View style={styles.row7}>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/v0e2emzs.png"}} 
								resizeMode = {"stretch"}
								style={styles.image7}
							/>
							<Text style={styles.text4}>
								{"support@companyname.com"}
							</Text>
						</View>
						<View style={styles.row8}>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/xeuhdej6.png"}} 
								resizeMode = {"stretch"}
								style={styles.image7}
							/>
							<Text style={styles.text4}>
								{"+1 (555) 123-4567"}
							</Text>
						</View>
						<View style={styles.row9}>
							<Image
								source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/souo26sx.png"}} 
								resizeMode = {"stretch"}
								style={styles.image8}
							/>
							<Text style={styles.text12}>
								{"123 Commerce St, New York, NY 10001"}
							</Text>
						</View>
					</View>
					<View style={styles.row10}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/dqz52nlv.png"}} 
							resizeMode = {"stretch"}
							style={styles.image9}
						/>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/issiq22n.png"}} 
							resizeMode = {"stretch"}
							style={styles.image9}
						/>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/vghcyurs.png"}} 
							resizeMode = {"stretch"}
							style={styles.image9}
						/>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/3brxuklv.png"}} 
							resizeMode = {"stretch"}
							style={styles.image10}
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
	column: {
		marginBottom: 42,
		marginHorizontal: 30,
	},
	column2: {
		alignItems: "center",
		paddingVertical: 1,
		paddingHorizontal: 18,
		marginRight: 16,
	},
	column3: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 1,
		paddingHorizontal: 23,
		marginRight: 12,
	},
	column4: {
		alignItems: "center",
	},
	column5: {
		alignItems: "flex-start",
		marginBottom: 42,
		marginHorizontal: 30,
	},
	column6: {
		alignItems: "flex-start",
		backgroundColor: "#F9FAFB",
		paddingTop: 42,
		paddingBottom: 24,
	},
	column7: {
		alignItems: "flex-start",
		marginBottom: 24,
		marginHorizontal: 32,
	},
	image: {
		width: 143,
		height: 54,
	},
	image2: {
		width: 24,
		height: 24,
		marginRight: 95,
	},
	image3: {
		width: 48,
		height: 48,
		marginRight: 16,
	},
	image4: {
		width: 28,
		height: 40,
		marginRight: 16,
	},
	image5: {
		width: 35,
		height: 40,
		marginRight: 16,
	},
	image6: {
		width: 31,
		height: 40,
		marginRight: 16,
	},
	image7: {
		width: 16,
		height: 16,
		marginRight: 12,
	},
	image8: {
		width: 12,
		height: 16,
		marginRight: 12,
	},
	image9: {
		width: 40,
		height: 40,
		marginRight: 16,
	},
	image10: {
		width: 40,
		height: 40,
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
		alignItems: "center",
		marginBottom: 42,
		marginHorizontal: 30,
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	row5: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 26,
		marginLeft: 30,
	},
	row6: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 45,
		marginLeft: 30,
	},
	row7: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 2,
		marginBottom: 16,
	},
	row8: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 3,
		marginBottom: 16,
	},
	row9: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 4,
	},
	row10: {
		flexDirection: "row",
		marginHorizontal: 30,
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
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
	},
	text4: {
		color: "#4B5563",
		fontSize: 14,
	},
	text5: {
		color: "#1EB1C5",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 3,
	},
	text6: {
		color: "#000000",
		fontSize: 18,
		fontWeight: "bold",
	},
	text7: {
		color: "#000000",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 17,
		marginHorizontal: 30,
	},
	text8: {
		color: "#000000",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 2,
	},
	text9: {
		color: "#4B5563",
		fontSize: 14,
		width: 284,
	},
	text10: {
		color: "#4B5563",
		fontSize: 14,
		width: 264,
	},
	text11: {
		color: "#000000",
		fontSize: 18,
		fontWeight: "bold",
		marginRight: 219,
	},
	text12: {
		color: "#4B5563",
		fontSize: 14,
		flex: 1,
	},
	view: {
		alignItems: "flex-end",
		paddingVertical: 2,
		marginBottom: 16,
		marginHorizontal: 32,
	},
});