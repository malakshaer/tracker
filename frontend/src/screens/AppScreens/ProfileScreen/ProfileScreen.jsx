import { View } from "react-native";

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
  </View>;
};

export default ProfileScreen;
