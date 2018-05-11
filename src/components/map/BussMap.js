import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image} from 'react-native';
import {Constants, MapView, Location, Permissions} from 'expo';

import CustomMapViewMarker from './CustomMapViewMarker';
import {connectToLocationServer} from "../../actions/bussLocationActions";
import {WEB_SOCKET_SERVER_URL, DEFAULT_MAP_REGION} from "../../constants/constants";
import userPin from '../../assets/user-pin.png';
import bussStationPin from '../../assets/buss-station-pin.png';

class BussMap extends Component {
    constructor() {
        super();

        this.state = {
            mapRegion: DEFAULT_MAP_REGION,
            userLocation: null,
            errorMessage: null
        };

        this.renderBussLocations = this.renderBussLocations.bind(this);
    }

    componentWillMount() {
        this._getLocationAsync();
    }

    componentDidMount() {
        this.props.connectToLocationServer(`${WEB_SOCKET_SERVER_URL}/locations`);
    }

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied. Fall back location to Cluj-Napoca',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            mapRegion: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
            userLocation: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }
        });
    };

    renderBussLocations() {
        return this.props.bussLocations
            .map(location =>
                <CustomMapViewMarker key={location.line}
                                     line={location.line}
                                     coordinates={location.coordinates}
                />
            );
    }

    renderStationMarkers() {
        return this.props.bussStations
            .map((station, index) =>
                <MapView.Marker key={index}
                                coordinate={station}
                                title={station.name}
                >
                    <Image source={bussStationPin}
                           style={styles.pin}
                    />
                </MapView.Marker>
            );
    }

    renderUserLocation() {
        return (
            <MapView.Marker coordinate={this.state.userLocation}
                            title={"User"}>
                <Image source={userPin}
                       style={styles.pin}
                />
            </MapView.Marker>
        );
    }

    render() {
        if (this.state.errorMessage !== null) {
            console.log(this.state.errorMessage); // todo show alert
        }

        return (
            <View>
                <MapView
                    style={{alignSelf: 'stretch', height: 550}}
                    region={this.state.mapRegion}
                >

                    {this.renderBussLocations()}

                    {
                        this.props.bussStations &&
                        <MapView.Polyline
                            coordinates={this.props.bussStations}
                            strokeWidth={3}
                            strokeColor="red"
                        />
                    }

                    {this.renderStationMarkers()}

                    {this.state.userLocation && this.renderUserLocation()}

                </MapView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    bussStations: state.bussStation.stations || [],
    bussLocations: state.bussLocation.locations || [],
});

const mapDispatchToProps = {
    connectToLocationServer
};

export default connect(mapStateToProps, mapDispatchToProps)(BussMap);

BussMap.propTypes = {
    bussStations: PropTypes.array.isRequired,
    bussLocations: PropTypes.array.isRequired,
    connectToLocationServer: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    pin: {
        width: 30,
        height: 30,
        borderRadius: 24,
        flex: 1,
    }
});
