import React, { useEffect, useState,useCallback } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import api from "../constants/api";
import { addToCart, fetchCartItems } from '../redux/slices/cartSlice';
import imageBase from "../constants/imageBase";
import { useDispatch } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/Ionicons';
//import BackButton from "../components/BackButton";
//import GradeSelector from "../components/GradePicker";

export default ({ route }) => {
  const { productId } = route.params || {};
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.qty_in_stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const [selectedProductGrade, setSelectedProductGrade] = useState(
   
  );

  

  const dispatch = useDispatch();

  
  const addCart = (data) => {
 
    if(user){
     
    data.contact_id=user.contact_id
  
     dispatch(addToCart(data)) 
             .then(() => { Alert.alert("Item added to cart")
               dispatch(fetchCartItems(user));
             })
             .catch((error) => {
               console.error('Failed to add to cart:', error);
             });
  
    }
    else{
      Alert.alert("Please Login")
     
    }
   
  };
   const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const user = jsonValue != null ? JSON.parse(jsonValue) : null;
  
        if (user?.contact_id) {
          
          // Get full user data from API
          const res = await api.post("/contact/getContactsById", {
            contact_id: user.contact_id,
          });
          console.log('user',user);
          setUser(res.data.data[0]);
        } else {
          
        }
      } catch (e) {
        console.error('Error fetching user:', e);
        
      }
    };
  
    useEffect(() => {
      getUserData();
    }, []);
  

    useFocusEffect(
      useCallback(() => {
        const fetchUser = async () => {
          const userData = await AsyncStorage.getItem('user');
          if (userData) {
            setUser(JSON.parse(userData)); // update context or redux here
          } else {
            setUser(null);
          }
        };
    
        fetchUser();
      }, [])
    );
  
  useEffect(() => {
    api
      .post("/product/getProductbyproductId", { product_id: productId })
      .then((res) => {
        let data = res.data.data[0];
        data.tag = String(data.tag).split(",");
        data.images = String(data.images).split(",");
        setProduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        
        <ImageBackground
          source={{
            uri: product.images?.[0]
              ? imageBase + product.images[0]
              : "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/yp2hw732.png",
          }}
          resizeMode={"stretch"}
          style={styles.column}
        >
          <View style={styles.row2}>
          {/* <BackButton/> */}
            <Text style={styles.text2}>{""}</Text>
           <TouchableOpacity onPress={() => addCart(product)}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/o94ug29m.png",
              }}
              resizeMode={"stretch"}
              style={styles.image3}
            />
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/hhra1eqf.png",
            }}
            resizeMode={"stretch"}
            style={styles.image4}
          />
        </ImageBackground>

        <View style={styles.row3}>
          <Text style={styles.text3}>{product?.product_type}</Text>
         
        </View>

        <View style={styles.row5}>
          <Text style={styles.text5}>{product?.title}</Text>
          
          <View style={styles.row4}>
            
            {/* <GradeSelector product={product} selectedProductGrade={selectedProductGrade} setSelectedProductGrade={setSelectedProductGrade} setProductStock={setProductStock} setQuantityCount={setQuantityCount}  /> */}
            {/* <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/74exovt6.png",
              }}
              resizeMode={"stretch"}
              style={styles.image6}
            /> */}
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => alert("Pressed!")}
            >
              <Text style={styles.text6}>{"1"}</Text>
            </TouchableOpacity> */}
            {/* <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/h20mzbsi.png",
              }}
              resizeMode={"stretch"}
              style={styles.image7}
            /> */}
             <TouchableOpacity
  style={styles.cartbuttonRow}
  onPress={() => addCart(product)}
>
  <Icon name="cart-outline" size={20} color="#1EB1C5" style={styles.cartIcon} />
  {/* <Text style={styles.carttext9}>{"Add to Cart"}</Text> */}
</TouchableOpacity>
          </View>
        </View>

        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/6hl7r52x.png",
          }}
          resizeMode={"stretch"}
          style={styles.image8}
        />

        <View style={styles.row6}>
          <Text style={styles.text7}>{"Product Detail"}</Text>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/3h07bbwo.png",
            }}
            resizeMode={"stretch"}
            style={styles.image9}
          />
        </View>

        <Text style={styles.text8}>{product?.description}</Text>

        {/* <View style={styles.view}>
          <TouchableOpacity
            style={styles.buttonRow}
            onPress={() => addCart(product)}
          >
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/pNd58t8xI9/pev9ywvi.png",
              }}
              resizeMode={"stretch"}
              style={styles.image10}
            />
            <Text style={styles.text9}>{"Add to Cart"}</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

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
  text2: {
    color: "#000000",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 22,
    flex: 1,
    fontFamily: 'Outfit-Regular',
  },
  text3: {
    color: "#9CA7B7",
    fontSize: 14,
    flex: 1,
    fontFamily: 'Outfit-Regular',
  },
  text4: {
    color: "#9CA7B7",
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
  },
  text5: {
    color: "#000000",
    fontSize: 18,
    marginRight: 25,
    width: 216,
    fontFamily: 'Outfit-Regular',
  },
  text6: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: 'Outfit-Regular',
  },
  text7: {
    color: "#000000",
    fontSize: 18,
    flex: 1,
    fontFamily: 'Outfit-Regular',
  },
  text8: {
    color: "#595E64",
    fontSize: 14,
    marginBottom: 163,
    marginLeft: 31,
    width: 310,
    fontFamily: 'Outfit-Regular',
  },
  text9: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
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
      height: 0,
    },
    shadowRadius: 24,
    elevation: 24,
  },
  cartbuttonRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff", // Button background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginTop: 10, // Add some space between buttons
    maxWidth: "90%", // Prevent overflow by limiting the width
    overflow: "hidden", // Ensure content doesn't overflow
    flexShrink: 1, // Allow the button to shrink if necessary
    marginRight: 16,
  },
  
  cartIcon: {
    marginRight: 8,
  },
  
  carttext9: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1EB1C5",
    flexShrink: 1, // Allow the text to shrink if necessary
  },
  
});
