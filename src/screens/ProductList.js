import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput, ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../constants/api';
import imageBase from '../constants/imageBase';

const ProductListScreen = ({route}) => {
  const { categoryId } = route.params || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredProducts = products.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const addToCart = (id) => {
    // setProducts((prev) =>
    //   prev.map((item) =>
    //     item.id === id ? { ...item, inCart: true, quantity: 1 } : item
    //   )
    // );
  };

  const updateQuantity = (id, delta) => {
    // setProducts((prev) =>
    //   prev.map((item) =>
    //     item.id === id
    //       ? {
    //           ...item,
    //           quantity: Math.max(1, item.quantity + delta),
    //           inCart: item.quantity + delta > 0,
    //         }
    //       : item
    //   )
    // );
  };

  const fetchProducts = () => {
    setLoading(true);
    api
      .post("/category/getProductByCategory", { category_id: categoryId })
      .then((res) => {
        res.data.data.forEach((element) => {
          element.tag = String(element.tag).split(",");
          element.images = String(element.images).split(",");
        });
        setProducts(res.data.data);
      })
      .catch(() => console.log("error"))
      .finally(() => setLoading(false));
  };
  
  
  useEffect(()=>{
	fetchProducts();
  },[]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { productId: item.product_id })}></TouchableOpacity> <View style={styles.imageContainer}>
  <Image
    source={{ uri: `${imageBase}${item.images[0]}` }}
    style={styles.image}
  />
  {item.discount > 0 && (
    <View style={styles.discountBadge}>
      <Text style={styles.discountText}>{item.discount}% OFF</Text>
    </View>
  )}
</View>


      <Text numberOfLines={1} style={styles.name}>
        {item.title}
      </Text>

     

      {item.inCart ? (
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
            <Text style={styles.qtyBtn}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyNumber}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
            <Text style={styles.qtyBtn}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => addToCart(item.id)}
          style={styles.addToCart}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
  
      {loading ? (
        <ActivityIndicator size="large" color="#00AA88" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No products found</Text>
          }
        />
      )}
    </View>
  );
  
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
  imageContainer: {
    width: '100%',
    backgroundColor: '#EAF9FF', // Light blue background for the image part
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    paddingVertical: 10,
  },
  searchBar: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    fontSize: 14,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#003366',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  name: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  addToCart: {
    borderWidth: 1,
    borderColor: '#00AA88',
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 6,
    width: '100%',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#00AA88',
    fontSize: 12,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 10,
  },
  qtyBtn: {
    fontSize: 18,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#00AA88',
  },
  qtyNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

