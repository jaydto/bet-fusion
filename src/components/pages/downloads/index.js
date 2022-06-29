import React, {useEffect, useState} from "react";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {PdfDocument} from "./Matches";
import makeRequest from "../../utils/fetch-request";

export default function MatchesList() {
    const [matches, setMatches] = useState([]);
    const [show, setHide] = useState(false);
    useEffect(() => {
        fetchMatches('highlights')
    }, [])

    const fetchMatches = async (tab) => {
        let method = "POST"
        let endpoint = "/v1/matches?page=" + (1) + "&limit=10&tab=" + tab;
        await makeRequest({url: endpoint, method: method, data: []}).then(([status, result]) => {
            if (status == 200) {
                setMatches(result?.data || result)
            }
        });
    };

    return (
        <div className="container text-white">
            <h2>Print Matches</h2>
            <PDFDownloadLink
                document={<PdfDocument data={matches}/>}
                fileName="matches.pdf"
                style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#4a4a4a",
                    backgroundColor: "#f2f2f2",
                    border: "1px solid #4a4a4a"
                }}>
                {({blob, url, loading, error}) =>
                    loading ? "Loading document..." : "Download Pdf"
                }
            </PDFDownloadLink>
        </div>
    );
}
