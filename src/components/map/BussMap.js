import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image} from 'react-native';
import {Constants, MapView, Location, Permissions} from 'expo';

import CustomMapViewMarker from './CustomMapViewMarker';
import Loading from '../Loading';
import {connectToLocationServer} from "../../actions/bussLocationActions";
import {DEFAULT_MAP_REGION} from "../../constants/constants";
import userPin from '../../assets/user-pin.png';
import bussStationPin from '../../assets/buss-station-pin.png';

class BussMap extends Component {
    constructor() {
        super();

        this.state = {
            extraData: false,
            isReady: false,
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
        // reload for marker image rendering
        let self = this;
        setTimeout(() => self.setState({extraData: true}), 100);
    }

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied. Fall back to Cluj-Napoca',
                isReady: true
            });
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            mapRegion: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: DEFAULT_MAP_REGION.latitudeDelta,
                longitudeDelta: DEFAULT_MAP_REGION.longitudeDelta,
            },
            userLocation: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
            isReady: true
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
                                tracksViewChanges={false}
                                coordinate={station}
                                title={station.name}
                                image={bussStationPin}
                />
            );
    }

    renderUserLocation() {
        return (
            <MapView.Marker coordinate={this.state.userLocation}
                            title={"User"}
                            image={userPin}
            />
        );
    }

    render() {
        if (!this.state.isReady) {
            return (
                <View style={styles.spinnerStyle}>
                    <Loading/>
                </View>
            );
        }

        return (
            <View>
                <MapView
                    style={{alignSelf: 'stretch', height: 750}}
                    initialRegion={this.state.mapRegion}
                >

                    {this.renderBussLocations()}

                    {
                        this.props.bussStations &&
                        <MapView.Polyline
                            coordinates={this.props.bussStations}
                            strokeWidth={3}
                            strokeColor={'#71020c'}
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
    },
    spinnerStyle: {
        flex: 1,
        marginTop: 240,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
