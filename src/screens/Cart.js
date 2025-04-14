
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import api from '../constants/api';
import imageBase from "../constants/imageBase";

 const CartScreen = ({navigation}) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  
console.log('cartpage')
  const fetchCartItems = () => {
	console.log('cartpagefunction called')
	api.post('/contact/getCartProductsByContactId',{contact_id:468})
	.then((res) => {
	  res.data.data.forEach(element => {
		element.images=String(element.images).split(',')
	  });
	  console.log('respcart',res.data.data)
	  setCartItems(res.data.data)
	  setLoading(false);
	  })
	.catch((error) => {console.log('error',error)});
  };

  useEffect(() => {
	console.log('useeffect running')
	api.post('/contact/getCartProductsByContactId',{contact_id:468})
	.then((res) => {
	  res.data.data.forEach(element => {
		element.images=String(element.images).split(',')
	  });
	  console.log('respcart',res.data.data)
	  setCartItems(res.data.data)
	  setLoading(false);
	  })
	.catch((error) => {});
    //fetchCartItems();
  }, []);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.row2}>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/yrrne75k.png"}} 
						resizeMode = {"stretch"}
						style={styles.image2}
					/>
					<Text style={styles.text2}>
						{"My Cart"}
					</Text>
				</View>

			
          {loading ? (
			        <ActivityIndicator size="large" color="#1EB1C5" />
     ) : (cartItems.map((item, index) => (
				<View style={styles.row3}>
					<Image
						source = {{uri: `${imageBase}${item.images[0]}`}} 
						resizeMode = {"stretch"}
						style={styles.image3}
					/>
					<View style={styles.view}>
						<View style={styles.column}>
						<TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { productId: item.product_id })}
    >
							<View style={styles.column2}  >
								<Text style={styles.text3}>
									{item.title}
								</Text>
								<Text style={styles.text4}>
									{item.product_type}
								</Text>
							</View>
							</TouchableOpacity>
							<View style={styles.row4}>
								<Image
									source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/gqohjonn.png"}} 
									resizeMode = {"stretch"}
									style={styles.image4}
								/>
								<TouchableOpacity style={styles.button} onPress={()=>alert('Pressed!')}>
									<Text style={styles.text5}>
										{"1"}
									</Text>
								</TouchableOpacity>
								<Image
									source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/i2awl8ik.png"}} 
									resizeMode = {"stretch"}
									style={styles.image5}
								/>
							</View>
						</View>
					</View>
					<Image
						source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/pxx4gsu5.png"}} 
						resizeMode = {"stretch"}
						style={styles.image6}
					/>
				</View>
				
				)))}

				
				<View style={styles.row8}>
					<View style={styles.column5}>
						<ImageBackground
							source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/hm42p68t.png"}} 
							resizeMode = {'stretch'}
							style={styles.view2}
							>
							<View style={styles.box}>
							</View>
						</ImageBackground>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/dsjcgiz3.png"}} 
							resizeMode = {"stretch"}
							style={styles.image10}
						/>
					</View>
					<Text style={styles.text7}>
						{"Remarks"}
					</Text>
				</View>
				<View style={styles.column6}>
					<Text style={styles.text8}>
						{"Enter here to add some remarks"}
					</Text>
					<View style={styles.view3}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/kkpvbb7n.png"}} 
							resizeMode = {"stretch"}
							style={styles.image11}
						/>
					</View>
				</View>
				<View style={styles.view4}>
					<TouchableOpacity style={styles.button4} onPress={()=>alert('Pressed!')}>
						<Text style={styles.text9}>
							{"Enquire Now"}
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
	box: {
		width: 4,
		height: 4,
		backgroundColor: "#1EB1C5",
	},
	button: {
		backgroundColor: "#FFFFFF",
		borderColor: "#EEEFEE",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: 14,
		paddingHorizontal: 18,
		marginRight: 9,
	},
	button2: {
		backgroundColor: "#FFFFFF",
		borderColor: "#EEEFEE",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: 8,
		paddingHorizontal: 15,
		marginRight: 9,
	},
	button3: {
		backgroundColor: "#FFFFFF",
		borderColor: "#EEEFEE",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: 8,
		paddingHorizontal: 17,
		marginRight: 9,
	},
	button4: {
		alignItems: "center",
		backgroundColor: "#1EB1C5",
		borderRadius: 10,
		paddingVertical: 11,
		marginHorizontal: 34,
	},
	column: {
		alignItems: "flex-start",
		marginRight: 21,
	},
	column2: {
		alignItems: "center",
		marginBottom: 8,
	},
	column3: {
		alignItems: "flex-start",
		marginRight: 43,
	},
	column4: {
		alignItems: "flex-start",
		marginRight: 48,
	},
	column5: {
		alignItems: "center",
		paddingVertical: 3,
		paddingHorizontal: 4,
		marginRight: 5,
	},
	column6: {
		backgroundColor: "#FFFFFF",
		borderColor: "#9CA7B7",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: 13,
		marginBottom: 127,
		marginHorizontal: 30,
	},
	image: {
		width: 143,
		height: 54,
	},
	image2: {
		width: 24,
		height: 24,
		marginRight: 101,
	},
	image3: {
		width: 80,
		height: 80,
		marginRight: 20,
	},
	image4: {
		width: 12,
		height: 1,
		marginRight: 12,
	},
	image5: {
		width: 12,
		height: 12,
	},
	image6: {
		width: 21,
		height: 21,
	},
	image7: {
		width: 80,
		height: 80,
		marginRight: 19,
	},
	image8: {
		width: 12,
		height: 8,
		marginRight: 12,
	},
	image9: {
		width: 80,
		height: 80,
		marginRight: 15,
	},
	image10: {
		width: 8,
		height: 1,
	},
	image11: {
		width: 10,
		height: 8,
		marginRight: 4,
	},
	row: {
		flexDirection: "row",
		marginBottom: 8,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 18,
		marginLeft: 30,
	},
	row3: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		paddingVertical: 15,
		paddingHorizontal: 30,
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
		paddingRight: 85,
	},
	row5: {
		flexDirection: "row",
		alignItems: "center",
		paddingRight: 64,
	},
	row6: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		paddingVertical: 14,
		paddingHorizontal: 30,
		marginBottom: 57,
	},
	row7: {
		flexDirection: "row",
		alignItems: "center",
		paddingRight: 67,
	},
	row8: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
		marginLeft: 31,
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
		fontSize: 14,
		marginBottom: 8,
	},
	text4: {
		color: "#9CA7B7",
		fontSize: 12,
		marginBottom: 1,
	},
	text5: {
		color: "#000000",
		fontSize: 16,
		fontWeight: "bold",
	},
	text6: {
		color: "#9CA7B7",
		fontSize: 12,
		marginBottom: 9,
	},
	text7: {
		color: "#000000",
		fontSize: 14,
	},
	text8: {
		color: "#9CA7B7",
		fontSize: 11,
		marginBottom: 75,
		marginLeft: 16,
		width: 163,
	},
	text9: {
		color: "#FFFFFF",
		fontSize: 16,
	},
	view: {
		flex: 1,
		alignItems: "flex-end",
		marginRight: 12,
	},
	view2: {
		alignItems: "flex-start",
		paddingBottom: 11,
		paddingHorizontal: 10,
	},
	view3: {
		alignItems: "flex-end",
	},
	view4: {
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

export default CartScreen;
// import React, { useEffect, useState } from "react";
// import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
// import api from '../constants/api';
// import imageBase from "../constants/imageBase";

// const CartScreen = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);

  
// console.log('cartpage')
//   const fetchCartItems = () => {
// 	console.log('cartpagefunction called')
// 	api.post('/contact/getCartProductsByContactId',{contact_id:454})
// 	.then((res) => {
// 	  res.data.data.forEach(element => {
// 		element.images=String(element.images).split(',')
// 	  });
// 	  console.log('respcart',res.data.data)
// 	  setCartItems(res.data.data)
// 	  setLoading(false);
// 	  })
// 	.catch((error) => {console.log('error',error)});
//   };

//   useEffect(() => {
// 	console.log('useeffect running')
// 	api.post('/contact/getCartProductsByContactId',{contact_id:468})
// 	.then((res) => {
// 	  res.data.data.forEach(element => {
// 		element.images=String(element.images).split(',')
// 	  });
// 	  console.log('respcart',res.data.data)
// 	  setCartItems(res.data.data)
// 	  setLoading(false);
// 	  })
// 	.catch((error) => {});
//     fetchCartItems();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#1EB1C5" />
//         ) : (
//           cartItems?.map((item, index) => (
//             <View key={index} style={styles.row}>
//               <Image source={{uri: item.images[0] }} style={styles.image} />
//               <View style={styles.details}>
//                 <Text style={styles.text}>{item.title}</Text>
//                 <Text style={styles.text2}>{item.category}</Text>
//                 <View style={styles.quantityContainer}>
//                   <TouchableOpacity onPress={() => alert("Decrease Quantity")}>
//                     <Text style={styles.button}>-</Text>
//                   </TouchableOpacity>
//                   <Text style={styles.quantity}>{item.qty}</Text>
//                   <TouchableOpacity onPress={() => alert("Increase Quantity")}>
//                     <Text style={styles.button}>+</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           ))
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFFFFF" },
//   scrollView: { flex: 1, backgroundColor: "#FFFFFF" },
//   row: { flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#fff", marginBottom: 10 },
//   image: { width: 80, height: 80, marginRight: 20 },
//   details: { flex: 1 },
//   text: { fontSize: 16, fontWeight: "bold", color: "#000" },
//   text2: { fontSize: 14, color: "#9CA7B7" },
//   quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
//   button: { fontSize: 18, paddingHorizontal: 10, backgroundColor: "#eee", borderRadius: 5 },
//   quantity: { fontSize: 16, marginHorizontal: 10 },
// });

// export default CartScreen;
