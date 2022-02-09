import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const Assignment = () => {
    return (
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
    )
}

export default Assignment