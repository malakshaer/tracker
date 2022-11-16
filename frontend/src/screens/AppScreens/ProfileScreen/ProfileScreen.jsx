import React, { useReducer, useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import userProfile from "../../../../assets/user.jpg";
import Icon from "react-native-vector-icons/Ionicons";
import CarComponent from "../../../components/CarComponent/CarComponent";
import ModalPopup from "../../../components/Modal/Modal";
import { TextInput } from "react-native-gesture-handler";
// import { createNewCar } from "../../../api/carApi";
// import { editUser } from "../../../api/userApi";
import { editCar } from "../../../api/carApi";
import { deleteCar } from "../../../api/carApi";
import axios from "axios";
const BASE_URL = "https://127.0.0.1:8000/api/auth";
import UserContext from "../../../../App";
import add from "../../../../assets/add.png";

const ProfileScreen = () => {
  const [visibleEditProfile, setVisibleEditProfile] = useState(false);
  const [visibleAddVehicle, setVisibleAddVehicle] = useState(false);
  const [visibleEditVehicle, setVisibleEditVehicle] = useState(false);

  const [iconName, setIconName] = React.useState("checkmark-circle-outline");

  const id = useContext(UserContext);
  const [cars, setCars] = useState([]);

  const [name, setName] = useState("Malak Shaer");
  const [email, setEmail] = useState("malakshaer@gmail.com");
  const [password, setPassword] = useState("");

  const [carName, setCarName] = useState();
  const [pin, setPin] = useState();

  const createNewCar = () => {
    const data = {
      carName: carName,
      pin: pin,
    };
    axios({
      method: "POST",
      data,
      url: `${BASE_URL}/createNewCar/${id}`,
    })
      .then((res) => {
        console.log(res);
        setCars([...cars, res.data]);
      })
      .catch((error) => console.log(error));
  };

  const editUser = () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    axios({
      method: "PUT",
      data,
      url: `${BASE_URL}/editUser/${id}`,
    })
      .then((res) => {
        console.log(res);
        setName(name);
        setEmail(email);
        setPassword(password);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}/showProfile/${id}`,
    }).then((res) => {
      setName(res.data);
      setEmail(res.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerOne}>
          {/* <Image style={styles.image} source={userProfile} /> */}
          <View style={{ paddingLeft: 40 }}>
            <Text style={styles.userName}>{name}</Text>
            {/* <Text style={{ color: "#1648AD" }}>{carStatus}Active</Text> */}
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setVisibleEditProfile(true)}
            style={styles.editButton}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerTwo}>
          <Icon
            name={"mail"}
            size={20}
            color={"#1648AD"}
            style={{ paddingHorizontal: 10 }}
          />
          <Text>{email}</Text>
        </View>

        <View
          style={{
            borderWidth: 0.5,
            borderBottomColor: "#032955",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View>
          <Text style={styles.titleVehicle}>Your Vehicles:</Text>
          {cars.map((car) => {
            // console.warn(car);
            return (
              <CarComponent
                key={car._id}
                carId={car._id}
                carName={car.carName}
              />
            );
          })}
          <CarComponent
            carName={"Toyota"}
            onPress={() => setVisibleEditVehicle(true)}
          />
          <CarComponent
            carName={"BMW"}
            onPress={() => setVisibleEditVehicle(true)}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setVisibleAddVehicle(true)}
      >
        <Image
          source={add}
          style={{
            width: 70,
            height: 70,
          }}
        />
      </TouchableOpacity>

      <ModalPopup visible={visibleEditProfile}>
        <View style={styles.popUpContainer}>
          <View style={styles.headerSendNotification}>
            <TouchableOpacity onPress={() => setVisibleEditProfile(false)}>
              <Image
                source={require("../../../../assets/x.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.option}>
            <TextInput
              style={styles.textPopUp}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            ></TextInput>
            <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
          </View>
          <View style={styles.option}>
            <TextInput
              style={styles.textPopUp}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></TextInput>
            <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
          </View>
          <View style={styles.option}>
            <TextInput
              style={styles.textPopUp}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></TextInput>
            <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => editUser()}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ModalPopup>

      <ModalPopup visible={visibleAddVehicle}>
        <View style={styles.popUpContainer}>
          <View style={styles.headerSendNotification}>
            <TouchableOpacity onPress={() => setVisibleAddVehicle(false)}>
              <Image
                source={require("../../../../assets/x.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageProfile}>
            <TouchableOpacity>
              <Text
                style={{ color: "#032955", fontSize: 20, fontWeight: "bold" }}
              >
                Add new Vehicle
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <TextInput
              style={styles.textPopUp}
              placeholder="Car Name/Type"
            ></TextInput>
            <Icon name={"add"} size={30} color={"#032955"} />
          </View>
          <View style={styles.option}>
            <TextInput style={styles.textPopUp} placeholder="PIN"></TextInput>
            <Icon name={"add"} size={30} color={"#032955"} />
          </View>
          {/* <View style={styles.default}>
            <TouchableOpacity>
              <Icon
                name={iconName}
                size={30}
                color={"#032955"}
                onPress={() => {
                  if (iconName == "checkmark-circle-outline") {
                    setIconName("checkmark-circle");
                  }
                  if (iconName == "checkmark-circle") {
                    setIconName("checkmark-circle-outline");
                  }
                }}
              />
            </TouchableOpacity>
            <Text>Make this my default vehicle</Text>
          </View> */}

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => createNewCar()}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ModalPopup>

      <ModalPopup visible={visibleEditVehicle}>
        <View style={styles.popUpContainer}>
          <View style={styles.headerSendNotification}>
            <TouchableOpacity onPress={() => setVisibleEditVehicle(false)}>
              <Image
                source={require("../../../../assets/x.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageProfile}>
            <TouchableOpacity>
              <Text
                style={{ color: "#032955", fontSize: 20, fontWeight: "bold" }}
              >
                Edit Your Vehicle
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <TextInput
              style={styles.textPopUp}
              placeholder="Car Name/Type"
            ></TextInput>
            <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
          </View>
          <View style={styles.option}>
            <TextInput style={styles.textPopUp} placeholder="PIN"></TextInput>
            <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
          </View>
          <View style={styles.default}>
            <TouchableOpacity>
              <Icon
                name={iconName}
                size={30}
                color={"#032955"}
                onPress={() => {
                  if (iconName == "checkmark-circle-outline") {
                    setIconName("checkmark-circle");
                  }
                  if (iconName == "checkmark-circle") {
                    setIconName("checkmark-circle-outline");
                  }
                }}
              />
            </TouchableOpacity>
            <Text>Make this my default vehicle</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => editCar()}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => deleteCar()}
            style={styles.deleteCarButton}
          >
            <Text style={styles.appButtonText}>Delete Car</Text>
          </TouchableOpacity>
        </View>
      </ModalPopup>
    </View>
  );
};

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
export default ProfileScreen;
