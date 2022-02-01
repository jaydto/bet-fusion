import React from "react";

import Header from '../header/header';
import Footer from '../footer/footer';
import SideBar from '../sidebar/sidebar';
import banner from '../../assets/img/banner.jpg';
import CarouselLoader from '../carousel/index';
import MainTabs from '../header/main-tabs';
import SearchBar from '../header/search-bar';
import {MarketList} from '../matches/index';
import Right from '../right/index';
import Row from 'react-bootstrap/Row';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const TermsAndConditions = (props) => {
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
                                    TERMS AND CONDITIONS
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 text-white p-2 text-center">
                                These General Terms and Conditions are effective from 01.12.2021
                            </div>
                            <div className="col-md-12 mt-2 p-5 text-white accordion-container">
                                <Accordion allowMultipleExpanded={false} allowZeroExpanded={true}>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                GENERAL
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <ol>
                                                <li> These Terms and Conditions refers to Beyond Intoch Software
                                                    Limited,
                                                    a company incorporated in Kenya.
                                                </li>
                                                <li> The term "CLIENT" references any individual person that expressly
                                                    or
                                                    impliedly agrees to all terms and conditions of BetNare by opening
                                                    an
                                                    account and placing bets on games on the company’s website.
                                                </li>
                                                <li> All CLIENTS accessing the BetNare’ website agree to abide by the
                                                    following terms and conditions governing the use of its services
                                                    (the
                                                    "Agreement").
                                                </li>
                                                <li> This agreement and any other agreement between the CLIENT and
                                                    BetNare
                                                    is subject to the laws of Kenya.
                                                </li>
                                                <li> This Agreement describes the terms, conditions and risks applicable
                                                    to the CLIENT using of BetNare’ services available under the domains
                                                    of
                                                    www.betnare.com (the "SITE" If the CLIENT has any questions
                                                    regarding
                                                    this Agreement, please contact Customer Support.
                                                </li>
                                                <li> The CLIENT must read, agree with, and accept all of the terms and
                                                    conditions contained in this Agreement without modifications, which
                                                    include those terms and conditions expressly set forth below and
                                                    those
                                                    incorporated by reference, before the CLIENT may become an active,
                                                    registered CLIENT of BetNare. By continuing to access or use the
                                                    SITE,
                                                    the CLIENT agrees to follow the terms and conditions of this
                                                    Agreement.
                                                </li>
                                                <li> This Agreement is effective upon acceptance of the registration for
                                                    newly registering CLIENTS by checking the box “I am 18 years old or
                                                    over
                                                    and I have read and accept the Terms and Conditions and Privacy
                                                    Policy"
                                                    and clicking "Continue" button in the course of the registration on
                                                    the
                                                    SITES. The CLIENT commits to comply with the Terms and Conditions of
                                                    the
                                                    website. If the CLIENT does not agree to be bound by the terms and
                                                    conditions of this Agreement and does not use or access our WEBSITES
                                                    after registering, the CLIENT must inform us in writing immediately.
                                                </li>
                                                <li>This Agreement is effective upon acceptance of the registration for
                                                    newly registering CLIENTS on mobile applications by selecting the
                                                    option
                                                    “YES” to confirm that the CLIENT is “18 years old or over and that
                                                    they
                                                    have read and accepted the Terms and Conditions and Privacy Policy."
                                                    If
                                                    the CLIENT does not agree to be bound by the terms and conditions of
                                                    this Agreement and does not use or access our mobile applications
                                                    after
                                                    registering, the CLIENT must inform us in writing immediately.
                                                </li>
                                                <li>The CLIENT agrees that by playing any game or placing a bet or stake
                                                    or otherwise utilizing the betting platforms, the CLIENT accepts and
                                                    agrees to be bound by these terms and conditions and any amendment
                                                    or
                                                    variation thereto and the Rules which apply to the applicable
                                                    products
                                                    available from time to time. The CLIENT acknowledges that the
                                                    company
                                                    shall retain the right to use from time to time, all data collected
                                                    to
                                                    carry out market survey/ campaign /research, send customer
                                                    satisfaction
                                                    questionnaires, market and promote its services and those of its
                                                    affiliated companies.
                                                </li>
                                                <li> This Agreement shall be governed by and interpreted in accordance
                                                    with the laws of the Republic of Kenya and Betting Control and
                                                    Licensing
                                                    License conditions. Any legal action or proceeding arising under
                                                    this
                                                    Agreement will be brought exclusively in courts located in the
                                                    aforementioned republic, and the parties hereby irrevocably consent
                                                    to
                                                    the personal jurisdiction and venue therein.
                                                </li>
                                                <li> BetNare will not be liable in any way to any persons in the event
                                                    of
                                                    force majeure, including but not limited to strike, terrorist
                                                    activities, political crisis, war, natural catastrophe, or for the
                                                    act
                                                    of any government or legal authority. In the event that any
                                                    provision in
                                                    this Agreement is held to be invalid or unenforceable, the remaining
                                                    provisions will remain in full force and effect.
                                                </li>

                                                <li> BetNare will not be responsible for any saturation of the
                                                    telecommunication networks, cyber-attacks, hacking etc., which could
                                                    lead to a total or partial access reduction to its services, loss of
                                                    data by itself or by other contracted independent service providers
                                                    on
                                                    whom the Company will wholly or partially be reliant on to deliver
                                                    the
                                                    services.
                                                </li>

                                                <li> BetNare will not be held liable and will be held harmless by the
                                                    CLIENT for any damages, losses, costs, loss of profits or any other
                                                    disadvantage a CLIENT may incur in connection with any disconnection
                                                    from or the non-availability of any of the products offered by
                                                    BetNare
                                                    for whatever reason.
                                                </li>

                                                <li> Failure of a party to enforce any right or provision of this
                                                    Agreement will not be deemed a waiver of such right or provision.
                                                </li>

                                                <li> BetNare may assign this Agreement or any rights and/or obligations
                                                    hereunder without the CLIENT’s consent.
                                                </li>

                                                <li> BetNare may amend the terms of this Agreement from time to time by
                                                    posting the amended terms on the WEBSITE. The CLIENT continuing
                                                    usage of
                                                    BetNare’ services after the date of amendment is acceptance of the
                                                    amended terms and conditions, whether or not the changes have been
                                                    acknowledged.
                                                </li>


                                                <li> The CLIENT will ultimately be responsible for checking the
                                                    company’s
                                                    website for any changes and should they wish to discontinue use of
                                                    the
                                                    services offered after a change is enacted in the terms and
                                                    conditions,
                                                    the CLIENT will be entitled to withdraw their uncommitted funds by
                                                    sending an email to ccare@BetNare.com. The company will cease to
                                                    have
                                                    any continued obligation towards the CLIENT from the day of receipt
                                                    of
                                                    the email, through to the withdrawal of funds and thereafter.
                                                </li>

                                                <li> BetNare undertakes to respect the CLIENT’s privacy in line with the
                                                    Company’s Privacy Policy.
                                                </li>
                                            </ol>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                ACCOUNT USAGE
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <ol>
                                                <li>
                                                    In consideration of our accepting your application to open an
                                                    account, you represent to us (and acknowledge that we rely on these
                                                    representations) as follows:
                                                </li>
                                                <ul style={{'marginLeft': '30px'}}>
                                                    <li>
                                                        You are 18 years of age or over. It is an offence for anyone
                                                        under the age of 18 to open an account or to gamble on BetNare;
                                                    </li>
                                                    <li>
                                                        You are of sound mind and capable of taking responsibility for
                                                        your own actions and that you can enter into a legally binding
                                                        agreement with us.
                                                    </li>
                                                    <li>
                                                        You accept BetNare’ Terms and Conditions, Privacy Policy and
                                                        all other rules and regulations.
                                                    </li>
                                                    <li>
                                                        You agree to provide accurate registration information,
                                                        including without limitation your correct date of birth, phone
                                                        number and your country of residence. You agree to inform us of
                                                        any
                                                        changes in such details.
                                                    </li>
                                                    <li>
                                                        You are the person whose details are provided in connection with
                                                        your registration, or, in the case of legal entities, you are a
                                                        duly
                                                        authorized representative of the relevant legal entity;
                                                    </li>
                                                    <li>
                                                        You are acting as a principal and not as an agent on behalf of a
                                                        third party.
                                                    </li>
                                                    <li>
                                                        You are not an undischarged bankrupt or in a voluntary
                                                        arrangement with your creditors.
                                                    </li>
                                                    <li>
                                                        You are not in using any credit or debit cards that you are
                                                        not authorized to use or fraudulently acquired funds.
                                                    </li>
                                                    <li>
                                                        You are not located in a country where the use of our services
                                                        is prohibited. You are entirely responsible for complying with
                                                        your
                                                        own local, national, federal, state or other laws concerning
                                                        betting
                                                        and gaming prior to opening an account, placing any bets or
                                                        using
                                                        our services.
                                                    </li>
                                                    <li>
                                                        You are not in any way, form or manner attempting to illegally
                                                        hack into the company’s system, commit fraud, attempt to
                                                        duplicate,
                                                        or do any other thing that would contravene the company’s
                                                        intellectual rights.
                                                    </li>
                                                    <li>
                                                        You are not currently subject to a self-exclusion from a
                                                        BetNare’ account and neither we nor any other operator has
                                                        excluded
                                                        you from gambling; and
                                                    </li>
                                                    <li>
                                                        You will, following a request from us (which may be made at any
                                                        time before or after you open an account with us), promptly
                                                        provide
                                                        any documentation or information which we request in order to
                                                        evidence your identity, age, address, country of birth or
                                                        authorization to use a particular credit or debit card (and you
                                                        agree that we may perform checks in order to verify any such
                                                        documentation or information).
                                                    </li>
                                                </ul>

                                                <li>
                                                    It is your responsibility to keep your contact details up to date
                                                    on your account. Failure to do so may result in you failing to
                                                    receive important account related notifications and information from
                                                    BetNare, including changes we make to our terms and conditions.
                                                </li>
                                                <li>
                                                    You are solely responsible for the security and confidentiality
                                                    of your account. In particular, you agree to keep your username and
                                                    password strictly confidential and you are responsible for any
                                                    misuse of your password.
                                                </li>
                                                <li>
                                                    Provided that we have been correctly supplied with the account
                                                    information requested, we are entitled to assume that offers and
                                                    payments are made by you. You should change your password on a
                                                    regular basis and never disclose it to any third party. You
                                                    undertake to protect your username and password in the same way that
                                                    you would in respect of your bank cards and any failure to do so
                                                    shall be at your sole risk and expense. If another person accesses
                                                    your account, you are solely responsible for all their actions
                                                    whether or not their access was authorized by you, and you hereby
                                                    indemnify us and hold us harmless against all costs, claims,
                                                    expenses and damages howsoever arising in connection with the use of
                                                    or access to your account by any third party.
                                                </li>
                                                <li>
                                                    If you have any reason to suspect that a third party has access
                                                    to your account, kindly, but urgently, CONTACT US IMMEDIATELY. The
                                                    company will however not accept liability for any losses or damages
                                                    incurred as a result of the same.
                                                </li>
                                                <li>
                                                    You will open only one account per customer and not attempt to
                                                    fraudulently mislead the company on the same. The Company reserves
                                                    the right to terminate multiple accounts without prior notice should
                                                    it suspect ongoing or occurred criminal activities and confiscate
                                                    the initial deposit and all available funds.
                                                </li>

                                                <li>
                                                    You will not attempt to sell or otherwise transfer your account
                                                    to any third party and nor will you acquire or attempt to acquire an
                                                    account which has been opened in the name of a third party.
                                                </li>
                                                <li>
                                                    All accounts will be subject to the KYC process from the
                                                    application to register phase and all transactions shall be
                                                    performed in Kenyan Shillings.

                                                </li>
                                                <li>
                                                    If you would like information about tools to help you manage your
                                                    gambling activity, please visit our Responsible Gambling page by
                                                    going to www.betnare.com/responsible_gambling. You can also find
                                                    contact details for organizations where you can seek further support
                                                    if needed on this website.

                                                </li>
                                                <li>
                                                    Should you not comply or be in breach of any of the conditions
                                                    applicable under this Account regulations, your account will be
                                                    suspended pending investigation without any prior communication to
                                                    you. Thereafter, BetNare reserves the right to report any suspect or
                                                    illegal activity to the relevant authority and, with absolute
                                                    discretion to restrict and terminate your account. Following this,
                                                    the Company also reserves the right to seize all available funds.
                                                </li>
                                                <li>
                                                    You SHALL BE LIABLE for any and all claims, losses, liabilities,
                                                    damages, costs and expenses incurred or suffered by the Company
                                                    (together "Claims") arising therefrom and shall indemnify and hold
                                                    the Company harmless on demand for such Claims. The Company shall
                                                    also be entitled to withhold and/or retain any and all amounts which
                                                    would otherwise have been paid or payable to you (including any
                                                    winnings or bonus payments).
                                                </li>

                                                <li>
                                                    The Company SHALL NOT under any circumstances accept liability
                                                    from third parties resulting from incorrect, false or misleading
                                                    information or data.
                                                </li>
                                                <li>
                                                    The Company reserves the right to exclude users from its website
                                                    and services at its discretion. Should the company choose to do so,
                                                    the company will promptly refund the residual credit balance in the
                                                    account using the agreed upon payment methods. It should be noted
                                                    that if the company restricts or terminates the account as a result
                                                    of fraudulent, criminal activity or any collusion activity
                                                    whatsoever, the residual credit balance and winnings from open bets
                                                    will be forfeited.
                                                </li>
                                                <li>
                                                    BetNare reserves the right to cancel the Services, and/or refuse
                                                    to distribute profits to anyone for any legitimate reason including,
                                                    but not limited to:
                                                </li>
                                                <ul>
                                                    <li>
                                                        any instance when BetNare has cause to believe that a person's
                                                        activities on the WEBSITE may be illegal.

                                                    </li>
                                                    <li>
                                                        any instance where BetNare may suffer any fiscal, regulatory, or
                                                        pecuniary disadvantage in virtue of anyone’s activities.
                                                    </li>
                                                    <li>
                                                        any occurrence that is deemed to be match fixing.
                                                    </li>
                                                    <li>
                                                        palpable errors, that is where a bet is confirmed, or a payment
                                                        is performed, by us in error in the following circumstances:
                                                    </li>
                                                    <ul>
                                                        <li>
                                                            Whenever the prices/spreads/terms offered are significantly
                                                            dissimilar from those available in the general market,
                                                        </li>
                                                        <li>
                                                            Whenever the prices/spreads/terms offered at the time the
                                                            bet is
                                                            placed are clearly wrong given the probability of the
                                                            forecast
                                                            occurring,
                                                        </li>
                                                        <li>
                                                            Whenever a bet has been erroneously accepted on a market
                                                            which
                                                            should have been suspended or removed,
                                                        </li>
                                                        <li>
                                                            Where a bet containing incompatible events is accidentally
                                                            accepted, because of human or technical error,
                                                        </li>
                                                        <li>
                                                            Whenever a settlement error is made while computing or
                                                            crediting
                                                            the amount of winnings,
                                                        </li>
                                                        <li>
                                                            Any other situation that may be referred to as an error.
                                                        </li>
                                                        <li>
                                                            any instance where one or more transactions on the WEBSITE
                                                            are
                                                            judged by BetNare to have been performed in violation of
                                                            this
                                                            Agreement.
                                                        </li>
                                                    </ul>
                                                    <li>
                                                        BetNare prohibits match fixing and player collusion and takes
                                                        measures to prohibit use of devices, such as robots, that
                                                        distort
                                                        normal game play. Further to this, BetNare will exercise its
                                                        right
                                                        to terminate an event as soon as it is aware of the
                                                        illegalities.

                                                        BetNare reserves the right to terminate events or games without
                                                        prior notice, whenever it deems necessary and / or due to errors
                                                        in
                                                        the software or games, which cause games to work incorrectly or
                                                        malfunction.
                                                    </li>
                                                </ul>

                                                <li>
                                                    All accounts without activity for a period of six calendar
                                                    months will be deemed to be inactive and the deposit forfeited to
                                                    the company.
                                                </li>
                                            </ol>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                DEPOSITS
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <ol>
                                                <li>
                                                    In order to fund a player account one can, do so by utilizing the
                                                    deposit methods availed on the company’s website. Further
                                                    information
                                                    about the deposit methods are included in the Deposit section on the
                                                    website (www.betnare.com).
                                                </li>
                                                <li>
                                                    BetNare reserves the right to impose certain conditions on the use
                                                    of
                                                    particular payment methods, only but not limited if enforced by
                                                    payment
                                                    providers’ requirements, or regulatory requirements in connection to
                                                    Social Responsibility Code of the license or if is connected to the
                                                    suspicious activity of the particular player. BetNare retains the
                                                    right
                                                    to change the payment methods available.
                                                </li>
                                                <li>
                                                    BetNare does not guarantee that all methods of payment are available
                                                    at all times but will do utmost to provide customers with continuous
                                                    service.
                                                </li>
                                                <li>
                                                    A deposit request via mobile money into a player account, funds the
                                                    account in real time, other methods might take longer to process.
                                                </li>
                                                <li>
                                                    BetNare reserves the right to request further information and
                                                    documentation regarding CLIENT'S age, identity and place of
                                                    residence
                                                    following any deposits or prior to any withdrawals, in particular
                                                    prior
                                                    to first withdrawal, in order to prove CLIENT'S identity before we
                                                    release funds. We also reserve the right to request such information
                                                    and
                                                    documentation about any person who affects a deposit on CLIENT'S
                                                    Account. Such information and documentation (as Driving License,
                                                    Government issued ID, and Passport, utility bill, Bank/Credit card
                                                    Statement) will enable us to check that the personal data given
                                                    during
                                                    registration corresponds to data on the document. In the event of
                                                    diverging data, we reserve the right to cancel the bets along with
                                                    the
                                                    payment of the account balance, unless the CLIENT can demonstrate
                                                    entitlement to the balance by some other means. BetNare reserves the
                                                    right to request an image of both sides of the debit/credit card
                                                    used to
                                                    deposit as supporting evidence in case a deposit comes from a non 3D
                                                    secure scheme (additional fraud prevention system processing) or if
                                                    a
                                                    customer is processing large or multiple transactions. In order to
                                                    reflect the best security practices, the CLIENT will always be asked
                                                    to
                                                    hide the CVV number and wipe out certain card numbers. In small
                                                    number
                                                    of cases, we might require additional proof of residence or
                                                    transaction
                                                    in PDF format.
                                                </li>
                                                <li>
                                                    Betting limits can be set by the player in the ‘Responsible Gaming’
                                                    page.
                                                </li>
                                                <li>
                                                    The player acknowledges that BetNare reserves the right to request
                                                    proof of payments to player’s accounts to confirm a depositing
                                                    source or
                                                    complete verification process.
                                                </li>
                                                <li>
                                                    All payments into the Account must be from a payment source in which
                                                    the Player is the named account holder.
                                                </li>
                                            </ol>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                WITHDRAWALS
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <ol>
                                                <li>
                                                    A request for withdrawal cannot be made while the User is involved
                                                    in
                                                    a gaming session.
                                                </li>
                                                <li>
                                                    BetNare’ finance department will handle all withdrawal requests.
                                                    BetNare reserves the right to verify the account holder's
                                                    eligibility
                                                    for any requests and, in case of doubt, refuse to process the
                                                    withdrawal, leading to the return of the funds back to the player's
                                                    account. Valid documents issued by government (Passport, Identity
                                                    Card)
                                                    must be submitted in order to process a withdrawal. However, BetNare
                                                    reserves the right to verify the User’s identity, age, address and
                                                    location at any time before processing any amount of requested
                                                    withdrawal.
                                                </li>
                                                <li>
                                                    Withdrawal methods information is included in the Withdrawal section
                                                    on the website www.BetNare.com.
                                                </li>
                                                <li>
                                                    Any expense related to withdrawal requests, if applicable and
                                                    explicitly announced on the website, shall be charged to the
                                                    receiver.
                                                </li>
                                                <li>
                                                    The account holder's personal data in their Gaming Account and Bank
                                                    Account (or for any other payment method) must correspond. BetNare
                                                    reserves the right to withhold withdrawal until to request further
                                                    documentation, as proof of identity, as well as additional
                                                    verification
                                                    of the payment method in question.
                                                </li>
                                                <li>
                                                    The maximum self-service withdrawal amount per day will be Kenya
                                                    Shillings Twenty Thousand Only (Kshs. 20,000.00).
                                                </li>
                                                <li>
                                                    Withdrawals from a User’s Account can only be addressed strictly to
                                                    the person registered on the Account and as per the conditions
                                                    specified
                                                    on the BetNare WEBSITE.
                                                </li>

                                                <li>
                                                    Withdrawals can only be paid-out to the same account and payment
                                                    method from which player's deposits have originated.
                                                </li>
                                                <li>
                                                    Once a withdrawal request is submitted it can take BetNare up to
                                                    forty eight (48) hours to process the request. However, BetNare will
                                                    be
                                                    doing its best to process withdrawal requests immediately.
                                                </li>
                                                <li>
                                                    In the instance a CLIENT attempts to withdraw funds that were
                                                    deposited but not used for staking, BetNare may levy a processing
                                                    fee of
                                                    20% upon such withdrawals. BetNare reserves the right to investigate
                                                    any
                                                    and all suspicious activities related to such withdrawals and report
                                                    the
                                                    same to the relevant authorities. Additionally, the CLIENT will lose
                                                    all
                                                    the deposited funds.

                                                </li>
                                                <li>
                                                    Payouts handled manually through an ordinary bank transfer are
                                                    processed within Seventy-Two (72) banking hours and are subject to
                                                    additional carrier fees. However, the CLIENT acknowledges that we
                                                    are at
                                                    the mercy of the banks and Payment service providers in this regard
                                                    and
                                                    cannot do anything to speed up this process.

                                                </li>
                                                <li>
                                                    The CLIENT agrees not to attempt any chargebacks, reversals or
                                                    otherwise cancel any deposit previously made in his/her Account.
                                                    Whenever any such event should occur the CLIENT commits to refund
                                                    BetNare for the unpaid deposits and for possible expenses resulting
                                                    from
                                                    the recollection of the misplaced money.
                                                </li>
                                                <li>
                                                    Kindly note that BetNare will hold the funds deposited in the
                                                    Account
                                                    as trustee for the CLIENT and not as his/her banker or debtor.
                                                    Accordingly, there will be no obligation on the part of BetNare
                                                    Kenya to
                                                    repay money to the Customer as his/her debtor. Additionally, no
                                                    interest
                                                    shall accrue from funds deposited into the CLIENTS’s account be it
                                                    in
                                                    the form of deposits, winnings or any other method.
                                                </li>
                                                <li>
                                                    BetNare at all times reserves the right to refuse and/ or limit
                                                    bets.
                                                </li>
                                            </ol>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                LIVE BETTING
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>

                                            <p>Live bets are accepted on main markets and additional markets.
                                            </p>
                                            <p>Live bets shall be deemed accepted once they have been registered on the
                                                server and online confirmation has been received. You may not alter the
                                                bet
                                                once it has been accepted.
                                            </p>
                                            <p>Live feeds broadcasted from the TV, Radio and Internet are subject to
                                                delays
                                                and as such a CLIENT may experience events ahead or behind of others.
                                            </p>
                                            <p>As a result of the delay experienced before placing live bets, Clients
                                                will
                                                be given the option of placing their bets at new odds or not placing the
                                                bet
                                                at all.
                                            </p>

                                            <p>BetNare reiterates that any live scores displayed on its sites during
                                                live
                                                events remain placed for guidance purposes only and that BetNare will
                                                not
                                                take any responsibility for any errors and inaccuracies on the same.
                                            </p>
                                            <p>BetNare reserves the right to void any bets placed after the outcome of
                                                an
                                                event is known. Should a bet be placed with incorrect odds due to
                                                delayed
                                                ‘Live’ coverage of an event and where a team has gained a significant
                                                advantage as stated above bets will be voided.
                                            </p>

                                            <p>Odds on all selections change regularly to reflect fluctuations in the
                                                market or changes in the events themselves. In some cases, the odds may
                                                change between the time you put your bet on the bet slip and the time
                                                you
                                                place the bet.
                                            </p>

                                            <p>If the current odds are different from the odds on the bet slip you will
                                                be
                                                required to confirm whether you wish to place the bet with the new odds.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                BONUSES AND PROMOTIONS
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                Bonuses being offered and their details of crediting Bonus Money will be
                                                available on the Bonus/Promotions section of the website. The amount of
                                                Bonus Money is determined by BetNare and set out on the website.
                                            </p>

                                            <p>The CLIENT binds himself not to abuse the ability of opening accounts
                                                in order to benefit from bonus credits and other promotional offers
                                                that may be offered. The company reserves the right, in case of
                                                abusive behavior on the CLIENT’S part as related to bonus credits
                                                and/or to promotional offers by
                                                BetNare, to rescind or block CLIENT accounts created to that end, as
                                                well as
                                                their transactions.
                                            </p>
                                            <p>BetNare reserves the right to revoke and/or cancel any bonus and/or
                                                promotional winnings which are deemed to have occurred due to abuse
                                                and/or
                                                misuse of any promotional system. In the event of any dispute, the
                                                general
                                                conditions set out in the complaints procedure on the company’s
                                                website will apply.
                                            </p>
                                            <p>
                                                The Bonus Money will be kept separately from the Real Money on the
                                                account.
                                                The Bonus Money will not be paid out directly until it has been
                                                transformed
                                                into real cash winnings.
                                            </p>
                                            <p>
                                                If the cash account contains both Bonus and real money, the total
                                                bet
                                                used
                                                for wagers will be subject to bonus bet conditions. Specific bonus
                                                bet
                                                conditions will be published on the website.
                                            </p>
                                            <p>
                                                Any indication of fraud, manipulation, cash-back arbitrage, or other
                                                forms
                                                of deceitful or fraudulent activity based on the provision of the
                                                bonus
                                                will
                                                render the account inactive along with any and all profits or losses
                                                generated.
                                            </p>
                                            <p>
                                                All bonuses and promotional offers are subject to the terms and
                                                conditions
                                                made available when communicating the bonus offer.
                                            </p>
                                            Rules on BetNare Bonuses
                                            <br/>
                                            <strong>General rules</strong>
                                            <br/>
                                            <ol>
                                                <li>
                                                    Apart from Jackpot Bonus, any other bonus awarded cannot be
                                                    withdrawn.
                                                    However, bonus winnings derived from the bets placed
                                                    successfully with
                                                    the
                                                    bonus can be withdrawn.
                                                </li>
                                                <li>
                                                    If BETNARE notices something suspicious about your activities
                                                    with
                                                    the
                                                    bonus, then we may take it away. This includes very similar
                                                    betting
                                                    patterns
                                                    between the referrer and the referred account.
                                                </li>
                                                <li>
                                                    All bonuses require a 3x play through limited odds of 7.50 or
                                                    higher
                                                    on
                                                    any Sport offered by BetNare.
                                                </li>
                                                <li>
                                                    All bonuses expire at midnight.
                                                    5. When any bonuses are mixed with cash, all rules on bonus bets
                                                    will
                                                    apply.
                                                </li>
                                                <li>
                                                    Each bonus offer will have its own "terms and conditions” and
                                                    Customers
                                                    should ensure that the terms and conditions associated with each
                                                    individual
                                                    bonus offer are read and understood prior to accepting the
                                                    bonus.
                                                </li>
                                                <li>
                                                    Promotions are subject to change. All management decisions are
                                                    final.
                                                </li>
                                                <li>
                                                    In the event of an error when attributing a bonus to a Customer
                                                    account,
                                                    the company reserves the right to correct such errors by
                                                    removing any
                                                    funds
                                                    that were put into a Customer's account erroneously and by
                                                    voiding any
                                                    bets
                                                    that were placed by these funds.
                                                </li>
                                            </ol>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                COMPLAINTS
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>

                                            <p>
                                                BetNare is committed to provide the best quality of support for our
                                                players.
                                            </p>
                                            <p>
                                                One of the ways in which we can continue to improve our service is by
                                                listening and responding to the views of our Clients and, in particular,
                                                by
                                                responding positively to complaints. However, we do admit that reaching
                                                a
                                                unanimous outcome in all cases is not always possible.
                                            </p>
                                            <p>
                                                If a Client wishes to make a compliant or feels that their case might
                                                need
                                                further escalation, they should contact our customer support agents by
                                                email
                                                on ccare@betnare.com. A customer care representative shall acknowledge
                                                the
                                                receipt of the complaint to the Client in a maximum period of 3 working
                                                days.

                                            </p>
                                            <p>
                                                Our agents are also available on live chat, official social media
                                                handles
                                                and via phone, as we strive to ensure that making a complaint is as
                                                accessible as possible. The 'Help' section on our website is there to
                                                assist
                                                the player in selecting the most appropriate communication channel to
                                                reach
                                                our customer support.
                                            </p>
                                            <p>
                                                Please be advised that in order for us to take action on a complaint in
                                                the
                                                shortest time frame possible, it must contain clear and concise
                                                information
                                                about the Client’s identity (name, surname, username, bet id, game id,
                                                mobile number), as well as all relevant details about the case (the name
                                                of
                                                the game, the time and date of the incident with a clear explanation).
                                            </p>
                                            <p>
                                                No complaints with regard to the acceptance, settlement or resettlement
                                                of a
                                                bet will be heard by us if they are not raised through our Customer
                                                Services
                                                within 30 days from the event occurrence which the bet related to
                                                occurred.
                                            </p>
                                            <p>
                                                Offensive or rude language, as well as malicious or damaging comments,
                                                will
                                                not be tolerated while contacting our staff or while discussing our
                                                products
                                                and services in any media, social network or forum. Any infringement of
                                                this
                                                policy will result in a suspension of the Account or in every additional
                                                action as may be required in order to ensure compliance.
                                            </p>

                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                MISCONDUCT
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <ol>
                                                <li>
                                                    Misconduct by CLIENTS is forbidden on the website. CLIENT’s behavior
                                                    is deemed as a violation of these Terms and Conditions, whenever,
                                                    but
                                                    not exclusively, if the CLIENT:
                                                </li>
                                                <ul>
                                                    <li>
                                                        intentionally provides inaccurate or incomplete information;
                                                    </li>
                                                    <li>
                                                        attempts to manipulate the result of games through concerted
                                                        practices, alterations of the program or in any other undue way;
                                                    </li>
                                                    <li>
                                                        deliberately cause malfunctions or defects of the website in
                                                        order
                                                        to undermine the natural flow of the game;
                                                    </li>
                                                    <li>
                                                        sets up more than one account per person; or any other
                                                        regulations
                                                        set out in these Terms and Conditions is violated; and
                                                    </li>
                                                    <li>
                                                        uses abusive or offensive language in email messages and/or
                                                        during
                                                        live chat, makes matrimonial offers, pornographic references or
                                                        sexual
                                                        comments, sends spam, threatening messages, uses verbal abuse or
                                                        slurs
                                                        BETNARE’s and its employees. Any violation of this policy will
                                                        result in
                                                        the end of the conversation and suspension of player’s account
                                                        for an
                                                        indefinite period of time.
                                                    </li>
                                                </ul>
                                                <li>
                                                    The CLIENT will not decompile or attempt to decompile the software
                                                    on
                                                    the company’s website or develop software that interferes with the
                                                    Client-Server-Communication software used on its website.
                                                </li>
                                                <li>
                                                    The use of any software program which facilitates artificial
                                                    intelligence is strictly prohibited. Prohibited software may include
                                                    software which BetNare believes allows player to cheat or gives one
                                                    player an unjust advantage while wagering on the website. The
                                                    Company
                                                    reserves the right to take action in order to detect and prevent the
                                                    use
                                                    of such software by Players. Should the company identify or suspect
                                                    for
                                                    good reason the use of prohibited programs, the company reserves the
                                                    right to freeze the relevant Player’s account for a period of at
                                                    least
                                                    six (6) months, to confiscate any funds in that account and/or to
                                                    suspend the Player from using the services of the company.
                                                </li>
                                                <li>
                                                    In the event of misconduct by a CLIENT, the company is entitled to
                                                    immediately terminate the Agreement with the CLIENT and exclude him
                                                    from
                                                    further use of the website. Furthermore, the company is entitled to
                                                    interrupt and terminate on-going games, block the CLIENT’s account
                                                    with
                                                    or without prior notice and to retain the User’s credit and winnings
                                                    achieved through misconduct until clarification of the situation is
                                                    reached.
                                                </li>
                                            </ol>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                ERRORS OR OMISSIONS
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                A number of circumstances may arise where a bet or wager is accepted, or
                                                a payment is made, by us in error. A non-exhaustive list of such
                                                circumstances is as follows:
                                            </p>
                                            <ul>
                                                <li>
                                                    where we mis-state any odds or terms of a bet or gaming wager to You
                                                    as a result of obvious error or omission in inputting the
                                                    information or setting up a market, or as a result of a computer
                                                    malfunction;
                                                </li>
                                                <li>
                                                    where we have made a 'palpable error'. A palpable error occurs
                                                    where:
                                                </li>
                                                <li>
                                                    in relation to bets placed prior to an event taking place, the
                                                    prices/terms offered are materially different from those available
                                                    in
                                                    the general market; or
                                                </li>
                                                <li>
                                                    in relation to any event, the price/terms offered at the time the
                                                    bet is placed are clearly incorrect given the probability of the
                                                    event
                                                    occurring;
                                                </li>
                                                <li>
                                                    where we have continued to accept bets on a market which should have
                                                    been suspended, including where the relevant event is in progress
                                                    (except where 'in-running' bets are accepted) or had already
                                                    finished
                                                    (sometimes referred to as 'late bets');
                                                </li>
                                                <li>
                                                    where an error has been made as a result of a Prohibited Practice;
                                                    vii. where we should not have accepted, or have the right to cancel
                                                    or
                                                    re-settle, a bet pursuant to the Betting Rules (for example due to
                                                    'Related Contingencies');
                                                </li>
                                                <li>
                                                    where an error is made by us as to the amount of winnings/returns
                                                    that are paid to You, including as a result of a manual or computer
                                                    input error; or
                                                </li>
                                                <li>
                                                    where an error has been made by us as to the amount of free bets
                                                    and/or bonuses that are credited to Your Account,
                                                    such circumstances being referred to as an "Error"
                                                </li>
                                            </ul>
                                            <p>
                                                BetNare reserves the right to:
                                            </p>
                                            <ul>
                                                <li>
                                                    correct any Error made on a bet placed and re-settle the same at the
                                                    correct price or terms which were available or should have been
                                                    available
                                                    through the Operator (absent the publishing error) at the time that
                                                    the bet
                                                    was placed and the bet will be deemed to have taken place on the
                                                    terms which
                                                    were usual for that bet; or
                                                </li>
                                                <li>
                                                    where it is not reasonably practicable to correct and re-settle
                                                    under
                                                    18.2.1 above, to declare the bet void and return Your stake into
                                                    Your
                                                    Account; or
                                                </li>
                                                <li>
                                                    in circumstances where the Error has resulted from a Prohibited
                                                    Practice, to take necessary steps to amend this.
                                                </li>
                                                <li>
                                                    Any monies which are credited to Your Account, or paid to You as a
                                                    result of an Error shall be deemed, pending resolution under clause
                                                    iii
                                                    above, to be held by You on trust for us and shall be immediately
                                                    repaid to
                                                    us when a demand for payment is made by us to You. Where such
                                                    circumstances
                                                    exist, if You have monies in Your Account we may reclaim these
                                                    monies from
                                                    Your Account. We agree that we shall use all reasonable endeavours
                                                    to detect
                                                    any Errors and inform You of them as soon as reasonably practicable.
                                                </li>
                                                <li>
                                                    Neither we (including our employees or agents) nor our partners or
                                                    suppliers shall be liable for any loss, including loss of winnings,
                                                    that
                                                    results from any Error by us or an error by You.
                                                </li>
                                                <li>
                                                    You shall inform us as soon as reasonably practicable should You
                                                    become
                                                    aware of any Error.
                                                </li>
                                                <li>
                                                    Where You have used monies which have been credited to Your Account
                                                    or
                                                    awarded to You as a result of an Error to place subsequent bets or
                                                    play
                                                    games, we may cancel such bets and/or withhold any winnings which
                                                    You may
                                                    have won with such monies, and if we have paid out on any such bets
                                                    or
                                                    gaming activities, such amounts shall be deemed to be held by You on
                                                    trust
                                                    for us and You shall immediately repay to us any such amounts when a
                                                    demand
                                                    for repayment is made by us to You.
                                                </li>
                                            </ul>

                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                INTELLECTUAL PROPERTY
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <ul>
                                                <li>
                                                    All content, trademarks, services marks, trade names and logos are
                                                    the property of BetNare and are protected by copyright laws,
                                                    international treaties and provisions.
                                                </li>
                                                <li>
                                                    The CLIENT agrees not to delete any copyright notices or other
                                                    indications of protected intellectual property rights from materials
                                                    that the CLIENT receives from BetNare or BetNare’ WEBSITES. The
                                                    CLIENT
                                                    will not obtain any intellectual property rights in, or any right or
                                                    license to use such materials or the WEBSITES, other than as set out
                                                    in
                                                    this Agreement.
                                                </li>
                                                <li>
                                                    The CLIENT agrees not to resell marketing materials provided to them
                                                    by BetNare or permit secured access of the Website to others, and
                                                    not to
                                                    copy any materials appearing on the Website for resale or for any
                                                    other
                                                    purpose to others without the prior written consent of BetNare. The
                                                    same
                                                    rule applies to all users of the Website not limited to the Account
                                                    holders.
                                                </li>
                                                <li>
                                                    Images displayed on the Website are either the property of BetNare
                                                    or
                                                    to be used with permission. The CLIENT agrees not to upload, post,
                                                    reproduce or distribute any information, software or other material
                                                    protected by copyright or any other intellectual property rights (as
                                                    well as rights of publicity and privacy) without first obtaining the
                                                    permission of the owner of such rights and the prior written consent
                                                    of
                                                    BetNare.
                                                </li>
                                            </ul>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                THIRD PARTY LINKING
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                At the company’s discretion, the Websites or other Services may contain
                                                links to third party websites. These links are provided solely as a
                                                convenience to you and not as an endorsement by BetNare of the contents
                                                on such third party websites. BetNare will not be responsible for the
                                                content of linked third party sites and does not make any
                                                representations regarding the content or accuracy of materials on such
                                                third party sites. LINKS TO ANY SERVICES PROVIDED BY A THIRD PARTY ARE
                                                NOT INTENDED FOR TRADING OR INVESTING PURPOSES AND THE COMPANY WILL
                                                ACCEPT NO LIABILITY FOR ANY DIRECT, CONSEQUENTIAL, INCIDENTAL, INDIRECT,
                                                PUNITIVE OR ANY OTHER LOSSES OR DAMAGES ARISING OUT OF YOUR ACCESS TO
                                                AND USE OF THE INFORMATION PROVIDED. IF YOU DECIDE TO ACCESS LINKED
                                                THIRD PARTY WEBSITES, YOU DO SO AT YOUR OWN RISK.
                                            </p>
                                            <p>
                                                BetNare does not permit linking from its Websites or its Services to
                                                third party websites or services or the display of third party content
                                                on top of, or in addition or as an alternative to, our Websites or
                                                Services without our express written consent. In particular, BetNare
                                                expressly prohibits third parties from framing, similar techniques or
                                                other acts of impairment of a user's experience when they visit our
                                                Websites or engage with our Services. To this end, and by your
                                                acceptance of these Terms of Use whether as registered member or
                                                otherwise, you hereby acknowledge that where you engage in any of the
                                                foregoing prohibited actions:
                                            </p>
                                            <ul>
                                                <li>
                                                    That damages may not be an adequate remedy for any infringement and
                                                    that the company will be entitled to the remedies of injunction,
                                                    specific performance, an order to deliver up materials which
                                                    infringe
                                                    our intellectual property rights and any other statutory or
                                                    equitable
                                                    relief and that no proof of special damages is necessary for
                                                    reliance on
                                                    such remedies; and
                                                </li>
                                                <li>
                                                    That you shall indemnify us for any liabilities, losses or damages
                                                    (including reasonable legal fees), however caused, that may arise as
                                                    a
                                                    result of or in connection with your non-compliance with this
                                                    Clause.
                                                </li>
                                            </ul>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                ASSIGNMENT
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                You may not assign these Terms and Conditions to any third party. The
                                                Company may assign, transfer or novate any or all of its rights and
                                                obligations under these Terms and Conditions to any third party at any
                                                time without notice to you.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                INDEMNIFICATION
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                The CLIENT agrees to defend and indemnify BetNare and its officers,
                                                directors, and employees, and to hold them harmless from and against any
                                                and all claims, liabilities, damages, losses, and expenses, including
                                                without limitation reasonable attorney's fees and costs, arising out of
                                                or in any way connected with:
                                            </p>
                                            <ul>
                                                <li>
                                                    CLIENT's access to or use of the Website or Services;
                                                </li>
                                                <li>
                                                    CLIENT’s violation of any of the terms of this Agreement; or
                                                </li>
                                                <li>
                                                    CLIENT’s breach of any applicable laws or regulations.
                                                </li>
                                            </ul>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                WAIVER
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                In no event will any delay, failure or omission (in whole or in part) in
                                                enforcing, exercising or pursuing any right, power, privilege, claim or
                                                remedy conferred by or arising under these Terms and Conditions or by
                                                law, be deemed to be or construed as a waiver of that or any other
                                                right, power, privilege, claim or remedy in respect of the circumstances
                                                in question, or operate so as to bar the enforcement of that, or any
                                                other right, power, privilege, claim or remedy, in any other instance at
                                                any time or times subsequently.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                SEVERABILITY
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                In the event that any provision of these Terms and Conditions is deemed
                                                by any competent authority to be unenforceable or invalid, the relevant
                                                provision shall be modified to allow it to be enforced in line with the
                                                intention of the original text to the fullest extent permitted by
                                                applicable law. The validity and enforceability of the remaining
                                                provisions of these Terms and Conditions shall not be affected.
                                            </p>
                                            <p>
                                                Any provision of these Terms and Conditions that is invalid, illegal or
                                                unenforceable in any jurisdiction will be ineffective in that particular
                                                jurisdiction, without affecting the validity, legality or enforceability
                                                of that provision in other jurisdictions.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                DISPUTE RESOLUTION
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                In the event of a dispute arising between us and you, we each agree to
                                                follow the procedure set out in our Dispute Resolution policy as amended
                                                from time to time.
                                            </p>
                                            <p>
                                                If BetNare is unable to settle the dispute, BetNare will refer the
                                                dispute to an arbiter, whose decision will be final (save in respect of
                                                any manifest error) subject to full representation given to all parties
                                                involved. No dispute regarding any bet/wager will result in litigation,
                                                court action or objection to a bookmaker’s licence or permit (including
                                                any remote operator’s licence or personal licence) unless BetNare fails
                                                to implement the decision given by arbitration.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                AMENDMENTS
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                We reserve the right to make immaterial changes to these Terms and
                                                Conditions at any time and your continued use of the site will be deemed
                                                to be your acceptance of any material changes.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                COMMUNICATIONS AND NOTICES
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                Communications and notices to be given by you to us under these Terms
                                                and Conditions should be provided to us as set out in the Contact us
                                                section.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                APPLICABLE LAW AND PLACE OF JURISDICTION
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                This agreement and use of the company’s website and services shall be
                                                governed by the applicable provisions of the Betting, Lotteries and
                                                Gaming Act, CAP. 131 and any Regulations and Rules made in terms
                                                thereof, as amended from time to time. It shall be the responsibility of
                                                the Customer to ensure that he/she is aware of these provisions.
                                            </p>
                                            <p> Any and all legal relationship between the CLIENT and the Company, for
                                                every circumstance not regulated by the Terms and Conditions of Use,
                                                will be subject to laws of the Republic of Kenya.

                                            </p>
                                            <p>
                                                If the CLIENT places of a bet from a location falling outside Kenya,
                                                such bet shall be subject to all appropriate exchange control
                                                regulations and the laws of the foreign jurisdiction from which such
                                                communication originates and it shall be the responsibility of the
                                                CLIENT to ensure full compliance with same. BetNare makes no warranties
                                                and shall not be liable to the CLIENT if it is not able to remit any
                                                monies held by it to any account held by the CLIENT in a foreign
                                                jurisdiction.
                                            </p>

                                            <p>
                                                All winnings on bets placed are subject to 20% tax payable to the
                                                Republic of Kenya.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                TERM AND TERMINATION
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                The term of the Agreement shall be for an indefinite period.
                                            </p>
                                            <p>
                                                BetNare shall have the right prior to accepting any bet, temporarily to
                                                suspend or permanently to terminate, the provision of betting services
                                                to a
                                                CLIENT without providing any reason.
                                            </p>
                                            <p>
                                                Should the CLIENT wish to terminate this Agreement at any time, he/she
                                                may
                                                do so by sending an e-mail notification to the company.
                                            </p>
                                            <p>

                                                As of termination, the CLIENT shall not be able to carry out new
                                                transactions.
                                            </p>

                                            <p>
                                                The CLIENT may only terminate the agreement by providing written notice
                                                to
                                                the customer support email at ccare@betnare.com.
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

export default TermsAndConditions