import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, StyleSheet, ScrollView, View, Image, Text} from 'react-native';
import buss from '../../assets/menu-icon.png';

const window = Dimensions.get('window');

export default class Menu extends Component {

    renderLines(lineNumbers) {
        return lineNumbers
            .map(line => parseInt(line))
            .sort((a, b) => a - b)
            .map((lineNumber, index) =>
                <View
                    key={index}
                    style={styles.item_container}
                >
                    <Text
                        onPress={() => this.props.onBussLineSelected(lineNumber)}
                        style={styles.item}
                    >
                        Line {lineNumber}
                    </Text>
                </View>
            )
    }

    render() {
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={buss}
                    />
                </View>

                <View style={styles.item_container}>
                    <Text
                        onPress={() => this.props.onAllLinesSelected()}
                        style={styles.item}
                    >
                        All lines
                    </Text>
                </View>

                {this.renderLines(this.props.lineNumbers)}

            </ScrollView>
        );
    }
};

Menu.propTypes = {
    onBussLineSelected: PropTypes.func.isRequired,
    onAllLinesSelected: PropTypes.func.isRequired,
    lineNumbers: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: '#f4f5f7',
    },
    avatarContainer: {
        marginTop: 20,
        padding: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 18,
        fontWeight: '200',
        paddingTop: 10,
        padding: 20,
        color: '#38383a'
    },
    item_container: {
        borderBottomColor: '#bbbbc1',
        borderBottomWidth: 0.5,
        paddingTop: 3,
    }
});
