import React from 'react';
import './test.css'
import "../assets/css/jackpot.css"
import "../assets/css/animationJackpot.css"
import {ToastContainer} from "react-toastify";


const Header = React.lazy(() => import('./header/header'));
const FPL = React.memo(
    () => {

        return (
            <div className={'flex-item jackpot-container'}>
                <div className="item4">
                    <Header jackpot={true}/>
                    <ToastContainer/>
                </div>
                <div className={`flex-container jackpot flex-column  top-spacing-page-no-download-jackpot`}>
                    <div className="item2 size-all-markets jp-header-banner">
                        <div className={"fpl-choice-matches"}>

                        </div>
                        <div className={"fpl-banner-image"}>
                            <div
                                className="d-flex h-100 w-100 justify-content-around fpl-text-top px-5 align-items-center jackpot-mobile-appearance">

                            </div>

                        </div>
                        <div className="gz home jackpot-page-structure" style={{width: "100%", overflowX: "clip"}}>
                            <div className="homepage mobile-full-height ">
                                <div className="article-container">
                                    <div className="article-meta">
                                        <h4 style={{
                                            fontWeight: "300 !important",
                                            fontSize: "30px",
                                            paddingBottom: "10px",
                                            paddingTop: "15px"
                                        }}>FANTASY
                                            PREMIER LEAGUE (FPL) T&amp;Cs</h4>
                                        <span>
<h6 className="article-details">️BetNare Fantasy Premier League Challenge </h6>
</span>
                                        <span>
<h6 className="article-details fpl-code-link-help">Experience the thrill of English
	football like never before with the BetNare Fantasy Premier
	League Challenge! Compete against fellow football enthusiasts and showcase your
	strategic brilliance for a chance to win
	exciting :moneybag: cash prizes every week. </h6>
</span>
                                    </div>
                                    <div className="body_text">
                                        <div className={'d-flex flex-column'}>
                                            <label className={'fpl-code-link'}>Follow links to join </label><span>
                                            explore our fpl at: &nbsp;
                                            <a href={'https://fantasy.premierleague.com/leagues/auto-join/cwo7vw'} target={'_blank'}> https://fantasy.premierleague.com/leagues/auto-join/cwo7vw</a>

                                        </span>
                                            <p className={'fpl-code'}>Code : cwo7vw</p>
                                        </div>

                                        <p><strong className={'fpl-code-link-help'}>How It Works</strong></p>
                                        <p>1. stadium: Join the League: Create your Fantasy Premier League team on the official FPL website.</p>
                                        <p>2. scroll: Enter the BetNare League: Use the private code [XXXXXX] to join the exclusive BetNare league.</p>
                                        <p>3. soccer: Build Your Squad: Select your dream team of football stars while staying within the budget.</p>
                                        <p>4. Score Points: Earn points based on your players' real-life performance in Premier League matches.</p>
                                        <p>5. Win Big: Climb the leaderboard and secure your spot among the top 3 to win cash prizes every game week. Plus, aim for the highest monthly points to seize the grand monthly prize!.</p>
                                        <p><strong className={'fpl-code-link-help'}>PRIZES</strong></p>
                                        <ol>
                                            <li>1. first_place_medal: 1st Place: KES 5,000
                                            </li>
                                            <li>2. 2nd Place: KES 3,000</li>
                                            <li>3. 3rd Place: KES 3,000</li>
                                        </ol>
                                        Monthly Grand Prize: KES 30,000
                                        <p><strong>Monthly Grand Prize: KES 30,000</strong></p>
                                        <p>Gear up for an adrenaline-packed football season filled with excitement,
                                            strategy, and the chance to turn your football knowledge into real
                                            :money_with_wings: cash winnings. Join the BetNare Fantasy Premier League Challenge today!</p>

                                        <p><strong className={'fpl-code-link-help'}>How to Participate:</strong></p>
                                        <ul>
                                            <li>
                                                1. Sign up or log in to the official Fantasy Premier League website.
                                            </li>
                                            <li>
                                                2.  Create your fantasy football squad within the budget.
                                            </li>
                                            <li>
                                                3.  Join the BetNare League using the private code [XXXXXX].
                                            </li>
                                            <li>
                                                4.  Stay updated with real-time scores and player performances.
                                            </li>
                                        </ul>
                                        <p><strong className={'fpl-code-link-help'}>Terms and Conditions::</strong></p>
                                        <ol>
                                            <li>
                                                <p>Participants must be registered users of BetNare and over 18 years of age.</p>
                                            </li>
                                            <li>
                                                <p> Only participants who have joined the official BetNare league with the private code [XXXXXX] will be eligible for prizes.</p>
                                            </li>
                                            <li>
                                                <p>Weekly prizes will be awarded to the top 3 participants with the highest points for that game week..</p>
                                            </li>
                                            <li>
                                                <p> In the event of a tie, the participant who registered for the league earlier will be given preference.</p>
                                            </li>
                                            <li>
                                                <p> The monthly grand prize will be awarded to the participant with the highest cumulative points for the entire calendar month.</p>
                                            </li>
                                            <li>
                                                <p>  Cash prizes will be credited to the winners' BetNare accounts and can be withdrawn or used for betting activities.</p>
                                            </li>
                                            <li>
                                                <p>  BetNare reserves the right to modify, suspend, or cancel the competition or any part of it at any time.</p>
                                            </li>
                                            <li>
                                                <p>  By participating, participants agree to allow BetNare to use their usernames and images for promotional purposes.</p>
                                            </li>
                                            <li>
                                                <p>  This promotion is subject to the terms and conditions of BetNare.</p>
                                            </li>
                                        </ol>
                                        <p><strong className={'fpl-code-link-help'}>NOTE:</strong> Don't miss your chance to play, compete, and win with the
                                            BetNare Fantasy Premier League Challenge.
                                            Join the league now and make every Premier League match even more exhilarating! :soccer::trophy::moneybag:</p>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    });

export default React.memo(FPL);
