import React from 'react';
import {Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import logo from "../../../assets/img/logo.jpg";

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        marginTop: 5,
        borderTop: 1,
        flexDirection: 'row',
        borderTopColor: '#c65102',
        borderBottomColor: '#c65102',
        borderBottomWidth: 1,
        alignItems: 'center',
        fontSize: 12,
        fontStyle: 'bold',
        padding: 5
    },
    logo: {
        height: 50,
        width: "20%",
    },
    headerSection: {
        padding: 5,
        paddingLeft: 10,
        fontSize: 9,
        display: "flex",
        justifyContent: "flex-end",
    }
});

const TableHeader = () => (
    <>
        <View style={styles.row}>
            <Image style={styles.logo} src={logo}/>
        </View>
        <View style={styles.headerSection}>
            <Text>
                Highlights - {new Date().toDateString()}
            </Text>
        </View>
    </>

);

export default TableHeader