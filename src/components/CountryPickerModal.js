import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';

const CountryPickerModal = ({
  visible,
  onClose,
  onSelect,
  search = '',
  onSearch = () => {},
  filteredCountries = [],
  styles = {}
}) => (
  <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={false}>
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Search country or code"
        value={search}
        onChangeText={onSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredCountries}
        keyExtractor={item => item.cca2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.countryRow}
            onPress={() => {
              onSelect(item);
              onClose && onClose();
            }}
          >
            <Image
              source={{
                uri: `https://flagcdn.com/w40/${item.cca2.toLowerCase()}.png`
              }}
              style={styles.flag}
            />
            <Text style={styles.countryText}>
              {item.name} ({item.dial_code})
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  </Modal>
);

export default CountryPickerModal;