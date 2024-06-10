import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div
      id="campaignText"
      className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 text-center"
    >
      <div className="space-y-8 mb-8">
        <h1 className="font-bold">Hopensmiles Privacy Policy</h1>
        <p>
          Hopensmiles respects your privacy. We collect information to provide
          services to you, update you on the impact of your contributions, and
          communicate about promotions or special services. Hopensmiles
          recognizes that we must maintain and use your information responsibly.
        </p>
      </div>
      <div className="darken space-y-8 mb-8  bg-gray-50">
        <h1 className="font-bold">Privacy Policy Overview</h1>
        <p>
          This policy describes what personal data we collect, how we use it,
          and your choices.
        </p>
        <p>
          We collect information from you when you{" "}
          <span className="font-bold">visit and take actions</span> on our
          website. We use this information to provide the services you've
          requested. We use <span className="font-bold">cookies</span> (such as
          Google Analytics) to provide a better experience and improve our
          website and <span className="font-bold">web beacons</span> and similar
          technologies to track usage patterns and conduct marketing.
        </p>
        <p>
          You can access your data, edit your preferences, download your data,
          or revoke consent by visiting your account. Except for the purposes
          outlined below,{" "}
          <span className="font-bold">
            we will not trade, share, or sell your personal data with anyone.
          </span>{" "}
          Refer to the policy for complete details.
        </p>
        <p>
          Our Privacy Policy takes into account the requirements of the{" "}
          <a href="#" className="font-bold hover:underline">
            General Data Protection Regulation ("GDPR")
          </a>
          . If you are based in the European Economic Area, we will transfer
          your personal data to the United States pursuant Standard contractual
          clauses for personal data transfer to third countries.
        </p>
        <p>
          If you have any questions about our Privacy Policy, please contact us
          at <span className="font-bold">info@hopensmiles.org.</span>
        </p>
      </div>
      <div>
        <ol
          className="grid grid-cols-2 pl-14 gap-4 space-y-4 my-8 md:grid-cols-3"
          style={{ listStyleType: "number" }}
        >
          <li className="hover:underline hover:text-red-400">
            <a href="#">Information We Collect</a>
          </li>
          <li className="hover:underline hover:text-red-400">
            <a href="#">Use of Information</a>
          </li>
          <li className="hover:underline hover:text-red-400">
            <a href="#">Disclosure of Personal Data</a>
          </li>
          <li className="hover:underline hover:text-red-400">
            <a href="#">Cookies</a>
          </li>
          <li className="hover:underline hover:text-red-400">
            <a href="#">Information about Children</a>
          </li>
          <li className="hover:underline hover:text-red-400">
            <a href="#">Your Rights</a>
          </li>
          <li className="hover:underline hover:text-red-400">
            <a href="#">Retention</a>
          </li>
          <li className="hover:underline hover:text-red-400">
            <a href="#">Links to Other Websites</a>
          </li>
          <li className="hover:underline hover:text-red-400">
            <a href="#">Safeguarding Your Information</a>
          </li>
          <li className="hover:underline hover:text-red-400">
            <a href="#">Data Storage</a>
          </li>
          <li className="hover:underline hover:text-red-400">
            <a href="#">Transfer of Data</a>
          </li>
          <li className="hover:underline hover:text-red-400">
            <a href="#">Privacy Policy Updates</a>
          </li>
          <li className="hover:underline hover:text-red-400">
            <a href="#">Contact Us</a>
          </li>
        </ol>
      </div>
      <div className="space-y-8">
        <p>
          By continuing to access or use Hopensmiles.org (our 'Website'), you
          agree to be legally bound by this Privacy Policy and the Terms of
          Service. These Terms and Supplementary Terms may be modified from time
          to time and the changes will be posted on our Website (we will notify
          you of these where appropriate).
        </p>
        <p>
          This policy applies to information collected by the Hopensmiles
          Foundation and Hopensmiles Canada through all channels, including
          online and offline donations.
        </p>
        <p>
          Hopensmiles.org is operated by Hopensmiles Foundation, a 501(c)(3)
          organization (EIN: 30-0108263) based in District of Vancouver, British
          Columbia, Canada. A registered organization in Canada and charity
          number 1122823 and registered company number 5824642, together
          "Hopensmiles".
        </p>
        <p>
          For the purposes of the applicable data protection law, including the
          GDPR, Hopensmiles UK (registered company number 5824642 and registered
          charity number 1122823, whose registered office is at 10 Queen Street
          Place, London, EC4R 1BE, United Kingdom) and Hopensmiles Foundation (1
          Thomas Circle NW, Suite 800, Washington, DC 20005, United States) are
          joint data controllers for the processing of your personal data.
        </p>
      </div>
      <div className="space-y-8 my-8">
        <h1 className="font-bold">Information We Collect</h1>
        <div>
          <p className="font-bold mb-2">
            Information Collected from Website Visitors
          </p>
          <p>
            As a visitor to our Website, Hopensmiles's servers automatically
            record certain information, such as your Internet Protocol ("IP")
            address (so we understand which country you are connecting from when
            you visit the Website), your operating system, your browser ID, your
            browsing activity on our site, and other information about how you
            interacted with our Website, which can be used to identify you. We
            may collect this information also through the use of cookies or
            other tracking technologies (please read the{" "}
            <a
              href="#"
              className="text-green-500 font-bold hover:underline hover:text-red-600"
            >
              <Link to="/cookies">"Cookies" section below</Link>
            </a>{" "}
            for more information).
          </p>
        </div>
        <p>
          You may choose to interact with our Website by entering data into form
          fields and providing personal data to Hopensmiles, such as giving us
          your name, email address, and password when signing up for an account,
          filling out an application, making a donation, or creating an account
          to post comments on pages, projects, or our blog.
        </p>
        <p>
          We only collect personal data that is reasonable or necessary to
          accomplish the purpose of your interaction with Hopensmiles as a
          visitor to our Website. You may choose not to provide this information
          but you need to understand that as a result, you may not be able to
          engage in certain activities on the Website. Any personal data
          provided by you as a visitor to the Website will be used only as
          described in this Privacy Policy.
        </p>
        <div>
          <p className="font-bold mb-2">
            Information Collected from Registered Users
          </p>
          <p>
            We collect information when you create an account on our Website,
            edit your account information, donate to a project, apply to join
            Hopensmiles as an organization, or send or use a gift card, as
            described below.
          </p>
        </div>
        <div>
          <p className="font-bold mb-2">Creating an Account:</p>
          <p>
            When you create an account on our Website, we collect{" "}
            <span className="font-bold">basic information</span> about you -
            your name and email address. You can choose to provide additional
            information, such as your mailing address, a photo, favorite
            projects, etc., if you create a profile or create a Hopensmiles
            fundraiser.
          </p>
        </div>
        <div>
          <p className="font-bold mb-2">Making a Donation:</p>
          <p>
            When you make an online donation on Hopensmiles.org, we collect
            personal data such as your name, billing address, and email address,
            if you have not previously provided these details during a prior
            session. We collect information about your donation, including the
            project you are donating to and the amount of your donation. We also
            collect (but <span className="font-bold">do not retain</span>)
            credit card numbers which are processed by a third-party payment
            vendor subject to the Payment Card Industry Data Security Standards.
            If you use PayPal, Apple Pay, M-PESA/M-Changa, or a similar service,
            their use of your information is based on their terms of service and
            policies, not ours, so we encourage you to review those policies
            carefully.
          </p>
          <p className="mt-8">
            We may also ask you to share a brief description about why you
            decided to donate to your selected cause(s) along with your name and
            general location. If you elect to provide this optional information,
            we will share your comments with the organization(s) you have
            donated to and may also publicly share this information to inspire
            other visitors to follow your generous example.
          </p>
        </div>
        <div>
          <p className="font-bold mb-2">Gift Cards:</p>
          <p>
            When you give a Hopensmiles Gift Card, we collect payment and
            contact information from you, as well as the name, email address,
            and mailing address of your recipient. You may create a personal
            message to the recipient, which is stored on our servers. Except in
            the limited circumstances described below, we do not read or use
            your personal messages.
          </p>
          <p className="mt-8">
            If you are the recipient of a Hopensmiles Gift Card, we collect
            information from you when you redeem the Card to make a donation.
            Please note that we may share this information with the individual
            or entity who gave you the gift card.
          </p>
        </div>
        <div>
          <p className="font-bold mb-2">
            Donations in Honor/Memory of Someone:
          </p>
          <p>
            When you make a donation in honor or memory of a loved one, we
            collect payment and contact information about you, as well as the
            name, email address, and mailing address of the recipient. You may
            create a personal message to the recipient, which is stored on our
            servers. Except in the limited circumstances described below, we do
            not read or use your personal messages.
          </p>
        </div>
        <div>
          <p className="font-bold mb-2">Contests, Promotions, and Surveys:</p>
          <p>
            Periodically, Hopensmiles may invite you to participate in contests,
            take advantage of special promotions, and complete online surveys.
            If you have created a Hopensmiles account or profile, information we
            collect from these contests, promotions, and surveys may be
            associated with you personally.
          </p>
        </div>
        <div>
          <p className="font-bold mb-2">Creating a Fundraiser:</p>
          <p>
            When you create a fundraiser for a project on Hopensmiles, we
            collect information about projects you propose or wish to support.
            Hopensmiles notifies the project leader when a fundraiser is
            established for their project, but does not share your personal data
            with the project leader or the project. Remember, however, that
            anything you post on your fundraiser site will be seen by visitors
            to the Website.
          </p>
          <p className="mt-8">
            If you donate to a fundraiser, then we will also share your name and
            the date and amount of your donation with the person who created the
            fundraiser unless you elect to be anonymous.
          </p>
        </div>
        <div>
          <p className="font-bold mb-2">
            Information Obtained From Other Sources
          </p>
          <p>
            We may obtain information about you from public records and from
            databases like OFAC when conducting due diligence on nonprofit
            organization or conducting fraud prevention checks on donations.
          </p>
        </div>
      </div>
      <div>
        <h1 className="font-bold mb-2">Use of Information</h1>
        <p className="mb-8">
          Hopensmiles uses the personal data that you provide or we obtain, and
          the technical information logged by our servers to process your
          donations, to:
        </p>
        <ul className="pl-4 space-y-8" style={{ listStyleType: "revert" }}>
          <li>
            Notify your friends and family about your donation in their honor if
            you ask us to;
          </li>
          <li>
            Using the technical information logged by our servers when you visit
            our Website (described above) to improve your experience on our
            Website (such as remembering your name, the items in your Cart, or
            your preferences) and preventing fraudulent activity;
          </li>
          <li>
            If you ask us to delete your data or to be removed from our
            marketing lists and we are required to fulfil your request, we will
            keep basic data to identify you and prevent further unwanted
            processing;
          </li>
          <li>
            We may anonymize the information that we collect and use such
            anonymized data for statistical and market research purposes,
            including sharing it with affiliates, business partners, and
            academic researchers;
          </li>
          <li>
            Operate the Website, market and advertise our services, and operate
            our business; and
          </li>
          <li>
            Compile aggregate statistics that allow us to understand how
            visitors or registered users use our Website, and to make
            improvements in design and content to better serve you.
          </li>
        </ul>
      </div>
      <div className="space-y-8 mt-12">
        <h1 className="font-extrabold">Disclosure of Personal Data</h1>
        <p>
          We will share your personal data with our agents, representatives,
          service providers and contractors in order to process your donations,
          offer you services in connection with our Website, communicate news
          and information about Hopensmiles, provide customer service, mail gift
          cards, notify the project(s) you elect to support about your donation,
          claiming Gift Aid from UK government, marketing and advertising, and
          complete financial transactions. These service providers are
          authorized to use your personal data only to the extent necessary to
          serve these purposes, or as otherwise authorized by this policy.{" "}
          <span className="font-bold">
            Except for the purposes outlined herein, we will not trade, share,
            or sell a donor's personal data with anyone else.
          </span>
        </p>
        <p>
          Unless you ask us not to, we share your personal data under the
          following circumstances:
        </p>
        <ul className="pl-4 space-y-8" style={{ listStyleType: "revert" }}>
          <li>
            When you <span className="font-bold">donate to a project,</span> we
            share your name and contact information and the amount of your
            donation with the{" "}
            <span className="font-bold">
              project leader and organization running that project.
            </span>
          </li>
          <li>
            When you <span className="font-bold">donate to a fundraiser,</span>{" "}
            we share your name and the date and amount of your donation with the{" "}
            <span className="font-bold">
              person who created the fundraiser.
            </span>
          </li>
          <li>
            When you make a donation that is part of a{" "}
            <span className="font-bold">
              campaign sponsored by your employer,
            </span>{" "}
            and/or when your employer is being asked to match your donation, we
            will share your name, email address and the amount of you donation
            with your employer.
          </li>
          <li>
            When you decide to{" "}
            <span className="font-bold">
              post a comment or share why you supported a cause,
            </span>{" "}
            we will share and attribute your comment on our site publicly and
            with the cause you have supported;
          </li>
          <li>
            Each time you make a donation, however,{" "}
            <span className="font-bold">
              we will give you the opportunity to tell us not to share your
              personal data
            </span>{" "}
            in the ways described above (except in the case of employer matched
            donations) by selecting to be "
            <span className="font-bold">anonymous</span>" during the checkout
            process.
          </li>
        </ul>
        <p>
          If Hopensmiles merges with, or becomes an affiliate of another
          organization, we will ensure the confidentiality of any personal data
          involved in such transactions and provide notice before personal data
          is transferred and becomes subject to a different privacy policy.
        </p>
        <p>
          We may also be required to disclose your personal data in the
          following circumstances: (1) we need to respond to a subpoena, court
          order or legal process, including to meet national security or law
          enforcement requirements; (2) an emergency situation requires
          disclosure before your permission can be obtained (e.g., situations
          involving potential threats to personal safety), or; (3) we determine
          that disclosure is needed to protect our rights or property, or the
          rights or property of another person, in which case we will implement
          appropriate safeguards to ensure that your personal data continues to
          be protected.
        </p>
        <p>
          We may share aggregated demographic and statistical information with
          our other partners. This is not linked to any personal data that can
          identify any individual person.
        </p>
        <p>
          We may partner with third-party advertising networks and exchanges to
          manage and serve our advertising on other sites and may share personal
          information of visitors with them for this purpose. We and our
          third-party partners may use cookies and other tracking technologies,
          such as pixels and web beacons, to gather information about your
          activities on our Websites and other sites in order to provide you
          with targeted advertising based on your browsing activities and
          interests. For more information about cookies and other tracking
          technologies, please see our{" "}
          <a
            href="#"
            className="text-green-500 font-bold hover:underline hover:text-red-600"
          >
            Cookie Policy.
          </a>
        </p>
        <div className="space-y-8 mt-12">
          <h1 className="font-extrabold">
            <Link to="/cookies">Cookies</Link>
          </h1>
          <p>
            Like most websites, our servers automatically collect certain
            technical information when you visit our Website, including your IP
            address, browser type, browser language, the date and time of your
            visit, the referring URL, and, if you have visited our Website
            before, one or more cookies that may uniquely identify your browser.
            We also collect information about your activities on the Website,
            such as the pages you access.
          </p>
          <p>
            In order to collect this information, the Website places a cookie on
            your hard drive. A cookie is a small file containing a string of
            characters that is sent to your computer when you visit a website.
            When you visit the website again, the cookie allows that site to
            recognize your browser. Cookies may store user preferences and other
            information. We also use web beacons and other technologies to track
            usage patterns.
          </p>
          <p>
            We use several tools to collect information about use of this
            Website. These tools collect information such as how often you visit
            this Website, what pages you visit when you do so, what elements you
            interact with, what other sites you used prior to coming to this
            Website, or 3rd-party audience data (such as age, gender and
            interests). We use the information we get from these tools to
            improve our Website, for website analysis and statistics and respond
            to service requests you make.
          </p>
          <p>
            Where required by the law, when you first visit the Website, you
            will be asked to consent to the use of cookies on the Website, and
            if you accept we will store cookies on your computer.
          </p>
          <p>
            For more details on our use of cookies and similar technologies,
            please refer to our{" "}
            <a
              href="#"
              className="text-green-500 font-bold hover:underline hover:text-red-600"
            >
              <Link to="/cookies">Cookie Policy.</Link>
            </a>
          </p>
        </div>
      </div>
      <div className="space-y-8 mt-12">
        <h1 className="font-extrabold">Information about Children</h1>
        <p>
          Hopensmiles.org is a general audience website and does not collect
          information about a visitor's age. We do, from time to time, partner
          with other organizations to educate children about philanthropy in
          general and our work in particular. In those cases, we do not collect
          personal data from a visitor on pages specifically designed for
          children.
        </p>
        <p>
          We do not knowingly collect or store any personal data about children
          under the age of 16 and we do not offer any of our products or
          services directly to children under the age of 13.
        </p>
      </div>
      <div className="space-y-8 mt-12">
        <h1 className="font-extrabold">Your Rights</h1>
        <p>
          <span className="font-bold">Right to access:</span> You can access
          your account information or make changes or updates at any time by
          going to the My Account page. We do our best to keep your data
          accurate and up to date, to the extent that you provide us with the
          information we need to do so. If your data changes (for example, if
          you have a new email address), then you are responsible for notifying
          us of those changes.
        </p>
        <p>
          <span className="font-bold">Right to erasure:</span> If you wish to
          delete your account or have you information removed from our system,
          you can do so by sending an email to{" "}
          <span className="font-bold">info@hopensmiles.org</span>. For privacy
          and security, requests must come from the email address tied to your
          account.
        </p>
        <p>
          <span className="font-bold">Right to rectification:</span> If your
          personal data is inaccurate or incomplete, you are entitled to ask
          that we correct or complete it. If we shared your personal data with
          others, we will tell them about the correction where possible. If you
          ask us, and where possible and lawful to do so, we will also tell you
          with whom we shared your personal data so you can contact them
          directly.
        </p>
        <p>
          <span className="font-bold">Right to restrict processing:</span> You
          may ask us to restrict or 'block' the processing of your personal data
          in certain circumstances, such as where you contest the accuracy of
          the data or object to us processing it (please read below for
          information on your right to object). We will tell you before we lift
          any restriction on processing. If we shared your personal data with
          others, we will tell them about the restriction where possible. If you
          ask us, and where possible and lawful to do so, we will also tell you
          with whom we shared your personal data so you can contact them
          directly.
        </p>
        <p>
          <span className="font-bold">Right to data portability:</span> You have
          the right to obtain your personal data from us that you consented to
          give us or that was provided to us as necessary in connection with our
          contract with you. We will give you your personal data in a
          structured, commonly used and machine-readable format. You may reuse
          it elsewhere.
        </p>
        <p>
          <span className="font-bold">Right to restrict processing:</span> You
          may ask us to restrict or 'block' the processing of your personal data
          in certain circumstances, such as where you contest the accuracy of
          the data or object to us processing it (please read below for
          information on your right to object). We will tell you before we lift
          any restriction on processing. If we shared your personal data with
          others, we will tell them about the restriction where possible. If you
          ask us, and where possible and lawful to do so, we will also tell you
          with whom we shared your personal data so you can contact them
          directly.
        </p>
        <p>
          <span className="font-bold">Right to object:</span> You may ask us at
          any time to stop processing your personal data, and we will do so:
        </p>
        <ul className="pl-4 space-y-8" style={{ listStyleType: "revert" }}>
          <li>
            If we are relying on a legitimate interest (described in this
            Privacy Policy) to process your personal data -- unless we
            demonstrate compelling legitimate grounds for the processing; or
          </li>
          <li>If we are processing your personal data for direct marketing.</li>
        </ul>
        <p>
          <span className="font-bold">Right to withdraw consent:</span> If we
          rely on your consent to process your personal data you have the right
          to withdraw that consent at any time, but this will not affect any
          processing of your data that has already taken place.
        </p>
        <p>
          <span className="font-bold">
            Right to lodge a complaint with the data protection authority:
          </span>{" "}
          If you have a concern about our privacy practices, including the way
          we handled your personal data, you can report it to the Information
          Commissioner's Office (ICO) (details on how to do so can be found on
          the ICO's website) or other data protection authority that is
          authorized to hear those concerns.
        </p>
        <p>
          In addition, when you create an account or profile on our Site, you
          can decide whether to make some or all of that information public or
          private. You can change your choices at any time using the My Profile
          page. Please note, however, that your preferences do not affect the
          disclosures to project leaders or fundraisers. So, for example, if you
          make a donation to a fundraiser, then we will display your name and
          date of your donation on the fundraiser regardless of your profile
          settings. Likewise, if you contribute to a project, we will share your
          name and contact information with the project leader. In each case we
          will give you the opportunity to tell us not to disclose your personal
          data with the project leader, or publish it on the website or in our
          annual report. You may ask us to change the anonymous settings on past
          donations by emailing us at{" "}
          <span className="font-bold">info@hopensmiles.org.</span>
        </p>
      </div>
      <div className="space-y-8 mt-12">
        <h1 className="font-extrabold">Retention</h1>
        <p>
          We will retain donor's information for as long as donor's account is
          active or as long as needed to provide our services. We may also
          retain and use your personal data in order to comply with our
          contractual or legal obligations, audit requirements, resolve
          disputes, and prevent abuse.
        </p>
      </div>
      <div className="space-y-8 mt-12">
        <h1 className="font-extrabold">Links to Other Websites</h1>
        <p>
          Other websites, including those of our partners (links to which appear
          on Hopensmiles.org), have their own privacy policies. When you provide
          personal data at one of those sites, you are subject to the privacy
          policy of the operator of that site, not the Hopensmiles Privacy
          Policy. We encourage you to read that policy before submitting any
          personal data.
        </p>
        <p>
          You should take additional steps to safeguard your personal data
          online. To learn more about how to protect yourself, visit the{" "}
          <a
            className="hover:underline hover:text-red-500"
            href="https://www.consumer.ftc.gov/topics/privacy-identity-online-security"
          >
            Federal Trade Commission website
          </a>{" "}
          (US) or the{" "}
          <a
            className="hover:underline hover:text-red-500"
            href="https://www.ftc.gov/legal-library/browse/cooperation-agreements/us-canada-cooperation-agreement"
          >
            Canada Cooperation Agreement - Federal Trade Commission.
          </a>
        </p>
      </div>
      <div className="space-y-8 mt-12">
        <h1 className="font-extrabold">Safeguarding Your Information</h1>
        <p>
          Hopensmiles understands the importance of keeping your information
          secure and confidential. We take reasonable and appropriate measures
          to protect personal data from loss, misuse and unauthorized access,
          disclosure, alteration and destruction, taking into account the risks
          involved in the processing and the nature of the personal data.
        </p>
        <p>
          We follow industry best practices and standards for security. We use a
          variety of physical and technical measures, policies, and procedures
          (such as access control procedures, network firewalls, encrypting data
          at rest, encrypting data in transit, and physical security) designed
          to protect our systems and your Personal Information.
        </p>
      </div>
      <div className="space-y-8 mt-12">
        <h1 className="font-extrabold">Data Storage</h1>
        <p>
          Your data will be stored on servers of our hosting service providers
          in the United States (Amazon Web Services, which is certified to the
          Privacy Shield). We will take all steps reasonably necessary to ensure
          that your data is treated securely and in accordance with this Privacy
          Policy and US and EEA data protection legislation.
        </p>
      </div>
      <div className="space-y-8 mt-12">
        <h1 className="font-extrabold">Transfer of Data</h1>
        <p>
          The European Commission has determined that the transfer of personal
          information of its residents outside of Europe must be subject to a
          legal framework that adequately protects it. To that end, we transfer
          personal information of European Economic Area (“EEA”) and Swiss
          residents to the U.S. (or elsewhere) based the use of the Standard
          Contractual Clauses (also known as “Model Clauses”).{" "}
          <a
            className="hover:underline hover:text-red-500"
            href="https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en"
          >
            Per the European Commission
          </a>
          , this standard agreement ensures sufficient safeguards for data to be
          transferred internationally.
        </p>
      </div>
      <div className="space-y-8 mt-12">
        <h1 className="font-extrabold">Privacy Policy Updates</h1>
        <p>
          Our Privacy Policy is regularly reviewed to make sure we continue to
          serve the privacy interests of our customers. If our information
          practices change materially, we will notify you of these policy
          changes by posting them on the privacy page of this website and we
          will ensure that these changes are brought to your attention.
        </p>
      </div>
      <div className="space-y-8 mt-12">
        <h1 className="font-extrabold">Contact Us</h1>
        <p>
          Individuals with inquiries or complaints regarding our Privacy Policy
          should contact us by using the "Contact Us" links on the footer of our
          Website or by sending an email to{" "}
          <span className="text-bold">info@hopensmiles.org</span>. We try to
          reply promptly to every message we receive. This information is used
          to respond directly to your questions or comments. We also may file
          your comments and share them with our customer care team to improve
          our service in the future. Hopensmiles commits to resolve complaints
          about our processing of your personal data.
        </p>
      </div>
      <div className="darken space-y-8 my-8  bg-gray-50">
        <h1 className="font-extrabold">
          Still have questions about our privacy policy?
        </h1>
        <p>
          Write to us at <span className="font-bold">info@hopensmiles.org</span>{" "}
          or Contact us at:
        </p>
        <p>
          Hopensmiles office address is at 15307-84 Avenue Surrey, Vancouver,
          British Columbia, Canada. V3S-2N2.
        </p>
        <p>
          Canada Phone: <span className="font-bold">+1 (778) 318-5289</span>
        </p>
        <p>
          US Phone: <span className="font-bold">+1 (510) 963-3727</span>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
