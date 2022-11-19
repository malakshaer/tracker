import React, {
  useCallback,
  useReducer,
  useState,
  useContext,
  useEffect,
} from "react";
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

import { editCar } from "../../../api/carFirebase";
import { deleteCar } from "../../../api/carFirebase";

import add from "../../../../assets/add.png";
import { set } from "../../../redux/slices/userSlice";
import Loading from "../../../components/Loading/Loading";
import { profile } from "../../../api/authApi";
import createNewCar from "../../../api/carFirebase";
import { editUser } from "../../../api/userApi";
import { getAllCars } from "../../../api/carFirebase";

const ProfileScreen = () => {
  const [visibleEditProfile, setVisibleEditProfile] = useState(false);
  const [visibleAddVehicle, setVisibleAddVehicle] = useState(false);
  const [visibleEditVehicle, setVisibleEditVehicle] = useState(false);

  // const [iconName, setIconName] = React.useState("checkmark-circle-outline");

  const [cars, setCars] = useState([
    {
      carName: "BMW",
      pin: "1234KIA54321",
    },
    {
      carName: "TOYOTA COROLLA",
      pin: "1234KIA54321",
    },
    {
      carName: "MERCEDES",
      pin: "1234KIA54321",
    },
  ]);

  const [carName, setCarName] = useState();
  const [pin, setPin] = useState();

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [_profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditUser = useCallback(async () => {
    try {
      setLoading(true);

      const res = await editUser(name, email, password);

      props.navigation.goBack();
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [name, email, password]);

  useEffect(() => {
    const getData = async () => {
      try {
        const getProfile = await profile();
        setProfile(getProfile?.data);
        setLoading(true);
        console.log(getProfile?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const getCars = await getAllCars();
        setCars(getCars?.data);
        setLoading(true);
        console.log(getCars?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerOne}>
          {/* <Image
            source={{ uri: `http://10.0.2.2:8000/storage/${_profile?.image}` }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 100,
              margin: 20,
              marginRight: 0,
            }}
          /> */}
          <View style={{ paddingLeft: 40 }}>
            <Text style={styles.userName}>{_profile?.name}</Text>
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
          <Text>{_profile?.email}</Text>
        </View>

        <View
          style={{
            borderWidth: 0.5,
            borderBottomColor: "#032955",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View>
          {loading ? (
            <Loading />
          ) : (
            cars.map((car) => (
              <CarComponent
                carName={car.carName}
                pin={car.pin}
                onPress={() => setVisibleEditVehicle(true)}
              />
            ))
          )}
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
              onChangeText={setName}
              placeholder={_profile?.name}
              defaultValue={_profile?.name}
            ></TextInput>
            <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
          </View>
          <View style={styles.option}>
            <TextInput
              style={styles.textPopUp}
              onChangeText={setEmail}
              placeholder={_profile?.email}
              defaultValue={_profile?.email}
            ></TextInput>
            <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
          </View>
          <View style={styles.option}>
            <TextInput
              style={styles.textPopUp}
              onChangeText={setPassword}
              placeholder={_profile?.password}
              defaultValue={_profile?.password}
            ></TextInput>
            <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleEditUser()}
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
              onChangeText={setCarName}
              value={carName}
              placeholder={"Car Name/Type"}
            ></TextInput>
            <Icon name={"add"} size={30} color={"#032955"} />
          </View>
          <View style={styles.option}>
            <TextInput
              style={styles.textPopUp}
              onChangeText={setPin}
              value={pin}
              placeholder={"PIN"}
            ></TextInput>
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
            onPress={() => createNewCar(carName, pin)}
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
