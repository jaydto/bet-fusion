import React, {useEffect, useState} from "react";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {PdfDocument} from "./Matches";
import makeRequest from "../../utils/fetch-request";
import Select from 'react-select'

const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/sidebar'));
const Footer = React.lazy(() => import('../../footer/footer'));
const Right = React.lazy(() => import('../../right/index'));

export default function MatchesList() {
    const [matches, setMatches] = useState([]);
    const [section, setSection] = useState('highlights');
    const [events, setEvents] = useState(0);

    useEffect(() => {
        fetchMatches()
    }, [section, events])

    const fetchMatches = async () => {
        let method = "POST"
        let endpoint = "/v1/matches?page=" + (1) + `&limit=${events}&tab=` + section;
        await makeRequest({url: endpoint, method: method, data: []}).then(([status, result]) => {
            if (status == 200) {
                setMatches(result?.data || result)
            }
        });
    };

    const getPDFDocument = async () => {
        // initialize document
    }

    const sectionOptions = [
        {value: 'upcoming', label: 'Upcoming'},
        {value: 'highlights', label: 'Highlights'},
        {value: 'tomorrow', label: 'Tomorrow'}
    ]

    const totalEventOptions = [
        {value: '10', label: '10'},
        {value: '30', label: '30'},
        {value: '50', label: '50'},
        {value: '100', label: '100'},
        {value: '200', label: '200'},
    ]

    const handleEventsChange = e => {
        setEvents(e.value)
    }

    const handleSectionChange = e => {
        setSection(e.value)
    }

    return (
        <>
            <Header/>
            <div className="by amt">
                <div className="gc">
                    <SideBar loadCompetitions/>
                    <div className="gz home">
                        <div className="homepage">
                            <div className='col-md-12 primary-bg p-4 text-center'>
                                <h4 className="inline-block">
                                    <span className="fa fa-chevron-left"></span>
                                    DOWNLOAD MATCHES
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 text-center vh-100">
                                <div className="col-md-12 d-flex flex-column p-2">
                                    <div className="col-md-12 text-start p-2">
                                        <label htmlFor="" className={'text-white'}>Select Section</label>
                                        <Select options={sectionOptions}
                                                value={sectionOptions.filter(obj => obj.value === section)}
                                                onChange={handleSectionChange}/>
                                    </div>
                                    <div className="col-md-12 text-start p-2">
                                        <label htmlFor="" className={'text-white'}>Number of Events</label>
                                        <Select options={totalEventOptions}
                                                value={totalEventOptions.filter(obj => obj.value === events)}
                                                onChange={handleEventsChange}/>
                                    </div>
                                    <div className="col-md-12 mt-5 text-start">
                                        <PDFDownloadLink
                                            className={`btn btn-primary text-white btn-lg p-4 col-md-4`}
                                            document={<PdfDocument data={matches}/>}
                                            fileName="matches.pdf">
                                            {({blob, url, loading, error}) =>
                                                loading ? "Preparing Document..." : "Download Matches"
                                            }
                                        </PDFDownloadLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </>
    )
}
