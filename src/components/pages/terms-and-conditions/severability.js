import {
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const Severability = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    SEVERABILITY
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <ol>
                    <li>
                        In the event that any provision of these Terms and Conditions is deemed
                        by any competent authority to be unenforceable or invalid, the relevant
                        provision shall be modified to allow it to be enforced in line with the
                        intention of the original text to the fullest extent permitted by
                        applicable law. The validity and enforceability of the remaining
                        provisions of these Terms and Conditions shall not be affected.
                    </li>
                    <li>
                        Any provision of these Terms and Conditions that is invalid, illegal or
                        unenforceable in any jurisdiction will be ineffective in that particular
                        jurisdiction, without affecting the validity, legality or enforceability
                        of that provision in other jurisdictions.
                    </li>
                </ol>

            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default Severability
