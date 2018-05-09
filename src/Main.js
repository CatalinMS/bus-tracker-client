import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import SideMenu from 'react-native-side-menu';

import HomePage from './components/HomePage';
import Menu from './components/menu/Menu';
import image from './assets/menu.png';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            isOpen: false,
            selectedItem: 'About',
        };

        this.toggle = this.toggle.bind(this);
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this);
        this.updateMenuState = this.updateMenuState.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({isOpen});
    }

    onMenuItemSelected(item) {
        console.log("selected " + item);

        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    }

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;

        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
                <View style={styles.container}>
                    <HomePage/>
                </View>

                <TouchableOpacity
                    onPress={this.toggle}
                    style={styles.button}
                >
                    <Image
                        source={image}
                        style={{width: 32, height: 32}}
                    />
                </TouchableOpacity>
            </SideMenu>
        );
    }

}

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
