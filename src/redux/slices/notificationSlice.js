import { createSlice } from '@reduxjs/toolkit';

// Sample notification data for testing
const sampleNotifications = [
  {
    id: 1,
    title: 'Order Confirmed',
    message: 'Your order #12345 has been confirmed and is being processed.',
    type: 'order',
    read: false,
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
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
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
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
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    action: {
      screen: 'Home',
      params: {}
    }
  },
  {
    id: 4,
    title: 'Order Shipped',
    message: 'Your order #12344 has been shipped and will arrive in 2-3 days.',
    type: 'order',
    read: false,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    action: {
      screen: 'EnquiryHistory',
      params: {}
    }
  },
  {
    id: 5,
    title: 'New Products Available',
    message: 'Check out our latest collection of smart home devices.',
    type: 'info',
    read: true,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    action: {
      screen: 'ProductList',
      params: { categoryName: 'Smart Home' }
    }
  }
];

const initialState = {
  notifications: sampleNotifications,
  unreadCount: sampleNotifications.filter(n => !n.read).length,
  showModal: false,
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
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = state.notifications.filter(n => !n.read).length;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    deleteNotification: (state, action) => {
      const index = state.notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        const wasUnread = !state.notifications[index].read;
        state.notifications.splice(index, 1);
        if (wasUnread) {
          state.unreadCount = state.notifications.filter(n => !n.read).length;
        }
      }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
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
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  setShowModal,
  simulateNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;