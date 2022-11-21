import React, {
  useCallback,
  useReducer,
  useState,
  useContext,
  useEffect,
  useInsertionEffect,
} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable
} from "react-native";
import userProfile from "../../../../assets/user.jpg";
import styles from "./ProfileScreenStyles";
import Icon from "react-native-vector-icons/Ionicons";
import CarComponent from "../../../components/CarComponent/CarComponent";
import ModalPopup from "../../../components/Modal/Modal";
import { TextInput } from "react-native-gesture-handler";

import { editCar } from "../../../api/carFirebase";
import { deleteCar } from "../../../api/carFirebase";

import add from "../../../../assets/add.png";
import set from "../../../redux/slices/userSlice";
import Loading from "../../../components/Loading/Loading";
import { profile } from "../../../api/authApi";
import { createNewCar } from "../../../api/carFirebase";
import { editUser } from "../../../api/userApi";
import { getAllCars } from "../../../api/carFirebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {firebase} from "../../../config/firebase";
import { UserContext } from "../../../redux/userContext";

const ProfileScreen = ({ props }) => {
  const [visibleEditProfile, setVisibleEditProfile] = useState(false);
  const [visibleAddVehicle, setVisibleAddVehicle] = useState(false);
  const [visibleEditVehicle, setVisibleEditVehicle] = useState(false);

  const [cars, setCars] = useState([
    {
      carName: "BMW",
      pin: "1234KIA54321",
    },    
  ]);

  const [carName, setCarName] = useState();
  const [pin, setPin] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState([]);
  const { user, setUser }  = useContext(UserContext);
  const carsRef = firebase.firestore().collection('cars');

  const handleEditUser = async (user) => {
    const data = {
      name: user.name,
      email: user.email,      
    };
    const token = await AsyncStorage.getItem('token')
    await axios({
            headers:{'Authorization':'Bearer '+ token},
            method:'POST',
            url: `http://10.0.2.2:8000/api/editUser`,
            data:data,
    })
    .then(function (response) {
        return true
    })
    .catch(function (error) {
        console.log(error)
        return false
    });
  };

  const getProfile = async () => {
    const token = await AsyncStorage.getItem("@token");

    const config = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      url: `http://10.0.2.2:8000/api/auth/showProfile`,
    };
    try {
      const res = await axios(config);
      if (res.data.status == "success") {
        setUser(res.data.data);
      }
    } catch (error) {
      // console.warn(error.response.data);
      return error;
    }
  };

  useEffect(() => {
    getProfile();
  });

 useEffect(() => {
  carsRef.onSnapshot(
    querySnapshot => {
      const cars = []
      querySnapshot.forEach((doc) => {
        const {carName,pin} = doc.data()
        cars.push({
          id: doc.id,
          carName,
          pin,
        })
      })
      setCars(cars)
    }
  )
 },[])

  if (user) {
    return (
      <View style={styles.container}>        
          <View style={styles.containerOne}>
            <View style={{ paddingLeft: 40 }}>
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
          
          <View>
          <FlatList 
              style={{height: '100%'}}
              data={cars}
              numColumns={1}
              renderItem={({item}) => (
                <Pressable>
                  <CarComponent 
                   carName={item.carName}
                   pin={item.pin}
                   onPress={() => setVisibleEditVehicle(true)}/>
                </Pressable>
              )}>
          </FlatList>
            {/* {loading ? (
              <Loading />
            ) : (
              cars.map((car) => (
                <CarComponent
                  carName={car.carName}
                  pin={car.pin}
                  onPress={() => setVisibleEditVehicle(true)}
                />
              ))
            )} */}
          </View>
          {loading && <Loading />}        

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
          <View>
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
                placeholder={user.name}
                defaultValue={user.name}
              ></TextInput>
              <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
            </View>
            <View style={styles.option}>
              <TextInput
                style={styles.textPopUp}
                onChangeText={setEmail}
                placeholder={user.email}
                defaultValue={user.email}
              ></TextInput>
              <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
            </View>
            <View style={styles.option}>
              <TextInput
                style={styles.textPopUp}
                onChangeText={setPassword}
                placeholder="Edit password"
                defaultValue={user.password}
              ></TextInput>
              <Icon name={"pencil-sharp"} size={30} color={"#032955"} />
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.appButtonContainer}
              onPress={() => handleEditUser(user)}
              
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
  }
};

export default ProfileScreen;
