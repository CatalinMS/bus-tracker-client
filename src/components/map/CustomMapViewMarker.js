import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MapView,} from 'expo';


const CustomMapViewMarker = ({line, coordinates}) => (
    <MapView.Marker
        coordinate={coordinates}
        title={line}
        description={"buss line"}
    >
        <View style={styles.circle}>
            <Text style={styles.pinText}>
                {line}
            </Text>
        </View>
    </MapView.Marker>
);

const styles = StyleSheet.create({
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'red',
    },
    pinText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
});

export default CustomMapViewMarker;