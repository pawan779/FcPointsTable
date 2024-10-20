// NotificationHandler.tsx
import React, { useEffect } from "react";
import { Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationHandler = () => {
  useEffect(() => {
    // Request permission to show notifications
    const requestPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        Alert.alert("Permission denied", "You need to enable notifications.");
        return;
      }
    };

    requestPermissions();

    // Register for notifications
    const registerForPushNotificationsAsync = async () => {
      if (Platform.OS === "ios") {
        await Notifications.requestPermissionsAsync();
      }
      const token = await Notifications.getExpoPushTokenAsync();
      console.log("Expo Push Token:", token.data); // Save this token to your database

      // save token to async storage
      AsyncStorage.setItem("pushToken", token.data);

      // You can now use this token to send push notifications to this device.
    };

    registerForPushNotificationsAsync();

    // Handle notifications when app is in the foreground
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received in foreground:", notification);
        // Handle the notification in the foreground
        Alert.alert(
          "Foreground Notification",
          notification.request.content.body
        );
      });

    // Handle notifications when app is in the background or terminated
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
        // Handle user interaction with the notification
      });

    // Cleanup the listeners on unmount
    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
    };
  }, []);

  return null;
};

export default NotificationHandler;
