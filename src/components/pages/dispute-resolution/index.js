import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import '../../test.css'
import 'react-accessible-accordion/dist/fancy-example.css';
import React, {useEffect} from "react";
import Header from '../../header/header'
import SideBar from '../../sidebar/awesome/Sidebar'
import Footer from '../../footer/footer'
import Right from '../../right/index'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setState } from '../../../redux/dataSlice';

const DisputeResolution = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const navigate=useNavigate()
    const show=useSelector((state)=>state.data.show_menu)
        const dispatchRedux=useDispatch()

        const handleClose = () => {
            dispatchRedux(setState('show_menu', false))
        };
       
        useEffect(()=>{
            if(show==true)
            handleClose();
        },[])

    return (
        <div className={'flex-item'}>
            <div className="flex-container height-default-body top-diff-pages">
                <div className="item1"> <SideBar loadCompetitions/></div>
                <div className="item2" style={{width:'100%'}}>
                    <div className="gz home w-100">
                        <div className="homepage">
                            <div className='col-md-12 primary-bg p-4 text-center'>
                                <div className={'d-flex align-items-center'}>
                                            <span className={'spacing-backbutton remove-backbutton-on-desktop'}
                                                  onClick={() => navigate('/')}>
                                             <FontAwesomeIcon icon={faAngleLeft} style={{
                                                 fontSize: "24px",
                                                 color: 'var(--light)',
                                                 fontWeight: '700',
                                                 opacity: '0.7'
                                             }}/>
                                            </span>
                                    <h4 className="inline-block">
                                    DISPUTE RESOLUTION POLICY
                                </h4>
                                </div>


                            </div>
                            <div className="col-md-12 mt-2 text-white accordion-container ">
                                <Accordion allowMultipleExpanded={false}
                                           allowZeroExpanded={true}
                                           preExpanded = {["only-child-1"]}>
                                    <AccordionItem uuid="only-child-1">
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                DISPUTE RESOLUTION
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                CrashKali aims to offer all of the company’s clients from the Kenya the
                                                greatest possible Customer experience in the industry. We want to make
                                                sure
                                                that all of our clients are completely satisfied with the products and
                                                service the company has to offer, as well as their quality and
                                                transparency.
                                                At the same time, CrashKali realizes that sometimes there might be cases
                                                when
                                                the company hasn’t been able to deliver. If you are not happy with the
                                                service that our platform provides, you can always send a query to our
                                                Customer Services team.
                                            </p>
                                            <p>
                                                You can contact the CrashKali Customer Services team by way of email
                                               support@CrashKali.com or call our customer care lines or inbox us through
                                                our
                                                social Media Pages Facebook, CrashKali, Instagram CrashKali etc. Queries
                                                will
                                                always be processed within one business day. However, if, after your
                                                issue
                                                has been processed, you’re still not satisfied with the decision or
                                                believe
                                                that the situation is at a deadlock, you can always ask BCLB (The
                                                Betting
                                                Control and Licensing Board) to conduct an investigation.
                                            </p>
                                            <p>
                                                BCLB is an and impartial external agent that provides independent
                                                judgments
                                                for gambling/betting-related disputes. BCLB will not charge you for its
                                                services. To raise your dispute or complaint with BCLB, you will need to
                                                request a Deadlock Email from our CS Agent. This email will outline the
                                                full
                                                details of your dispute or complaint and will include a unique reference
                                                number that must be quoted when submitting a dispute or complaint with
                                                BCLB.
                                                You can then submit your dispute or complaint to BCLB via
                                                info@bclb.go.ke
                                                BCLB as a regulator, is also an independent adjudication service for
                                                resolving disputes between licensed gambling companies and their
                                                clients.
                                                To start looking at the detail of any dispute, BCLB will ask a
                                                complainant
                                                to confirm that they have made every reasonable effort possible to
                                                resolve
                                                the dispute before addressing BCLB and that they agree to comply with
                                                BCLB’
                                                terms and conditions.
                                            </p>
                                            <p>
                                                Decisions are not made based on which party makes a better presentation
                                                of
                                                the disputed case. Gambling companies and their clients do not need to
                                                think
                                                of the quality of the presentation or their writing skills. The part of
                                                BCLB
                                                is to identify relevant issues. Therefore, decisions are always based on
                                                the
                                                facts of a case and not on either of the parties' rhetoric. The only
                                                thing
                                                BCLB asks for is that statements submitted cover as many facts as a
                                                complainant considers relevant to their dispute.
                                            </p>
                                            <p>
                                                In the event of a dispute arising between us and you, we each agree to
                                                follow the procedure set out in our Dispute Resolution policy as amended
                                                from time to time.
                                            </p>

                                            <p>
                                                If CrashKali is unable to settle the dispute, CrashKali will refer the
                                                dispute
                                                to BCLB, whose decision will be final (save in respect of any manifest
                                                error) subject to full representation given to all parties involved. No
                                                dispute regarding any bet/wager will result in litigation, court action
                                                or
                                                objection to a bookmaker’s license or permit (including any remote
                                                operator’s license or personal license) unless CrashKali fails to
                                                implement
                                                the decision given by arbitration.
                                            </p>

                                        </AccordionItemPanel>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item3 mobile-remove"><Right  test={true}/></div>

            </div>
            <div className="item6"><div className={"footer-mobile-none"}>
                <Footer/>
            </div></div>
        </div>

    );
};

export default React.memo(DisputeResolution);
