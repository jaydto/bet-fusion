import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";
import Header from '../../header/header'
import SideBar from '../../sidebar/sidebar'
import Footer from '../../footer/footer'
import Right from '../../right/index'

const ResponsibleGambling = () => {
    return (
        <>
            <Header/>
            <div className="by amt">
                <div className="gc">
                    <SideBar/>
                    <div className="gz home">
                        <div className="homepage">
                            <div className='col-md-12 primary-bg p-4 text-center'>
                                <h4 className="inline-block">
                                    RESPONSIBLE GAMBLING POLICY
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 text-white p-2 text-center">
                                Responsible Gambling is a key corporate strategy endorsed by BetNare and championed by
                                all staff. BetNare recognizes the importance of putting in place practices and processes
                                to achieve a high standard of gaming.
                                We design proprietary communications and related collaterals to promote the importance
                                of playing responsibly with the "PLAY RESPONSIBLY" message featured in all
                                communications materials and incorporated into betting merchandise, marketing materials
                                etc. Our information on games are factual and transparent and the betting gaming rules
                                on products are always made available for our customers to assist them in making
                                informed decisions. Other means are as follows
                            </div>
                            <div className="col-md-12 mt-2 p-5 text-white accordion-container">
                                <Accordion allowMultipleExpanded={false} allowZeroExpanded={true}>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Protection of vulnerable gamblers
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                One of the most important areas of Responsible Gambling is concerned
                                                with
                                                the protection of vulnerable players. Some players may become addicted
                                                to
                                                sports betting activities and by spending too much money their normal
                                                lives
                                                are soon affected.
                                                Among the main measures that we impose in the industry, we can mention
                                                self-exclusion programs, limits on the amount of money and time players
                                                can
                                                spend on our gaming website.
                                                All the same, we implement many other tools to assist players enjoy
                                                responsible gaming sessions, such as the possibility to set financial
                                                limits
                                                to their accounts. For instance, to avoid potential hasten decisions, an
                                                increase in their deposit limit will not take effect until a period of
                                                24
                                                hours.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Prevention of underage gambling
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                The prevention of underage gaming is one of the most important aspects
                                                of responsible gambling and it needs to be emphasized that individuals
                                                that have not reached the legal age (18) must not be allowed to gamble
                                                for real-money.
                                                BetNare takes all the necessary steps to make sure that underage
                                                gambling activities do not take place on our website and that the laws
                                                protecting minors in their targeted jurisdictions are respected.
                                                As operators we present a clear registration processes for all players
                                                and mandatory verification steps to be followed to ensure the age of
                                                gamblers.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Safety measures against criminal activities
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                Gambling websites can be affected by online criminals’ activities just
                                                like any other sites dealing with e-commerce or financial transactions.
                                                To accomplish their goals and obtain private and financial data, online
                                                criminals deploy malicious software that targets websites’
                                                vulnerabilities.
                                                To stop this growing tendency, we have inserted procedures and software
                                                programs that detect and block money laundering activities and hacking
                                                devices.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Information privacy
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                We protect our customers’ private details from prying eyes. This is
                                                connected to the need of keeping safe players’ private details from
                                                unauthorized access that may occur due to illegal online criminal
                                                attacks.
                                                By introducing several strong policies to control access to important
                                                private data, starting with gamblers’ names, their addresses and phone
                                                numbers, BetNare ensures information privacy is respected and that we
                                                are in line with regulators’ requirements.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Online payment protection
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                We ensure that players access a reliable software platform that protects
                                                our customers personal data and financial details. This is an important
                                                reason why we must give a major attention to choosing the most
                                                appropriate gaming solution for the purposes of our players to safely
                                                deposit, transfer and withdraw money on our gambling website or mobile
                                                wallets.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Ethical and responsible marketing
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                We comply with the relevant regulatory advertising codes of practice
                                                which typically ensure that advertisements are factually correct and do
                                                not target underage or vulnerable gamblers, such as players who have
                                                self-excluded themselves from gambling. BetNare seek permission from the
                                                customer prior to engaging in direct marketing through use of the
                                                customer’s personal details.
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

export default ResponsibleGambling