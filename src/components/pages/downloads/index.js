import React, {useCallback, useContext, useEffect, useState} from "react";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {PdfDocument} from "./Matches";
import Select from 'react-select'
import {Card, Tab, Tabs} from "react-bootstrap";
import {formatNumber} from "../../utils/betslip";
import {StoreContext } from "../../../context/store"
import useWindowDimensions from "../../header/Dimensions";
import {useDispatch, useSelector} from "react-redux";
import {printJackpotData, printMatchesData} from "../../../redux/dataSlice";
import {getFromLocalStorage} from "../../utils/local-storage";

const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'));
const Footer = React.lazy(() => import('../../footer/footer'));
const Right = React.lazy(() => import('../../right/index'));

export default function MatchesList() {
    const [section, setSection] = useState('highlights');
    const [events, setEvents] = useState(10);
    const [key, setKey] = useState('home');
    const { width} = useWindowDimensions();
    const { state, dispatch } = useContext(StoreContext);
    const [isJackpot, setIsJackpot] = useState(false);
    const dispatchRedux=useDispatch()
    const loaded=useSelector((state)=>state.data.loaded)
    const title_jp=useSelector((state)=>state.data.print_title)
    const [title, setTitle] = useState('highlights');

    const matches_data=useSelector((state)=>state.data?.printed_data)
    const [matches, setMatches] = useState([]);

    const jackpotData=useSelector((state)=>state.data?.print_jackpot_data)
    const userData = useSelector((state) => state.auth.user)
    const [user, setUser] = useState(getFromLocalStorage("user"))
    useEffect(() => {
        if (userData) {
            setUser(userData || getFromLocalStorage("user"))
        }
    }, [userData,getFromLocalStorage("user")])

    useEffect(() => {
        setTitle(title_jp)
    }, [title_jp]);
    useEffect(() => {
        setMatches(matches_data)
    }, [matches_data]);

    useEffect(() => {
        fetchMatches()
    }, [section, events])

    const fetchMatches = async () => {
        let method = 'POST'
        let endpoint = "/v1/matches?page=" + (1) + `&limit=${events}&tab=` + section + '&sub_type_id=1,10,29,18';
        const data={
            method:method,
            endpoint:endpoint
        }
        dispatchRedux(printMatchesData(data))
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
        {value: '1500', label: '1500'},
        // {value: '5000', label: '5000'},
    ]

    const handleEventsChange = e => {
        setEvents(e.value)
    }

    const handleSectionChange = e => {
        setSection(e.value)
        setTitle(e.value)
    }

    const fetchJackpotData = async () => {
        let match_endpoint = "/v1/matches/jackpot";
        let method='get';
        const data={
            method:method,
            endpoint:match_endpoint
        }
        dispatchRedux(printJackpotData(data))
    };

    const fetchActiveTabMatches = async (key) => {
        setKey(key)
        if (key === 'jackpot') {
            fetchJackpotData()
            setIsJackpot(true)
        } else {
            fetchMatches()
            setIsJackpot(false)
            setTitle(section)
        }
    }
    return (
        <>
            <Header/>
            <div className={`${width<=575?user?"user_logged":"amt":"amt"}`}>
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width:"100%"}}>
                        <div className="homepage">
                            <div className='col-md-12 primary-bg p-4 text-center'>
                                <h4 className="inline-block">
                                    <span className="fa fa-chevron-left"></span>
                                    DOWNLOAD MATCHES
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 text-center vh-100">
                                <Tabs
                                    variant={'tabs'}
                                    defaultActiveKey="matches"
                                    onSelect={(k) => fetchActiveTabMatches(k)}
                                    className="background-primary"
                                    justify>
                                    <Tab eventKey="matches" title="Matches" className={'background-primary shadow p-5'}
                                         style={{border: '1px solid #334c5c'}}>
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
                                        </div>
                                        <div className="col-md-12 mt-5 text-center">
                                            
                                            <PDFDownloadLink
                                                className={`btn btn-warning betnare-button-bg text-dark btn-lg p-4 col-md-4 ${loaded ? '' : 'disabled'}`}
                                                document={<PdfDocument matches={matches} jackpot={isJackpot}
                                                                       title={title}/>}
                                                fileName="matches.pdf">
                                                {({blob, url, loading, error}) =>
                                                    loading ? "PREPARING DOCUMENT..." : "DOWNLOAD MATCHES"
                                                }
                                            </PDFDownloadLink>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="jackpot" title="Jackpot Matches"
                                         style={{border: '1px solid #334c5c'}}
                                         className={'background-primary shadow'}>
                                        <div className="col mt-5 background-primary">
                                            <Card className={'background-primary text-white'}>
                                                <Card.Header>
                                                    {jackpotData?.name} - {formatNumber(jackpotData?.jackpot_amount)}/=
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Title>
                                                        {jackpotData?.type}
                                                    </Card.Title>
                                                    <Card.Body>
                                                        Download Jackpot Games and play in through sms in the format
                                                        <p className={'bold mt-2'}>
                                                            JP#PICK#PICK#.....
                                                        </p>
                                                    </Card.Body>
                                                    <PDFDownloadLink
                                                        className={`btn btn-warning betnare-button-bg text-white btn-lg p-4 col-md-4 ${loaded ? '' : 'disabled'}`}
                                                        document={<PdfDocument matches={matches} jackpot={isJackpot}
                                                                               title={title}/>}
                                                        fileName="matches.pdf">
                                                        {({blob, url, loading, error}) =>
                                                            loading ? "Preparing Document..." : "Download Matches"
                                                        }
                                                    </PDFDownloadLink>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                    <div className={'ipad-show'}>
                        <Right/>
                    </div>

                </div>
            </div>
            <div className={"footer-mobile-none"}>
            <Footer/>
            </div>
        </>
    )
}
