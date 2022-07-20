import React from 'react';
import {Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import PrintFooter from "../../../assets/img/banner/print-matches/FOOTER.jpg"

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#c65102',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 8,
        fontStyle: 'bold',
    },
    companyName: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    companyAddress: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    headerContainer: {
        marginTop: 5
    },
    companyMetaData: {
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
    companyMetaText: {
        paddingLeft: 4,
        fontSize: 10
    },
    license: {
        fontSize: 9,
        textAlign: "center",
        width: "100%"
    }
});


const TableFooter = ({items}) => {
    return (
        <>
            <View style={styles.row}>
                <Text style={styles.companyName}>PAYBILL</Text>
                <Text style={styles.companyAddress}>
                    4087777
                </Text>
            </View>
            <Image style={styles.logo} src={PrintFooter}/>
        </>
    )
};

export default TableFooter