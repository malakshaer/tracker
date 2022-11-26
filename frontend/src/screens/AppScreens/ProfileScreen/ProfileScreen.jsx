import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import styles from "./ProfileScreenStyles";
import Icon from "react-native-vector-icons/Ionicons";
import CarComponent from "../../../components/CarComponent/CarComponent";
import ModalPopup from "../../../components/Modal/Modal";
import { TextInput } from "react-native-gesture-handler";
import { createNewCar } from "../../../api/carApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserContext } from "../../../redux/userContext";
import { addCar } from "../../../../assets/add.png";
import { deleteCar } from "../../../api/carApi";
import * as ImagePicker from "expo-image-picker";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProfileScreen = () => {
  const [visibleEditProfile, setVisibleEditProfile] = useState(false);
  const [visibleAddVehicle, setVisibleAddVehicle] = useState(false);
  const [visibleEditVehicle, setVisibleEditVehicle] = useState(false);

  const { user, setUser, profileImage } = useContext(UserContext);

  const [userImage, setUserImage] = useState(profileImage);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [add, setAdd] = useState(false);

  const [carName, setCarName] = useState("");
  const [pin, setPin] = useState("");

  const [pressedCar, setPressedCar] = useState({});
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  //Upload image
  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setUserImage(result.uri);
    }
  };

  //Edit car by id
  const editCar = async (carName, pin, car_id) => {
    const data = {
      carName,
      pin,
      car_id,
    };
    const token = await AsyncStorage.getItem("@token");

    await axios({
      headers: { Authorization: `Bearer  ${token}` },
      method: "PUT",
      url: `${BASE_URL}editCar`,
      data: data,
    }).catch(function (error) {
      console.log(error);
      return false;
    });
  };

  //Edit Profile
  const handleEditUser = async () => {
    const data = {
      name,
      email,
    };
    const token = await AsyncStorage.getItem("@token");

    await axios({
      headers: { Authorization: `Bearer  ${token}` },
      method: "PUT",
      url: `${BASE_URL}editUser`,
      data: data,
    }).catch(function (error) {
      console.log(error);
      return false;
    });
  };

  //Show Profile information
  const getProfile = async () => {
    const token = await AsyncStorage.getItem("@token");

    setUser(JSON.parse(await AsyncStorage.getItem("@user")));
  };

  useEffect(() => {
    getProfile();
  });

  //Get the cars of the user
  useEffect(async () => {
    axios({
      method: "GET",
      url: `${BASE_URL}getUserCars`,
      headers: {
        Authorization: `Bearer  ${await AsyncStorage.getItem("@token")}`,
      },
    }).then((res) => {
      console.log(res.data);
      setCars(res.data.cars);
    });
  }, []);

  if (user) {
    return (
      <View style={styles.container}>
        <View style={styles.containerOne}>
          <Image
            source={{ uri: userImage }}
            style={{ height: 70, width: 70, borderRadius: 40 }}
          />
          <View style={{ paddingLeft: 20 }}>
            <Text style={styles.userName}>{user.name}</Text>
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
          <Text>{user.email}</Text>
        </View>

        <View
          style={{
            borderWidth: 0.5,
            borderBottomColor: "#032955",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={styles.vehiclesHeader}>
          <Text style={styles.yourVehicle}>Your Vehicles:</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setVisibleAddVehicle(true)}
          >
            <Text style={styles.addCarButton}>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView>
            {cars.map((c) => {
              return (
                <View>
                  <CarComponent
                    carName={c.carName}
                    pin={c.pin}
                    onPress={() => {
                      setVisibleEditVehicle(true);
                      setPressedCar(c);
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>

        <ModalPopup visible={visibleEditVehicle}>
          <View>
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
                  style={{
                    color: "#032955",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Edit Your Vehicle
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <TextInput
                style={styles.textPopUp}
                placeholder="Car Name/Type"
                onChangeText={(value) => {
                  setCarName(value);
                }}
              ></TextInput>
              <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
            </View>
            <View style={styles.option}>
              <TextInput
                style={styles.textPopUp}
                placeholder="PIN"
                onChangeText={(value) => {
                  setPin(value);
                }}
              ></TextInput>
              <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                editCar(carName, pin, pressedCar.id);
                setVisibleEditVehicle(false);
              }}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => deleteCar(pressedCar.id)}
              style={styles.deleteCarButton}
            >
              <Text style={styles.appButtonText}>Delete Car</Text>
            </TouchableOpacity>
          </View>
        </ModalPopup>

        <ModalPopup visible={visibleEditProfile}>
          <View>
            <View style={styles.headerSendNotification}>
              <TouchableOpacity onPress={() => setVisibleEditProfile(false)}>
                <Image
                  source={require("../../../../assets/x.png")}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Image
                source={{ uri: userImage }}
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 40,
                  alignSelf: "center",
                }}
              />
              <TouchableOpacity onPress={uploadImage}>
                <Text style={styles.uploadImage}>Upload</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.option}>
              <TextInput
                style={styles.textPopUp}
                onChangeText={(value) => {
                  setName(value);
                }}
                placeholder={user.name}
              ></TextInput>
              <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
            </View>
            <View style={styles.option}>
              <TextInput
                style={styles.textPopUp}
                onChangeText={(value) => {
                  setEmail(value);
                }}
                placeholder={user.email}
              ></TextInput>
              <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
            </View>
            <View style={styles.option}>
              <TextInput
                style={styles.textPopUp}
                onChangeText={(value) => {
                  setPassword(value);
                }}
                placeholder="Edit password"
                defaultValue={user.password}
              ></TextInput>
              <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.appButtonContainer}
              onPress={() => {
                handleEditUser();
                setVisibleEditProfile(false);
              }}
            >
              <Text style={styles.appButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ModalPopup>

        <ModalPopup visible={visibleAddVehicle}>
          <View>
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
                onChangeText={(value) => {
                  setCarName(value);
                }}
                placeholder="Add Car here"
              ></TextInput>
              <Icon name={"add"} size={30} color={"#032955"} />
            </View>
            <View style={styles.option}>
              <TextInput
                style={styles.textPopUp}
                onChangeText={(value) => {
                  setPin(value);
                }}
                placeholder="Add PIN here"
              ></TextInput>
              <Icon name={"add"} size={30} color={"#032955"} />
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                createNewCar(carName, pin);
                setVisibleAddVehicle(false);
                cars.push({ carName: carName, pin: pin });
                setAdd(!add);
              }}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </ModalPopup>
      </View>
    );
  }
};

export default ProfileScreen;
