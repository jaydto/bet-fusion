import {
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setState } from '../../../redux/dataSlice';

const TermAndTermination = () => {
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
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    TERM AND TERMINATION
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <ol>
                    <li>
                        The term of the Agreement shall be for an indefinite period.
                    </li>
                    <li>
                       jazabets shall have the right prior to accepting any bet, temporarily to
                        suspend or permanently to terminate, the provision of betting services
                        to a
                        CLIENT without providing any reason.
                    </li>
                    <li>
                        Should the CLIENT wish to terminate this Agreement at any time, he/she
                        may
                        do so by sending an e-mail notification to the company.
                    </li>
                    <li>

                        As of termination, the CLIENT shall not be able to carry out new
                        transactions.
                    </li>

                    <li>
                        The CLIENT may only terminate the agreement by providing written notice
                        to
                        the customer support email atsupport@BetDonjo.com.
                    </li>
                </ol>

            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default TermAndTermination
