import React, { useEffect, useState } from "react";
import { View, Modal, StyleSheet, Animated } from "react-native";

const BottomSheet = ({ visible, children }) => {
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomSheet;
