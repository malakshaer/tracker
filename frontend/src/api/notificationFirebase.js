import database from "@react-native-firebase/database";

export const sendNotification = async () => {
  await database()
    .ref("/notifications")
    .set({
      message: "Your Car is Active now",
      is_read: 0,
    })
    .then(() => console.log("Data set"));
};

export const deleteNotification = async ({ id }) => {
  await database().ref(`/notifications/${id}`).remove();
};

export const deleteAllNotifications = async () => {
  await database().ref("/notifications").remove();
};

export const readNotification = async ({ id }) => {
  await database()
    .ref(`/notifications/${id}`)
    .update({
      is_read: 1,
    })
    .then(() => console.log("Message read"));
};

export const getAllNotifications = async () => {
  await database().ref(`/notifications`).get();
};

export const getSingleNotification = async ({ id }) => {
  await database().ref(`/notifications/${id}`).get();
};
