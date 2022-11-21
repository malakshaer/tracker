import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  note: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  text: {
    color: "#032955",
    fontSize: 16,
  },
  headerTextStyle: {
    color: "rgb(76, 76, 76)",
    fontSize: 18,
    marginBottom: 20,
  },
  imageStyle: {
    height: "50%",
    resizeMode: "contain",
    marginTop: 100,
  },
});

export default styles;
