import { Notification } from "../models/index.js";

export const getNotificationByUserId = async (req, res) => {
    const user = req.user._id;
    const notifications = await Notification.find({ user, read: false});
    res.json(notifications);
};
  
export const readNotification =  async (req, res) => {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    res.json(notification);
};

export const deleteNotification = async (req, res) => {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.json({ message: "Notification deleted" });
}
  