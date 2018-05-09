import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Header, Content, Button, Text, Left, Right, Title, Body, Icon} from 'native-base';

import BussMap from "./map/BussMap";

import {loadBussStations} from "../actions/bussStationActions";

class HomePage extends Component {
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
                <Header style={{
                    backgroundColor: '#00cc99',
                    height: 100,
                }}>
                    <Left>
                        <Button transparent
                                onPress={() => this.props.onSideMenuClick()}
                                title={"Title"}
                        >
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Buss tracker</Title>
                    </Body>
                    <Right/>
                </Header>

                <Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);