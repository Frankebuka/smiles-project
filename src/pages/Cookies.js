import React from "react";
import { Link } from "react-router-dom";

const Cookies = () => {
  return (
    <div
      id="campaignText"
      className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 text-center"
    >
      <div className="space-y-8 mb-8">
        <h1 className="font-bold">Hopensmiles Cookie Policy</h1>
        <p>
          This Cookie Policy ("Cookie Policy") provides information about how
          and when we use cookies and similar technologies on the Hopensmiles's
          website ("Website") and the choices that you have. It forms part of
          Hopensmiles's{" "}
          <a
            href="#"
            className="text-green-600 font-bold hover:underline hover:text-red-500"
          >
            <Link to="/privacy-policy">Privacy Policy</Link>
          </a>
          .
        </p>
        <p>
          Like most websites, our servers automatically collect certain
          technical information when you visit our Website, including your
          Internet Protocol address, browser type, browser language, the date
          and time of your visit, the referring URL, and, if you have visited
          our Website before, one or more cookies that may uniquely identify
          your browser. We also collect information about your activities on the
          Website, such as the pages you access.
        </p>
        <p>
          These technologies help our Website function, allow us to understand
          how you use our services, assist us with our promotional or marketing
          efforts, and have a number of purposes that you can read about in this
          Cookie Policy. More information on cookies can be found at{" "}
          <a
            href="https://www.aboutcookies.org/"
            className="text-green-600 font-bold hover:underline hover:text-red-500"
          >
            www.aboutcookies.org
          </a>
          .
        </p>
        <p>
          Where required by the law, when you first visit the Website, you will
          be asked to consent to the use of cookies and similar technologies on
          the Website, and if you accept we will use these technologies.
        </p>
        <p>
          If you do not want us to use cookies as described in this Cookie
          Policy you may disable their use. Please note: if you do disable
          cookies, the performance of the Website may be affected and you may
          not be able to take advantage of the full range of services we offer.
        </p>
      </div>
    </div>
  );
};

export default Cookies;
