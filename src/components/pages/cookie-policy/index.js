import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
const Header = React.lazy(()=>import('../../header/header'));
const SideBar = React.lazy(()=>import('../../sidebar/sidebar'));
const Footer = React.lazy(()=>import('../../footer/footer'));
const Right = React.lazy(()=>import('../../right/index'));

const CookiePolicy = () => {
    return (
        <>
            <Header/>
            <div className="by amt">
                <div className="gc">
                    <SideBar  loadCompetitions/>
                    <div className="gz home">
                        <div className="homepage">
                            <div className='col-md-12 primary-bg p-4 text-center'>
                                <h4 className="inline-block">
                                    COOKIE POLICY
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 text-white p-2 ">
                                <p>
                                    BetNare uses cookies on our website. By using our services, you consent to the use
                                    of
                                    cookies. Our Cookies Policy explains, what cookies are, how we use cookies and how
                                    third parties we may partner with may use cookies on the service, your choices
                                    regarding cookies and further information about cookies
                                </p>
                            </div>
                            <div className="col-md-12 mt-2 text-white accordion-container">
                                <Accordion allowMultipleExpanded={false} allowZeroExpanded={true}>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                WHAT ARE COOKIES
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                Cookies are small files of Data which are stored on your computer that
                                                allow us to recognize and remember you. On your first visit to the
                                                Website a piece of Personal Data called a cookie will be sent to your
                                                browser for the purpose of recording your preferences and tracking your
                                                navigation patterns.
                                            </p>
                                            <p>
                                                Cookies aid us in monitoring traffic on our site, improving our services
                                                and make it easier for you to access our services whilst increasing your
                                                interest in our services.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                COOKIES USED
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                BetNare uses cookies to enable certain functions of the service, to
                                                provide
                                                analytics. To store your preferences and to enable us to deliver
                                                advertisements.
                                            </p>
                                            <p>
                                                We use session based, persistent, analytical and essential cookies to
                                                enable us to run our service.
                                            </p>

                                            <p>
                                                Kindly note that you can disable cookies by changing your browser
                                                settings. However, please note that the functionality of our website
                                                will be impaired.
                                            </p>

                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                THIRD- PARTY COOKIES
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                In addition to our own cookies, we may also use various third party
                                                cookies to report usage statistics of the service, deliver
                                                advertisements on and throughout the service, and so on.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                </Accordion>
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

export default CookiePolicy
