import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import React, {useContext, useState} from 'react';
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../assets/img/Logo.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './test.css'
import './card.css'
import './affiliate.css'
// import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import {Context} from "../../context/store";
import {faArrowUp, faHandPointUp, faHome, faPowerOff} from "@fortawesome/free-solid-svg-icons";

const Footer = React.lazy(() => import('../footer/footer'));
const Affiliate = (props) => {
    const {profile}=props
    const [state, dispatch] = useContext(Context)
    const expand = "md"
    return (
        <>
            <div className={'flex-item py-0'}>
                {!profile&&
                    <div className="item4 border-header-affiliate ">
                    <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav profile-top-nav" fixed="top"
                            variant="dark">
                        <Container fluid
                                   className={'d-flex justify-content-between mobile-change mobile-profile header-bg-affiliate'}>
                            <Navbar.Brand className="e logo align-self-start menu-control d-flex w-100" title="Betnare"
                                          style={{paddingLeft: '0px', paddingBottom: '0px'}}>
                                <Link to={{pathname: "/"}} className="col-4 resize-mobile d-flex align-items-center">
                                    <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"
                                                   className={"image-size "}/>
                                </Link>
                                <div
                                    className="col-md-6  d-flex  right justify-content-end align-items-center w-change2 gap-2 "
                                    style={{marginLeft: 'auto'}}>
                                    <div>
                                        <Link
                                            to={{pathname: "/"}}
                                            className={"deposit-button size-font-user-action-affiliate"} title={'HOME'}
                                            style={{fontSize: '18px'}}>
                                      <span className="">
                                       <span className=" "> <FontAwesomeIcon
                                           icon={faHome}/></span>&nbsp;

                                          HOME
                                      </span>
                                        </Link>
                                    </div>
                                    {state?.user && <div>
                                        <Link
                                            to={{pathname: "/logout"}}
                                            className={"deposit-button size-font-user-action-affiliate"}
                                            style={{marginRight: "12px", fontSize: '18px'}} title={'LOGOUT'}>
                                      <span className="text-warning">
                                       <span className=" "><FontAwesomeIcon icon={faPowerOff}
                                                                            className={"text-warning"}/>
                                           </span>&nbsp;
                                          LOGOUT
                                      </span>
                                        </Link>
                                    </div>}
                                </div>

                            </Navbar.Brand>

                        </Container>
                    </Navbar>
                </div>}
                <div className="flex-container profile-style" style={{padding: '0px 2px '}} id={'top'}>
                    <div className="item2">
                        <div className={'profile-img-banner-affiliate'}>
                            <div>
                                <div className={'position-info  affiliate-bg-info d-flex flex-column'}>
                                    <h1 className={'bold text-light'}>BETNARE AFFILIATE</h1>
                                    <p className={' bold text-light text-style-affiliate'}>
                                        BetNare Affiliate offers one of the most competitive online Affiliate Programs
                                        in the
                                        industry. We focus on building and maintaining a true partnership with each of
                                        our
                                        affiliates and improve our mutual success.
                                    </p>

                                </div>
                            </div>

                        </div>
                        <section className={'affiliate-info affiliate-cards-container'}>
                            <div>
                                <h1 className={'text-center text-light'}>
                                    HOW DOES IT WORK ?
                                </h1>
                                <div className={'affiliate-info-work-container'}>
                                    <p className={'affiliate-info-work-text'}>
                                        Simply open an affiliate account, get your tracking links, creative
                                        marketing materials and upload them to your website.
                                    </p>
                                </div>
                                <div>
                                    <div className={'container '}>
                                        <div className={'d-flex gap-2 affiliate-card-small'}>
                                            <div className="col-lg-3 col-sm-10 col-md-10 card text-center affiliate-info-work-card ">
                                                <div className="card-body affiliate-info-work-card-body">
                                                    <img
                                                        src={'https://storage.googleapis.com/nareimages/affiliate/step1.png'}/>
                                                    <h5 className="card-title text-dark affiliate-info-work-card-body-text-title">Register</h5>

                                                    <p className="card-text text-dark affiliate-info-work-card-body-text">With
                                                        supporting text below as a natural
                                                        lead-in
                                                        to additional
                                                        content.</p>

                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-10 col-md-10 card text-center affiliate-info-work-card ">
                                                <div className="card-body affiliate-info-work-card-body">
                                                    <img
                                                        src={'https://storage.googleapis.com/nareimages/affiliate/step2.png'}/>
                                                    <h5 className="card-title text-dark affiliate-info-work-card-body-text-title">Promote</h5>
                                                    <p className="card-text text-dark affiliate-info-work-card-body-text">Every
                                                        user that you send gets a cookie that is valid for 30 days,
                                                        in case they're not ready to sign-up on the first go</p>


                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-10 col-md-10 card text-center affiliate-info-work-card ">
                                                <div className="card-body affiliate-info-work-card-body">
                                                    <img
                                                        src={'https://storage.googleapis.com/nareimages/affiliate/step3.png'}/>
                                                    <h5 className="card-title text-dark affiliate-info-work-card-body-text-title">Earn</h5>

                                                    <p className="card-text text-dark affiliate-info-work-card-body-text">Sit
                                                        back and relax while waiting for your monthly
                                                        commissions.</p>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </section>
                        <section className={'affiliate-form'}>
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSduBrzEhePDYgzrKiuwPCoJfVLrYahu5AjBI_bkjUUgAdsSCg/viewform?embedded=true"
                                frameBorder="0"
                                className={'affiliate-form-iframe'}
                                marginHeight="0"
                                marginWidth="0">Loading…
                            </iframe>

                        </section>
                        <section className={'affiliate-info affiliate-about-section'}>
                            <div className={'d-flex affiliate-about-container affiliate-card-small affiliate-height-container-sm'}>
                                <div className={'col affiliate-about-container-element'}>
                                    <h1 className={'affiliate-about-container-element-header'}>
                                        About Us
                                    </h1>
                                    <p className={'affiliate-about-container-element-text'}>
                                        We are one of the most trusted and outstanding Affiliate programs in the
                                        market. We highly appreciate our business and putting our efforts in making
                                        every new tool comfortable and manageable for our affiliates. Among key
                                        features you’ll be provided with:
                                    </p>
                                    <ul>
                                        <li className={'affiliate-about-container-element-text-list'}>
                                            Attractive Marketing Tools
                                        </li>
                                        <li className={'affiliate-about-container-element-text-list'}>
                                            Detailed Reports
                                        </li>
                                        <li className={'affiliate-about-container-element-text-list'}>
                                            Fast Payments
                                        </li>
                                        <li className={'affiliate-about-container-element-text-list'}>
                                            Quick Support
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={'col affiliate-about-container-element affiliate-about-container-element-banner'}>
                                </div>
                            </div>
                        </section>
                        <section className={'affiliate-info affiliate-fetaures-section'}>
                            <div>
                                <h1 className={'text-center text-light'}>
                                    Our Features
                                </h1>
                                <div className={'affiliate-info-work-container'}>
                                    <p className={'affiliate-info-work-text'}>
                                        We are one of the most competitive online Affiliate Programs in the industry.
                                    </p>
                                </div>
                            </div>
                            <div className={'d-flex w-100 flex-column gap-4 '}>
                                <div className={'container card-medium '}>
                                    <div className={'d-flex gap-4 affiliate-card-smal card-feature-column'}>
                                        <div
                                            className="col-lg-4 col-sm-10 col-md-10 card text-center affiliate-info-work-card  affiliate-featured-cards">
                                            <div className="card-body affiliate-info-work-card-body">
                                                <div className="card-header affiliate-info-work-card-body-header ">
                                                    <img
                                                        src={'https://storage.googleapis.com/nareimages/affiliate/feature_1.png'}/>
                                                    <h5 className="card-title text-dark affiliate-info-work-card-body-text-title">Up
                                                        To 20% Revenue Share</h5>
                                                </div>
                                                <p className="card-text text-dark affiliate-info-work-card-body-text">
                                                    The more players you bring to us, the higher your winnings will be.
                                                    The profit is based on the volume of your players. With revenue
                                                    sharing, hybrid plans and competitive CPA's, you can achieve amazing
                                                    commissions.</p>


                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-4 col-sm-10 col-md-10 card text-center affiliate-info-work-card  affiliate-featured-cards">
                                            <div className="card-body affiliate-info-work-card-body">
                                                <div className="card-header affiliate-info-work-card-body-header ">
                                                    <img
                                                        src={'https://storage.googleapis.com/nareimages/affiliate/feature_2.png'}/>
                                                    <h5 className="card-title text-dark affiliate-info-work-card-body-text-title">Lifetime
                                                        Commission</h5>
                                                </div>
                                                <p className="card-text text-dark affiliate-info-work-card-body-text">
                                                    We highly appreciate each affiliate's input, and try hard to create
                                                    ideal commission plans for providing a lifetime revenue. Boost your
                                                    earnings. Keep them coming, and we will make them stay</p>


                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-4 col-sm-10 col-md-10 card text-center affiliate-info-work-card affiliate-featured-cards">
                                            <div className="card-body affiliate-info-work-card-body ">
                                                <div className="card-header affiliate-info-work-card-body-header ">
                                                    <img
                                                        src={'https://storage.googleapis.com/nareimages/affiliate/feature_3.png'}/>
                                                    <h5 className="card-title text-dark affiliate-info-work-card-body-text-title">Optimized
                                                        Marketing Tools</h5>
                                                </div>
                                                <p className="card-text text-dark affiliate-info-work-card-body-text">
                                                    Our marketing tools are developed by professional and experienced
                                                    specialists. In addition to the technical innovations, the needs of
                                                    our partners are taken into account.</p>


                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className={'container card-medium'}>
                                    <div className={'d-flex gap-4 affiliate-card-smal card-feature-column '}>
                                        <div
                                            className="col-lg-4 col-sm-10 col-md-10 card text-center affiliate-info-work-card affiliate-featured-cards ">
                                            <div className="card-body affiliate-info-work-card-body">
                                                <div className="card-header affiliate-info-work-card-body-header ">
                                                    <img
                                                        src={'https://storage.googleapis.com/nareimages/affiliate/feature_4.png'}/>
                                                    <h5 className="card-title text-dark affiliate-info-work-card-body-text-title">
                                                        Real-Time Statistics</h5>
                                                </div>
                                                <p className="card-text text-dark affiliate-info-work-card-body-text">
                                                    With real-time statistics you have your data under control. Track
                                                    the impact of your advertising and marketing strategies. By
                                                    analyzing your data in real time, you can systematically track and
                                                    improve your profit impact.</p>


                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-4 col-sm-10 col-md-10 card text-center affiliate-info-work-card affiliate-featured-cards ">
                                            <div className="card-body affiliate-info-work-card-body">
                                                <div className="card-header affiliate-info-work-card-body-header ">
                                                    <img
                                                        src={'https://storage.googleapis.com/nareimages/affiliate/feature_5.png'}/>
                                                    <h5 className="card-title text-dark affiliate-info-work-card-body-text-title">
                                                        Prompt Payments</h5>
                                                </div>
                                                <p className="card-text text-dark affiliate-info-work-card-body-text">
                                                    Do not wait for your monthly commissions. Your profit can be quickly
                                                    and safely paid. You can use one of the multiple payment methods.
                                                    Simply select your desired method and get your commission.</p>


                                            </div>
                                        </div>
                                        <div
                                            className="col-lg-4 col-sm-10 col-md-10 card text-center affiliate-info-work-card affiliate-featured-cards ">
                                            <div className="card-body affiliate-info-work-card-body">
                                                <div className="card-header affiliate-info-work-card-body-header ">
                                                    <img
                                                        src={'https://storage.googleapis.com/nareimages/affiliate/feature_1.png'}/>
                                                    <h5 className="card-title text-dark affiliate-info-work-card-body-text-title">
                                                        Great Customer Support</h5>
                                                </div>
                                                <p className="card-text text-dark affiliate-info-work-card-body-text">
                                                    Our dedicated affiliate managers will show you how to earn players'
                                                    loyalty and get desired commissions. A true partnership and
                                                    individual approach is what we're willing to build with each of our
                                                    affiliate. Your success is our priority.</p>


                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                        <section className={'affiliate-info affiliate-about-section affiliate-commission-section '}>
                            <div className={'d-flex affiliate-about-container affiliate-card-small affiliate-height-container-sm'}>
                                <div
                                    className={'col affiliate-about-container-element affiliate-about-container-element-banner-commisions'}>
                                </div>
                                <div className={'col affiliate-container-element-commission'}>
                                    <h1 className={'affiliate-about-container-element-header'}>
                                        Commisions
                                    </h1>
                                    <p className={'affiliate-about-container-element-text'}>
                                        Our generous commission structure is designed to accommodate your needs and
                                        reward you based on your referred traffic, allowing you to earn astonishing
                                        commissions. Choose from any plan that best suits your requirements or get in
                                        touch with our dedicated affiliate manager to create a custom plan for you.
                                        Boost your earnings. Keep them coming and we will make them stay!
                                    </p>
                                </div>
                            </div>
                        </section>
                        <section className={'affiliate-info affiliate-payment-section'}>
                            <div>
                                <h1 className={'text-center text-light'}>
                                    Payment Methods
                                </h1>
                                <div className={'affiliate-info-work-container'}>
                                    <p className={'affiliate-info-work-text'}>
                                        Your well-deserved monthly commissions won’t make you wait, as in our system we
                                        guarantee only fast and secure payments.
                                    </p>
                                </div>
                                <div className={'affiliate-payment-img'}>
                                    <img  src={'https://storage.googleapis.com/nareimages/affiliate/mpesa.svg'} alt={'betnare mpesa'}/>
                                </div>
                            </div>
                        </section>
                    </div>


                </div>
                <a className={'back-to-top'} href={"/affiliate#top"}>
                    <FontAwesomeIcon icon={faArrowUp}  className={'affiliate-to-top'}/>
                </a>
                <footer className={'affiliate-footer'}>
                    <Footer affiliate={true}/>
                </footer>

            </div>
        </>
    )
}
export default React.memo(Affiliate)