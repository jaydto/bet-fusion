import React from 'react';
import {Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import PrintHeader from "../../../assets/img/banner/print-matches/HEADER.jpg"

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
        height: "auto",
        width: "100%",
    },
    headerSection: {
        padding: 5,
        paddingLeft: 10,
        fontSize: 9,
        display: "flex",
        justifyContent: "flex-end",
    },
    title: {textTransform: "uppercase"}
});

const TableHeader = (props) => (
    <>
        <View style={styles.row}>
            <Image style={styles.logo} src={PrintHeader}/>
        </View>
        <View style={styles.headerSection}>
            <Text style={styles.title}>
                {props?.title} - {new Date().toDateString()}
            </Text>
        </View>
    </>

);

export default TableHeader