import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const Ammendments = () => {
    return (
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
    )
}

export default Ammendments
