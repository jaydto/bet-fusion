import {
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const General = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    DEFINITIONS
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>

                    <p style={{opacity:'0.8'}}>
                        <strong>The following words and terms should be interpreted as follows, unless, the context clearly
                            implies otherwise</strong>
                    </p>


                <ol>
                    <li> "Registration Form" means the form to be filled in by the Player to open a User Account.
                    </li>
                    <li> "Game" refers any gaming activity presented byjazabets on its Internet Sites and Mobile
                        Applications for the benefit of the Users and as approved by the Regulatory Authority.
                    </li>
                    <li>“Mobile Applications” refers to any service or application running on a mobile device and shall
                        include but not be limited to SMS, USSD, mobile apps and mobile sites.
                    </li>
                    <li> "Internet Site", "Website" or "Site" shall mean the Internet Websites www.Jazabets.com and all
                        other sites connected to it and accessible through links or other access paths.
                    </li>
                    <li>"Login and Password" means the login and password details that are automatically generated
                        and/or chosen by a player upon registering withjazabets.
                    </li>
                    <li> "Regulatory Authority" is the Betting Control and Licensing Board which is the main regulator
                        of betting, lotteries and gaming activities in Kenya.
                    </li>
                    <li> "Service" shall include all betting services and game offer activities related to it and listed
                        on www.Jazabets.com including but not limited to online jackpot, live play, pre-match,
                        statistics, and sportsbook services.
                    </li>
                    <li>"Software" means the software licensed by us including all programs and databases and any other
                        derived content whether accessible or otherwise used by the CLIENT through the Internet Website
                        allowing the CLIENT to participate in the online sportsbook and casino.
                    </li>
                    <li>"Us, We" or "Jazabets " means Beyond Intoch Software Limited.</li>
                    <li>"User Account", "Player Account", "Gaming Account" or "Account" mean a personal account opened
                        by an individual and maintained by the company as to allow this person to participate in the
                        online sportsbook and casino.
                    </li>
                    <li>"You", "CLIENT", "Player", "User" or "Account Holder" shall mean the user of the Service and of
                        the software accessible through the Internet Site and having a contractual relationship with the
                        company.
                    </li>

                    <li> "Money Player" mean individuals over 18 years of age, or the minimum age as set in law for
                        participation in the corresponding country, who participate in games for money (stake real money
                        "Games for money"). Players can participate in games as "Test Player" without wagering money or
                        as "Money Player" wagering real money.
                    </li>

                    <li>jazabets will not be held liable and will be held harmless by the
                        CLIENT for any damages, losses, costs, loss of profits or any other
                        disadvantage a CLIENT may incur in connection with any disconnection
                        from or the non-availability of any of the products offered by
                       jazabets
                        for whatever reason.
                    </li>

                    <li> Failure of a party to enforce any right or provision of this
                        Agreement will not be deemed a waiver of such right or provision.
                    </li>

                    <li> “Search” search tool for quickly finding a team, league, or player. See search icon on our web
                        page.
                    </li>

                    <li> “Bet slip” dedicated page that hold all your selected bets.
                    </li>


    

                    <li> “Header” thejazabets header that provides quick access to your bet slip, "My bets", account
                        options and the Cashier
                    </li>
                    
                    <li>
                        “In-play” a sport event that has already started
                    </li>
                 
                    <li>
                        “Market” the betting type for an event. Each market has multiple results/options to be select
                        from (e.g. the 3-way market for a football event means 3 options are available choose from, e.g.
                        1 X 2)
                    </li>
                    <li>
                        “Multi” a bet on a number of combinable markets. Two markets of different events need to be
                        added to the bet slip to be combined
                    </li>
                    <li>
                        “My bets” the page that contains your betting history
                    </li>
                    <li>
                        “Navigation bar” this is the main navigation bar located below thejazabets header. It enables
                        quick access to sports and specific filters. It also offers a quick return to lobby page of the
                        mobile site
                    </li>
                    <li>
                        “Odds” is the relative probability that your selected pick will succeed
                    </li>
                    <li>
                        “Pick” selected market of an event which is added to the bet slip
                    </li>
                    
                    <li>
                        “Result/Options” result is the available options for a market that you may bet on
                    </li>
                    <li>
                        “Stake” the amount that you wish to place on a specific market/odd for a selected event or
                        combination of events.
                    </li>
                    <li>
                        “Single” place one bet on a single sport event
                    </li>
                    <li>
                        “Sports home page” every sport has its own dedicated home page. The sports homepage lists all
                        available filters, top leagues, and highlights.
                    </li>
                   
                    
                    <li>
                        “Today” events that will start within the current day.
                    </li>
                </ol>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default General
