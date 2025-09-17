import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from '../../services/notificationService';

// Async thunks for API calls
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const result = await notificationService.fetchNotifications();
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId, { rejectWithValue }) => {
    try {
      const result = await notificationService.markNotificationAsRead(notificationId);
      if (result.success) {
        return notificationId;
      } else {
        return rejectWithValue(result.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      const result = await notificationService.markAllNotificationsAsRead();
      if (result.success) {
        return true;
      } else {
        return rejectWithValue(result.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteNotificationAsync = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId, { rejectWithValue }) => {
    try {
      const result = await notificationService.deleteNotification(notificationId);
      if (result.success) {
        return notificationId;
      } else {
        return rejectWithValue(result.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUnreadCount = createAsyncThunk(
  'notifications/fetchUnreadCount',
  async (_, { rejectWithValue }) => {
    try {
      const result = await notificationService.getUnreadCount();
      if (result.success) {
        return result.data;
      } else {
        return rejectWithValue(result.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for checking new notifications
export const checkNewNotifications = createAsyncThunk(
  'notifications/checkNewNotifications',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const lastFetchTimestamp = state.notifications.lastFetchTimestamp;
      const result = await notificationService.checkForNewNotifications(lastFetchTimestamp);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Sample notification data for fallback/offline mode
const sampleNotifications = [
  {
    id: 1,
    title: 'Order Confirmed',
    message: 'Your order #12345 has been confirmed and is being processed.',
    type: 'order',
    read: false,
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    action: {
      screen: 'EnquiryHistory',
      params: {}
    }
  },
  {
    id: 2,
    title: 'Special Offer!',
    message: 'Get 20% off on all electronics. Limited time offer!',
    type: 'promotion',
    read: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    action: {
      screen: 'Categories',
      params: {}
    }
  },
  {
    id: 3,
    title: 'Welcome to Smart Wave!',
    message: 'Thank you for joining us. Explore our wide range of products.',
    type: 'info',
    read: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    action: {
      screen: 'Home',
      params: {}
    }
  }
];

const initialState = {
  notifications: [],
  unreadCount: 0,
  showModal: false,
  loading: false,
  error: null,
  lastFetched: null,
  isOnline: true,
  lastFetchTimestamp: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const newNotification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload,
      };
      state.notifications.unshift(newNotification);
      state.unreadCount = state.notifications.filter(n => !n.read).length;
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
      // If going offline and no notifications, use sample data
      if (!action.payload && state.notifications.length === 0) {
        state.notifications = sampleNotifications;
        state.unreadCount = sampleNotifications.filter(n => !n.read).length;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    // Action to simulate receiving a new notification
    simulateNotification: (state, action) => {
      const types = ['order', 'promotion', 'info'];
      const titles = {
        order: ['Order Confirmed', 'Order Shipped', 'Order Delivered'],
        promotion: ['Special Offer!', 'Flash Sale!', 'Discount Alert!'],
        info: ['App Update', 'New Feature', 'System Maintenance']
      };
      const messages = {
        order: [
          'Your order has been confirmed and is being processed.',
          'Your order is on the way and will arrive soon.',
          'Your order has been delivered successfully.'
        ],
        promotion: [
          'Get amazing discounts on selected items.',
          'Limited time offer - don\'t miss out!',
          'Exclusive deals just for you.'
        ],
        info: [
          'A new app update is available with exciting features.',
          'We\'ve added new functionality to improve your experience.',
          'Scheduled maintenance will occur tonight.'
        ]
      };
      
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomTitle = titles[randomType][Math.floor(Math.random() * titles[randomType].length)];
      const randomMessage = messages[randomType][Math.floor(Math.random() * messages[randomType].length)];
      
      const newNotification = {
        id: Date.now(),
        title: randomTitle,
        message: randomMessage,
        type: randomType,
        read: false,
        timestamp: new Date().toISOString(),
        action: {
          screen: randomType === 'order' ? 'EnquiryHistory' : randomType === 'promotion' ? 'Categories' : 'Home',
          params: {}
        }
      };
      
      state.notifications.unshift(newNotification);
      state.unreadCount = state.notifications.filter(n => !n.read).length;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.read).length;
        state.lastFetched = new Date().toISOString();
        state.error = null;
        state.lastFetchTimestamp = new Date().toISOString();
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // If fetch fails and no notifications exist, use sample data
        if (state.notifications.length === 0) {
          state.notifications = sampleNotifications;
          state.unreadCount = sampleNotifications.filter(n => !n.read).length;
        }
      })
      
      // Check new notifications cases
      .addCase(checkNewNotifications.pending, (state) => {
        // Don't set loading for background checks
      })
      .addCase(checkNewNotifications.fulfilled, (state, action) => {
        if (action.payload.success && action.payload.data?.hasNewNotifications) {
          // If there are new notifications, we might want to fetch them
          // or update the unread count
          if (action.payload.data.newCount) {
            state.unreadCount = action.payload.data.newCount;
          }
        }
      })
      .addCase(checkNewNotifications.rejected, (state, action) => {
        // Silently handle errors for background checks
        state.error = null; // Don't show errors for background checks
      })
      
      // Fetch unread count cases
      .addCase(fetchUnreadCount.pending, (state) => {
        // Don't set loading for unread count fetch
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })
      .addCase(fetchUnreadCount.rejected, (state, action) => {
        // Silently handle unread count fetch errors
        state.error = null;
      })
      
      // Mark notification as read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.error = null;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(n => n.id === action.payload);
        if (notification && !notification.read) {
          notification.read = true;
          state.unreadCount = state.notifications.filter(n => !n.read).length;
        }
        state.error = null;
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Mark all notifications as read
      .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.error = null;
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.notifications.forEach(notification => {
          notification.read = true;
        });
        state.unreadCount = 0;
        state.error = null;
      })
      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Delete notification
      .addCase(deleteNotificationAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteNotificationAsync.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(n => n.id === action.payload);
        if (index !== -1) {
          const wasUnread = !state.notifications[index].read;
          state.notifications.splice(index, 1);
          if (wasUnread) {
            state.unreadCount = state.notifications.filter(n => !n.read).length;
          }
        }
        state.error = null;
      })
      .addCase(deleteNotificationAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  addNotification,
  clearAllNotifications,
  setShowModal,
  setOnlineStatus,
  clearError,
  simulateNotification,
} = notificationSlice.actions;

// Legacy action exports for backward compatibility
export const markAsRead = markNotificationAsRead;
export const markAllAsRead = markAllNotificationsAsRead;
export const deleteNotification = deleteNotificationAsync;

export default notificationSlice.reducer;