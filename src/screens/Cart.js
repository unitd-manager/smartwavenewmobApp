
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
  const [userData, setUserData] = useState({});

  const [container, setContainer] = useState("");

  const [containercount, setContainerCount] = useState("");
  const { user, logout } = useContext(AuthContext);

  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.cart);
  console.log('items',items);
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
    .post("/commonApi/getCodeValues", { type: "enquiry" })
    .then((res) => {
      placeEnquiriesForAllProducts(res.data.data);
    })
    .catch(() => {
      placeEnquiriesForAllProducts("");
    });
};

const placeEnquiriesForAllProducts = async (code) => {
  if (!user) return;

  // 🔍 ADDRESS VALIDATION
  const addressFields = [
    userData.address1,
    userData.address2,
    userData.address_area,
    userData.address_city,
    userData.address_state,
    userData.address_country_code,
    userData.address_po_code
  ];

  const isAddressEmpty = addressFields.some(
    (field) => !field || field.trim() === ""
  );
  const isFirstNameEmpty =
    !userData.first_name || userData.first_name.trim() === "";

  if (isAddressEmpty || isFirstNameEmpty) {
    Alert.alert(
      "Incomplete Profile",
      "Please update your profile details including first name and full address.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Go to Profile", onPress: () => navigation.navigate("Profile") }
      ]
    );
    return;
  }

  // 🔥 GROUP CART ITEMS BY ORIGIN (Like your web version)
const groupedCartItems = items.reduce((acc, item) => {
  const key = `${item.origins || "NA"}_${item.destination_port || "NA"}`;

  if (!acc[key]) {
    acc[key] = [];
  }

  acc[key].push(item);
  return acc;
}, {});


  // 🚀 LOOP GROUP-WISE AND CREATE ENQUIRY FOR EACH GROUP
for (const groupKey in groupedCartItems) {
  const productsInGroup = groupedCartItems[groupKey];

  const firstItem = productsInGroup[0];
  const origin = firstItem.origins;
  const destination = firstItem.destination_port;


    let enquiryCode = "";
    try {
      const codeRes = await api.post("/commonApi/getCodeValues", { type: "enquiry" });
      enquiryCode = codeRes.data.data;
    } catch (codeErr) {
      console.error("Error fetching enquiry code:", codeErr);
      // Fallback or handle error appropriately, e.g., use a default or throw
    }

    const enquiryDetails = {
  contact_id: user.contact_id,
  enquiry_date: new Date().toISOString().split("T")[0],
  enquiry_type: "Enquiry and order for Retail products.",
  status: "New",
  email: userData.email,
  first_name: userData.first_name,
  title: `Enquiry for ${productsInGroup.map(p => p.title).join(", ")} | Origin: ${origin} | Destination: ${destination}`,
  enquiry_code: enquiryCode,
  creation_date: new Date().toISOString().split("T")[0],
  created_by: userData.first_name,
  shipping_address: [
    userData.address1,
    userData.address2,
    userData.address_area,
    userData.address_city,
    userData.address_state,
    userData.address_country_code,
    userData.address_po_code
  ].filter(Boolean).join(", "),
};


    try {
      // INSERT ENQUIRY
      const res = await api.post("/enquiry/insertEnquiry", enquiryDetails);
      const insertedId = res.data.data.insertId;

      // INSERT QUOTE ITEMS
      for (const item of productsInGroup) {
      const quoteItem = {
  enquiry_id: insertedId,
  quantity: item.qty,
  product_id: item.product_id,
  category_id: item.category_id,
  sub_category_id: item.sub_category_id,
  created_by: userData.first_name,
  first_name: userData.first_name,
  email: userData.email,
  grades: item.grade,
  counts: item.counts,
  origins: item.origins,
  destination_port: item.destination_port,
};


        await api.post("/enquiry/insertQuoteItems", quoteItem);
      }
    } catch (err) {
      console.log("Enquiry Error", err);
    }
  }

  // 🛒 CLEAR CART
  dispatch(clearCart(user));
  await api.post("/contact/clearCartItems", { contact_id: user.contact_id });

  // 📧 SEND EMAIL
  try {
    await api.post("/commonApi/sendquoteMail", {
      first_name: userData.first_name,
      email: userData.email,
      comments: `
        New quote request from ${userData.first_name} (${userData.email}).

        Products Requested:
        ${items
          .map((item) => `• ${item.title} (Qty: ${item.qty})`)
          .join("\n")}
      `,
    });

    Alert.alert("Success", "Your enquiry has been sent successfully.");
  } catch (e) {
    Alert.alert("Email Failed", "Unable to send enquiry email. Try again later.");
  }

  // 🎉 SUCCESS PAGE REDIRECT
  navigation.navigate("Enquiry");
};

const getContainer = () => {
  api.get("/setting/getContainer").then((res) => {

    if (res.data.data.length > 0) {
      const value = res.data.data[0].value;
      try {
        const parsed = JSON.parse(value);
        setContainer(parsed.map((v) => v.label).join(" / "));
      } catch (e) {
        setContainer(value);
      }
    }
  });
};
  
const getUser = () => {
    api
      .post("/contact/getContactsById", { contact_id: user.contact_id })
      .then((res) => {
        setUserData(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
   useEffect(() => {
    if (user) {
      getUser();
	  getContainer();
    }
  }, [ ]);
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
              onPress={() => navigation.navigate("MainApp", { screen: "Home", params: { screen: "HomeMain" } })}
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
								{container && <Text style={styles.itemDetailText}>Type of Containers: {container}</Text>}
							
								{item.grade && <Text style={styles.itemDetailText}>Grade: {item.grade}</Text>}
								{item.counts && <Text style={styles.itemDetailText}>Count: {item.counts}</Text>}
								{item.origins && <Text style={styles.itemDetailText}>Origin: {item.origins}</Text>}
								{item.destination_port && <Text style={styles.itemDetailText}>DestinationPort: {item.destination_port}</Text>}
							
							</TouchableOpacity>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  
  <Text style={styles.labelInline}>No of Containers:</Text>

  <View style={styles.quantityContainer}>
    <TouchableOpacity 
      style={styles.quantityButton}
      onPress={() => handleDecreaseQuantity(item)}
    >
      <Icon name="remove-circle-outline" size={15} color="#1EB1C5" />
    </TouchableOpacity>

    <Text style={styles.quantityText}>{item?.qty}</Text>

    <TouchableOpacity 
      style={styles.quantityButton}
      onPress={() => handleIncreaseQuantity(item)}
    >
      <Icon name="add-circle-outline" size={15} color="#1EB1C5" />
    </TouchableOpacity>
  </View>

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
							{"Request for Quote"}
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	)
}

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
	itemDetailText: {
		fontSize: 12,
		color: "#888",
		marginBottom: 2,
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
	label: {
  fontSize: 14,
  fontWeight: '600',
  color: '#000',
  marginBottom: 4,
},

labelInline: {
  fontSize: 14,
  fontWeight: '600',
  color: '#000',
  marginRight: 8,
},

quantityContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#1EB1C5',
  borderRadius: 6,
  paddingHorizontal: 8,
  paddingVertical: 2,
},

quantityButton: {
  padding: 4,
},

quantityText: {
  marginHorizontal: 8,
  fontSize: 14,
  fontWeight: '600',
  color: '#000',
}
  });

export default CartScreen;
