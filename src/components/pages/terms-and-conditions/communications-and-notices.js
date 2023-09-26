import {
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const CommunicationAndNotices = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    COMMUNICATIONS AND NOTICES
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <ol>
                    <li>
                        Communications and notices to be given by you to us under these Terms
                        and Conditions should be provided to us as set out in the Contact us
                        section.
                    </li>
                </ol>

            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default CommunicationAndNotices
