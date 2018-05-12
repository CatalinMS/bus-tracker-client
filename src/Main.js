import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import SideMenu from 'react-native-side-menu';

import HomePage from './components/HomePage';
import Menu from './components/menu/Menu';
import {loadLineNumbers} from "./actions/lineNumbersActions";
import {loadBussStation, clearBussStations} from "./actions/bussStationActions";
import {connectToLocationServer, clearBussLocations} from "./actions/bussLocationActions";
import {WEB_SOCKET_SERVER_URL} from "./constants/constants";

class Main extends Component {
    constructor() {
        super();

        this.state = {
            isOpen: false,
        };

        this.toggle = this.toggle.bind(this);
        this.onBussLineSelected = this.onBussLineSelected.bind(this);
        this.onAllLinesSelected = this.onAllLinesSelected.bind(this);
        this.updateMenuState = this.updateMenuState.bind(this);
    }

    componentWillMount() {
        this.props.loadLineNumbers();
        this.props.clearBussStations();
        this.props.clearBussLocations();
    }

    componentDidMount() {
        this.props.connectToLocationServer(`${WEB_SOCKET_SERVER_URL}/locations`);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({isOpen});
    }

    onBussLineSelected(lineNumber) {
        this.setState({
            isOpen: false
        });

        this.props.loadBussStation(lineNumber);
        this.props.connectToLocationServer(`${WEB_SOCKET_SERVER_URL}/locations`, lineNumber);
    }

    onAllLinesSelected() {
        this.setState({
            isOpen: false
        });

        this.props.clearBussStations();
        this.props.connectToLocationServer(`${WEB_SOCKET_SERVER_URL}/locations`);
    }

    render() {
        const menu =
            <Menu onBussLineSelected={this.onBussLineSelected}
                  onAllLinesSelected={this.onAllLinesSelected}
                  lineNumbers={this.props.lineNumbers.lines}
            />;

        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
                <View style={styles.container}>
                    <HomePage onSideMenuClick={this.toggle}/>
                </View>

            </SideMenu>
        );
    }
}

const mapStateToProps = state => ({
    lineNumbers: state.lineNumbers,
});

const mapDispatchToProps = {
    loadLineNumbers,
    loadBussStation,
    clearBussLocations,
    clearBussStations,
    connectToLocationServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 20,
        padding: 10,
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
