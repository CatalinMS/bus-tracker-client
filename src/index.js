import React, {Component} from 'react';
import {StatusBar, Platform} from 'react-native';
import * as Expo from "expo";
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';

import {Root, StyleProvider} from 'native-base';

import Loading from './components/Loading';
import HomePage from './components/HomePage';

// Hide StatusBar on Android as it overlaps tabs
// if (Platform.OS === 'android') StatusBar.setHidden(true);

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }

    componentWillMount() {
        this.loadFonts();
    }

    // wait for native-base to load
    async loadFonts() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
        return (
            <Root>
                <Provider store={this.props.store}>
                    <PersistGate
                        loading={<Loading/>}
                        persistor={this.props.persistor}
                    >
                        <HomePage/>
                    </PersistGate>
                </Provider>
            </Root>
        );
    }

}

App.propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
};
