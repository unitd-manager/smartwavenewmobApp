
import React, { useEffect, useState,useCallback, useContext } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground, Alert, TextInput } from "react-native";
import api from '../constants/api';
import imageBase from "../constants/imageBase";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, deleteCartItem, addToCart,clearCart,updateCart } from '../redux/slices/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../context/AuthContext";
//import BackButton from "../components/BackButton";


 const CartScreen = ({navigation}) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  //const [user, setUser] = useState();


  const { user, logout } = useContext(AuthContext);

  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.cart);
  
  const [mailId, setmailId] = useState("");
  const getEmail = () => {
    api.get("/setting/getMailId").then((res) => {
      setmailId(res.data.data[0]);
    });
  };
  useEffect(() => {
    dispatch(fetchCartItems(user));
  }, []);

const clearCartItems=()=>{
	dispatch(clearCart(user)).then(()=>{
		
	 dispatch(fetchCartItems(user));
				 })
				 .catch((error) => {
				   //console.error('Failed to clear cart:', error);
				 });
}

  const handleDelete = (item) => {
    dispatch(deleteCartItem(item)).then(()=>{
		
	 dispatch(fetchCartItems(user));
				 })
				 .catch((error) => {
				   console.error('Failed to remove from cart:', error);
				 });
  };

//const cartItems = useSelector(state => state.cart.cartItems);
console.log('cartpage',items)
//   const fetchCartItems = () => {
// 	console.log('cartpagefunction called')
// 	api.post('/contact/getCartProductsByContactId',{contact_id:468})
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
//     //fetchCartItems();
//   }, []);
const handleIncreaseQuantity = useCallback(
    (item) => {
      const updatedItem = { ...item, qty: item.qty + 1 };
      dispatch(updateCart(updatedItem));
    },
    [dispatch]
  );

  const handleDecreaseQuantity = useCallback(
    (item) => {
      if (item.qty > 1) {
        const updatedItem = { ...item, qty: item.qty - 1 };
        dispatch(updateCart(updatedItem));
      }
    },
    [dispatch]
  );
const generateCode = () => {
    api
      .post('/commonApi/getCodeValues', { type: 'enquiry' })
      .then((res) => {
        placeEnquiry(res.data.data);
      })
      .catch(() => {
        placeEnquiry('');
      });
  };

  const placeEnquiry = (code) => {     
    if (user) {
      const enquiryDetails = {
        contact_id : user.contact_id,
        enquiry_date : new Date().toISOString().split('T')[0],
        enquiry_type : 'Enquiry and order for Retail products.',
        status : 'New',
        title : 'Enquiry from ' + user.first_name,      
        enquiry_code: code,
        creation_date : new Date().toISOString().split('T')[0],
        created_by: user.first_name,
      };
      api
        .post("/enquiry/insertEnquiry", enquiryDetails)
        .then((res) => {
          const insertedId = res.data.data.insertId;
          items.forEach((item) => {
            item.enquiry_id = insertedId;
            item.quantity = item.qty;
            item.product_id = item.product_id;
            item.category_id = item.category_id;
            item.created_by = user.first_name;
            api
              .post("/enquiry/insertQuoteItems", item)
              .then(() => {
                console.log("order placed");
              })
              .catch((err) => console.log(err));
          });
        }).then(() => {
          console.log("cart user",user)
          dispatch(clearCart(user));
            // Make the API call
      api
      .post("/contact/clearCartItems", { contact_id: user.contact_id })
       
        })
        .then(() => {
          //alert("Enquiry Submitted Successfully");
          navigation.navigate('Enquiry')
        })
        .catch((err) => console.log(err));
    } else {
      console.log("please login");
    }
    const orderDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(orderDate.getDate() + 7);

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

  
    const to = mailId.email;
    const toCustomer = user.email; // Customer's Email
    const subject = "Smartwave Product Details";
    
    // Group all products into an array
    const dynamic_template_data = {
      first_name: items[0]?.first_name,
      phone: items[0]?.phone, // Assuming same user for all products
      address: items[0]?.address, // Assuming same user for all products
      email: items[0]?.email, // Assuming same user for all products
      // Assuming same user for all products
      products: items.map((item) => ({
        title: item.title,
        qty: item.qty,
      })),
    };
    // Send a single API request with all products
    api
      .post("/commonApi/sendProductAdmin", { to, subject, dynamic_template_data })
      .then((res) => {
        console.log("Product admin email sent successfully.");
      })
      .catch((err) => {
        console.error("Error sending product admin email:", err);
      });
      
  // Send Email to Customer (Customer Dynamic Template)
api
.post("/commonApi/sendProduct",{ toCustomer, subject, dynamic_template_data })
.then((res) => {
  console.log("Customer email sent successfully.");
})
.catch((err) => {
  console.error("Error sending customer email:", err);
});

    {
      
      const to = user.email;
      const dynamic_template_data= 
      {
     first_name:user.first_name,
     order_date:formatDate(orderDate),
     delivery_date:formatDate(deliveryDate),
     order_status: "Paid"
    };
    api
      .post('/commonApi/sendgmail',{to,dynamic_template_data})
      .then(() => {
        //Alert.alert("Send Mail Successfully")
      })
      .catch(() => {
      //  Alert.alert("Mail not sent")
      });
    
    };

  };

  
  useEffect(() => {
	const initialize = async () => {
	  try {
		
		if (user) {
		  dispatch(fetchCartItems(user));
		}
		getEmail();
	  } catch (e) {
		console.error('Error reading user from AsyncStorage:', e);
	  }
	};
  
	initialize();
  }, []);
  


	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity 
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<Icon name="arrow-back" size={24} color="#000" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>My Cart</Text>
				<View style={styles.headerSpacer} />
			</View>

			<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

			
          {loading ? (
		        <ActivityIndicator size="large" color="#1EB1C5" />
     ): items.length === 0 ? (
        <View style={[styles.emptyContainer, {flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
          <View style={{alignItems: 'center'}}>
            <Icon 
              name="cart-outline" 
              size={100} 
              color="#1EB1C5" 
              style={{marginBottom: 20, alignSelf: 'center'}} 
            />
            <Text style={[styles.emptyText, {textAlign: 'center'}]}>Your cart is empty</Text>
            <TouchableOpacity 
              style={styles.homeButton}
              onPress={() => navigation.navigate("Home")}
            >
              <View style={styles.homeButtonContent}>  
                <Icon name="home-outline" size={20} color="#fff" style={{marginRight: 8}} />
                <Text style={styles.homeButtonText}>Go Home</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (items.map((item, index) => (
				<View key={index} style={styles.cartItem}>
					<View style={styles.itemContent}>
						<Image
							source={{ uri: `${imageBase}${item.images[0]}` }}
							resizeMode={"cover"}
							style={styles.itemImage}
						/>
						<View style={styles.itemDetails}>
							<TouchableOpacity
								onPress={() => navigation.navigate("ProductDetails", { productId: item.product_id })}
							>
								<Text style={styles.itemName}>
									{item.title}
								</Text>
								<Text style={styles.itemCategory}>
									{item.product_type}
								</Text>
							</TouchableOpacity>
							<View style={styles.quantityContainer}>
								<TouchableOpacity 
									style={styles.quantityButton}
									onPress={() => handleDecreaseQuantity(item)}
								>
									<Icon name="remove-circle-outline" size={15} color="#1EB1C5" />
								</TouchableOpacity>
								<Text style={styles.quantityText}>
									{item?.qty}
								</Text>
								<TouchableOpacity 
									style={styles.quantityButton}
									onPress={() => handleIncreaseQuantity(item)}
								>
									<Icon name="add-circle-outline" size={15} color="#1EB1C5" />
								</TouchableOpacity>
							</View>
						</View>
						<TouchableOpacity 
							style={styles.deleteButton}
							onPress={() => handleDelete(item)}
						>
							<Icon name="trash-outline" size={20} color="#999" />
						</TouchableOpacity>
					</View>
				</View>
				
				)))}
				
				{items.length > 0 && (
					<>
						{/* Remarks Section */}
						<View style={styles.remarksSection}>
							<View style={styles.remarksHeader}>
								<Icon name="create-outline" size={20} color="#000" />
								<Text style={styles.remarksTitle}>Remarks</Text>
							</View>
							<TextInput
								style={styles.remarksInput}
								placeholder="Enter here to add some remarks..."
								placeholderTextColor="#999"
								value={remarks}
								onChangeText={setRemarks}
								multiline={true}
								numberOfLines={4}
								textAlignVertical="top"
							/>
						</View>
					</>
				)}
			</ScrollView>

			{/* Fixed Bottom Buttons */}
			{items.length > 0 && (
				<View style={styles.fixedButtonContainer}>
					<TouchableOpacity style={styles.clearCartButton} onPress={()=>clearCartItems()}>
						<Text style={styles.clearCartButtonText}>
							{"Clear Cart"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.enquireButton} onPress={()=>generateCode()}>
						<Text style={styles.enquireButtonText}>
							{"Enquire Now"}
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	)
}
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#FFFFFF",
// 	},
// 	box: {
// 		width: 4,
// 		height: 4,
// 		backgroundColor: "#1EB1C5",
// 	},
// 	button: {
// 		backgroundColor: "#FFFFFF",
// 		borderColor: "#EEEFEE",
// 		borderRadius: 10,
// 		borderWidth: 1,
// 		paddingVertical: 14,
// 		paddingHorizontal: 18,
// 		marginRight: 9,
// 	},
// 	button2: {
// 		backgroundColor: "#FFFFFF",
// 		borderColor: "#EEEFEE",
// 		borderRadius: 10,
// 		borderWidth: 1,
// 		paddingVertical: 8,
// 		paddingHorizontal: 15,
// 		marginRight: 9,
// 	},
// 	button3: {
// 		backgroundColor: "#FFFFFF",
// 		borderColor: "#EEEFEE",
// 		borderRadius: 10,
// 		borderWidth: 1,
// 		paddingVertical: 8,
// 		paddingHorizontal: 17,
// 		marginRight: 9,
// 	},
// 	button4: {
// 		alignItems: "center",
// 		backgroundColor: "#1EB1C5",
// 		borderRadius: 10,
// 		paddingVertical: 11,
// 		marginHorizontal: 34,
// 	},
// 	column: {
// 		alignItems: "flex-start",
// 		marginRight: 21,
// 	},
// 	column2: {
// 		alignItems: "center",
// 		marginBottom: 8,
// 	},
// 	column3: {
// 		alignItems: "flex-start",
// 		marginRight: 43,
// 	},
// 	column4: {
// 		alignItems: "flex-start",
// 		marginRight: 48,
// 	},
// 	column5: {
// 		alignItems: "center",
// 		paddingVertical: 3,
// 		paddingHorizontal: 4,
// 		marginRight: 5,
// 	},
// 	column6: {
// 		backgroundColor: "#FFFFFF",
// 		borderColor: "#9CA7B7",
// 		borderRadius: 10,
// 		borderWidth: 1,
// 		paddingVertical: 13,
// 		marginBottom: 127,
// 		marginHorizontal: 30,
// 	},
// 	image: {
// 		width: 143,
// 		height: 54,
// 	},
// 	image2: {
// 		width: 24,
// 		height: 24,
// 		marginRight: 101,
// 	},
// 	image3: {
// 		width: 80,
// 		height: 80,
// 		marginRight: 20,
// 	},
// 	image4: {
// 		width: 12,
// 		height: 1,
// 		marginRight: 12,
// 	},
// 	image5: {
// 		width: 12,
// 		height: 12,
// 	},
// 	image6: {
// 		width: 21,
// 		height: 21,
// 	},
// 	image7: {
// 		width: 80,
// 		height: 80,
// 		marginRight: 19,
// 	},
// 	image8: {
// 		width: 12,
// 		height: 8,
// 		marginRight: 12,
// 	},
// 	image9: {
// 		width: 80,
// 		height: 80,
// 		marginRight: 15,
// 	},
// 	image10: {
// 		width: 8,
// 		height: 1,
// 	},
// 	image11: {
// 		width: 10,
// 		height: 8,
// 		marginRight: 4,
// 	},
// 	row: {
// 		flexDirection: "row",
// 		marginBottom: 8,
// 	},
// 	row2: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		marginBottom: 18,
// 		marginLeft: 30,
// 	},
// 	row3: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		backgroundColor: "#FFFFFF",
// 		paddingVertical: 15,
// 		paddingHorizontal: 30,
// 	},
// 	row4: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		paddingRight: 85,
// 	},
// 	row5: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		paddingRight: 64,
// 	},
// 	row6: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		backgroundColor: "#FFFFFF",
// 		paddingVertical: 14,
// 		paddingHorizontal: 30,
// 		marginBottom: 57,
// 	},
// 	row7: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		paddingRight: 67,
// 	},
// 	row8: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		marginBottom: 12,
// 		marginLeft: 31,
// 	},
// 	scrollView: {
// 		flex: 1,
// 		backgroundColor: "#FFFFFF",
// 	},
// 	text: {
// 		color: "#000000",
// 		fontSize: 17,
// 		//fontWeight: "bold",
// 		marginVertical: 18,
// 		marginLeft: 31,
// 		marginRight: 12,
// 		fontFamily: 'Outfit-Regular',
// 	},
// 	text2: {
// 		color: "#000000",
// 		fontSize: 20,
// 		margin: 10,
// 		fontFamily: 'Outfit-Regular',
// 	},
// 	text3: {
// 		color: "#000000",
// 		fontSize: 14,
// 		marginBottom: 8,
// 		fontFamily: 'Outfit-Regular',
// 	},
// 	text4: {
// 		color: "#9CA7B7",
// 		fontSize: 12,
// 		marginBottom: 1,
// 		fontFamily: 'Outfit-Regular',
// 	},
// 	text5: {
// 		color: "#000000",
// 		fontSize: 16,
// 		//fontWeight: "bold",
// 		fontFamily: 'Outfit-Regular',
// 	},
// 	text6: {
// 		color: "#9CA7B7",
// 		fontSize: 12,
// 		marginBottom: 9,
// 		fontFamily: 'Outfit-Regular',
// 	},
// 	text7: {
// 		color: "#000000",
// 		fontSize: 14,
// 		fontFamily: 'Outfit-Regular',
// 	},
// 	text8: {
// 		color: "#9CA7B7",
// 		fontSize: 11,
// 		marginBottom: 75,
// 		marginLeft: 16,
// 		width: 163,
// 		fontFamily: 'Outfit-Regular',
// 	},
// 	text9: {
// 		color: "#FFFFFF",
// 		fontSize: 16,
// 		fontFamily: 'Outfit-Regular',
// 	},
// 	view: {
// 		flex: 1,
// 		alignItems: "flex-end",
// 		marginRight: 12,
// 	},
// 	view2: {
// 		alignItems: "flex-start",
// 		paddingBottom: 11,
// 		paddingHorizontal: 10,
// 	},
// 	view3: {
// 		alignItems: "flex-end",
// 	},
// 	view4: {
// 		backgroundColor: "#FFFFFF",
// 		borderColor: "#DFF6FB",
// 		borderTopLeftRadius: 15,
// 		borderTopRightRadius: 15,
// 		borderWidth: 1,
// 		paddingVertical: 19,
// 		shadowColor: "#959DA533",
// 		shadowOpacity: 0.2,
// 		shadowOffset: {
// 		    width: 8,
// 		    height: 0
// 		},
// 		shadowRadius: 24,
// 		elevation: 24,
// 	},
// 	emptyContainer: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		marginTop: 50,
// 	  },
// 	  emptyText: {
// 		fontSize: 18,
// 		color: '#777',
// 		marginBottom: 20,
// 	  },
// 	  homeButton: {
// 		backgroundColor: "#1EB1C5",
// 		paddingVertical: 12,
// 		paddingHorizontal: 24,
// 		borderRadius: 30,
// 		elevation: 3,
// 		shadowColor: "#000",
// 		shadowOffset: { width: 0, height: 2 },
// 		shadowOpacity: 0.2,
// 		shadowRadius: 3,
// 	  },
	  
// 	  homeButtonContent: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	  },
	  
// 	  homeButtonText: {
// 		color: "#fff",
// 		fontSize: 16,
// 		fontWeight: "bold",
// 	  },
	  
	  
// });
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		  fontFamily: 'Outfit-Regular',
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "#FFFFFF",
		borderBottomWidth: 1,
		borderBottomColor: "#F0F0F0",
		  fontFamily: 'Outfit-Regular',
	},
	backButton: {
		padding: 8,
	},
	headerTitle: {
		flex: 1,
		fontSize: 18,
		fontWeight: "600",
		color: "#000",
		textAlign: "center",
		marginRight: 32,
		  fontFamily: 'Outfit-Regular',
	},
	headerSpacer: {
		width: 32,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 16,
		  fontFamily: 'Outfit-Regular',
	},
	cartItem: {
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		  fontFamily: 'Outfit-Regular',
	},
	itemContent: {
		flexDirection: "row",
		alignItems: "center",
		  fontFamily: 'Outfit-Regular',
	},
	itemImage: {
		width: 80,
		height: 80,
		borderRadius: 8,
		marginRight: 12,
	},
	itemDetails: {
		flex: 1,
		  fontFamily: 'Outfit-Regular',
	},
	itemName: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
		marginBottom: 4,
		  fontFamily: 'Outfit-Regular',
	},
	itemCategory: {
		fontSize: 14,
		color: "#666",
		marginBottom: 8,
		  fontFamily: 'Outfit-Regular',
	},
	quantityContainer: {
		flexDirection: "row",
		alignItems: "center",
		  fontFamily: 'Outfit-Regular',
	},
	quantityButton: {
		padding: 4,
		  fontFamily: 'Outfit-Regular',
	},
	quantityText: {
		fontSize: 16,
		fontWeight: "600",
		marginHorizontal: 12,
		color: "#333",
		  fontFamily: 'Outfit-Regular',
	},
	deleteButton: {
		padding: 8,
		  fontFamily: 'Outfit-Regular',
	},
	remarksSection: {
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		  fontFamily: 'Outfit-Regular',
	},
	remarksHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
		  fontFamily: 'Outfit-Regular',
	},
	remarksTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
		marginLeft: 8,
		  fontFamily: 'Outfit-Regular',
	},
	remarksInput: {
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 8,
		padding: 12,
		fontSize: 14,
		color: "#333",
		minHeight: 80,
		  fontFamily: 'Outfit-Regular',
	},
	view4: {
		marginVertical: 20,
		alignItems: 'center',
		  fontFamily: 'Outfit-Regular',
	},
	button4: {
		backgroundColor: '#1EB1C5',
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 25,
		shadowColor: '#1EB1C5',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 5,
		marginHorizontal: 16,
		  fontFamily: 'Outfit-Regular',
	},
	text9: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
		  fontFamily: 'Outfit-Regular',
	},
	emptyContainer: {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
	  paddingVertical: 40,
	    fontFamily: 'Outfit-Regular',
	},
	emptyText: {
	  fontSize: 18,
	  color: '#555',
	  marginBottom: 16,
	  textAlign: 'center',
	    fontFamily: 'Outfit-Regular',
	},
	homeButton: {
	  backgroundColor: '#1EB1C5',
	  borderRadius: 8,
	  padding: 12,
	  marginTop: 10,
	    fontFamily: 'Outfit-Regular',
	},
	homeButtonContent: {
	  flexDirection: 'row',
	  alignItems: 'center',
	    fontFamily: 'Outfit-Regular',
	},
	homeButtonText: {
	  color: '#fff',
	  fontSize: 16,
	  fontWeight: '500',
	    fontFamily: 'Outfit-Regular',
	},
	scrollContent: {
	  paddingBottom: 100, // Add padding to prevent overlap with fixed button
	    fontFamily: 'Outfit-Regular',
	},
	fixedButtonContainer: {
	  position: 'absolute',
	  bottom: 0,
	  left: 0,
	  right: 0,
	  backgroundColor: '#fff',
	  paddingHorizontal: 20,
	  paddingVertical: 15,
	  borderTopWidth: 1,
	  borderTopColor: '#eee',
	  shadowColor: '#000',
	  shadowOffset: { width: 0, height: -2 },
	  shadowOpacity: 0.1,
	  shadowRadius: 4,
	  elevation: 5,
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  gap: 10,
	    fontFamily: 'Outfit-Regular',
	},
	clearCartButton: {
	  backgroundColor: '#FF6B6B',
	  paddingVertical: 16,
	  paddingHorizontal: 30,
	  borderRadius: 12,
	  shadowColor: '#FF6B6B',
	  shadowOffset: { width: 0, height: 4 },
	  shadowOpacity: 0.3,
	  shadowRadius: 6,
	  elevation: 5,
	  alignItems: 'center',
	  justifyContent: 'center',
	  flex: 1,
	    fontFamily: 'Outfit-Regular',
	},
	clearCartButtonText: {
	  color: '#fff',
	  fontSize: 16,
	  fontWeight: '600',
	  textAlign: 'center',
	    fontFamily: 'Outfit-Regular',
	},
	enquireButton: {
	  backgroundColor: '#1EB1C5',
	  paddingVertical: 16,
	  paddingHorizontal: 30,
	  borderRadius: 12,
	  shadowColor: '#1EB1C5',
	  shadowOffset: { width: 0, height: 4 },
	  shadowOpacity: 0.3,
	  shadowRadius: 6,
	  elevation: 5,
	  alignItems: 'center',
	  justifyContent: 'center',
	  flex: 1,
	    fontFamily: 'Outfit-Regular',
	},
	enquireButtonText: {
	  color: '#fff',
	  fontSize: 16,
	  fontWeight: '600',
	  textAlign: 'center',
	    fontFamily: 'Outfit-Regular',
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
