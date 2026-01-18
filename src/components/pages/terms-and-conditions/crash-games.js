import {
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const CrashGames = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    CRASH GAMES
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <div>
                    <h4>General Terms and Conditions</h4>
                    <h5>General</h5>
                    <p>
                        These Terms and Conditions refers to Betfusion Limited, a company incorporated in Kenya.
                        The term "CLIENT" references any individual person that expressly or impliedly agrees to all 
                        terms and conditions of Betfusion by opening an account and placing bets on games on the company’s website.
                    </p>
                    <h5>Introduction</h5>
                    <p>A Crash Game is a game that involves a multiplier increasing steadily until it simply stops or crashes. All of our Crash Games 
                        can be found in the Crash Lobby on our website.
                    </p>
                    <p>
                        The action of crashing can be symbolised by different elements that are defined in each Crash Game. A plane flying away, a car crashing, 
                        a meteorite exploding, a growing graph line, and other actions as per the game specifications.
                    </p>
                    <p>
                        Betfusion has multiple Crash Games under its product portfolio; Aviator, Comet Crash, Spaceman, Big Bass Crash, Jet X, Aviatrix and many more.
                    </p>
                    <p>
                        Crash Games are multiplayer games where more than one player can play the same game at the same time.
                    </p>
                    <p>
                        All players playing Crash Games at the same time, will see the same results, wherever they are, provided that they are able to access 
                        our channels/platforms.
                    </p>
                    <p>
                        In the event that a Customer is not registered or logged into their account, the Crash Games will be available only in the demo version.
                    </p>
                    <h4>How to Play</h4>
                    <p>Go to {" "}
                        <a href='https://betfusion.ke' target='blank' rel='noopener noreferrer'>www.betfusion.com</a>
                        {" "}and select your preferred Crash Game from the Crash Lobby.
                    </p>
                    <p>
                        There are two ways of playing Crash Games, either manually or using auto mode.
                    </p>
                    <ul>
                        <li>
                            To begin playing, enter your selected stake amount and click <strong>BET</strong>.
                        </li>
                        <li>
                            The further the crash multiplier goes, the higher the multiplier.
                        </li>
                        <li>
                            Click <strong>CASH OUT</strong> before it reaches the crash point to win the game.
                        </li>
                        <li>
                            If the game reaches the crash point before you cashout you lose the game.
                        </li>
                        <li>
                            More instructions on how to play are held within the Crash Game.
                        </li>
                        <li>
                            Each Crash Game has unique features that can be discovered when playing the game as well as 
                            the <strong>how to play</strong> instructions within each Crash Game.
                        </li>
                    </ul>
                    <h4>Betting Rules</h4>
                    <ul>
                        <li>
                            The minimum stake per bet on Crash Games varies from KSH 1 – KSH 10.00.
                        </li>
                        <li>
                            The maximum stake on Crash Games is KSH 10,000.
                        </li>
                        <li>
                            The maximum amount of winning(s) on Crash Games is KSH 200,000 per bet.
                        </li>
                        <li>
                            The maximum amount of winnings that may be paid out to a player per calendar year on Aviator and other Crash games  is KSH 2,500,000,
                        </li>
                        <li>
                            The maximum amount of winnings that may be paid out to a player per calendar day on all other Crash Games is KSH 1,000,000,
                        </li>
                        <li>
                            A calendar day refers to a 24-hour period starting at 00h00 - 23h59 local time.
                        </li>
                        <li>
                            A calendar month refers to a period of time between the same dates in successive calendar months.
                        </li>
                        <li>
                            Where our systems generate winnings in excess of the allowed maximum limit, any amount above this limit will be regarded as void and shall 
                            not be due or payable.
                        </li>
                    </ul>
                    <h4>General Clauses</h4>
                    <ol>
                        <li>
                            In Consultation with BCLB, Betfusion reserves the right to void any winnings, and taking any and all remedial action in instances including:
                            <ul>
                                <li>System or software malfunction or error; or</li>
                                <li>Suspicion that there are Prohibited Activites being undertaken.</li>
                            </ul>
                        </li>
                        <li>
                            Betfusion does not guarantee the availability of these products on all devices and channels or its availability at all times.
                        </li>
                        <li>
                            These terms may be amended from time to time by Betfusion and BCLB.
                        </li>
                        <li>
                            These Products are subject to the General Terms and Conditions available here . Where there is an inconsistency with these terms and the General Terms and 
                            Conditions, the latter shall prevail.
                        </li>
                    </ol>
                    <h4>Account Closure by Betfusion</h4>
                    <p>
                        Upon review of your account activity and confirmation of a breach of these Terms and Conditions, such as engaging in Prohibited Acts, we may 
                        suspend your account or permanently close it if
                    </p>
                    <ul>
                        <li>
                            in our reasonable opinion, Your continued use of our Services may lead to non-compliance with our obligations under the law; and/or
                        </li>
                        <li>
                            You have placed bets and/or played online games with any other online provider of gambling services and are suspected (as a result of such play) of 
                            behaviour equivalent to any Prohibited Acts or irresponsible gaming in relation to those other gambling services.
                        </li>
                        <li>
                            You fail to adhere to legal requirements under Applicable Laws including but not limited to failing the due diligence processes 
                            conducted by us pursuant to Applicable Laws.
                        </li>
                        <p>
                            We may withhold any outstanding balance or outstanding bet settlements in respect of Your account in accordance with these terms and 
                            conditions such as under Prohibited Acts, 
                        </p>
                        <p>
                            Following account closure, any stake, winnings, promotional bonuses, benefits, or prizes will be forfeited by You in accordance with 
                            these Terms and Conditions.
                        </p>
                        <p>
                            Before a customer's account is closed, Betfusion will:
                        </p>
                        <ol>
                            <li>
                                Investigate and confirm whether a breach of these Terms and Conditions including but not limited to a Prohibited Act has occurred;
                            </li>
                            <li>
                                Once we determine that a breach of these Terms and Conditions including but not limited to a Prohibited Act has occurred, we will 
                                communicate it to You and any gains or winnings received directly or indirectly as a result of the breach and/or the Prohibited Act, 
                                shall be forfeited;
                            </li>
                            <li>
                                We will thereafter refund Your stake less any statutory deductions (such as tax) where applicable.
                            </li>
                            <li>
                                In addition to any other remedy available to Us, if We have reason to believe that you are in breach of these Terms and Conditions, 
                                We shall be entitled to recover from Your Account any positive balance up to the amount we would reasonably claim against You.
                            </li>
                        </ol>
                    </ul>
                    <h4>Our Liability </h4>
                    <ol>
                        <li>
                            We do not guarantee that Our site will be secure or free from bugs or viruses.
                        </li>
                        <li>
                            You are responsible for configuring Your information technology, computer programmes and platform to access our site. You should use 
                            Your own virus protection software before and during your access to our Services.
                        </li>
                        <li>
                            The Website and the Service (including all material and information displayed on or via the Website and the Service) are provided 
                            without any guarantees, conditions, or warranties as to their accuracy. Save where otherwise set out in these Terms and Conditions, 
                            and to the extent permitted by Applicable Law, We, the Software Provider, and any of our or their affiliates and related parties, 
                            hereby expressly exclude all conditions, warranties and other terms which might otherwise be implied by statute, common law, or the 
                            law of equity; and We exclude all liability for:-
                            <ul>
                                <li>Any error made due to the input of incorrect information by You;</li>
                                <li>Any fraud, deception, or misrepresentations by You;</li>
                                <li>Our decision not to accept a deposit from You;</li>
                                <li>Any delay in receiving or accepting a deposit by Us or withholding a withdrawal by us for the purpose of conducting identity 
                                    verification procedures;
                                </li>
                                <li>Use of Your Account for purposes that may be considered illegal under Applicable Laws;</li>
                                <li>Any transactions on Your Account which are conducted after the correct entry of Your username and password 
                                    (or other log in credentials), including any actions or transactions by an individual that uses Your username and password 
                                    (or other log in credentials). This includes authorized or unauthorized access of Your Account;
                                </li>
                                <li>Any unauthorized interception or use of data relating to You or Your Account;</li>
                                <li>Any inability to use or access Our Service(s) for any reason;</li>
                                <li>Any cause over which We do not have direct control, including problems attributable to computer hardware or software 
                                    (including computer viruses and including the Software), data transmission systems, telephone or other communications, or 
                                    internet service providers;
                                </li>
                                <li>
                                    The loss of any transactions caused by the loss or malfunction of any communications device used by Yourself or any entity 
                                    relaying information between You, us, or any other payment solution company;
                                </li>
                                <li>
                                    The accuracy, completeness or currency of any information services provided (including, without limitation, prices, runners, 
                                    times, results, or general statistics) or any live scores, statistics and intermediate results shown on Our Services;
                                </li>
                                <li>
                                    Any undelivered e-mail communications;
                                </li>
                                <li>
                                    The quality or availability (or lack thereof) of Our Services;
                                </li>
                                <li>
                                    Any results of any acts of government or authority or any force majeure event;
                                </li>
                                <li>
                                    Any losses that were not foreseeable to both parties when the contract between You and Betfusion was formed;
                                </li>
                                <li>
                                    Any losses arising from Your breach of these Terms and Conditions;
                                </li>
                                <li>
                                    Any losses which are not caused by a breach of these Terms and Conditions on our part;
                                </li>
                                <li>
                                    Business losses;
                                </li>
                                <li>
                                    The defamatory, offensive, or illegal conduct of any other customer;
                                </li>
                                <li>
                                    Any loss whatsoever arising from the use, abuse, or misuse of Your Player account or any of Our products and Services and 
                                    the corresponding Website;
                                </li>
                                <li>
                                    Any loss incurred in transmitting information to the Website by the internet or by e-mail;
                                </li>
                                <li>
                                    Any failure on our part to interact with you where we may have concerns about your activities.
                                </li>
                            </ul>
                        </li>
                    </ol>
                    <h4>Your Liability </h4>
                    <ol>
                        <li>You agree to fully indemnify, defend and hold us (and our affiliates , employees, agents and/or partners) free from any claims, 
                            liabilities, costs, damages and expenses (including legal fees) that may arise as a result of:
                            <ul>
                                <li>Your breach of these Terms; and</li>
                                <li>
                                    Unauthorized access and use of Our Services by You or by anyone else using Your username and password and any other log in 
                                    credentials. You must not misuse Our site by knowingly introducing viruses, trojans, worms, logic bombs or other material 
                                    that is malicious or technologically harmful. You must not attempt to gain unauthorized access to our website, the server on 
                                    which our website is stored, or any server, computer or database connected to our website. You must not attack our website via 
                                    a denial-of-service attack or a distributed denial-of service attack. By breaching this provision, you would commit a criminal 
                                    offence under the Computer Misuse and Cyber crimes Act (No. 5 of 2018). We will report any such breach to the relevant law 
                                    enforcement authorities, and we will co-operate with those authorities by disclosing your identity to them. In the event of 
                                    such a breach, Your right to use our website will cease immediately.
                                </li>
                            </ul>
                        </li>
                    </ol>
                    <h4>Palpable errors</h4>
                    <ol>
                        <li>
                            While every effort is made to ensure there are no errors or omissions in respect of our products and services, the nature of 
                            human error or system problems means such circumstances may arise. A non-exhaustive list of “obvious errors” is outlined below:
                            <ul>
                                <li>
                                    Odds or terms of either: a bet, market, selection or game wager have been misquoted as a result of human error 
                                    (for example, information being inputted incorrectly, or markets being set up incorrectly) or due to computer malfunction;
                                </li>
                                <li>
                                    A bet is accepted at a price or market condition which is significantly different from those available in the market at 
                                    the time the bet was placed;
                                </li>
                                <li>
                                    In the context of normal betting business, and the probability of the event occurring, a bet is accepted at a price which 
                                    is obviously incorrect;
                                </li>
                                <li>
                                    Bets have continued to be accepted on a market, selection or game which should have been suspended, or the market selection 
                                    or game has already closed, or has been postponed, which are sometimes referred to as “late bets”;
                                </li>
                                <li>
                                    The amount of winnings, returns or promotional benefits or bonuses paid to you are miscalculated as a result of human error 
                                    or computer malfunction;
                                </li>
                                <li>
                                    Where winnings are so obviously incorrect or materially different to those available in the market that this is a clear error 
                                    or omission e.g., the price is recorded as 100-1 or the margins for handicap betting have been reversed;
                                </li>
                                <li>
                                    An error has resulted from Prohibited Acts;
                                </li>
                            </ul>
                        </li>
                        <li>
                            In accordance with product rules, where a bet, market, selection or game wager should not have been accepted, we reserve the right 
                            (and at our sole discretion) whether, before, during or after bet placement and its corresponding resulting to:
                            <ul>
                                <li>
                                    Cancel the bet, market, selection or game wager and either:
                                </li>
                                <li>
                                    Correct the error on the bet, markets, selection or game wager placed and resettle the bet at the correct price or terms 
                                    which were (or should have been) available to Us when the bet, market, selection or game wager was placed; or;
                                </li>
                                <li>
                                    Void the entire market if any odds within that market were clearly incorrect;
                                </li>
                                <li>
                                    Declare the bet, market, selection or game wager void and return the stake to Your account where correction is not reasonably 
                                    practicable.; and
                                </li>
                                <li>
                                    Take any further reasonable steps and actions deemed necessary by Betfusion to remedy the error, loss, or damages that Betfusion 
                                    stands to suffer as a result of an error leading to an incorrectly accepted bet, market, selection or game wager.
                                </li>
                            </ul>
                        </li>
                        <li>
                            If funds are incorrectly credited to your account as a result of an error or omission (or otherwise any sum is incorrectly credited 
                            to your account):
                            <ul>
                                <li>
                                    You are obligated to notify us as soon as reasonably possible and in any event in no more than four (4) days;
                                </li>
                                <li>
                                    We reserve the right to deduct or reverse any incorrectly applied funds from your account. Where such funds have been withdrawn 
                                    by You, We may demand that you make a full refund to Us and may take other recovery measures such as automatically debiting 
                                    Your account whenever it has a positive balance.
                                </li>
                            </ul>
                        </li>
                        <li>
                            If you use incorrectly credited funds to place bets, we reserve the right to void all such related bets and reverse any winnings.
                        </li>
                        <li>
                            If incorrect stakes are deducted from your account:
                            <ul>
                                <li>
                                    You are obliged to notify us as soon as reasonably possible and in any event in no more than four (4) days;
                                </li>
                                <li>
                                    We reserve the right to void all such bets, markets, selections or game wagers and reverse any winnings;
                                </li>
                                <li>
                                    If bets are placed using winnings related to bet(s) on which incorrect stakes were deducted, we reserve the right to 
                                    void such bets, markets, selections or game wagers placed and reverse any winnings.
                                </li>
                            </ul>
                        </li>
                        <li>
                            In respect of any reversals, if no such funds are available in your account to make good any funds deficit resulting from the 
                            reversal (for example, where the funds have been withdrawn by you), we reserve the right to recover such funds from you 
                            (with interest at market rates) on demand. If necessary, we are permitted to off-set any subsequent amounts you deposit or win with 
                            us to make good this liability.
                        </li>
                        <li>
                            Errors relating to Prohibited Acts will be handled in accordance with clause 11 of these terms.
                        </li>
                        <li>
                            We shall not be liable for any loss of winnings (or other loss) following errors or omissions by us or you.
                        </li>
                    </ol>
                    <h4>Indemnity</h4>
                    <ol>
                        <li>
                            You agree fully to indemnify, defend and hold us, and our officers, directors, employees, agents, contractors and suppliers, 
                            harmless immediately on demand, from and against all claims, liabilities, damages, losses (including direct, indirect, or 
                            consequential losses), loss of profit, loss of reputation and all interest, penalties, costs and expenses including legal fees, 
                            arising out of any breach of the Terms by You or any other liabilities arising out of Your access and use of the Service 
                            (or by anyone else using Your access information and/or accessing Your account).
                        </li>
                        <li>
                            The Customer shall observe all Applicable Laws. Under no circumstances shall Betfusion be held liable or responsible for Your 
                            failure to adhere to all Applicable Laws. You agree that You will bear the results of any failure on Your part to adhere to the 
                            Applicable Laws.
                        </li>
                        <li>
                            Any breach of the Terms will be regarded as a material breach and entitles us to terminate our Agreement with You immediately. 
                            We may use monies in Your account to settle any liabilities We may incur as a result of any such breach.
                        </li>
                    </ol>
                    <h4>Complaints</h4>
                    <ol>
                        <li>
                            If You have a complaint or experience any difficulties, please contact our customer service center on {" "}
                            <a href='support@betfusion.com'>support@betfusion.com</a>
                            {" "}or by way of telephone number +254718111117 or +254718111119.
                        </li>
                        <li>
                            All written complaints will be processed and responded within fourteen (14) days of receipt of the complaint. We maintain records 
                            of complaints received and actions taken in response to the complaints.
                        </li>
                        <li>
                            If after our internal process has been fully exhausted, You remain unsatisfied as to the outcome of Your complaint, 
                            You have a right to escalate this complaint to BCLB.
                        </li>
                        <li>
                            Any claim or dispute with regard to: (i) a transaction; and/or (ii) a game you have played using the services, must be made within 
                            six (6) years from the date of that transaction or gameplay.
                        </li>
                        <li>
                            Any claims lodged pursuant to clause 14.4 above, shall be settled as provided for under clause 22 (Dispute Resolution)
                        </li>
                        <li>
                            By accepting these Terms and/or placing bets or stakes and/or making use (whether authorized or not) of the facilities offered by the Us, 
                            you irrevocably agree that, subject to clause 22, the courts of Kenya shall have jurisdiction to settle any dispute which may arise out 
                            of or in connection with these Terms. Notwithstanding the foregoing, We shall be entitled to bring a claim against a customer in the 
                            court of the customer's country of domicile.
                        </li>
                        <li>
                            For Your ease of reference, please use the following contacts to reach Us for the specific queries mentioned below:
                            <ul>
                                <li>
                                    Account closure, self-exclusion and re-opening:{" "}
                                    <a href='support@betfusion.com'>
                                        support@betfusion.com
                                    </a>
                                </li>
                                <li>
                                    For gambling addiction help and support, please contact Customer Care at (+254718111117) and (+254718111119), or visit (
                                    <a href='https://responsiblegambling.or.ke/'>Responsible Gambling Website</a>
                                    ).
                                </li>
                                <li>
                                    General support queries: {" "}
                                    <a href='mailto:support@betfusion.com'>support@betfusion.com</a>
                                </li>
                            </ul>
                        </li>
                    </ol>
                </div>

            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default CrashGames
