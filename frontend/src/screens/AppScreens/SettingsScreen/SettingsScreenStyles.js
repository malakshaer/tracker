import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    popUpContainer: {
        alignItems: "center",
    },
    header: {
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
    },
    textPopUp: {
        marginVertical: 30,
        fontSize: 20,
        textAlign: "center",
        color: "#032955",
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
    },
    textPermission: {
        marginVertical: 20,
        fontSize: 20,
        color: "#032955",
        paddingRight: 50,
    },
});

export default styles;