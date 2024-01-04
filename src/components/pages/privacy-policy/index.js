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

  const preExpandedItems = [1,2,3,4,5,6,7,8,9,20,11,12,13,14,15,16,17,18,19,20,21,22,23]; // Add all the keys here


  const handleClose = () => {
    dispatchRedux(setState("show_menu", false));
  };

  useEffect(() => {
    if (show == true) handleClose();
  }, []);

  return (
    <div className={"flex-item"}>
      <div className="flex-container height-default-body top-diff-pages">
        <div className="item1">
          {" "}
          {/* <SideBar loadCompetitions /> */}
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
                        1.1. The purpose of this privacy policy is to inform
                        individuals about how BetNare collects, uses, discloses,
                        and protects personal information. It serves as a
                        transparent and comprehensive document that outlines the
                        data practices of BetNare.
                      </p>

                      <p>
                        1.2. BetNare acknowledges the significance of your
                        privacy and recognizes your concern regarding the usage
                        and sharing of your information online. We hold the
                        privacy of all our site visitors in high regard,
                        committing to collect and utilize information only in
                        ways that are beneficial to you and align with both your
                        rights and our legal obligations.
                      </p>

                      <p>
                        1.3. Kindly review this Policy attentively and make sure
                        you comprehend its contents. If you disagree with our
                        policies, please refrain from using this Website. Your
                        access to this Website or creation of an Account
                        signifies your agreement with this Policy. When
                        registering for an Account, you must read and accept
                        this Policy. If you do not accept or agree with this
                        Policy, you must cease using this Website immediately.
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
                        2.1. "Account" refers to an account necessary for
                        accessing and/or utilizing specific areas and features
                        on Our Site.
                      </p>

                      <p>
                        2.2. "Our Site" or "Website" denotes this website,
                        betnare.com, or any variation or successor thereof, as
                        well as any other website provided by the Company or
                        Data Processor for accessing the services, products, or
                        games offered by the Company or Data Processor at
                        various times.
                      </p>

                      <p>
                        2.3. “Personal Data” refers to any personal information
                        about a natural person that enables that individual to
                        be identified directly or indirectly by reference to the
                        data provided.
                      </p>
                      <p>
                        2.4. "Kenyan Law" encompasses The Constitution of Kenya,
                        the Access to Information Act, 2016 (Act No. 31 of 2016
                        of the Laws of Kenya), the Kenya Information and
                        Communications Act, 1998 (Act No. 2 of 1998 of the Laws
                        of Kenya), the Data Protection Act, 2019 of Kenya (Act
                        No. 24 of 2019 of the Laws of Kenya), and any other
                        pertinent law in Kenya related to privacy and data
                        protection.
                      </p>
                      <p>
                        2.5. "Personal data" involves any information related to
                        an identified or identifiable natural person, including
                        obvious identifiers like name, as well as identification
                        numbers, location, online identifiers, and/or factors
                        specific to the physical, physiological, genetic,
                        mental, economic, cultural, or social identity of that
                        person.
                      </p>
                      <p>
                        2.6. "GDPR" refers to the General Data Protection
                        Regulation 2016/679 of the European Union.
                      </p>
                      <p>2.7. "EEA" stands for the European Economic Area.</p>
                      <p>
                        2.8. "Terms and Conditions" signifies our General Terms
                        and Conditions, accepted by you when opening an Account.
                      </p>
                      <p>
                        2.9. Reference to a statute or statutory provision
                        includes amendments, extensions, supplements, or
                        re-enactments over time. It also encompasses any
                        subordinate legislation made under that statute or
                        statutory provision.
                      </p>
                      <p>
                        2.10. The Website is intended for access only by
                        individuals residing in the Republic of Kenya.
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
                        3.1. This Privacy Policy pertains solely to your
                        utilization of Our Site and does not encompass any
                        linked websites, whether provided by us or shared by
                        other users. We lack control over the data collection,
                        storage, or usage practices of other websites. It is
                        recommended that you review the privacy policies of such
                        websites before furnishing any data to them.
                      </p>

                      <p>
                        3.2. Upon accepting this Policy, you willingly and
                        unequivocally consent to sharing your data, specifically
                        for or in connection with the provision of services or
                        products by the Company to you, as outlined in the Terms
                        and Conditions, periodically.
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
                        4.1. We gather your personally identifiable information
                        through your engagement with us or utilization of our
                        services, encompassing but not limited to the following
                        methods (this list is not exhaustive):
                      </p>

                      <p>
                        4.1.1. Visit, engage with, or utilize any of BetNare's
                        services, events, business locations, and communication
                        platforms.
                      </p>
                      <p>
                        4.1.2. Enrolling or signing up for our services and
                        products, which encompass, but are not restricted to,
                        betting and gaming services provided at
                        https://www.betnare.com/, promotional deals,
                        tournaments, and competitions.
                      </p>
                      <p>
                        4.1.3. Engaging in any of BetNare's platforms, such as
                        discussion boards on our website or social media
                        channels, participating in a promotion or survey hosted
                        by us, reporting issues with our mobile app, website,
                        service, or product, or seeking additional information
                        about a service or product.
                      </p>
                      <p>
                        4.1.5. We might obtain your information from sources
                        other than yourself, such as fraud prevention agencies
                        and marketing agencies. Notification of the data
                        collection from third parties will be provided to you in
                        advance or as promptly as possible after the data has
                        been collected.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                 <AccordionItem uuid={preExpandedItems[4]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        THE DATA WE COLLECT
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        The data we gather and retain regarding your
                        interactions with us, as outlined above, may encompass,
                        but is not restricted to the following:
                      </p>

                      <ol>
                        <li>
                          Personal Information - We might gather personal
                          details when you sign up for or utilize our services.
                          This information could consist of but is not limited
                          to, your name, ID number, age, mobile number, address,
                          date of birth, email address, gender, username,
                          password, CCTV images from your visits to our
                          premises, details from your social media profiles,
                          personal preferences obtained through surveys, and
                          recorded information.
                        </li>
                        <li>
                          Technical information, which may encompass the kind of
                          mobile device you utilize, distinct device identifiers
                          like the internet protocol (IP) address of your
                          computer or smartphone, or the IMEI, serial number, or
                          SIM card number of your non-smartphone or feature
                          phone. Additionally, it includes your login details,
                          browser type, and version, time zone settings, types
                          and versions of browser plug-ins, operating system,
                          and platform, as well as details about the SIM card
                          utilized in your device and mobile network
                          information.
                        </li>
                        <li>
                          Financial information, which encompasses details of
                          your transactions when you withdraw from or deposit
                          into your BetNare account. This includes information
                          obtained from fraud prevention agencies, Anti-Money
                          Laundering agencies, and any government regulator.
                        </li>
                        <li>
                          {" "}
                          Content information, comprises data stored on your
                          device, such as contact lists, call logs, SMS logs,
                          social media friends, followers, and contacts. This
                          also includes contact lists from other social media
                          accounts, as well as digital content like photos,
                          videos, and other similar data.
                        </li>
                        <li>
                          {" "}
                          Log information, which includes specifics of your
                          utilization of any of our communication platforms.
                          This encompasses but is not limited to, traffic data,
                          location data, weblogs, and other forms of
                          communication data.
                        </li>
                        <li>
                          Details regarding your visit, including the complete
                          Uniform Resource Locators (URLs) clickstream to,
                          through, and from our app, as well as information
                          about your system and network (including date and
                          time). This encompasses the services or products you
                          viewed, searched for, or requested, along with page
                          response times, download errors, duration of visits to
                          specific pages, page interaction details, and any
                          phone number used to request a service or contact our
                          customer service number.
                        </li>
                        <li>
                          You have the privilege to access your data at any time
                          to update or modify any information that may be
                          outdated or changed. If you suspect that any personal
                          information we have about you is inaccurate, kindly
                          reach out to our customer services via email at
                          operations@betnare.com. We will promptly correct any
                          identified inaccuracies.
                        </li>
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>

                 <AccordionItem uuid={preExpandedItems[4]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        HOW WE USE DATA
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        All personal data is securely stored in compliance with
                        Kenyan Law and, where applicable, the GDPR. We utilize
                        and process your data to deliver an optimal online
                        experience and provide you with gambling services. We
                        acknowledge the trust and confidence that our customers
                        and visitors to our channels place in us as a service
                        provider. In reciprocation, BetNare is transparent about
                        the reasons for collecting your information. We may
                        utilize your information for the following purposes
                        (this list is not exhaustive):
                      </p>
                      <ol className="list-count-type">
                        <li> Enrolling you as a new customer</li>
                        <li> Managing and overseeing your Account</li>
                        <li>
                          Facilitating and overseeing your access to Our Site
                        </li>
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
                        <li>
                          To carry out our obligations arising from any
                          agreements entered into between you and BetNare and to
                          provide you with the information, products, and
                          services that you request or agree to receive from us.
                        </li>
                        <li>
                          Marketing activities to notify you about changes to
                          our services and products, keeping you informed about
                          new products and services unless you opt out of
                          receiving marketing messages.
                        </li>
                        <li>
                          {" "}
                          To comply with any legal or regulatory requirement.
                        </li>
                        <li>
                          {" "}
                          Understanding your use of our services to ensure that
                          content from our Channels is presented most
                          effectively for you and your computer, your mobile
                          phone, or other device you use to access our Channels.
                        </li>
                        <li> To respond to any of your queries.</li>
                        <li>
                          To administer our Channels and for internal
                          operations, including troubleshooting, data analysis,
                          testing, research, statistical, and survey purposes to
                          improve our Channels.
                        </li>
                        <li>
                          To allow you to participate in interactive features of
                          our services and products when you choose to do so.
                        </li>
                        <li>
                          In business practices like quality control and
                          training.
                        </li>
                        <li>
                          To measure or understand the effectiveness of
                          advertising we serve to you and others, and to deliver
                          (with your consent) relevant advertising to you.
                        </li>
                        <li>
                          Providing aggregated data (this data is anonymized) to
                          third parties for research and scientific purposes;
                          and the information we collect from third parties
                          enables us to offer you the services under any
                          agreement entered into with BetNare.
                        </li>
                      </ol>

                      <p>
                        In certain instances, data collection may be mandated by
                        statutory or contractual requirements. We commit to
                        processing your data lawfully, equitably, and
                        transparently, without compromising your rights. We will
                        only process your data if at least one of the following
                        conditions applies;
                      </p>
                      <ol className="list-count-type">
                        <li>
                          To provide services and products to you in alignment
                          with our Terms and Conditions or as outlined in this
                          Policy.
                        </li>
                        <li>
                          If there is a necessity to use your data for a purpose
                          not directly related, we will inform you and obtain
                          your consent. Your agreement and consent to our
                          communication with you for this purpose are
                          acknowledged as a legitimate and authorized use of
                          your data.
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
                        long as you permit us. Periodically, we conduct an
                        annual review to assess the continued necessity of
                        retaining your data. If your data is no longer required,
                        it will be deleted by the guidelines outlined in our
                        Information Security Policy and Data Protection Policy.
                      </p>

                      <p>
                        We guarantee the safe and secure treatment of your data
                        per the GDPR, Kenyan Law, and the Data Protection Act of
                        2019. To ensure the protection of your data, we have
                        implemented the following safeguards:
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
                        effort to safeguard your data, we cannot ensure the
                        absolute security of data transmitted to Our Website.
                        The transmission is undertaken at your own risk, and we
                        recommend taking appropriate precautions when sending
                        data to us via the Internet. Once we receive your
                        information, stringent procedures, and security features
                        are employed to prevent unauthorized access.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[6]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        SPECIAL CATEGORY OF DATA
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        By engaging with any of BetNare's services, locations,
                        or communication platforms, we may obtain sensitive
                        personal information about you, such as your race,
                        ethnicity, religious or philosophical beliefs, political
                        opinions, details about your health (when subscribing to
                        our responsible gaming procedures), sexual orientation,
                        and biometric data. If we intend to disclose sensitive
                        personal data concerning you to third parties, we will
                        seek your consent beforehand.{" "}
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                 <AccordionItem uuid={preExpandedItems[7]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        LAWFUL BASIS FOR PROCESSING YOUR DATA
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        Adhering to applicable local and international data
                        protection laws, we will only handle your information in
                        alignment with any lawful basis outlined in these laws.
                        These may include;
                      </p>

                      <ul>
                        <li>Fulfillment of an agreement with you.</li>
                        <li>BetNare’s legitimate business interests.</li>
                        <li>Adherence to mandatory legal obligations.</li>
                        <li>Your consent.</li>
                        <li>Your vital interests.</li>
                        <li>Considerations of public interest.</li>
                      </ul>
                    </AccordionItemPanel>
                  </AccordionItem>

                 <AccordionItem uuid={preExpandedItems[8]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        LAWFUL BASIS FOR PROCESSING YOUR DATA
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <ul>
                        <li>
                          We will retain your data only for a duration that is
                          reasonably necessary to fulfill the purposes for which
                          it was collected. This includes meeting legal,
                          regulatory, tax, accounting, or reporting
                          requirements, as well as fulfilling obligations under
                          any agreement with BetNare. In circumstances involving
                          complaints or if there is a reasonable belief in the
                          potential for litigation regarding our relationship
                          with you, we may retain your personal data for an
                          extended period.
                        </li>
                        <li>
                          {" "}
                          To determine the appropriate retention period, we take
                          into account factors such as the quantity, nature, and
                          sensitivity of the personal data, the potential risk
                          of harm from unauthorized use or disclosure, the
                          purposes of processing, the feasibility of achieving
                          those purposes through alternative means, adherence to
                          internal policies, and compliance with applicable
                          legal, regulatory, tax, accounting, or other
                          requirements.
                        </li>
                        <li>
                          {" "}
                          Anonymized information that can no longer be linked to
                          you may be retained indefinitely.
                        </li>
                      </ul>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[9]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        DISCLOSURE OF INFORMATION
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        {" "}
                        The disclosure of your information will adhere to
                        relevant laws and regulations.
                      </p>
                      <p> We might share your information with:</p>

                      <ul>
                        <li>
                          Law enforcement agencies, regulatory authorities,
                          courts, or other statutory bodies will receive
                          information in response to a demand issued with the
                          appropriate lawful mandate, provided that the form and
                          scope of the demand comply with the law.{" "}
                        </li>

                        <li>
                          {" "}
                          Our subsidiaries, associates, partners, merchants, or
                          agents are involved in providing BetNare’s products
                          and services you subscribe to or use.
                        </li>
                        <li>
                          Fraud prevention and Anti-Money Laundering agencies.
                        </li>
                        <li>
                          {" "}
                          Publicly available and/or restricted government
                          databases to verify your identity information to
                          comply with regulatory requirements.
                        </li>
                        <li>
                          Survey agencies conducting surveys on behalf of
                          BetNare.
                        </li>
                        <li>
                          Any other person deemed legitimately necessary to
                          share the data with. Before sharing your personal data
                          with any third party for direct marketing purposes, we
                          will obtain your express consent.
                        </li>
                      </ul>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[10]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        DIRECT MARKETING
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        You might need to actively choose or provide explicit
                        consent before receiving marketing communications from
                        us.
                      </p>
                      <p>
                        You have the option to request that we cease sending you
                        marketing messages at any point by communicating with us
                        in writing, adjusting your marketing preferences through
                        relevant checkboxes, using opt-out links in received
                        marketing messages, or reaching out to us through the
                        provided contact information.
                      </p>
                      <p>
                        If you decide to opt out of marketing messages, please
                        note that this will not affect personal data provided to
                        us as a result of previously taken-up products or
                        services, prior product or service experiences, or other
                        transactions.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[11]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        COOKIES
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        13.1. Cookies are small data files often employed as
                        anonymous unique identifiers. They are transmitted to
                        your browser from the Channels you visit and are stored
                        on your computer or phone. We utilize cookies for the
                        following purposes:{" "}
                      </p>
                      <p>
                        You have the option to request that we cease sending you
                        marketing messages at any point by communicating with us
                        in writing, adjusting your marketing preferences through
                        relevant checkboxes, using opt-out links in received
                        marketing messages, or reaching out to us through the
                        provided contact information.
                      </p>
                      <ol>
                        <li>
                          {" "}
                          To recognize the user's preferred language,
                          facilitating automatic selection upon their return to
                          our Channels.
                        </li>
                        <li>
                          To associate bets placed by the customer with their
                          bet slip and account.
                        </li>
                        <li>
                          To ensure the customer receives eligible bonuses.
                        </li>
                        <li>
                          {" "}
                          For the analysis of traffic on our Channels, enabling
                          us to make appropriate improvements.
                        </li>
                      </ol>
                      <p>
                        13.2. You can choose to either accept or decline these
                        cookies and be notified when a cookie is being sent to
                        your computer or phone. If you opt to decline our
                        cookies, it may impact your ability to use certain
                        features of our Channels.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                 <AccordionItem uuid={preExpandedItems[12]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        ACCESS TO AND UPDATING YOUR INFORMATION
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        For access, correction, or updating of your information,
                        please send an email to operations@betnare.com.{" "}
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                 <AccordionItem uuid={preExpandedItems[13]}>
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
                          data.
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
                      <p>
                        {" "}
                        If you would like to exercise any of the aforementioned
                        rights, please reach out to us at operations@betnare.com{" "}
                      </p>
                      <p>
                        {" "}
                        To ensure the security of your personal data and confirm
                        your identity or verify your right to access your
                        personal information (or exercise any other rights), we
                        may need to request specific information from you. This
                        is a precautionary measure to prevent the disclosure of
                        personal data to unauthorized individuals. We might also
                        get in touch with you to obtain additional information
                        to expedite our response.
                      </p>
                      <p>
                        {" "}
                        We strive to address all legitimate requests within a
                        reasonable timeframe. However, if your request is
                        particularly complex or if you've made multiple
                        requests, it may take us longer to respond. In such
                        cases, we will notify you and provide updates on our
                        progress.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[14]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        HELP CONTRIBUTE TO THE PROTECTION OF YOUR INFORMATION
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-button">
                      <p>
                        {" "}
                        You can help maintain the security of your data in the
                        following ways;
                      </p>
                      <ol>
                        <li>
                          {" "}
                          Refrain from sharing your phone number, ID number,
                          account password, or betting patterns (such as amounts
                          and time) with anyone.
                        </li>
                        <li> Regularly update your account password.</li>
                        <li>Always sign off after visiting our Channels.</li>
                        <li>
                          {" "}
                          Assist BetNare in maintaining accurate and updated
                          records by promptly notifying us of any changes in
                          your situation so that we can update our records
                          accordingly.
                        </li>
                        <li>
                          Avoid sending confidential information via
                          non-encrypted email.
                        </li>
                        <li>
                          {" "}
                          Exercise caution and refrain from providing your
                          personal information to any site that you do not know
                          or trust.
                        </li>
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[15]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        RIGHTS TO LODGE COMPLAINTS
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <p>
                        You are entitled, according to relevant laws, to file a
                        complaint regarding personal data protection. In this
                        regard, the Office of the Data Protection Commissioner
                        Kenya will handle and resolve such complaints.{" "}
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[16]}>
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
                 <AccordionItem uuid={preExpandedItems[17]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        NON-COMPLIANCE WITH THIS STATEMENT
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <ol className="list-count-type">
                        <li>
                          BetNare reserves the right to terminate any agreement
                          with you if you fail to adhere to the stipulations
                          outlined in this Privacy Policy and its Terms and
                          Conditions. Additionally, BetNare retains the right to
                          decline any request for information that goes against
                          the principles laid out in this Privacy Policy.{" "}
                        </li>
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[18]}>
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
                        </li>{" "}
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[19]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        SAFEGUARDING AND PROTECTING DATA
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <ol className="list-count-type">
                        <li>
                          BetNare has implemented adequate measures to safeguard
                          our users' data, aiming to prevent unauthorized
                          access, alteration, unlawful or accidental
                          destruction, cybercrime, and accidental loss. While
                          we, as a service provider, exert reasonable efforts to
                          protect your personal information from loss, misuse,
                          or alteration by third parties, it's important to
                          acknowledge that transmitting information over the
                          Internet inherently carries some level of risk.
                          BetNare is committed to taking reasonable and
                          appropriate technical and organizational measures to
                          counter unauthorized or unlawful interference with
                          customers' data. In the event of a security
                          compromise, we will strive to notify users as soon as
                          reasonably practicable.{" "}
                        </li>{" "}
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[20]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        ACCESS TO AND UPDATING YOUR INFORMATION
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <ol className="list-count-type">
                        <li>
                          For access, correction, or updating of your
                          information, please send an email to
                          operations@betnare.com.{" "}
                        </li>{" "}
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[21]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        RIGHT TO WITHHOLD INFORMATION AND YOUR RIGHT TO WITHDRAW
                        INFORMATION
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <ol className="list-count-type">
                        <li>
                          In certain instances, you can access specific areas of
                          Our Site without furnishing any data. However, to
                          fully utilize all features and functions on Our Site,
                          you may need to submit or allow the collection of
                          specific data.{" "}
                        </li>
                        <li>
                          {" "}
                          If you wish to revoke your consent for us to use your
                          data as outlined in this policy, you can do so by
                          reaching out to us at operations@betnare.com or
                          filling out a self-exclusion form on Our site
                          https://www.betnare.com/responsible-gambling. However,
                          it's important to note that such withdrawal may impact
                          our ability to provide you with the best possible
                          products and services.
                        </li>
                        <li>
                          You possess the legal right to request a copy of any
                          of your data held by us (where such data is stored).
                          For more information on how to initiate a subject
                          access request, please contact us at
                          operations@betnare.com
                        </li>
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[22]}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button">
                        ACCESS TO AND UPDATING YOUR INFORMATION
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion-item-panel">
                      <ol className="list-count-type">
                        <li>
                          For access, correction, or updating of your
                          information, please send an email to
                          operations@betnare.com.{" "}
                        </li>{" "}
                      </ol>
                    </AccordionItemPanel>
                  </AccordionItem>
                 <AccordionItem uuid={preExpandedItems[23]}>
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