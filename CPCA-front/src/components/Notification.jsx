/* eslint-disable react/prop-types */
// src/components/Notifications.js
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SocketContext from '../context/DiscussionContext';
import newRequests from '@/utils/newRequest';
import { MdMoreVert } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Notifications = ({onNotificationCount}) => {
  const user = useSelector((state) => state.userState.user);
  const socket = useContext(SocketContext);
  const [notifications, setNotifications] = useState([]);
  const [toggle, setToggle] = useState({index: null, show: false});
  const navigate = useNavigate();

  useEffect(() => {
    newRequests.get(`/notifications`)
      .then(response => {
        setNotifications(response.data)
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
    <div className="max-w-md mx-auto rounded-xl shadow-lg border border-gray-200">
      <ul className="divide-y divide-gray-200 max-h-[30vh] overflow-y-auto rounded-xl">
        {notifications.map((notification) => (
          <li key={notification._id} className={`p-2 ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
            <div className="flex justify-between items-center">
              <span>{notification.message}</span>
              <div className="relative">
                <button onClick={() => setToggle({index:notification._id, show:!toggle.show})}>
                  <MdMoreVert />
                </button>
                {notification._id === toggle.index && toggle.show && (
                  <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg z-50">
                    <ul className="py-1">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => readNotification(notification._id)}>Read</li>
                      {!notification.read && <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => markAsRead(notification._id)}>Mark as read</li>}
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => deleteNotification(notification._id)}>Delete</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
