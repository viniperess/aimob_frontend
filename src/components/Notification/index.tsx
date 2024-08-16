import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import api from "../../service/api";
import "./styles.css";
import { NotificationType } from "../../types/notification";

const NotificationDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get<NotificationType[]>("/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (
    notificationId: number,
    taskId: number
  ) => {
    try {
      // Navigate to the task page
      navigate(`/tasks/${taskId}`);

      // Optionally, you can also remove the notification from the list
      setNotifications(notifications.filter((n) => n.id !== notificationId));

      // Call the backend to remove the notification
      await api.delete(`/notifications/${notificationId}`);
    } catch (error) {
      console.error("Failed to handle notification click", error);
    }
  };

  return (
    <div className="notification-dropdown">
      <div
        className="notification-icon"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <IoIosNotifications size={24} />
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </div>
      {dropdownOpen && (
        <div className="dropdown-menu">
          {notifications.length > 0 ? (
            <ul className="notification-list">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  onClick={() =>
                    handleNotificationClick(
                      notification.id,
                      notification.taskId
                    )
                  }
                >
                  Task #{notification.taskId} has been created
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-notifications">No notifications available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
