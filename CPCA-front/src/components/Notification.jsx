/* eslint-disable react/prop-types */
// src/components/Notifications.js
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SocketContext from '../context/DiscussionContext';
import newRequests from '@/utils/newRequest';
import { MdMoreVert } from 'react-icons/md';
import { FiCheckCircle, FiTrash, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Notifications = ({ onNotificationCount }) => {
  const user = useSelector((state) => state.userState.user);
  const socket = useContext(SocketContext);
  const [notifications, setNotifications] = useState([]);
  const [toggle, setToggle] = useState({ index: null, show: false });
  const navigate = useNavigate();

  useEffect(() => {
    newRequests.get(`/notifications`)
      .then(response => {
        setNotifications(response.data);
        onNotificationCount(response.data.length);
      });

    socket.on('new_notification', (notification) => {
      setNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications, notification];
        onNotificationCount(updatedNotifications.length);
        return updatedNotifications;
      });
    });

    return () => {
      socket.off('new_notification');
    };
  }, [onNotificationCount, socket, user]);

  const readNotification = (id) => {
    newRequests.put(`/notifications/${id}`)
      .then(() => {
        setNotifications(notifications.map(notification =>  
          notification._id === id ? { ...notification, read: true } : notification
        ));
        navigate('/courses');
      });
  };

  const markAsRead = (id) => {
    newRequests.put(`/notifications/${id}`)
      .then(() => {
        setNotifications(notifications.map(notification => 
          notification._id === id ? { ...notification, read: true } : notification
        ));
      });
  };

  const deleteNotification = (id) => {
    newRequests.delete(`/notifications/${id}`)
      .then(() => {
        setNotifications(notifications.filter(notification => notification._id !== id));
      });
  };

  return (
    <div className="max-w-md mx-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[30vh] overflow-y-auto rounded-xl">
        {notifications.map((notification) => (
          <motion.li
            key={notification._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`p-4 flex justify-between items-center ${notification.read ? 'bg-gray-100 dark:bg-gray-800' : 'bg-blue-100 dark:bg-blue-800'}`}
          >
            <span className="flex-1">{notification.message}</span>
            <div className="relative flex-shrink-0 ml-2">
              <button onClick={() => setToggle({ index: notification._id, show: notification._id === toggle.index ? !toggle.show : true })}>
                <MdMoreVert className="text-gray-500 dark:text-gray-300" />
              </button>
              {notification._id === toggle.index && toggle.show && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-0 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-50"
                >
                  <ul className="py-1">
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" onClick={() => readNotification(notification._id)}>
                      <FiEye className="mr-2" /> Read
                    </li>
                    {!notification.read && (
                      <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" onClick={() => markAsRead(notification._id)}>
                        <FiCheckCircle className="mr-2" /> Mark as read
                      </li>
                    )}
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" onClick={() => deleteNotification(notification._id)}>
                      <FiTrash className="mr-2" /> Delete
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
