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
  <View>
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
              carName={car.car_name}
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
  </View>;
};

export default ProfileScreen;
