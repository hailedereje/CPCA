/* eslint-disable react/prop-types */
// src/components/Notifications.js
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import newRequests from "@/utils/newRequest";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SocketContext from "@/context/DiscussionContext";

const Notifications = ({ onNotificationCount }) => {
  const user = useSelector((state) => state.userState.user);
  const socket = useContext(SocketContext);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("connecting to socket")
      socket.connect();
      socket.auth = user;

      socket.on("receive-notification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        onNotificationCount(notifications.length + 1);
        toast.success(notification.message);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [socket, user]);

  useEffect(() => {
    const fetchNotifications = () => {
      newRequests.get(`/notifications`).then((response) => {
        setNotifications(response.data);
        onNotificationCount(response.data.length);
      });
    };

    fetchNotifications();
  }, [user]);

  const readNotification = (id, classroom) => {
    newRequests.put(`/notifications/${id}`).then(() => {
      setNotifications(
        notifications.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
      navigate(`classrooms/${classroom}/discussions/content`);
    });
    onNotificationCount(notifications.length - 1)
  };

  const markAsRead = (id) => {
    newRequests.put(`/notifications/${id}`).then(() => {
      setNotifications(
        notifications.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    });
    onNotificationCount(notifications.length - 1)
  };

  const deleteNotification = (id) => {
    newRequests.delete(`/notifications/${id}`).then(() => {
      setNotifications(
        notifications.filter((notification) => notification._id !== id)
      );
    });
    onNotificationCount(notifications.length - 1)
  };

  return (
    <div className="max-w-md mx-auto rounded-xl shadow-lg border border-gray-200 bg-white">
      <ul className="divide-y divide-gray-200 max-h-[50vh] overflow-y-auto rounded-xl">
        {notifications.map((notification) => (
          <motion.li
            key={notification._id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`p-4 pb-1 bg-white`}
          >
            <div className="flex justify-between items-center">
              <span className="flex-1 text-left mb-2 line-clamp-2">
                {notification.message}
              </span>
            </div>
            <div className="mt-2 flex space-x-4 text-xs">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-lg"
                onClick={() =>
                  readNotification(notification._id, notification.classroom)
                }
              >
                Read
              </button>
              {!notification.read && (
                <button
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-lg"
                  onClick={() => markAsRead(notification._id)}
                >
                  Mark as read
                </button>
              )}
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-lg"
                onClick={() => deleteNotification(notification._id)}
              >
                Delete
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
