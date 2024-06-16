/* eslint-disable react/prop-types */
// src/components/Notifications.js
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import newRequests from "@/utils/newRequest";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SocketContext from "@/context/DiscussionContext";
import { toast } from "react-toastify";
import { FiCheckCircle, FiTrash2, FiEye } from "react-icons/fi";

const Notifications = ({ onNotificationCount }) => {
  const user = useSelector((state) => state.userState.user);
  const socket = useContext(SocketContext);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("connecting to socket");
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
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
      navigate(`classrooms/${classroom}/discussions/content`);
    });
    onNotificationCount((prevCount) => prevCount - 1);
  };

  const markAsRead = (id) => {
    newRequests.put(`/notifications/${id}`).then(() => {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    });
    onNotificationCount((prevCount) => prevCount - 1);
  };

  const deleteNotification = (id) => {
    newRequests.delete(`/notifications/${id}`).then(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id)
      );
    });
    onNotificationCount((prevCount) => prevCount - 1);
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl shadow-xl border border-gray-300 bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
      <ul className="divide-y divide-gray-200 max-h-[60vh] overflow-y-auto rounded-2xl">
        <AnimatePresence initial={false}>
          {notifications.map((notification) => (
            <motion.li
              key={notification._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className={`p-4 mb-4 rounded-lg shadow-md ${
                notification.read ? "bg-gray-50 opacity-70" : "bg-blue-100 opacity-100"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="flex-1 text-left font-medium text-gray-700 line-clamp-2">
                  {notification.message}
                </span>
                <button
                  className="ml-2 p-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                  onClick={() => deleteNotification(notification._id)}
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex space-x-2 text-xs">
                <button
                  className="flex-1 py-1 px-2 bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer rounded-lg transition"
                  onClick={() =>
                    readNotification(notification._id, notification.classroom)
                  }
                >
                  <FiEye className="h-4 w-4 inline-block" />
                  Read
                </button>
                {!notification.read && (
                  <button
                    className="flex-1 py-1 px-2 bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer rounded-lg transition"
                    onClick={() => markAsRead(notification._id)}
                  >
                    <FiCheckCircle className="h-4 w-4 inline-block" />
                    Mark as read
                  </button>
                )}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default Notifications;
