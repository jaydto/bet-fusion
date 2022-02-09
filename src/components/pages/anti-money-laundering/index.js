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
import Footer from '../../footer/footer'
import Right from '../../right/index'
import SideBar from '../../sidebar/sidebar'

const AntiMoneyLaundering = () => {
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
                                    ANTI-MONEY LAUNDERING
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 text-white p-2 text-center">
                            </div>
                            <div className="col-md-12 mt-2 p-5 text-white accordion-container">
                                <Accordion allowMultipleExpanded={false} allowZeroExpanded={true}>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                ANTI-MONEY LAUNDERING
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                We endeavor to carry out all appropriate measures to combat money
                                                laundering
                                                and international terrorism. We are bound to inform the relevant
                                                authorities
                                                if we suspect that funds deposited by the Player are used for money
                                                laundering, terrorism financing or any other illegal activity.
                                            </p>
                                            <p>
                                                BetNare is obliged to block such funds and to undertake measure as
                                                provided
                                                in the AML policy rules.
                                            </p>

                                            <p>
                                                When you open an account, you agree to undertake the following
                                                obligations:
                                            </p>

                                            <ul>
                                                <li>
                                                    You agree that you comply with all applicable laws and regulations
                                                    on
                                                    combating money laundering and terrorism financing, including the
                                                    АМL
                                                    Policy.
                                                </li>
                                                <li>
                                                    You confirm that you have no information or any suspicions about the
                                                    fact
                                                    that funds used for depositing in the past, present or future, are
                                                    received
                                                    from any illegal source, or have any relation to legalization of
                                                    income
                                                    obtained illegally, or other unlawful activity prohibited by
                                                    applicable law
                                                    or the instructions of any international organizations.
                                                </li>
                                                <li>
                                                    You agree to immediately provide any information we think fit to
                                                    require
                                                    according to applicable laws and regulatory requirements in respect
                                                    of
                                                    combating the legalization of funds obtained illegally.
                                                    The company collects and keeps copies of ID documentation, mobile
                                                    numbers
                                                    etc of the players during registration and withdrawals, and reports
                                                    on all
                                                    changes made in the account.
                                                </li>
                                                <li>
                                                    The company monitors any suspicious activity on the User's account,
                                                    as well
                                                    as operations carried out under special conditions.
                                                    The company has the right to ban the User at any time, if the
                                                    Company has
                                                    grounds for supposing that this operation has any relation to money
                                                    laundering and criminal activity. In accordance with international
                                                    law the
                                                    Company is not obliged to inform the User about his suspicious
                                                    activity and
                                                    let him know that it has been passed to relevant authorities.
                                                </li>
                                                <li>
                                                    In accordance with the internal AML procedures the Company performs
                                                    initial
                                                    and ongoing personal identity verification procedures as provided by
                                                    the
                                                    level of risk of each User.
                                                </li>
                                                <li>
                                                    The company will ask you to provide the minimal information to
                                                    confirm
                                                    your identity.
                                                </li>
                                                <li>
                                                    The company will record and preserve all data and ID, as well as
                                                    which
                                                    methods of confirmation have been used and the results of
                                                    verification
                                                    procedures.
                                                </li>
                                                <li>
                                                    The company, through KYC, will check your personal data to match the
                                                    list
                                                    of persons suspected of terrorism, which is formed by the authorized
                                                    state
                                                    and independent authorities. A minimum set of identification data
                                                    includes:
                                                    the User's full name; date of birth (for individuals); residential
                                                    address
                                                    or registered address of the User;
                                                </li>
                                                <li>
                                                    sources of funds that you plan to Deposit into the account.
                                                    To verify and confirm the authenticity of the above-mentioned data,
                                                    the
                                                    Company may require the following documents:
                                                </li>
                                                <li>
                                                    passport or identification card, or other document equivalent that
                                                    meets
                                                    the following requirements: contains the name, date of birth and a
                                                    photograph of the document holder.
                                                </li>
                                                <li>
                                                    The company may also require other additional information, confirmed
                                                    by
                                                    relevant documents. In certain cases, the Company may also require
                                                    notarized
                                                    copies of documents from the User.
                                                </li>
                                            </ul>
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

export default AntiMoneyLaundering