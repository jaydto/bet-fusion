import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";
import Footer from '../../footer/footer'
import Header from '../../header/header'
import Right from '../../right/index'
import SideBar from '../../sidebar/sidebar'

const PrivacyPolicy = () => {
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
                                    PRIVACY POLICY
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 text-white p-2 text-center">
                            </div>
                            <div className="col-md-12 mt-2 p-5 text-white accordion-container">
                                <Accordion allowMultipleExpanded={false} allowZeroExpanded={true}>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                PRIVACY
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                Beyond Intoch Software Limited, hereinafter also referred to as
                                                “BetNare”,
                                                “the Company” or “We” highly values and respects the privacy of the
                                                players
                                                and online visitors.
                                            </p>

                                            <p>
                                                The purpose of this Privacy Policy is to inform you about the methods
                                                and
                                                purposes for which your personal Player Data (“the Player Data”) is
                                                processed, as well as to inform you about the rights you have regarding
                                                the
                                                processing. By accepting this Privacy Policy, you agree that you
                                                understand
                                                and accept the use of your personal information as set out in this
                                                policy.
                                                If you do not agree with the terms of this Privacy Policy, please do not
                                                use
                                                the Website or otherwise provide us with your personal information. This
                                                Privacy Policy should be read in conjunction with our Terms and
                                                Conditions.
                                            </p>

                                            <p>
                                                BetNare may periodically make changes to this Privacy Policy and will
                                                notify
                                                you of these changes by posting the modified terms on the Website. Such
                                                changes will become effective upon the posting/ publishing of the
                                                revised
                                                policy. CLIENTS are encouraged to regularly examine this Privacy Policy
                                                for
                                                up-to-date information on the processing of Player Data.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Protection of vulnerable gamblers
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                Personal data with regards to our policy refers to any personal
                                                information
                                                which enables that identification of an individual directly or
                                                indirectly by
                                                reference to the data provided and collected on account opening namely,
                                                first name, surname, gender, date of birth, place of birth, postal
                                                address,
                                                email address, phone number, currency, a valid original copy of an
                                                official
                                                document bearing his names and photographs (passport or ID card), log in
                                                credentials, payment methods and details and passwords.
                                            </p>
                                            <p>
                                                Players retain the right access their personal data at any time in order
                                                to
                                                make alterations to any personal information that may have changed or
                                                become
                                                obsolete. Should you believe that any personal information we hold for
                                                you
                                                is incorrect, please email our customer services on ccare@betnare.com
                                                and we
                                                will amend any information found to be incorrect.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                INFORMATION COLLECTED AND USAGE
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                BetNare may collect, use and process the following:
                                            </p>
                                            <ol>
                                                <li>
                                                    Information that you provide to us by filling in forms on the
                                                    Website or
                                                    any other information you submit to us via the Website or email.
                                                </li>
                                                <li>
                                                    Records of correspondence, whether via the Website, email, telephone
                                                    or
                                                    other means.
                                                </li>
                                                <li>
                                                    Details of the transactions you carry out with us, whether via the
                                                    Website, telephone or other means.
                                                </li>
                                                <li>
                                                    Details of your visits to the Website including traffic data,
                                                    location
                                                    data, weblogs and other communication data.
                                                </li>
                                            </ol>
                                            <p>
                                                We may use your personal information and data together with other
                                                information for the purposes of:
                                            </p>

                                            <ol>
                                                <li>
                                                    processing your bets, including card and on-line payments;
                                                </li>
                                                <li>
                                                    setting up, operating and managing your account;
                                                </li>
                                                <li>
                                                    complying with our legal and regulatory duties;
                                                </li>
                                                <li>
                                                    carrying out customer analyses;
                                                </li>
                                                <li>
                                                    providing you with information about promotional offers and our
                                                    products
                                                    and services, where you have consented; monitoring transactions for
                                                    the
                                                    purposes of preventing fraud, irregular betting, money laundering
                                                    and
                                                    cheating
                                                </li>
                                            </ol>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                DOSCLOSURES
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                We are entitled to share the information we hold including, but not
                                                limited to, personal data and betting history with the regulator,
                                                sporting bodies and other bodies, including the police, in order to
                                                investigate fraud and money laundering.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                SECURITY
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                BetNare does not warrant the security of information transmitted over
                                                the
                                                internet and emphasizes that you transmit any and all data at your own
                                                risk.
                                            </p>
                                            <p>
                                                BetNare shall take no responsibility whatsoever for events beyond its
                                                control inclusive of, but not limited to, acts of god or natural
                                                disasters
                                                and including power cuts and strikes.
                                            </p>
                                            <p>
                                                However, BetNare will endeavor to maintain strict security measures on
                                                the
                                                Website and its associated sites, so that no unauthorized use, loss
                                                and/or
                                                alteration of data can be done to Player and Player Account Data.
                                            </p>
                                            <p>
                                                Financial information like credit or debit card data will not be stored
                                                in
                                                the Website, and all M-Pesa, Airtel Money, Paypal, Credit and Debit card
                                                transactions will be stored for the purpose of processing the payments
                                                by a
                                                certified payment service provider of your choice.
                                            </p>
                                            <p>
                                                The Player Account can only be accessed with unique username and
                                                password. The password will be stored in the Website only in encrypted
                                                form. Kindly remember that your personal data is sensitive and that you
                                                SHOULD NOT share it to strangers or third parties.
                                            </p>
                                            <p>
                                                If you require any further information, please contact us through our
                                                customer support.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                LINKED WEBSITES
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                Where there is a link from the Website to another relevant site, this
                                                Privacy Policy will not apply once you leave this site.
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
        </>)
}

export default PrivacyPolicy