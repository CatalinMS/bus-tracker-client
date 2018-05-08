import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Header, Content, Button, Text} from 'native-base';

import BussMap from "./map/BussMap";

import {loadBussStations} from "../actions/bussStationActions";

class ButtonExample extends Component {
    constructor() {
        super();

        this.buttonPressed = this.buttonPressed.bind(this);
    }

    buttonPressed() {
        console.log("press", this.props.recipes);

        this.props.loadBussStations();

    }

    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <Button onPress={() => this.buttonPressed()} primary title={"A title"}>
                        <Text> Primary </Text>
                    </Button>
                    <BussMap/>
                </Content>
            </Container>
        );

    }
}

const mapStateToProps = state => ({
    recipes: state.recipes || {},
});

const mapDispatchToProps = {
    loadBussStations
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonExample);