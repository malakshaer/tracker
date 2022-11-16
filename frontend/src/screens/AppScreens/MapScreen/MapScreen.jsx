const MapScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          provider={"google"}
        >
          <Marker.Animated ref={markerRef} coordinate={coordinate}>
            <Image
              source={logoMarker}
              style={{
                width: 50,
                height: 40,
              }}
              resizeMode="contain"
            />
            <Callout>
              <Text>Your Car is here</Text>
            </Callout>
          </Marker.Animated>

          {Object.keys(destinationCords).length > 0 && (
            <MapViewDirections
              origin={curLoc}
              destination={destinationCords}
              apikey={GOOGLE_MAP_KEY}
              strokeWidth={6}
              strokeColor="red"
              optimizeWaypoints={true}
              onStart={() => {
                sendNotification();
                sendNewNotification();
                console.log(`Started routing"`);
              }}
              onReady={(result) => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
                fetchTime(result.distance, result.duration),
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      // right: 30,
                      // bottom: 300,
                      // left: 30,
                      // top: 100,
                    },
                  });
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
          onPress={onCenter}
        >
          <Image
            source={locate}
            style={{
              width: 70,
              height: 70,
            }}
          />
        </TouchableOpacity>
      </View>
      <Loader isLoading={isLoading} />
    </View>
  );
};

export default MapScreen;
