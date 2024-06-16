import { Notification } from "../models/index.js";

export const getNotificationByUserId = async (req, res) => {
    const user = req.user._id;
    const notifications = await Notification.find({ user, read: false}).sort({ timestamp: -1 });
    res.json(notifications);
};
  
export const readNotification =  async (req, res) => {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    res.json(notification);
};

export const readAllNotifications = async (req, res) => {
    const { classroomId } = req.params;
    await Notification.updateMany({ user: req.user._id, classroom: classroomId }, { read: true });
    res.json({ message: "All notifications read" });
}

export const deleteNotification = async (req, res) => {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.json({ message: "Notification deleted" });
}


  