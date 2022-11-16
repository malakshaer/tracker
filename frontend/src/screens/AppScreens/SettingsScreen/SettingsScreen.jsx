const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SettingsComponent
        text={"Clear Notifications"}
        onPress={() => {
          setVisibleNotification(true);
        }}
      />
      <SettingsComponent
        text={"Clear all Vehicles"}
        onPress={() => {
          setVisibleVehicle(true);
        }}
      />
      <SettingsComponent
        text={"Delete Account"}
        onPress={() => {
          setVisibleSendNotification(true);
        }}
      />
      <SettingsComponent
        text={"Sign Out"}
        onPress={() => {
          setVisible(true);
        }}
      />

      <ModalPopup visible={visibleSendNotification}>
        <View style={styles.popUpContainer}>
          <Text style={styles.textPopUp}>
            Are you sure you want to delete you account?
          </Text>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => deleteAccount()}>
              <Image
                source={require("../../../../assets/check.png")}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleSendNotification(false)}>
              <Image
                source={require("../../../../assets/x.png")}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopup>

      <ModalPopup visible={visibleNotification}>
        <View style={styles.popUpContainer}>
          <Text style={styles.textPopUp}>
            Are you sure you want to Clear all Notifications?
          </Text>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => deleteAllNotifications()}>
              <Image
                source={require("../../../../assets/check.png")}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleNotification(false)}>
              <Image
                source={require("../../../../assets/x.png")}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopup>

      <ModalPopup visible={visibleVehicle}>
        <View style={styles.popUpContainer}>
          <Text style={styles.textPopUp}>
            Are you sure you want to Clear all vehicles?
          </Text>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => deleteAllCars()}>
              <Image
                source={require("../../../../assets/check.png")}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleVehicle(false)}>
              <Image
                source={require("../../../../assets/x.png")}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopup>

      <ModalPopup visible={visible}>
        <View style={styles.popUpContainer}>
          <Text style={styles.textPopUp}>
            Are you sure you want to Sign Out?
          </Text>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => handleNavigation()}>
              <Image
                source={require("../../../../assets/check.png")}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require("../../../../assets/x.png")}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopup>
    </View>
  );
};

export default SettingsScreen;