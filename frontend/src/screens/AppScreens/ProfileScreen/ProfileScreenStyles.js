import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  containerOne: {
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 15,
    alignItems: "center",
  },
  userName: {
    color: "#032955",
    fontSize: 20,
    fontWeight: "bold",
  },
  containerTwo: {
    flexDirection: "row",
    paddingLeft: 45,
    marginVertical: 15,
  },
  image: {
    borderRadius: 70,
    width: 100,
    height: 100,
  },
  editButton: {
    elevation: 8,
    backgroundColor: "#1648AD",
    borderRadius: 50,
    paddingVertical: 10,
    marginHorizontal: 80,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  headerSendNotification: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
  },
  imageProfile: {
    alignItems: "center",
    marginBottom: 30,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1648AD",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#1648AD",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  deleteCarButton: {
    elevation: 8,
    backgroundColor: "red",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  addButton: {
    position: "absolute",
    marginTop: 530,
    marginLeft: 320,
    bottom: 10,
    right: 20,
  },
  titleVehicle: {
    marginLeft: 20,
    marginVertical: 10,
    fontSize: 18,
    color: "#032955",
    fontWeight: "bold",
  },
  default: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default styles;
