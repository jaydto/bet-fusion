import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const Waiver = () => {
    return (
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
    )
}

export default Waiver
