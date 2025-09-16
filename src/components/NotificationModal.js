import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead } from '../redux/slices/notificationSlice';

const { width, height } = Dimensions.get('window');

const NotificationModal = ({ visible, onClose, navigation }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications?.notifications || []);
  const unreadNotifications = notifications.filter(notification => !notification.read).slice(0, 3); // Show only first 3 unread

  const handleNotificationPress = (notification) => {
    dispatch(markAsRead(notification.id));
    onClose();
    // Navigate to specific screen based on notification type if needed
    if (notification.action) {
      navigation.navigate(notification.action.screen, notification.action.params);
    }
  };

  const handleViewAll = () => {
    onClose();
    navigation.navigate('NotificationList');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now - date) / (1000 * 60);
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`;
    } else {
      const diffInHours = diffInMinutes / 60;
      return `${Math.floor(diffInHours)}h ago`;
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.iconContainer}>
        <Icon 
          name={item.type === 'order' ? 'bag-outline' : item.type === 'promotion' ? 'gift-outline' : 'information-circle-outline'} 
          size={20} 
          color={item.type === 'order' ? '#4CAF50' : item.type === 'promotion' ? '#FF9800' : '#2196F3'} 
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.time}>{formatTime(item.timestamp)}</Text>
      </View>
      <View style={styles.unreadDot} />
    </TouchableOpacity>
  );

  if (!visible || unreadNotifications.length === 0) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Icon name="notifications" size={24} color="#1EB1C5" />
              <Text style={styles.headerTitle}>New Notifications</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={unreadNotifications}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.notificationsList}
          />
          
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleViewAll} style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Notifications</Text>
              <Icon name="arrow-forward" size={16} color="#1EB1C5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: width * 0.9,
    maxHeight: height * 0.6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
    fontFamily: 'Outfit-Regular',
  },
  closeButton: {
    padding: 4,
  },
  notificationsList: {
    maxHeight: height * 0.3,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    fontFamily: 'Outfit-Regular',
  },
  message: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 2,
    fontFamily: 'Outfit-Regular',
  },
  time: {
    fontSize: 10,
    color: '#999',
    fontFamily: 'Outfit-Regular',
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1EB1C5',
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  viewAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1EB1C5',
  },
  viewAllText: {
    fontSize: 14,
    color: '#1EB1C5',
    fontWeight: '600',
    marginRight: 8,
    fontFamily: 'Outfit-Regular',
  },
});

export default NotificationModal;