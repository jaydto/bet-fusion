import React, {useCallback, useEffect, useState, useContext} from "react";


import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import makeRequest from "../utils/fetch-request";
import {
    getFromLocalStorage,
    setLocalStorage
} from '../utils/local-storage';

import {getBetslip} from '../utils/betslip' ;
import {Context} from '../../context/store';
import {AccordionButton} from "react-bootstrap";

const Header = React.lazy(() => import('../header/header'));
const Footer = React.lazy(() => import('../footer/footer'));
const SideBar = React.lazy(() => import('../sidebar/awesome/Sidebar'));
const Right = React.lazy(() => import('../right/index'));


const HowToPlay = (props) => {

    const [, dispatch] = useContext(Context);

    useEffect(() => {
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
        }
    }, []);
    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: 'auto'}}>
                        <div className="homepage">
                            <div className='col-md-12 primary-bg p-4 text-center'>
                                <h4 className="inline-block"> HOW TO PLAY </h4>
                            </div>
                            <div className="col-md-12 card mt-2"></div>
                            <div className="col-md-12 mt-2 p-5 text-white accordion-container">
                                <Accordion preExpanded={['1']}>
                                    <AccordionItem uuid="1">
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Play via SMS
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel px-1 pt-1'>
                                            <Accordion allowMultipleExpanded className={'px-2'}>
                                                <AccordionItem>
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton className='accordion-button'>
                                                            Registration
                                                        </AccordionItemButton>
                                                    </AccordionItemHeading>
                                                    <AccordionItemPanel className='accordion-item-panel'>
                                                        <Accordion allowZeroExpanded>
                                                            <AccordionItem>
                                                                <AccordionItemHeading>
                                                                    <AccordionItemButton className='accordion-button'>
                                                                        Why should I register with BetNare ?
                                                                    </AccordionItemButton>
                                                                </AccordionItemHeading>
                                                                <AccordionItemHeading>
                                                                    <AccordionItemButton className='accordion-button'>
                                                                        How do I register with
                                                                        BetNare? </AccordionItemButton>
                                                                </AccordionItemHeading>
                                                            </AccordionItem>
                                                            <AccordionItem>
                                                                <AccordionItemPanel className='accordion-item-panel'>
                                                                    <h3>Step 1 </h3>
                                                                    <p>
                                                                        To register via SMS send “JOIN” to 29877. You
                                                                        will
                                                                        receive a
                                                                        confirmation message with a link directing you
                                                                        to read
                                                                        the
                                                                        terms
                                                                        and conditions on BetNare.
                                                                        Once you have read and understood the Terms and
                                                                        Conditions,
                                                                        you
                                                                        are able to create an account on BetNare.
                                                                    </p>
                                                                    <br/>

                                                                </AccordionItemPanel>
                                                                <AccordionItemPanel>
                                                                    <p>
                                                                        Registration allows you to open a BetNare
                                                                        account free
                                                                        of
                                                                        charge
                                                                        and under no obligation. Your BetNare account
                                                                        will help
                                                                        you
                                                                        manage your bets and other account details. You
                                                                        need to
                                                                        deposit
                                                                        actual money into your account before you can
                                                                        place
                                                                        bets.
                                                                    </p>
                                                                    <p>
                                                                        Register now! To Play
                                                                    </p>
                                                                </AccordionItemPanel>
                                                            </AccordionItem>
                                                        </Accordion>
                                                    </AccordionItemPanel>

                                                </AccordionItem>
                                                <AccordionItem>
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton className='accordion-button'>
                                                            Deposit
                                                        </AccordionItemButton>
                                                    </AccordionItemHeading>
                                                    <AccordionItemPanel className='accordion-item-panel'>
                                                        <h3>How do I deposit cash into my BetNare account? </h3>
                                                        <Accordion allowZeroExpanded>
                                                            <AccordionItem>
                                                                <AccordionItemHeading>
                                                                    <AccordionItemButton className='accordion-button'>
                                                                        Step 1

                                                                    </AccordionItemButton>
                                                                </AccordionItemHeading>
                                                                <AccordionItemPanel>
                                                                    <p>
                                                                        Registration allows you to open a BetNare
                                                                        account free
                                                                        of
                                                                        charge
                                                                        and under no obligation. Your BetNare account
                                                                        will help
                                                                        you
                                                                        manage your bets and other account details. You
                                                                        need to
                                                                        deposit
                                                                        actual money into your account before you can
                                                                        place
                                                                        bets.
                                                                    </p>
                                                                    <p>
                                                                        Register now! To Play
                                                                    </p>
                                                                </AccordionItemPanel>
                                                            </AccordionItem>

                                                            <AccordionItem>
                                                                <AccordionItemHeading>
                                                                    <AccordionItemButton className='accordion-button'>
                                                                        Step 2

                                                                    </AccordionItemButton>
                                                                </AccordionItemHeading>
                                                                <AccordionItemPanel>
                                                                    <p>
                                                                        Your BetNare account will be credited
                                                                        automatically. You will then receive a
                                                                        confirmation message from BetNare for the
                                                                        deposit transaction.
                                                                        e.g., KSH 15/= received. Your BetNare account
                                                                        balance is; KSH 15/=

                                                                    </p>

                                                                </AccordionItemPanel>
                                                            </AccordionItem>

                                                            <AccordionItem>
                                                                <AccordionItemHeading>
                                                                    <AccordionItemButton className='accordion-button'>
                                                                        Step 3

                                                                    </AccordionItemButton>
                                                                </AccordionItemHeading>
                                                                <AccordionItemPanel>
                                                                    <p>
                                                                        You are now ready to play.
                                                                    </p>
                                                                </AccordionItemPanel>
                                                            </AccordionItem>


                                                        </Accordion>


                                                    </AccordionItemPanel>
                                                </AccordionItem>

                                                <AccordionItem>
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton className='accordion-button'>
                                                            Bet via SMS
                                                        </AccordionItemButton>
                                                    </AccordionItemHeading>
                                                    <AccordionItemPanel className='accordion-item-panel'>
                                                        <Accordion allowZeroExpanded>

                                                        </Accordion>
                                                        <AccordionItem>
                                                            <AccordionItemHeading>
                                                                <AccordionItemButton className='accordion-button'>
                                                                    How do I place a bet?
                                                                </AccordionItemButton>
                                                            </AccordionItemHeading>
                                                            <AccordionItemPanel>
                                                                <p>
                                                                    You now have an opportunity to predict the
                                                                    outcome of any
                                                                    match
                                                                    available on the BetNare platform. You can
                                                                    select any
                                                                    betting
                                                                    option from the wide range of markets available
                                                                    on different
                                                                    games and send your bet to 29877. </p>


                                                            </AccordionItemPanel>
                                                            <AccordionItem>
                                                                <AccordionItemHeading>
                                                                    <AccordionItemButton
                                                                        className='accordion-button'>
                                                                        How do I place a Single Bet?
                                                                    </AccordionItemButton>
                                                                </AccordionItemHeading>
                                                                <AccordionItemPanel>
                                                                    <p>
                                                                        Follow the steps below to place a single bet
                                                                        via sms.
                                                                    </p>
                                                                    <AccordionItemHeading>
                                                                        <AccordionItemButton
                                                                            className='accordion-button'>
                                                                            Step 1 </AccordionItemButton>
                                                                    </AccordionItemHeading>
                                                                    <AccordionItemPanel>
                                                                        SMS to 29877 the Game ID of the game you
                                                                        wish to bet on,
                                                                        your prediction and the amount you wish to
                                                                        bet with.
                                                                        e.g. 1234#1#100 - where "1234" is the game
                                                                        ID, "1" is
                                                                        your
                                                                        prediction for Home team to win, and "10" is
                                                                        the bet
                                                                        amount.


                                                                    </AccordionItemPanel>
                                                                    <AccordionItemHeading>
                                                                        <AccordionItemButton
                                                                            className='accordion-button'>
                                                                            Step 2 </AccordionItemButton>
                                                                    </AccordionItemHeading>
                                                                    <AccordionItemPanel>
                                                                        You will receive a confirmation message from
                                                                        29877
                                                                        showing
                                                                        your Bet ID, possible payout, and your
                                                                        BetNare account
                                                                        balance.
                                                                        The possible payout is calculated by
                                                                        multiplying your
                                                                        total
                                                                        Odds by the bet amount then subtracting 20%
                                                                        withholding
                                                                        tax.
                                                                        Withholding tax is 20% of your net winnings.
                                                                        Net winnings is possible win (Bet amount X
                                                                        odd) less the
                                                                        bet
                                                                        amount.


                                                                    </AccordionItemPanel>

                                                                </AccordionItemPanel>
                                                            </AccordionItem>
                                                        </AccordionItem>
                                                        <AccordionItem>
                                                            <AccordionItemHeading>
                                                                <AccordionItemButton className='accordion-button'>
                                                                    How do I place a Multi Bet?
                                                                </AccordionItemButton>
                                                            </AccordionItemHeading>
                                                            <AccordionItemPanel className='accordion-item-panel'>
                                                                <p>
                                                                    Follow the steps below to place a Multi bet via SMS.
                                                                </p>
                                                                <AccordionItemHeading>
                                                                    <AccordionItemButton className='accordion-button'>
                                                                        Step 1
                                                                    </AccordionItemButton>
                                                                </AccordionItemHeading>
                                                                <AccordionItemPanel>
                                                                    <p>
                                                                        SMS to 29877 the Game IDs of the games you have
                                                                        selected, your
                                                                        predictions for these games, and the amount you
                                                                        want to bet
                                                                        with. (Note that a Multibet has a minimum of two
                                                                        games and a
                                                                        maximum of 30 games).
                                                                        e.g. 2345#2#4567#1#1243 #X#5432 where 2345is the
                                                                        first Game ID,2
                                                                        is the prediction, 4567is the second Game ID, 1
                                                                        is the
                                                                        prediction, 1243 is the third Game ID and X is
                                                                        the prediction.
                                                                        KSH 5432 is the bet amount for your Multibet.


                                                                    </p>

                                                                </AccordionItemPanel>
                                                                <AccordionItemHeading>
                                                                    <AccordionItemButton className='accordion-button'>
                                                                        Step 2
                                                                    </AccordionItemButton>
                                                                </AccordionItemHeading>
                                                                <AccordionItemPanel>
                                                                    <p>
                                                                        You will receive a confirmation message from
                                                                        29877 showing your
                                                                        Multi Bet ID, possible payout, and your BetNare
                                                                        account balance.
                                                                        The possible payout is calculated by multiplying
                                                                        your total Odds
                                                                        by the bet amount then subtracting 20%
                                                                        withholding tax.
                                                                        Withholding tax is 20% of your net winnings.
                                                                        Net winnings is possible win (Bet amount X odd)
                                                                        less the bet
                                                                        amount.


                                                                    </p>

                                                                </AccordionItemPanel>
                                                                <AccordionItemHeading>
                                                                    <AccordionItemButton className='accordion-button'>
                                                                        Step 3
                                                                    </AccordionItemButton>
                                                                </AccordionItemHeading>
                                                                <AccordionItemPanel>
                                                                    <p>
                                                                        You will receive an SMS confirmation indicating
                                                                        your bet has
                                                                        been placed successfully.
                                                                        Note:
                                                                        To cancel a bet, send the word "Cancel" followed
                                                                        by "#" and the
                                                                        Bet ID received in the confirmation message, to
                                                                        29877. Note that
                                                                        you can only cancel a bet within 10 minutes of
                                                                        placing it.
                                                                        e.g. Cancel#6565 (where 6565 is the Bet ID)


                                                                    </p>

                                                                </AccordionItemPanel>


                                                            </AccordionItemPanel>
                                                        </AccordionItem>
                                                        <AccordionItem>
                                                            <AccordionItemHeading>
                                                                <AccordionItemButton className='accordion-button'>
                                                                    How do I place a Jackpot Bet?
                                                                </AccordionItemButton>
                                                            </AccordionItemHeading>

                                                            <AccordionItemPanel>
                                                                <AccordionItemHeading>
                                                                    <AccordionItemButton className='accordion-button'>
                                                                        Step 1
                                                                    </AccordionItemButton>
                                                                </AccordionItemHeading>
                                                                <AccordionItemPanel>
                                                                    <p>
                                                                        The Jackpot has 13 pre-selected matches that
                                                                        usually play in
                                                                        the
                                                                        middle of the week.
                                                                        The cash prize for the Jackpot starts at KSH
                                                                        1,000,000 and
                                                                        the
                                                                        amount progresses every week whenever we don't
                                                                        have a
                                                                        winner.
                                                                        To place a bet on the Jackpot, SMS to 29877 "JP"
                                                                        followed by
                                                                        "#"
                                                                        then the 13 predictions of the pre-selected
                                                                        Jackpot games.
                                                                        e.g. JP#21212X2112XX1
                                                                        Note: One does not have to enter the stake since
                                                                        Jackpot
                                                                        amount
                                                                        by default is KSH 15.

                                                                    </p>

                                                                </AccordionItemPanel>
                                                                <AccordionItemHeading>
                                                                    <AccordionItemButton className='accordion-button'>
                                                                        Step 2
                                                                    </AccordionItemButton>
                                                                </AccordionItemHeading>
                                                                <AccordionItemPanel>
                                                                    <p>
                                                                        You will receive a confirmation message from
                                                                        29877 showing
                                                                        your
                                                                        Jackpot Bet ID, all the 13 predictions you have
                                                                        made, the
                                                                        bet
                                                                        amount and your BetNare account balance.
                                                                        Note: You are a winner when all your 13
                                                                        predictions match
                                                                        the
                                                                        games outcomes.
                                                                        The Jackpot is equally shared among all the
                                                                        winners.
                                                                        Bonuses are awarded for ,11, and 12 correct
                                                                        predictions.
                                                                        You can place as many bets as you wish on the
                                                                        Jackpot and
                                                                        each
                                                                        bet costs KSH 15.

                                                                    </p>

                                                                </AccordionItemPanel>


                                                            </AccordionItemPanel>

                                                        </AccordionItem>


                                                    </AccordionItemPanel>
                                                </AccordionItem>

                                                <AccordionItem>
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton className='accordion-button'>
                                                            Withdrawal via SMS </AccordionItemButton>
                                                    </AccordionItemHeading>
                                                    <AccordionItemPanel>
                                                        <p>
                                                            Getting money is as easy as depositing it.
                                                            For example if you want to withdraw KSH 100 from your BetNare
                                                            account you will:
                                                            SMS to 29877; W#100 - where W stands for Withdraw, 100 is the amount
                                                            of money you wish to withdraw.
                                                            Note: The withdrawal format is standard across all mobile money
                                                            service providers. i.e M-Pesa.
                                                            You will receive a confirmation message from 29877 and Your Mobile
                                                            Money account (M-Pesa) will be credited, and a second confirmation
                                                            SMS to this effect will be sent to you by your mobile service
                                                            operator.


                                                        </p>

                                                    </AccordionItemPanel>
                                                </AccordionItem>
                                                <AccordionItem>
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton className='accordion-button'>My
                                                            Account</AccordionItemButton>
                                                    </AccordionItemHeading>
                                                    <AccordionItemPanel>
                                                        <h3>How do I check my balance?</h3>
                                                        <p>
                                                            SMS the word "BALANCE" to 29877 to see how much you have on your
                                                            BetNare account. You will receive a message showing your account
                                                            balance.
                                                            e.g. Your BetNare balance is: KSH 253/=
                                                            Note: If you have a pending withdrawal request, your BetNare account
                                                            balance will not include the amount you want to withdraw.


                                                        </p>

                                                    </AccordionItemPanel>
                                                </AccordionItem>
                                            </Accordion>






                                        </AccordionItemPanel>
                                    </AccordionItem>

                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Play via Web
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <Accordion>
                                                <AccordionItem>
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton className='accordion-button'>
                                                            Registration
                                                        </AccordionItemButton>
                                                    </AccordionItemHeading>

                                                    <AccordionItemPanel className='accordion-item-panel'>
                                                        <AccordionItemHeading>
                                                            <AccordionItemButton className='accordion-button'>Why should I
                                                                register with BetNare?</AccordionItemButton>
                                                        </AccordionItemHeading>
                                                        <AccordionItemPanel className='accordion-item-panel'>
                                                            <p>
                                                                Registration allows you to open a BetNare account free of charge
                                                                and
                                                                under no obligation. Your BetNare account will help you manage
                                                                your
                                                                bets and other account details. You need to deposit actual money
                                                                into your account before you can place bets.
                                                            </p>
                                                        </AccordionItemPanel>
                                                        <AccordionItemHeading>
                                                            <AccordionItemButton className='accordion-button'>How do I Register
                                                                with BetNare?</AccordionItemButton>
                                                        </AccordionItemHeading>
                                                        <AccordionItemPanel className='accordion-item-panel'>
                                                            <AccordionItemHeading>
                                                                <AccordionItemButton className='accordion-button'>Step
                                                                    1</AccordionItemButton>
                                                            </AccordionItemHeading>
                                                            <AccordionItemPanel className='accordion-item-panel'>
                                                                <p>Please visit www.BetNare .com and click on the Register Now
                                                                    link on the top RIGHT corner of the website.
                                                                    Please read the Terms and Conditions and fill in all the
                                                                    fields and click the Get verification code button or
                                                                    alternatively you can skip this step if you have a code
                                                                    already.

                                                                    Fill in your phone number and the registration code SENT TO
                                                                    YOUR MOBILE NO.

                                                                    A confirmation message appears to confirm that your
                                                                    registration was successful.

                                                                    BetNare!
                                                                </p>
                                                            </AccordionItemPanel>
                                                        </AccordionItemPanel>
                                                    </AccordionItemPanel>
                                                </AccordionItem>
                                                <AccordionItem>
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton className='accordion-button'>
                                                            How do I place a bet?
                                                        </AccordionItemButton>
                                                    </AccordionItemHeading>

                                                    <AccordionItemPanel className='accordion-item-panel'>

                                                        <p>
                                                            You have an opportunity to predict the outcome of any match
                                                            available on the BetNare website.
                                                            You can select any betting option from the wide range of pre-match
                                                            and live markets available on different games and place your bet.

                                                            Note; All betting options are displayed and described at the foot of
                                                            the page.


                                                        </p>
                                                    </AccordionItemPanel>
                                                </AccordionItem>

                                            </Accordion>
                                            <AccordionItem>

                                            </AccordionItem>

                                            <AccordionItem>

                                            </AccordionItem>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className='accordion-button'>How do I place a multi
                                                    bet?</AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel className='accordion-item-panel'>
                                                <p>
                                                    Now you have registered and your account has been set up, kindly
                                                    ensure that you log in before you place your bets.
                                                    The BetNare website is very easy to navigate, all you need to do is
                                                    click on the sport you are interested in i.e Football, Basketball,
                                                    Tennis, Cricket or Rugby to find matches that you want to bet on in
                                                    your multibet.
                                                    To place a multibet, click on the team that you predict to win
                                                    either Home team (first listed team) or Away team (second listed
                                                    team).
                                                    If you wish to predict that the outcome of the game will be a draw,
                                                    click in the middle of the two teams to select X (DRAW).
                                                    If you wish to predict on the additional markets, click on the
                                                    option for more markets displayed as (+12, +2, +8 etc.) besides the
                                                    game you want to bet on to access the available betting options.
                                                    Once you select your prediction, a Bet slip will appear showing the
                                                    predictions you have selected, the odds of your predictions, the
                                                    amount, which can be adjusted, the stake, excise tax, odds of your
                                                    prediction, and your possible payout as well as the withholding tax
                                                    that will be deducted.
                                                    Note that you can edit your bets from the bet slip just to make sure
                                                    that you have made the choices you want.
                                                    If you would like to do away with the entire bet and start a fresh,
                                                    then click on REMOVE ALL"
                                                    Click on "PLACE BET" to place your bet.
                                                    A message requesting you to "CONFIRM YOUR BET" will pop up at this
                                                    point. You can click on "CANCEL" and go back to your bet slip, or
                                                    click "OK".

                                                </p>
                                                <p>
                                                    After clicking "OK" a confirmation message will be displayed on the
                                                    screen showing:
                                                    • The type of bet you have placed – Multi-bet
                                                    • Your Bet ID
                                                    • The amount you have bet with
                                                    • The excise tax deducted
                                                    • Your possible payout
                                                    • Your BetNare account balance
                                                    Note: You can go straight to your Bet History by clicking on "View
                                                    History" to see your bets
                                                    You will also receive a confirmation message on your mobile phone
                                                    from 79079 to confirm the same bet.

                                                </p>


                                            </AccordionItemPanel>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className='accordion-button'>How do I place a
                                                    Jackpot bet?</AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel className='accordion-item-panel'>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton className='accordion-button'>Step
                                                        1</AccordionItemButton>

                                                </AccordionItemHeading>
                                                <AccordionItemPanel className='accordion-item-panel'>
                                                    Log into your BetNare account and click on the Jackpot banner at the
                                                    top of your screen.
                                                </AccordionItemPanel>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton className='accordion-button'>Step
                                                        2</AccordionItemButton>

                                                </AccordionItemHeading>
                                                <AccordionItemPanel className='accordion-item-panel'>
                                                    To place a Jackpot bet, click on the team that you predict to win.
                                                    Click on either the Home team (first listed team) or the Away team
                                                    (second listed team).
                                                    If you wish to predict that the outcome of the game will be a draw,
                                                    click in the middle of the two teams to select X (DRAW).
                                                    Select your predictions for all the 13 Jackpot games.
                                                    A bet slip will appear with all your predictions.
                                                    On the bet slip, you will also be able to see the number of
                                                    combinations made. If you have not placed a combination bet, the
                                                    number of combinations will be 13.

                                                </AccordionItemPanel>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton className='accordion-button'>Step
                                                        3</AccordionItemButton>

                                                </AccordionItemHeading>
                                                <AccordionItemPanel className='accordion-item-panel'>
                                                    Click on place a bet.
                                                </AccordionItemPanel>

                                                <AccordionItemHeading>
                                                    <AccordionItemButton className='accordion-button'>Step
                                                        4</AccordionItemButton>

                                                </AccordionItemHeading>
                                                <AccordionItemPanel className='accordion-item-panel'>
                                                    Click Ok to confirm.
                                                    A message will be displayed on your screen to confirm the placement
                                                    of your Jackpot bet.
                                                    NB 1: You are a winner when all your 13 predictions match with the
                                                    games outcomes. Jackpot is equally shared amongst all winners.
                                                </AccordionItemPanel>


                                            </AccordionItemPanel>
                                            <AccordionItem>

                                            </AccordionItem>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className='accordion-button'>How do I withdraw cash
                                                    from my BetNare account?</AccordionItemButton>

                                            </AccordionItemHeading>
                                            <AccordionItemPanel className='accordion-item-panel'>
                                                Getting your money out is as simple as putting your money in. Hopefully
                                                you will have made some successful wagers and you want to transfer money
                                                to your mobile money.
                                                Click on the withdrawal link on the top right panel of the web site.

                                            </AccordionItemPanel>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className='accordion-button'>How do I check My
                                                    Balance?</AccordionItemButton>

                                            </AccordionItemHeading>
                                            <AccordionItemPanel className='accordion-item-panel'>
                                                This is display on the top right pane of the website.
                                                The top right pane displays the Cash Balance and Bonus Wallet balances.

                                            </AccordionItemPanel>

                                            <AccordionItemHeading>
                                                <AccordionItemButton className='accordion-button'>How do I log into my
                                                    BetNare account?</AccordionItemButton>

                                            </AccordionItemHeading>
                                            <AccordionItemPanel className='accordion-item-panel'>
                                                Once you have registered you can access your BetNare account by entering
                                                your phone number as USERNAME and the WEB PASSWORD as PASSWORD
                                            </AccordionItemPanel>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className='accordion-button'>How do I check my
                                                    transaction from my BetNare account?</AccordionItemButton>

                                            </AccordionItemHeading>
                                            <AccordionItemPanel className='accordion-item-panel'>
                                                When you log in with your account username and password, and click on
                                                "Transactions" you will see all your transactions. You can choose filter
                                                from date to date. </AccordionItemPanel>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className='accordion-button'>How do I check my bets
                                                    from my BetNare account?</AccordionItemButton>

                                            </AccordionItemHeading>
                                            <AccordionItemPanel className='accordion-item-panel'>
                                                When you log in with your account username and password, and click on
                                                "Transactions" you will see all your transactions. You can choose filter
                                                from date to date. </AccordionItemPanel>
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

export default HowToPlay
