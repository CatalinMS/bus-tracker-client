import React from 'react';
import PropTypes from 'prop-types';
import {Container, Header, Content, Button, Text, Left, Right, Title, Body, Icon} from 'native-base';

import BussMap from "./map/BussMap";

const HomePage = ({onSideMenuClick}) => (
    <Container>
        <Header style={{
            backgroundColor: '#F5792F',
            height: 100,
        }}>
            <Left>
                <Button transparent
                        onPress={() => onSideMenuClick()}
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

HomePage.propTypes = {
    onSideMenuClick: PropTypes.func.isRequired,
};

export default HomePage;
