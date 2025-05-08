/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import * as React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className={"text-justify px-10"}>
      <Head>
        <title>Privacy Policy | College Road Trip</title>
        <meta
          name="description"
          content="At College Road Trip, we are committed to protecting your privacy. Learn more about our privacy policy."
        />
      </Head>
      <h2 className="text-center mt-10 font-bold text-2xl mb-2">
        Privacy policy
      </h2>
      <p>
        <span className="text-primary font-bold">College Road Trip</span> ("us",
        "we", or "our") operates https://www.crtafrica.com (the "Site").
        This page informs you of our policies regarding the collection, use, and
        disclosure of Personal Information we receive from users of the Site.
      </p>
      <br />
      <h2 className="font-bold">Information Collection and Use</h2>
      <p>
        While using our Site, we may ask you to provide us with certain
        personally identifiable information that can be used to contact or
        identify you. Personally identifiable information may include but is not
        limited to, your name, email address, mailing address, and phone number
        ("Personal Information"). We may use your Personal Information to
        contact you with newsletters, marketing or promotional materials and
        other information that may be of interest to you. You may opt out of
        receiving any, or all, of these communications from us by following the
        unsubscribe link or instructions provided in any email we send.
      </p>
      <br />
      <h2 className="font-bold">Log Data</h2>
      <p>
        Like many site operators, we collect information that your browser sends
        whenever you visit our Site ("Log Data"). This Log Data may include
        information such as your computer's Internet Protocol ("IP") address,
        browser type, browser version, the pages of our Site that you visit, the
        time and date of your visit, the time spent on those pages, and other
        statistics. In addition, we may use third-party services such as Google
        Analytics that collect, monitor, and analyse this data.
      </p>
      <br />
      <h2 className="font-bold">Communications</h2>
      <p>
        We may use your Personal Information to contact you with newsletters,
        marketing or promotional materials and other information that may be of
        interest to you. You may opt out of receiving any, or all, of these
        communications from us by following the unsubscribe link or instructions
        provided in any email we send. Cookies Cookies are files with small
        amounts of data, which may include an anonymous unique identifier.
        Cookies are sent to your browser from a website and stored on your
        computer's hard drive. Like many sites, we use ("cookies") to collect
        information. You can instruct your browser to refuse all cookies or to
        indicate when a cookie is being sent. However, if you do not accept
        cookies, you may not be able to use some portions of our Site.
      </p>
      <br />
      <h2 className="font-bold">Security</h2>
      <p>
        The security of your Personal Information is important to us, but
        remember that no method of transmission over the Internet, or method of
        electronic storage, is 100% secure. While we strive to use commercially
        acceptable means to protect your Personal Information, we cannot
        guarantee its absolute security. Changes to This Privacy Policy This
        Privacy Policy is effective as of the date stated at the top of this
        page and will remain in effect except with respect to any changes in its
        provisions in the future, which will be in effect immediately after
        being posted on this page. We reserve the right to update or change our
        Privacy Policy at any time and you should check this Privacy Policy
        periodically. Your continued use of the Service after we post any
        modifications to the Privacy Policy on this page will constitute your
        acknowledgement of the modifications and your consent to abide by and be
        bound by the modified Privacy Policy.
      </p>
      <br />
      <h2 className="font-bold">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at privacy@College Road Trip.io
      </p>
    </div>
  );
};

export default PrivacyPolicy;
