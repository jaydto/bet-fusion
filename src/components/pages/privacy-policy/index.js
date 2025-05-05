import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import React, { useEffect } from "react";
import Footer from "../../footer/footer";
import Right from "../../right/index";
import "../../test.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../../redux/dataSlice";

const PrivacyPolicy = React.memo(() => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const navigate = useNavigate();
  const show = useSelector((state) => state.data.show_menu);
  const dispatchRedux = useDispatch();

  const preExpandedItems = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23,
  ]; // Add all the keys here

  const handleClose = () => {
    dispatchRedux(setState("show_menu", false));
  };

  useEffect(() => {
    if (show == true) handleClose();
  }, []);

  return (
    <div className={"flex-item"}>
      <div className="flex-container height-default-body top-diff-pages privacy">
        <div className="item2" style={{ width: "100%" }}>
        <div className="home" style={{margin:"auto", maxWidth:"991px"}}>
            <div className="homepage">
              <div className="col-md-12 primary-bg p-4 text-center">
                <div className={"d-flex align-items-center"}>
                  <span
                    className={
                      "spacing-backbutton remove-backbutton-on-desktop"
                    }
                    onClick={() => navigate("/")}
                  >
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      style={{
                        fontSize: "24px",
                        color: "var(--light)",
                        fontWeight: "700",
                        opacity: "0.7",
                      }}
                    />
                  </span>
                  <h4 className="inline-block">PRIVACY POLICY</h4>
                </div>

              </div>

              <div className="col-md-12 mt-2 text-white p-2 text-center"></div>
              <p class="text-white mx-2">Last updated: January 19, 2024</p>

              <div className="col-md-12 mt-1 p-1 text-white accordion-container">

                <Accordion
                  allowMultipleExpanded={true}
                  allowZeroExpanded={true}
                  preExpanded={preExpandedItems}
                >
                  <AccordionItem uuid={preExpandedItems[0]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        PURPOSE
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        1.1.Atjazabets we are committed to protecting and
                        respecting your privacy and maintaining your confidence
                        and trust. This privacy policy ("Privacy Policy") is
                        used to inform you as to how we process your Personal
                        Data, how and why we collect, use, and disclose it when
                        you visit our Channels (as hereinafter defined)
                        regardless of where you visit it from, and tells you
                        about your privacy rights and how the law protects you.
                        This Privacy Policy should be read and applied together
                        with the 
                        {<Link to="/terms-and-conditions">jazabets General Terms and Conditions </Link>} ("Terms and Conditions").
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[1]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        DEFINITIONS
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      The terms used in this Privacy Policy have the same
                      meaning as in our Terms and Conditions. However, for the
                      purposes of this Privacy Policy and the Introduction
                      above, unless the context otherwise requires:
                      <p>
                        2.1. 1.	"Applicable Laws" means the Data Protection Laws and any relevant international data protection laws;
                      </p>
                      <p>
                        2.2. 2.	"BetDonjo Service(s)" has the meaning given to it in the Terms and Conditions and "Services" shall be construed accordingly;
                      </p>
                      <p>
                        2.3. 3.	"Channel(s)" means thejazabets website, mobile app, social media platforms and any other platforms used to offer thejazabets Services;
                      </p>
                      <p>
                        2.4. 4.	"Customer(s)" means registered users of thejazabets Service;
                      </p>
                      <p>
                        2.5. 
5.	"Data Protection Laws" means the Data Protection Act, 2019, as amended and "Local Data Protection Laws" shall be construed accordingly;

                      </p>
                      <p>
                        2.6.6.	7.	"Sensitive Personal Data" has the meaning given to it in the Data Protection Act, 2019; </p>
                     
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[2]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      Interpretation
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        3.1. 	In addition to the above definitions, unless the context requires otherwise: the singular shall include the plural and vice versa;
                      </p>

                      <p>
                        3.2. 	A reference to any one gender, whether masculine or feminine includes the other two;
                      </p> 
                      <p>
                        3.2. 	A reference to "We" "Us" "Our" is a reference to Shop and Deliver Limited,jazabets and or its successors in title and assigns.  </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[3]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      How Your Personal Data Is Collected
                                            </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                    We collect your Personal Data when you interact with us or use our Services in any of the following ways (this list is subject to amendment from time to time as per clause 19 below):

                      <p>
                        4.1. 	Visit, access or use any of thejazabets Services, events, business premises and / or Channels;
                      </p>

                      <p>
                        4.1.2.	Subscribe or register to our Services and products, including but not limited to: betting and gaming services offered at www.BetDonjo.com, promotional offers, tournaments, and competitions;
                      </p>
                      <p>
                        4.1.3.	Participate in any ofjazabets’s platforms, for example discussion boards on our website or social media platforms, promotions or surveys, report a problem with our mobile app, website, Services or products, or ask for more information on a Service or product;
                      </p>
                      <p>
                        4.1.4.	Interact with us as a supplier, agent, merchant, or dealer ofjazabets Services; and
                      </p>
                      <p>
                        4.1.5.	From third party sources, where:
                      </p>
                      <ul>
                        <li>
                        1.	your Personal Data is contained in a public record;
                          </li>
                          <li>2.	where you have deliberately made your Personal Data public;</li>
                          <li>3.	where you have given us consent to collect your Personal Data from a third party;</li>
                          <li>4.	where you have an incapacity, and the guardian appointed has given us consent to collect your Personal Data from a third party;</li>
                          <li>5.	where our collection from a third party would not prejudice your interests; and</li>
                          <li>6.	where our collection of your Personal Data from a third party is necessary:</li>
                          <li>
                            <ul>
                              <li>	to prevent, detect, investigate, prosecute, and punish a crime;</li>
                              <li>	to enforce a law that imposes a pecuniary penalty; or</li>
                              <li>	to protect your interests or the interests of another person.</li>
                            </ul>

                            </li>
                      </ul>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem uuid={preExpandedItems[4]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      The Personal Data We Collect About You                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                    We may collect, use, and store different kinds of Personal Data about you, which we have grouped together as follows:
                      <p>
                      1.	Identity Information - includes name, ID number, age, mobile number, address, date of birth, email address, gender, CCTV images when you visit our premises;
                      </p>

                      <ol>
                        <li>
                        2.	Technical Information - includes the type of mobile device you use, unique device identifiers such as internet protocol (IP) address of your computer or smart phone, or your device's IMEI or serial number or SIM card number of your non-smart phone or feature phone, your login information, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, information about the SIM card used by your device, mobile network information and other technology on the devices you use to access our Channels;
                        </li>
                        <li>
                        3.	Financial Information - includes your transaction information when you withdraw from or deposit into yourjazabets account, information we obtain from fraud prevention agencies, Anti-Money Laundering agencies and any government regulator;
                        </li>
                        <li>
                        4.	Contact Information - includes information stored on your device, including contact lists, call logs, SMS logs, social media friends, followers, and contacts, contact lists from other social media accounts, photos, videos, or other digital content;
                        </li>
                        <li>
                        5.	Log Information - includes details of your use of any of our Channels; including, but not limited to, traffic data, location data, weblogs, and other communication data;
                        </li>
                        <li>
                       6.	Visit Information – includes information about your visit, including the full Uniform Resource Locators (URL) clickstream to, through and from our App, system, and network (including date and time); Services or products you viewed or searched for or requested; page response times, download errors, length of visits to certain pages, page interaction information and any phone number used to request a Service or call our customer service number;
                        </li>
                        <li>
                        7.	Location Information - using GPS technology or other location finding services to determine your current location;
                        </li>
                        <li>
                        8.	Profile Information - includes your social media profiles, your username and password, your interests, feedback personal preferences collected in surveys and recordings.
                        </li>
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem uuid={preExpandedItems[4]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      The Purpose Of Collection And The Lawful Basis                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                    We have set out below, in a table format, a description of all the ways we plan to use your Personal Data and on which lawful bases we rely on to do so. We shall only process your Personal Data if we have your consent for the specific purpose of the processing or if the processing has a lawful bases as set forth in Applicable Laws. These legal bases are, where the processing is necessary :
                      
                      <ol className="list-count-type">
                        <li> 1.	for the performance of an agreement with you;</li>
                        <li> 2.	for our legitimate interests;</li>
                        <li>
                        3.	to comply with a legal obligation;
                        </li>
                        <li>
                        4.	to protect your vital interest;
                        </li>
                        <li>
                        5.	to carry out a task in the public interest; and
                        </li>
                        <li>
                        6.	for historical, statistical, journalistic, literature and are or scientific research.
                        </li>
                        <p>Please note that we may process your personal data for more than one lawful ground depending on the specific purpose for which we are using your data.</p>
                        <li><ul>
                          <p>For administration of the Services and mobile and App platforms</p>

                          <li>
                          •	Identity
                            </li>
                            <li>•	Contact</li>
                            <li>•	Location</li>
                            
                          </ul>
                          <p>
                          For regulatory compliance and to complete  background checks (KYC) on Customers
                            </p>
                            <ul>
                              <li>•	Identity</li>
                              <li>•	Profile</li>
                              <li>•	Contact</li>
                              <li>•	Visit</li>
                            </ul>
                            <p>To support operations in the business and ensure compliance in onboarding</p>
                            <ul>
                              <li>•	Identity</li>
                              <li>•	Profile</li>
                              <li>•	Contact</li>
                              <li>•	Visit</li>
                              <li>• log</li>
                            </ul>
                            <p>To ensure smooth business operations for the Services and the and mobile and App platforms and end to end user experience</p>
                            <ul>
                              <li>•	Identity</li>
                              <li>•	Profile</li>
                              <li>•	Technical</li>
                              
                            </ul>
                            <p>
                            To design and plan Customer interactions with our Services and campaigns. To ensure constant and smooth engagement with Customers
                              </p>
                              <ul>
                              <li>•	Identity</li>
                              <li>•	Profile</li>
                              <li>•	Contact</li>
                              <li>•	Technical</li>
                              <li>•	Visit</li>
                              <li>• log</li>
                              </ul>
                              <p>To ensure smooth business operations for the Services and the and mobile and App platforms and end to end user experience</p>
                              <ul>
                              <li>•	Identity</li>
                              <li>•	Profile</li>
                              <li>•	Contact</li>
                              <li>•	Technical</li>
                              <li>•	Visit</li>
                              <li>• log</li>
                              </ul>
                              <p>
                              To create awareness and promote the company and it's products and increase customer base
                                </p>
                                <ul>
                              <li>•	Profile</li>
                              <li>•	Location</li>
                              <li>•	Visit</li>
                              <li>• log</li>
                              </ul>
                              <p>To Process payments of invoices and reconciliation of accounts</p>
                              <ul>
                              <li>•	Financial information</li>
                                </ul>
                                <p>To effectively administer and manage last expense benefits payments</p>
                                <ul>
                                  <li>•	Next of Kin</li>
                                </ul>
                                <p>For regulatory compliance and to complete  background checks (KYC) on Customers during Customer lifecycle management in the off-boarding of a Customer</p>
                              <ul>
                                <li>•	Preferences</li>
                              </ul>

                          </li>

                        
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[5]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      Lawful Basis For Processing Your Information                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                    In compliance with the relevant local and international data protection laws, we will only process your information in accordance with any of the lawful basis provided for under these laws which include:
                     <ul>
                      <li>1.	The performance of an agreement with you;</li>
                      <li>2.	BetDonjo’s legitimate business interests;</li>
                      <li>3.	Compliance with any mandatory legal obligations;</li>
                      <li>4.	Your consent;</li>
                      <li>5.	Your vital interest; and</li>
                      <li>6.	Public interest.</li>
                     </ul>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem uuid={preExpandedItems[7]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      Special Categories Of Personal Data                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">

                      <p>
                        Through your interaction with any of thejazabets Services, premises, or our Channels, we may collect Sensitive Personal Data about you to the extent that the same is necessary for the full and proper operation of thejazabets Services that we offer to you
Should we wish to process your Sensitive Personal Data, we shall seek your specific consent first and ensure that the processing is necessary for:

                      </p>

                      <ul>
                        <li>1.	the establishment, exercise or defence of a legal claim;.</li>
                        <li>2.	the purposes of carrying out our or your obligations and exercising our or your specific rights; or</li>
                        <li>3.	protecting your vital interests or the vital interests of another person if you are legally incapable of giving consent.</li>
                        
                      </ul>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem uuid={preExpandedItems[8]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      Retention Of Information
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>We shall only retain your Personal Data for as long as reasonably necessary to fulfil the purposes we collected it for, unless our retention is:</p>
                      <ul>
                        <li>
                        1.	required or authorized by law or reasonably necessary for a lawful purpose, for instance for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements;
                        </li>
                        <li>
                        2.	Authorized or consented by you for any reason, including for the purposes of carrying out any obligation to you under an agreement withjazabets; or
                        </li>
                        <li>
                        3.	For historical, statistical, journalistic literature and art or research purposes.
                        </li>
                      </ul>
                      <p>We may retain your Personal Data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect of our relationship with you.</p>
                      <p>To determine the appropriate retention period for personal data, we shall consider:</p>
                      <ul>
                        <li>1.	the amount, nature, and sensitivity of the Personal Data;</li>
                        <li>2.	the potential risk of harm from unauthorized use or disclosure of your Personal Data;</li>
                        <li>3.	the purposes for which we process your Personal Data and whether we can achieve those purposes through other means; and</li>
                        <li>4.	the need to comply with our internal policy and the applicable legal, regulatory, tax, accounting or other requirements.</li>
                      </ul>
                      <p>We shall delete, erase, anonymize or pseudonymize your Personal Data that is not necessary to be retained at the expiry of the retention period.</p>
                      <p><b>Disclosure Of Information</b></p>
                      <p>Any disclosure of your Personal Data shall be in accordance with applicable law and regulations.
We may disclose your Personal Data to:
</p>
<ul>
  <li>1.	law-enforcement agencies, regulatory authorities, courts, or other statutory authorities in response to a demand issued with the appropriate lawful mandate and where the form and scope of the demand is compliant with the law;</li>
  <li>2.	our subsidiaries, associates, partners, merchants, or agents who are involved in deliveringjazabets products and Services you subscribe to or use;</li>
  <li>3.	third parties to whom we may choose to sell, transfer or merge parts of our business or our assets or to whom we may seek to acquire our businesses or merge with;</li>
  <li>4.	fraud prevention and anti-money laundering agencies;</li>
  <li>5.	publicly available and/or restricted government databases to verify your identity information in order to comply with regulatory requirements;</li>
  <li>6.	survey agencies that conduct surveys on behalf ofjazabets; and</li>
  <li>7.	any other person that we are lawfully permitted to share the data with.</li>
</ul>


                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[9]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      Commercial Use Of Data And Direct Marketing                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                      We shall obtain your express consent prior to using your Personal Data for commercial purposes, unless we are authorized under any written law to use your Personal Data for commercial purposes, and we have informed you of such authorization when collecting the data from you.
We shall where possible, anonymize any Personal Data that we use for commercial purposes in such a manner as to ensure that you are no longer identifiable.
We shall obtain your express consent prior to disclosing your Personal Data with any third party for direct marketing purposes. In particular:

                      </p>

                      <ul>
                        <li>
                        1.	you may be required to opt-in or give any other form of explicit consent before receiving marketing messages from us;
                        </li>

                        <li>
                        2.	you have the right to request us to stop sending you marketing messages at any time by:
                        </li>
                        <li>
                          <ul>
                            <li>1.	writing to us or contacting us through our contacts provided in clause 20;</li>
                            <li>2.	checking or unchecking relevant boxes to adjust your marketing preferences; or</li>
                            <li>3.	following the opt-out links on any marketing message sent to you.</li>
                          </ul>
                        </li>
                        
                      </ul>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[10]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      Cookies                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                      Cookies are files with small amount of data that are commonly used as an anonymous unique identifier. These are sent to your browser from our Channels that you visit and are stored on your phone/computer. Subject to your consent, we shall use cookies for the following purposes:
                      </p>
                      <ul>
                        <li>1.	to identify your preferred language so that it can be automatically selected when you return to our Channels;</li>
                     <li>2.	to ensure that the bets you place are associated with your bet slip and account;</li>
                      <li>3.	to ensure that you receive any bonuses that you are eligible for; and</li>
                      <li>4.	to analyse our Channels’ traffic in order to make suitable improvements.</li>
                      </ul>
                      <p>
                      <b>You have the option to either accept or refuse these cookies, as you shall be informed of when you access our website through your phone/computer. Please note that if you choose to refuse our cookies, you may not be able to access some of the features on our Channels.</b>
                      </p>
                      <p>
                      <b>Access To And Updating Your Information</b>
                      </p>
                      <li>To update your information, please contact us by sending an email to the email address provided in clause 20.</li>
                      <p><b>Safeguarding And Protection Of Information</b></p>
                      <li>BetDonjo has put in place appropriate technical, operational and security measures to protect and prevent your Personal Data from unauthorized access, accidental loss, destruction or alteration. In addition, we limit access to your Personal Data to those employees, agents, contractors and third parties who have a business need to know this information. They shall only process your Personal Data on our instructions and shall be subject to a duty of strict confidentiality.
We have further put in place procedures to deal with any suspected and material Personal Data breaches and shall notify you and any applicable regulator of such a breach where we are legally required to do so.
For more information on our safeguarding and security measures, please contact us with the information provided in clause 20.
</li>
                    
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[11]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      International Data Transfers                    </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                      From time to time we may need to transfer your Personal Data outside of Kenya and outside of the country where you are registered as a Customer.                      </p>
                      <p>
                      We shall only transfer your Personal Data outside of Kenya where we have your consent to do so or have a lawful basis for carrying out such a transfer.
                      </p>
                      
                      <p>
                      We shall only transfer your Sensitive Personal Data outside of Kenya upon obtaining your consent and obtaining confirmation of appropriate safeguards.
                      </p>
                      <p>We shall only transfer your Personal Data outside of the scope of the jurisdiction of the Applicable Laws and Data Protection Laws if you are registered as a Customer within those jurisdictions, in accordance with such Applicable Laws.</p>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem uuid={preExpandedItems[12]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      Your Rights                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                      Subject to legal and contractual exceptions, you have rights under Data Protection Laws in relation to your Personal Data. These are listed below:
                      </p>
                      <ul>
                        <li>
                        1.	right to be informed that we are collecting Personal Data about you;
                        </li>
                        <li>2.	right to be informed of the use to which your Personal Data is to be put;</li>
                        <li>3.	right to access the Personal Data that we hold about you and request information about how we process it;</li>
                        <li>4.	right to the correction of your Personal Data where it is false, misleading, inaccurate, or incomplete;</li>
                        <li>5.	right to the erasure of your Personal Data if it is false or misleading;</li>
                        <li>6.	Right to object and withdraw your consent to the processing of your Personal Data, we may continue to process if we have a legitimate or legal reason to do so;</li>
                        <li>7.	right to request restricted processing of your Personal Data noting that unless the data is being stored, we will only process such data with your consent or as legally obligated by any Applicable Laws or as required by a court or government authority to protect the rights of another person. We will inform you before withdrawing the restriction on processing of the personal data.; and</li>
                        <li>8.	right to data portability that is the right to receive Personal Data concerning you in a structured, commonly used and machine-readable format and to have such data shared with another data controller or processor in an efficient and easy manner.</li>
                      </ul>
                      <p>If you wish to exercise any of the rights set out above, please contact us as per the information provided in clause 20.</p>
                      <p>We may need to request specific information from you to help us confirm your identity and ensure your right to access your Personal Data (or to exercise any of your other rights). This is a security measure to ensure that Personal Data is not disclosed to any person who has no right to receive it. We may also contact you to ask you for further information in relation to your request to speed up our response.</p>
                    <p>We endeavour to respond to all legitimate requests within reasonable time. Occasionally it could take us longer if your request is particularly complex or you have made a number of requests. In this case, we will notify you and keep you updated on the estimated response time.</p>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem uuid={preExpandedItems[13]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      Help Contribute To The Protection Of Your Personal Data                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                      You can help maintain the security of your Personal Data by undertaking the following helpful tips:
                      </p>
                      <ol className="list-count-type">
                        <li>
                        1.	do not share your phone number, ID number, account password or betting patterns (such as amounts and time) with anyone;
                        </li>
                        <li>
                        2.	change your account password on a regular basis;
                        </li>
                        <li>
                        3.	remember to sign off after visiting our Channels;
                        </li>
                        <li>
                        4.	informjazabets of any changes that occur in your Personal Data to facilitate maintenance of accurate and up-to-date records;
                        </li>
                        <li>
                        5.	do not send any of your Personal Data via non-encrypted e-mail; and
                        </li>
                        <li>
                        6.	do not supply your Personal Data to any website that you do not know or trust.
                        </li>
                      </ol>
                      
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[14]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      Right To Lodge Complaint                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel ">
                      <p>
                      You have the right to lodge a complaint with the Kenyan Data Commissioner or equivalent supervisory authority in accordance with the Applicable Laws, that operate within the country of operation where you are registered as a customer.
                      </p>
                      <p><b>Non Compliance With This Privacy Policy</b></p>
                      <ul>
                        <li>
                          {" "}
                         jazabets reserves the right to terminate any agreement with you for failure to comply with the provisions of this Privacy Policy and its {<a href="/terms-and-conditions">Terms and Conditions</a> }
                          and reject any application for information contrary to this Privacy Policy.
                        </li>
                        
                      </ul>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[15]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      Amendments To This Privacy Policy                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                     jazabets reserves the right to amend any part of this Privacy Policy, to the extent permissible by law. Where such an amendment is made, We shall notify you via our Channels and you should check our Channels frequently to stay up to date with any recent changes. Unless stated otherwise, our current Privacy Policy applies to all Personal Data that we have about you and your account.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[16]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                      Our Contacts                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>Should you have any further queries or questions about the processing of your Personal Data, our full contact details are as follows:</p>
                      <ol className="list-count-type">
                        <li>
                        Name: Bet Tena
                        </li>
                        
                          {/* <li>Email address:{ <a href="mailto:operations@BetDonjo.com ">operations@BetDonjo.com</a> }</li> */}
                        
                          {/* <li>Adress : 
                            </li> */}
                        <li>Telephone number:0111513541 </li>
                        <li> Data Protection Officer</li>
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                  
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="item6">
        <div className={"footer-mobile-none"}>
          <Footer />
        </div>
      </div>
    </div>
  );
});

export default React.memo(PrivacyPolicy);
