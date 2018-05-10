import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Constants, MapView,} from 'expo';
import CustomMapViewMarker from './CustomMapViewMarker';

import {loadBussStations} from "../../actions/bussStationActions";
import {connectToLocationServer} from "../../actions/bussLocationActions";
import {WEB_SOCKET_SERVER_URL} from "../../constants/constants";

class BussMap extends Component {
    constructor() {
        super();

        this.state = {
            mapRegion: {
                latitude: 46.7712,
                longitude: 23.6236,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };

        this.renderBussLocations = this.renderBussLocations.bind(this);
    }

    componentDidMount() {
        console.log("BussMap did mount");

        this.props.connectToLocationServer(`${WEB_SOCKET_SERVER_URL}/locations`);
    }

    renderBussLocations() {
        return this.props.bussLocations
            .map(location => <CustomMapViewMarker key={location.line}
                                                  line={location.line}
                                                  coordinates={location.coordinate}/>
            );
    }

    renderStationMarkers() {
        return this.props.bussStations
            .map((station, index) =>
                <MapView.Marker
                    key={index}
                    coordinate={station}
                    title={station.name}
                >
                </MapView.Marker>
            );
    }

    render() {
        return (
            <View>
                <MapView
                    style={{alignSelf: 'stretch', height: 550}}
                    region={this.state.mapRegion}
                >

                    {/*{this.renderBussLocations()}*/}

                    {
                        this.props.bussStations &&
                        <MapView.Polyline
                            coordinates={this.props.bussStations}
                            strokeWidth={3}
                            strokeColor="red"
                        />
                    }

                    {this.renderStationMarkers()}

                </MapView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    bussStations: state.bussStation.stations,
    bussLocations: state.bussLocation.locations,
});

const mapDispatchToProps = {
    loadBussStations,
    connectToLocationServer
};

export default connect(mapStateToProps, mapDispatchToProps)(BussMap);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
});
