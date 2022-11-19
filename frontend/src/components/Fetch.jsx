import React, { Component } from "react";

import { StyleSheet, ScrollView, ActivityIndicator, View } from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "../config/firebase";
import CarComponent from "./CarComponent/CarComponent";

class FetchListScreen extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("cars");
    this.state = {
      isLoading: true,
      cars: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getCarData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCarData = (querySnapshot) => {
    const cars = [];
    querySnapshot.forEach((res) => {
      const { carName, pin } = res.data();
      cars.push({
        key: res.id,
        carName,
        pin,
      });
    });
    this.setState({
      cars,
      isLoading: false,
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.wrapper}>
        {this.state.cars.map((res, i) => {
          return <CarComponent key={i} carName={res.carName} pin={res.pin} />;
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 22,
  },
  loader: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default FetchListScreen;
