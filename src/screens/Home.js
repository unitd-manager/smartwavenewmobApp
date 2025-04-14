import React,{useEffect,useState} from 'react';
import { View, Text, ScrollView, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BannerCarousel from '../components/BannerCarousel';
import { useNavigation } from '@react-navigation/native';
import api from '../constants/api';
import imageBase from '../constants/imageBase';

const { width } = Dimensions.get('window');

const banners = [
  { id: 1, image: 'https://via.placeholder.com/350x150.png?text=Fashion+Banner+1' },
  { id: 2, image: 'https://via.placeholder.com/350x150.png?text=Fashion+Banner+2' },
];

const categories = [
  { id: '1', name: 'Fashion', icon: 'https://cdn-icons-png.flaticon.com/512/892/892458.png' },
  { id: '2', name: 'Electronics', icon: 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png' },
  { id: '3', name: 'Shoes', icon: 'https://cdn-icons-png.flaticon.com/512/678/678479.png' },
  { id: '4', name: 'Watch', icon: 'https://cdn-icons-png.flaticon.com/512/3159/3159310.png' },
];

const flashSale = [
  {
    id: '1',
    name: 'Monitor',
    discount: '55%',
    image: 'https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_SL1500_.jpg',
  },
  {
    id: '2',
    name: 'iMac',
    discount: '45%',
    image: 'https://m.media-amazon.com/images/I/71LZxRZ7anL._AC_SL1500_.jpg',
  },
];

const Home = () => {
  const navigation = useNavigation();

  const [sliderData, setSliderData] = useState([]);
const[categories,setCategories]=useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [mostPopularProducts, setMostPopularProducts] = useState([]);



  const getOfferProducts = () => {
    api
      .get("/product/getAllProducts")
      .then((res) => {
        res.data.data.forEach((element) => {
          element.images = String(element.images).split(",");
        });
        setOfferProducts(res.data.data);
      })
      .catch(() => {
        console.log("error");
      });
  };


  const getBanner = () => {
    api
      .get('/content/getBanners')
      .then(res => {
        // Assuming res.data.data is an array
        const banners = res.data.data;
  
        // Use forEach to iterate through the array of banners
        banners.forEach((banner, index) => {
          console.log(`Banner ${index + 1}:`, banner);  // Logs each banner's data
        });
  
        // Now set the state with the fetched data
        setSliderData(banners);
  
        // Logging the entire response data for debugging
        console.log("sliderData", res.data);
      })
      .catch(error => {
        console.log("error", error);
      });
  };
  

  useEffect(() => {
    getBanner();
	getOfferProducts();
	api
	.get("/category/getAllCategory")
	.then((res) => {
    res.data.data.forEach((element) => {
      element.images = String(element.images).split(",");
    });
	  setCategories(res.data.data);
	})
	.catch(() => {
	  console.log("error");
	});
    // getDataFromApi()
  }, []);

  const renderBanner = ({ item }) => (
    <Image source={{ uri: item.image }} style={styles.banner} resizeMode="cover" />
  );

  return (
    <ScrollView style={styles.container}>
	
      {/* Banner Carousel */}
	<BannerCarousel sliderData={sliderData}/>

      {/* Category */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item.category_title}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            
            <View style={styles.categoryItem}>
               <TouchableOpacity onPress={() => navigation.navigate('ProductList',{categoryId: item.category_id,categoryName:item.category_title})}>
              <Image source={{ uri:  `${imageBase}${item.images[0]}`}} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{item.category_title}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Flash Sale */}
      <View style={styles.section}>
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>Flash Sale</Text>
    <TouchableOpacity>
      <Text style={styles.seeAll}>See All</Text>
    </TouchableOpacity>
  </View>

  <FlatList
    data={offerProducts}
    keyExtractor={(item) => item.title}
    numColumns={2}
    contentContainerStyle={styles.verticalList}
    columnWrapperStyle={styles.row}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (
      <View style={styles.flashItem}>
  <View style={styles.imageContainer}>
    <View style={styles.discountTag}>
      <Text style={styles.discountText}>{item.discount} OFF</Text>
    </View>
    <Image
      source={{ uri: `${imageBase}${item.images[0]}` }}
      style={styles.flashImage}
    />
  </View>

  <View style={styles.detailsContainer}>
    <Text style={styles.flashName} numberOfLines={1}>{item.title}</Text>

    <TouchableOpacity style={styles.addToCartButton}>
      <Text style={styles.addToCartText}>Add to Cart</Text>
    </TouchableOpacity>
  </View>
</View>

    )}
    
  />
</View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,paddingTop: 20,  backgroundColor: '#fff' },
  banner: { width: '100%', height: 150, borderRadius: 10 },
  section: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  seeAll: {
    color: '#1E90FF',
    fontWeight: '600',
  },
  
  verticalList: {
    paddingBottom: 50,
  },
  
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  
  seeAll: { color: '#1EB1C5' },
  horizontalList: { paddingLeft: 10 },
  categoryItem: { alignItems: 'center', marginRight: 20 },
  categoryIcon: {
    width: 60,
    height: 60,
    marginBottom: 5,
    backgroundColor: '#E6F8FA',
    borderRadius: 15,
  },
  categoryText: { fontSize: 12 },

rowBottom: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

flashItem: {
  width: '48%',
  backgroundColor: '#fff',
  borderRadius: 10,
  overflow: 'hidden',
  marginBottom: 15,
},


imageContainer: {
  backgroundColor: '#E9F8FF', // light blue
  padding: 10,
  position: 'relative',
  alignItems: 'center',
},

flashImage: {
  width: '100%',
  height: 100,
  resizeMode: 'contain',
},

discountTag: {
  position: 'absolute',
  top: 8,
  left: 8,
  backgroundColor: '#0047AB',
  borderRadius: 4,
  paddingHorizontal: 6,
  paddingVertical: 3,
  zIndex: 1,
},

discountText: {
  color: '#fff',
  fontSize: 10,
  fontWeight: 'bold',
},

detailsContainer: {
  backgroundColor: '#fff',
  padding: 10,
},

flashName: {
  fontSize: 14,
  fontWeight: '500',
  color: '#333',
  marginBottom: 10,
},

addToCartButton: {
  backgroundColor: '#fff',
  borderColor: '#00BFFF',
  borderWidth: 1,
  borderRadius: 6,
  paddingVertical: 6,
  alignItems: 'center',
},

addToCartText: {
  color: '#00BFFF',
  fontSize: 13,
  fontWeight: '600',
},

  
});

export default Home;
