import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Constants, MapView,} from 'expo';
import CustomMapViewMarker from './CustomMapViewMarker';

import {loadBussStations} from "../../actions/bussStationActions";
import {connectToChatServer} from "../../actions/bussLocationActions";
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

    componentWillMount() {
        console.log("BussMap will mount");

        this.props.loadBussStations();
    }


    componentDidMount() {
        console.log("BussMap did mount");

        this.props.connectToChatServer(WEB_SOCKET_SERVER_URL);
    }

    renderBussLocations() {
        console.log("new location");
        return this.props.bussLocation.locations
            .map(location => {
                    console.log(location.line + " " + location.coordinate.latitude + " " + location.coordinate.longitude);

                    return <CustomMapViewMarker key={location.line} line={location.line}
                                                coordinates={location.coordinate}/>;

                }
            );
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={{alignSelf: 'stretch', height: 200}}
                    region={this.state.mapRegion}
                >

                    {this.renderBussLocations()}

                    {
                        this.props.bussStation.stations &&
                        <MapView.Polyline
                            coordinates={this.props.bussStation.stations}
                            strokeWidth={3}
                            strokeColor="red"
                        />
                    }

                </MapView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
});

const mapStateToProps = state => ({
    bussStation: state.bussStation || {},
    bussLocation: state.bussLocation || {},
});

const mapDispatchToProps = {
    loadBussStations,
    connectToChatServer
};

export default connect(mapStateToProps, mapDispatchToProps)(BussMap);
