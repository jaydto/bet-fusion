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
import SideBar from "../../sidebar/awesome/Sidebar";
import "../../test.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
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

  const handleClose = () => {
    dispatchRedux(setState("show_menu", false));
  };

  useEffect(() => {
    if (show == true) handleClose();
  }, []);

  const preExpandedItems = [1,2,3,4,5,6,7,8,9,10,11,12]; // Add all the keys here


  return (
    <div className={"flex-item"}>
      <div className="flex-container height-default-body top-diff-pages">
        <div className="item1">
          {" "}
          <SideBar loadCompetitions />
        </div>
        <div className="item2" style={{ width: "100%" }}>
          <div className="gz home w-100">
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
              <div className="col-md-12 mt-1 p-1 text-white accordion-container">
                <Accordion
                  allowMultipleExpanded={false}
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
                        The purpose of this privacy policy is to inform
                        individuals about how BetNare collects, uses, discloses,
                        and protects personal information. It serves as a
                        transparent and comprehensive document that outlines the
                        data practices of BetNare.
                      </p>

                      <p>
                        BetNare acknowledges the significance of your privacy
                        and recognizes your concern regarding the usage and
                        sharing of your information online. We hold the privacy
                        of all our site visitors in high regard, committing to
                        collect and utilize information only in ways that are
                        beneficial to you and align with both your rights and
                        our legal obligations.
                      </p>

                      <p>
                        Kindly review this Policy attentively and make sure you
                        comprehend its contents. If you disagree with our
                        policies, please refrain from using this Website. Your
                        access to this Website or creation of an Account
                        signifies your agreement with this Policy. When
                        registering for an Account, you must read and accept
                        this Policy. If you do not accept or agree with this
                        Policy, it is imperative that you cease using this
                        Website immediately.
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
                      <p>
                        "Account" refers to an account necessary for accessing
                        and/or utilizing specific areas and features on Our
                        Site.
                      </p>

                      <p>
                        "Our Site" or "Website" denotes this website,
                        betnare.com, or any variation or successor thereof, as
                        well as any other website provided by the Company or
                        Data Processor for accessing the services, products, or
                        games offered by the Company or Data Processor at
                        various times.{" "}
                      </p>

                      <p>
                        “Personal Data” refers to any personal information about
                        a natural person that enables that individual to be
                        identified directly or indirectly by reference to the
                        data provided.{" "}
                      </p>
                      <p>
                        "Kenyan Law" encompasses The Constitution of Kenya, the
                        Access to Information Act, 2016 (Act No. 31 of 2016 of
                        the Laws of Kenya), the Kenya Information and
                        Communications Act, 1998 (Act No. 2 of 1998 of the Laws
                        of Kenya), the Data Protection Act, 2019 of Kenya (Act
                        No. 24 of 2019 of the Laws of Kenya), and any other
                        pertinent law in Kenya related to privacy and data
                        protection.
                      </p>
                      <p>
                        "Personal data" involves any information related to an
                        identified or identifiable natural person, including
                        obvious identifiers like name, as well as identification
                        numbers, location, online identifiers, and/or factors
                        specific to the physical, physiological, genetic,
                        mental, economic, cultural, or social identity of that
                        person.
                      </p>
                      <p>
                        "GDPR" refers to the General Data Protection Regulation
                        2016/679 of the European Union.
                      </p>
                      <p>"EEA" stands for the European Economic Area.</p>
                      <p>
                        "Terms and Conditions" signifies our General Terms and
                        Conditions, accepted by you when opening an Account.
                      </p>
                      <p>
                        Reference to a statute or statutory provision includes
                        amendments, extensions, supplements, or re-enactments
                        over time. It also encompasses any subordinate
                        legislation made under that statute or statutory
                        provision.
                      </p>
                      <p>
                        The Website is intended for access only by individuals
                        residing in the Republic of Kenya.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[2]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        SCOPE
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        This Privacy Policy pertains solely to your utilization
                        of Our Site and does not encompass any linked websites,
                        whether provided by us or shared by other users. We lack
                        control over the data collection, storage, or usage
                        practices of other websites. It is recommended that you
                        review the privacy policies of such websites before
                        furnishing any data to them.
                      </p>

                      <p>
                        Upon accepting this Policy, you willingly and
                        unequivocally provide consent for the sharing of your
                        personal data, specifically for or in connection with
                        the provision of services or products by the Company to
                        you, as outlined in the Terms and Conditions,
                        periodically.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[3]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        DATA COLLECTED
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>We collect the following information:</p>

                      <p>
                        Data will only be collected if you voluntarily submit it
                        and consent when signing up for an Account. Depending
                        upon your use of Our Site, we may collect, use, store,
                        and transfer some or all of the following data:
                      </p>
                      <ol className="list-count-type">
                        <li>Phone Number</li>
                        <li>Name</li>
                        <li>IP address (automatically collected)</li>
                        <li>
                          Transaction data including details about payments to
                          and from you and other details of products and
                          services you have acquired from us
                        </li>
                      </ol>

                      <p>
                        You have the privilege to access your personal data at
                        any time to update or modify any information that may be
                        outdated or changed. If you suspect that any personal
                        information we have about you is inaccurate, kindly
                        reach out to our customer services via email at
                        operations@betnare.com and we will promptly correct any
                        identified inaccuracies.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem uuid={preExpandedItems[4]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        DATA USAGE
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        All personal data is securely stored in compliance with
                        Kenyan Law and, where applicable, the GDPR. We utilize
                        and process your data to deliver an optimal online
                        experience and provide you with gambling services. This
                        encompasses:
                      </p>
                      <ol className="list-count-type">
                        <li>Enrolling you as a new customer</li>
                        <li>Managing and overseeing your Account</li>
                        <li>
                          Facilitating and overseeing your access to Our Site
                        </li>
                        <li>Providing our products and services to you</li>
                        <li>
                          Handling and executing your instructions or requests,
                          including payment management
                        </li>
                        <li>
                          Informing you of alterations to our Terms and
                          Conditions or this Policy
                        </li>
                        <li>
                          Inviting you to share feedback or participate in
                          surveys
                        </li>
                        <li>Addressing communications from you</li>
                        <li>Conducting market research</li>
                        <li>
                          Analyzing your usage of Our Site and collecting
                          feedback for continuous improvement of Our Site, our
                          services, products, and your user experience
                        </li>
                        <li>
                          Mitigating fraud, cheating, money laundering, and
                          other illicit activities
                        </li>
                        <li>
                          Monitoring and identifying potential issues related to
                          problem gambling
                        </li>
                        <li>
                          Adhering to licensing and regulatory obligations
                        </li>
                        <li>
                          Enabling your participation in prize draws,
                          competitions, or surveys
                        </li>
                        <li>
                          Providing suggestions and recommendations about our
                          goods or services that may interest you.
                        </li>
                      </ol>

                      <p>
                        In certain instances, data collection may be mandated by
                        statutory or contractual requirements. We commit to
                        processing your personal data lawfully, equitably, and
                        transparently, without compromising your rights. We will
                        only process your personal data if at least one of the
                        following conditions applies;
                      </p>
                      <ol className="list-count-type">
                        <li>
                          To provide services and products to you in alignment
                          with our Terms and Conditions or as outlined in this
                          Policy.
                        </li>
                        <li>
                          We may utilize your personal data for marketing
                          purposes, subject to the personal data control
                          mechanisms specified below.
                        </li>
                        <li>
                          If there is a necessity to use your personal data for
                          a purpose not directly related, we will inform you and
                          obtain your consent. Your agreement and consent to our
                          communication with you for this purpose are
                          acknowledged as a legitimate and authorized use of
                          your personal data.
                        </li>
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[5]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        DATA STORAGE
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        We retain your data only for the duration necessary to
                        fulfill the purposes outlined in this policy or for as
                        long as you grant us permission. Periodically, we
                        conduct an annual review to assess the continued
                        necessity of retaining your data. If your data is no
                        longer required, it will be deleted in accordance with
                        the guidelines set forth in our Information Security
                        Policy and Data Protection Policy.
                      </p>

                      <p>
                        We guarantee the safe and secure treatment of your data
                        in accordance with the GDPR, Kenyan Law, and the Data
                        Protection Act of 2019. To ensure the protection of your
                        data, we have implemented the following safeguards:
                      </p>

                      <p>
                        We prioritize information security and have established
                        effective physical, electronic, and managerial
                        procedures to secure and protect data gathered through
                        Our Site.
                      </p>
                      <p>
                        Measures we undertake to ensure the security and
                        protection of your data include having a dedicated
                        Information Security team, alignment with ISO 27001, and
                        an operational Information Security Management System
                        (ISMS).
                      </p>
                      <p>
                        Despite the security precautions we implement, it's
                        crucial to acknowledge that the internet transmission of
                        data may not be entirely secure. While we make every
                        effort to safeguard your personal data, we cannot ensure
                        the absolute security of data transmitted to Our
                        Website. The transmission is undertaken at your own
                        risk, and we recommend taking appropriate precautions
                        when sending data to us via the Internet. Once we
                        receive your information, stringent procedures, and
                        security features are employed to prevent unauthorized
                        access.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem uuid={preExpandedItems[6]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        RIGHT TO WITHHOLD INFORMATION AND YOUR RIGHT TO WITHDRAW
                        INFORMATION
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        In certain instances, you can access specific areas of
                        Our Site without furnishing any data. However, to fully
                        utilize all features and functions on Our Site, you may
                        need to submit or allow the collection of specific data.
                      </p>

                      <p>
                        If you wish to revoke your consent for us to use your
                        personal data as outlined in this policy, you can do so
                        by reaching out to us at operations@betnare.com.
                        However, it's important to note that such withdrawal may
                        impact our ability to provide you with the best possible
                        products and services.
                      </p>

                      <p>
                        You possess the legal right to request a copy of any of
                        your personal data held by us (where such data is
                        stored). For more information on how to initiate a
                        subject access request, please contact us at
                        operations@betnare.com.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[7]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        GDPR PRIVACY POLICY (DATA PROTECTION RIGHTS)
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        We want to ensure that you are fully informed about your
                        data protection rights. Each user is entitled to the
                        following:
                      </p>
                      <ol className="list-count-type">
                        <li>
                          The right to access – You can request copies of your
                          personal data.
                        </li>
                        <li>
                          The right to rectification – You can request
                          corrections for any information you believe is
                          inaccurate. Additionally, you have the right to ask us
                          to complete information you deem incomplete.
                        </li>
                        <li>
                          The right to erasure – You can request the deletion of
                          your personal data under certain conditions.
                        </li>
                        <li>
                          The right to restrict processing – You can request
                          limitations on the processing of your personal data
                          under certain conditions.
                        </li>
                        <li>
                          The right to object to processing – You can object to
                          our processing of your personal data under certain
                          conditions.
                        </li>
                        <li>
                          The right to data portability – You can request the
                          transfer of the data we have collected to another
                          organization or directly to you under certain
                          conditions.
                        </li>
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[8]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        CHILDREN INFORMATION
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <ol className="list-count-type">
                        <li>
                          This Website is not intended for individuals under 18
                          years of age. No one under the age of 18 should submit
                          any information on or through this Website, and we do
                          not knowingly gather personal information from
                          individuals under 18. If you are under 18, please
                          refrain from using or providing any information on
                          this Website or its features, registering on this
                          Website, or disclosing any information about yourself,
                          such as your name, telephone number, or any screen
                          name or username. If we become aware that we have
                          unintentionally collected personal information from an
                          individual under 18 without verifying parental
                          consent, we will promptly delete that information. If
                          you believe we may have information from or about an
                          individual under 18, please contact us at
                          operations@betnare.com.
                        </li>
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[9]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        CHANGES TO OUR PRIVACY POLICY
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <ol className="list-count-type">
                        <li>
                          We reserve the right to modify this Policy as deemed
                          necessary periodically or as mandated by law. Any
                          revisions will be promptly posted on Our Site, and
                          your initial use of Our Site following these changes
                          will be considered as your acceptance of the updated
                          Privacy Policy terms. We advise checking this page
                          regularly to stay informed about any updates.
                        </li>
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[10]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        ENTITY REFERENCE
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        This App is developed and maintained by [Betnare/Beyond
                        InToch/John Jayd]. Reference to this entity can be found
                        on the app's Google Play listing.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid={preExpandedItems[11]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        PRIVACY CONTACT
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                      For any inquiries or concerns regarding this Privacy
                        Policy or the handling of user data, please contact:
                        [+254701087777, tech@betnare.com]
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                 
                </Accordion>
              </div>
            </div>
          </div>
        </div>
        <div className="item3 mobile-remove">
          <Right test={true} />
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
