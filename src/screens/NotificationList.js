import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchNotifications,
  markNotificationAsRead, 
  markAllNotificationsAsRead, 
  deleteNotificationAsync,
  clearError 
} from '../redux/slices/notificationSlice';

const NotificationList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { 
    notifications, 
    unreadCount, 
    loading, 
    error,
    lastFetched 
  } = useSelector(state => state.notifications);
  
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Fetch notifications when component mounts
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    // Clear error after 5 seconds
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchNotifications());
    setRefreshing(false);
  };

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead());
  };

  const handleDeleteNotification = (id) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => dispatch(deleteNotificationAsync(id)), style: 'destructive' },
      ]
    );
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unreadItem]}
      onPress={() => handleMarkAsRead(item.id)}
    >
      <View style={styles.notificationContent}>
        <View style={styles.iconContainer}>
          <Icon 
            name={item.type === 'order' ? 'bag-outline' : item.type === 'promotion' ? 'gift-outline' : 'information-circle-outline'} 
            size={24} 
            color={item.type === 'order' ? '#4CAF50' : item.type === 'promotion' ? '#FF9800' : '#2196F3'} 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, !item.read && styles.unreadTitle]}>
            {item.title}
          </Text>
          <Text style={styles.message} numberOfLines={2}>
            {item.message}
          </Text>
          <Text style={styles.time}>{formatTime(item.timestamp)}</Text>
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNotification(item.id)}
      >
        <Icon name="trash-outline" size={20} color="#FF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (loading && notifications.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#1EB1C5" />
          <Text style={styles.emptyText}>Loading notifications...</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Icon name="notifications-off-outline" size={64} color="#ccc" />
        <Text style={styles.emptyText}>No notifications yet</Text>
        <Text style={styles.emptySubText}>You'll see your notifications here when you receive them</Text>
        {error && (
          <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderErrorBanner = () => {
    if (!error) return null;
    
    return (
      <View style={styles.errorBanner}>
        <Icon name="warning-outline" size={16} color="#FF4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => dispatch(clearError())}>
          <Icon name="close" size={16} color="#FF4444" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={handleMarkAllAsRead} style={styles.markAllButton}>
            <Text style={styles.markAllText}>Mark All Read</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {renderErrorBanner()}
      
      {notifications.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#1EB1C5']}
              tintColor="#1EB1C5"
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1EB1C5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
  },
  markAllButton: {
    padding: 8,
  },
  markAllText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unreadItem: {
    backgroundColor: '#f0f9ff',
    borderLeftWidth: 4,
    borderLeftColor: '#1EB1C5',
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Outfit-Regular',
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
    fontFamily: 'Outfit-Regular',
  },
  time: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Outfit-Regular',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1EB1C5',
    marginLeft: 8,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Outfit-Regular',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Outfit-Regular',
  },
  errorBanner: {
    backgroundColor: '#ffebee',
    borderColor: '#FF4444',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#FF4444',
    marginLeft: 8,
    fontFamily: 'Outfit-Regular',
  },
  retryButton: {
    backgroundColor: '#1EB1C5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 12,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Outfit-Regular',
  },
});

export default NotificationList;