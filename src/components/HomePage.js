import React from 'react';
import PropTypes from 'prop-types';
import {Container, Header, Content, Button, Text, Left, Right, Title, Body, Icon} from 'native-base';

import BussMap from "./map/BussMap";

const HomePage = ({onSideMenuClick}) => (
    <Container>
        <Header style={{
            backgroundColor: '#F5792F',
            height: 125,
        }}>
            <Left>
                <Button transparent
                        onPress={() => onSideMenuClick()}
                        title={"Title"}
                        style={{marginTop: 25}}
                >
                    <Icon name='menu'/>
                </Button>
            </Left>

            <Body style={{marginTop: 25}}>
            <Title>Buss tracker</Title>
            </Body>

            <Right style={{marginTop: 25}}/>
        </Header>

        <Content>
            <BussMap/>
        </Content>

    </Container>
);

HomePage.propTypes = {
    onSideMenuClick: PropTypes.func.isRequired,
};

export default HomePage;
