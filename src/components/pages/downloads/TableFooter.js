import React from 'react';
import {Text, View, StyleSheet} from '@react-pdf/renderer';

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
            <View style={styles.headerContainer}>
                <Text style={styles.companyMetaText}>Betnare Kenya</Text>
                <Text style={styles.companyMetaText}>PAYBILL: 4087777</Text>
                <Text style={styles.companyMetaText}>SUPPORT: support@betnare.com</Text>
                <Text style={styles.companyMetaText}>PHONE: 0726738394</Text>
            </View>
            <View style={styles.license}>
                <Text>
                    Betnare Kenya is licensed by the Betting & Licensing Control Board
                    under BCLB NO. 0000397.
                </Text>
                <Text>
                    Gambling can be addictive, please gamble responsibly. 18+ only.
                </Text>
            </View>
        </>
    )
};

export default TableFooter