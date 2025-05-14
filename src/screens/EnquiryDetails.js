import React, { useContext, useEffect,useState } from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity,ScrollView, Alert } from 'react-native';
import AddressSelector from '../components/AddressSelector';
import CarrierTrackingCard from '../components/CareerTrackingCard';
import { AuthContext } from '../context/AuthContext';
import api from '../constants/api';
import { Button } from 'react-native-paper';
import ProductsLinkedModal from '../components/ProductsLinkedModal';

const addresses = [
  {
    id: 1,
    label: 'Home',
    address: '112 Castle Street, Rolla Sharjah, UAE, 85213',
  },
  {
    id: 2,
    label: 'Office',
    address: '221 Tiger Building, Sheikh Zayed Road, Dubai UAE, 85214',
  },
  {
    id: 3,
    label: 'Friends',
    address: '221 Naif Street, Deira Dubai, UAE, 85213',
  },
];

const EnquiryDetails = ({ route }) => {
	const { enquiry } = route.params || {};
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const { user, logout } = useContext(AuthContext);
  const [enquiries, setEnquiries] = useState({});
  const [tracking, setTracking] = useState({});
  const [profile, setProfile] = useState({});
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptFileDoc, setReceiptFileDoc] = useState(null);
  const [receiptUrl, setReceiptUrl] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [productsLinked, setProductsLinked] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [selectedAddressString, setSelectedAddressString] = useState('');

  const profileAddress = {
    customer_address_id: "profile", // Unique id for selection
    shipper_name: profile.first_name + ' ' + (profile.last_name || ''),
    address_flat: profile.address2 || '',
    address_street: profile.address_area || '',
    address_city: profile.address_city || '',
    address_town: profile.address_town || '',
    address_po_code: profile.address_po_code || '',
    address_state: profile.address_state || '',
    address_country: profile.address_country || '',
  
  };

  const styles = getStyles(isDarkMode);
  const handleSelect = (id) => {
    const selected = addresses.find(a => a.id === id);
    setSelectedAddress(id);
  
    const selectedAddr = combinedAddressList.find(addr => addr.customer_address_id === id);
  
    if (selectedAddr) {
      // Concatenate address fields
      const fullAddress = `${selectedAddr.shipper_name}, ${selectedAddr.address_flat}, ${selectedAddr.address_street}, ${selectedAddr.address_city}, ${selectedAddr.address_town}, ${selectedAddr.address_state}, ${selectedAddr.address_country} - ${selectedAddr.address_po_code}${selectedAddr.phone ? `, Phone: ${selectedAddr.phone}` : ''}`;
  
      // Set the formatted address string
      setSelectedAddressString(fullAddress);
    }
    //Alert.alert('Selected', selected.customer_address_id);
  };
  const formatDate = () => {
    const now = new Date();
  
    const date = now.toLocaleDateString('en-GB'); // DD/MM/YYYY
    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  
    return `${date.replace(/\//g, '-')} ${time.toLowerCase()}`;
  };
  const generateOrder = () => {
    if(selectedAddressString){
    // enquiry.modification_date = moment().format('DD-MM-YYYY h:mm:ss a');
    enquiry.modification_date = formatDate();
    enquiry.shipping_address = selectedAddressString;
      api
        .post('/enquiry/updateShipping', enquiry)
        .then(() => {
          Alert.alert("Address updated Successfully")
          // setTimeout(() => {
          //   window.location.reload();
          // }, 300);
        })
        .catch(() => {
          Alert.alert("Unable to update shipping address")
        
        });
      }else{
        Alert.alert("Please Select the shipping address")
      
      }
   
  };
useEffect(()=>{
  api
  .post(`/contact/getContactsById`, { contact_id: user.contact_id })
  .then((res) => {
    setProfile(res.data.data[0]);
    
  })
  .catch((err) => console.log(err));
  api
  .post(`/enquiry/getEnquiryProductsByEnquiryId`, { enquiry_id: enquiry.enquiry_id })
  .then((res) => {
    console.log('productslinked',res.data.data);
    setProductsLinked(res.data.data);
   
    
  })
  .catch((err) => console.log(err));

api.post('/file/getListOfFiles', { record_id: enquiry.enquiry_id, room_name: 'PaymentReceipt' }).then((res) => {
  setReceiptUrl(res.data);
});
if(user){
api
.post(`/contact/getAddressessByContactId`, { contact_id: user.contact_id })
.then((res) => {
  setAddressList(res.data.data);
  
})
.catch((err) => console.log(err));
}

api
.post(`/tracking/getQuoteTrackItemsById`, { enquiry_id: enquiry.enquiry_id })
.then((res) => {
setTracking(res.data.data[0]);

})
.catch((err) => console.log(err));

},[enquiry])

const combinedAddressList = [profileAddress, ...addressList];
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Enquiry Details</Text>
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.name}>{enquiry?.title}</Text>
{productsLinked.length>0 && <ProductsLinkedModal productsLinked={productsLinked} />}
      <View style={styles.row}>
        <Text style={styles.label}>Enquiry Code</Text>
        <Text style={styles.enquiryId}>{enquiry?.enquiry_code}</Text>
        <Text style={styles.status}>{enquiry?.status}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Created Date :</Text>
        <Text style={styles.value}>{enquiry?.creation_date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Enquiry Type:</Text>
        <Text style={styles.value}>{enquiry?.enquiry_type}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Order Code</Text>
        <Text style={styles.budget}>{enquiry?.order_code}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{enquiry?.shipping_address}</Text>
      </View>

      <Text style={[styles.header, { marginTop: 20 }]}>Payment Receipt</Text>
      <TouchableOpacity style={styles.uploadBox}>
        <Text style={styles.uploadText}>Upload your file here</Text>
      </TouchableOpacity>

      <AddressSelector addresses={combinedAddressList} onSelect={handleSelect} />
      <View style={styles.editButtonWrapper}>
            <Button mode="contained" onPress={generateOrder} style={styles.button} >Save Address</Button>
          </View>
      <CarrierTrackingCard tracking={tracking} />
    </ScrollView>
  );
};

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor:'#fff',
      minHeight: '100%',
      fontFamily: 'Outfit-Regular',
    },
    header: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      color:'#000',
      marginBottom: 16,
      fontFamily: 'Outfit-Regular',
    },
    welcome: {
      fontSize: 14,
      textAlign: 'center',
      color:'#444',
      fontFamily: 'Outfit-Regular',
    },
    name: {
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
      color:'#000',
      marginBottom: 10,
      fontFamily: 'Outfit-Regular',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 6,
      alignItems: 'center',
      fontFamily: 'Outfit-Regular',
    },
    label: {
      color:'#888',
      fontSize: 14,
      fontFamily: 'Outfit-Regular',
    },
    value: {
      color:'#222',
      fontSize: 14,
      fontFamily: 'Outfit-Regular',
    },
    enquiryId: {
      fontWeight: 'bold',
      color:'#000',
      fontSize: 15,
      fontFamily: 'Outfit-Regular',
    },
    status: {
      backgroundColor: '#D0F5D7',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      fontSize: 12,
      color: '#007F00',
      marginLeft: 10,
      fontFamily: 'Outfit-Regular',
    },
    budget: {
      color: '#00C3D2',
      fontWeight: '600',
      fontSize: 14,
      fontFamily: 'Outfit-Regular',
    },
    uploadBox: {
      marginTop: 10,
      paddingVertical: 30,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Outfit-Regular',
    },
    uploadText: {
      color: '#888',
      fontFamily: 'Outfit-Regular',
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
      marginTop: 10,
      backgroundColor: '#00B4D8',
      fontFamily: 'Outfit-Regular',
      color:'#fff'
    },
    editButtonWrapper: {
      //marginTop: 15,
      marginBottom:25,
      fontFamily: 'Outfit-Regular',
    },
  });

export default EnquiryDetails;
