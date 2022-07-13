import React from "react";
import TableFooter from "./TableFooter";

import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";
import TableHeader from "./TableHeader";

const styles = StyleSheet.create({
    body: {
        padding: 5,
        paddingBottom: 5,
        marginBottom: 5
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
        backgroundColor: "#F5F5F5"
    },
    tableRowOdd: {
        margin: "auto",
        flexDirection: "row",
        backgroundColor: "#ebeff5"
    },
    tableRowFlex: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
    tableColHeader: {
        width: "10%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        // borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontSize: "9px",
        textAlign: "center"
    },
    tableCol: {
        width: "10%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColMatch: {
        width: "40%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColHeaderSpannedTop: {
        width: "10%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    tableColHeaderSpannedTopMatch: {
        width: "40%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    tableColHeaderSpannedBottom: {
        width: "10%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableColTwoChildren: {
        width: "50%",
        // borderStyle: "solid",
        // borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottom: 0,
        borderBottomWidth: 0,
        borderRightColor: "#bfbfbf",
        borderRightWidth: .3,
        textAlign: "center",
    },
    tableColThreeChildren: {
        width: "50%",
        // borderStyle: "solid",
        // borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottom: 0,
        borderBottomWidth: 0,
        borderRightColor: "#bfbfbf",
        borderRightWidth: .3,
        textAlign: "center",
    },
    tableCellHeader: {
        // margin: "auto",
        margin: 5,
        fontSize: 8,
        fontWeight: 1000
    },
    tableCell: {
        // margin: "auto",
        margin: 1,
        fontSize: 8,
        textAlign: "center",
        fontWeight: "bold"
    },
    tableCellSpanned: {
        borderTop: 0
    },
    rowOdd: {
        backgroundColor: "#fffafa"
    }
});

export function PdfDocument(props) {
    const getBothTeamsToScoreOdds = (match, key) => {
        let odds = match?.odds;
        let bothTeamsToScore = odds[29]
        return key === 'yes' ? bothTeamsToScore?.yes : bothTeamsToScore?.no
    }

    const getDoubleChanceOdds = (match, key) => {
        let odds = match?.odds;
        let doubleChance = odds[10]
        if (key === '1orX') {
            let oddKey = match?.home_team + ' or draw'
            return doubleChance[oddKey]
        }
        if (key === 'Xor2') {
            let oddKey = 'draw or ' + match?.away_team
            return doubleChance[oddKey]
        }

        if (key === '1or2') {
            let oddKey = match?.home_team + ' or ' + match?.away_team
            return doubleChance[oddKey]
        }
    }

    const getOverUnderTwoPointFive = (match, key) => {
        let odds = match?.odds;
        let overUnder = odds[18]
        if (key === 'over') {
            return overUnder['over 2.5']
        }

        if (key === 'under') {
            return overUnder['under 2.5']
        }
    }
    return (
        <Document>
            <Page style={styles.body} orientation="landscape">
                <TableHeader/>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeaderSpannedTop}>
                            <Text style={styles.tableCellHeader}></Text>
                        </View>
                        <View style={styles.tableColHeaderSpannedTop}>
                            <Text style={styles.tableCellHeader}></Text>
                        </View>
                        <View style={styles.tableColHeaderSpannedTopMatch}>
                            <Text style={styles.tableCellHeader}></Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>3 WAY</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>DOUBLE CHANCE</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>OVER OR UNDER 2.5</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>BOTH TEAMS TO SCORE</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                DATE / TIME
                            </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                GAME ID
                            </Text>
                        </View>
                        <View style={styles.tableColMatch}>
                            <Text style={styles.tableCell}>
                                MATCH
                            </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <View style={styles.tableRowFlex}>
                                <View style={styles.tableColThreeChildren}>
                                    <Text style={styles.tableCell}>Home</Text>
                                </View>
                                <View style={styles.tableColThreeChildren}>
                                    <Text style={styles.tableCell}>Draw</Text>
                                </View>
                                <View style={styles.tableColThreeChildren}>
                                    <Text style={styles.tableCell}>Away</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableCol}>
                            <View style={styles.tableRowFlex}>
                                <View style={styles.tableColThreeChildren}>
                                    <Text style={styles.tableCell}>1orX</Text>
                                </View>
                                <View style={styles.tableColThreeChildren}>
                                    <Text style={styles.tableCell}>Xor2</Text>
                                </View>
                                <View style={styles.tableColThreeChildren}>
                                    <Text style={styles.tableCell}>1or2</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableCol}>
                            <View style={styles.tableRowFlex}>
                                <View style={styles.tableColTwoChildren}>
                                    <Text style={styles.tableCell}>OVER</Text>
                                </View>
                                <View style={styles.tableColTwoChildren}>
                                    <Text style={styles.tableCell}>UNDER</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableCol}>
                            <View style={styles.tableRowFlex}>
                                <View style={styles.tableColTwoChildren}>
                                    <Text style={styles.tableCell}>YES</Text>
                                </View>
                                <View style={styles.tableColTwoChildren}>
                                    <Text style={styles.tableCell}>NO</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {props.data?.map((match, index) => (
                        <View key={index} id={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowOdd}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {match.start_time}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    {match.game_id}
                                </Text>
                            </View>
                            <View style={styles.tableColMatch}>
                                <View style={styles.tableRowFlex}>
                                    <View style={styles.tableColThreeChildren}>
                                        <Text style={styles.tableCell}>
                                            {match.home_team}
                                        </Text>
                                    </View>
                                    <View style={styles.tableColThreeChildren}>
                                        <Text style={styles.tableCell}>
                                            VS
                                        </Text>
                                    </View>
                                    <View style={styles.tableColThreeChildren}>
                                        <Text style={styles.tableCell}>
                                            {match.away_team}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.tableCol}>
                                <View style={styles.tableRowFlex}>
                                    <View style={styles.tableColThreeChildren}>
                                        <Text style={styles.tableCell}>
                                            {match.odds?.home_odd}
                                        </Text>
                                    </View>
                                    <View style={styles.tableColThreeChildren}>
                                        <Text style={styles.tableCell}>
                                            {match.odds?.neutral_odd}
                                        </Text>
                                    </View>
                                    <View style={styles.tableColThreeChildren}>
                                        <Text style={styles.tableCell}>
                                            {match.odds?.away_odd}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.tableCol}>
                                <View style={styles.tableRowFlex}>
                                    <View style={styles.tableColThreeChildren}>
                                        <Text style={styles.tableCell}>
                                            {getDoubleChanceOdds(match, '1orX')}
                                        </Text>
                                    </View>
                                    <View style={styles.tableColThreeChildren}>
                                        <Text style={styles.tableCell}>
                                            {getDoubleChanceOdds(match, 'Xor2')}
                                        </Text>
                                    </View>
                                    <View style={styles.tableColThreeChildren}>
                                        <Text style={styles.tableCell}>
                                            {getDoubleChanceOdds(match, '1or2')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.tableCol}>
                                <View style={styles.tableRowFlex}>
                                    <View style={styles.tableColTwoChildren}>
                                        <Text style={styles.tableCell}>
                                            {getOverUnderTwoPointFive(match, 'over')}
                                        </Text>
                                    </View>
                                    <View style={styles.tableColTwoChildren}>
                                        <Text style={styles.tableCell}>
                                            {getOverUnderTwoPointFive(match, 'under')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.tableCol}>
                                <View style={styles.tableRowFlex}>
                                    <View style={styles.tableColTwoChildren}>
                                        <Text style={styles.tableCell}>
                                            {getBothTeamsToScoreOdds(match, 'yes')}
                                        </Text>
                                    </View>
                                    <View style={styles.tableColTwoChildren}>
                                        <Text style={styles.tableCell}>
                                            {getBothTeamsToScoreOdds(match, 'no')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                <TableFooter/>
            </Page>
        </Document>
    );
}
