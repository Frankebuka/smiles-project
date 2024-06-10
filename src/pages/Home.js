import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Line } from "rc-progress";
import { toast } from "react-toastify";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdHealthAndSafety } from "react-icons/md";
import { GiHazardSign } from "react-icons/gi";
import { AiFillEnvironment } from "react-icons/ai";
import hands from "../images/hands.avif";

const features = [
  {
    name: "Create an account",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi vitae lobortis.",
    icon: 1,
  },
  {
    name: "Start a Campaign",
    description:
      "Qui aut temporibus nesciunt vitae dicta repellat sit dolores pariatur. Temporibus qui illum aut.",
    icon: 2,
  },
  {
    name: "Promote your Campaign",
    description:
      "Rerum quas incidunt deleniti quaerat suscipit mollitia. Amet repellendus ut odit dolores qui.",
    icon: 3,
  },
];

const feature = [
  {
    name: "Education",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: HiOutlineAcademicCap,
  },
  {
    name: "Medical",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: MdHealthAndSafety,
  },
  {
    name: "Environment",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: AiFillEnvironment,
  },
  {
    name: "Disaster Relief",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: GiHazardSign,
  },
];

export default function Home() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "campaigns");
        const q = query(listingRef, orderBy("timestamp", "desc"), limit(8));
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listing");
      }
    }

    fetchListings();
  }, []);

  return (
    <div className="bg-white">
      <main className="mt-14">
        {/* Hero section */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src={hands}
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">
                    Connecting issues that
                  </span>
                  <span className="block text-indigo-200">
                    matter with people who care
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center text-xl text-indigo-200 sm:max-w-3xl">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/create-campaign"
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 sm:px-8"
                    >
                      Start a Campaign
                    </Link>
                    <Link
                      to="/campaigns"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                    >
                      Explore Campaign
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section with grid */}
        <div className="relative bg-white py-16 sm:py-24 lg:pb-24 lg:pt-12">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            {/* <h2 className="text-lg font-semibold text-cyan-600">
              Deploy faster
            </h2> */}
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Raising Funds on Smiles takes just a few clicks
            </p>
            <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
              Phasellus lorem quam molestie id quisque diam aenean nulla in.
              Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
              condimentum id viverra nulla.
            </p>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="pt-6">
                    <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border p-3 shadow-lg">
                            <h3
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            >
                              {feature.icon}
                            </h3>
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                          {feature.name}
                        </h3>
                        <p className="mt-5 text-base text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns section */}
        <div className="relative bg-gray-50 py-16 sm:py-20">
          <div className="relative">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Recent Campaigns
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-md gap-8 px-4 sm:max-w-lg sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:px-8">
              {listings?.map((listing) => (
                <div
                  key={listing.id}
                  className="relative flex flex-col overflow-hidden rounded-lg shadow-lg"
                >
                  <Link
                    to={`/category/${listing.type}/${listing.id}`}
                    className="flex-shrink-0 cursor-pointer"
                  >
                    <img
                      className="h-48 w-full object-cover"
                      src={listing.imgUrls[0]}
                      loading="lazy"
                      alt={listing.name}
                    />
                    <Moment
                      className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
                      fromNow
                    >
                      {listing.timestamp?.toDate()}
                    </Moment>
                  </Link>
                  <div className="flex flex-1 flex-col justify-between bg-white px-6 pb-6 pt-3">
                    <div className="flex-1">
                      <span className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">
                          {listing.title}&middot;
                        </p>
                        <p className="mt-2 mb-4 tracking-wider text-base text-gray-500 line-clamp-2">
                          {listing.description}
                        </p>
                      </span>
                    </div>

                    <Line
                      percent={parseInt(
                        (+listing.donatedAmount * 100) / +listing.targetAmount
                      )}
                      strokeWidth="2"
                      strokeColor={
                        +listing.donatedAmount < +listing.targetAmount
                          ? "green"
                          : "red"
                      }
                    />

                    <div className="flex items-center mt-[15px] justify-between">
                      <div className="flex items-center space-x-1">
                        <p className="font-bold text-xs">
                          Target:$
                          {listing.targetAmount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <p className="font-bold text-xs">
                          $
                          {listing.donatedAmount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          (
                          {parseInt(
                            (+listing.donatedAmount * 100) /
                              +listing.targetAmount
                          )}
                          %)
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/category/${listing.type}/${listing.id}`}
                      className="text-sm mt-3 font-medium text-blue-600 hover:text-blue-800"
                    >
                      <span className="hover:underline">Donate</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link
            to="/campaigns"
            className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 mt-16"
          >
            <h2 className="text-lg font-semibold text-blue-600 hover:underline hover:text-blue-800 cursor-pointer">
              Show more campaigns
            </h2>
          </Link>
        </div>

        {/* Gradient Feature Section */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-700">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              What can i Campaign for?
            </h2>
            {/* <p className="mt-4 max-w-3xl text-lg text-purple-200">
              Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et
              magna sit morbi lobortis. Blandit aliquam sit nisl euismod mattis
              in.
            </p> */}
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
              {feature.map((feature) => (
                <div key={feature.name}>
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white bg-opacity-10">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-purple-200">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white">
          <div className="mx-auto max-w-4xl py-16 px-4 sm:px-6 sm:py-24 lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Get started with Smiles</span>
              <span className="-mb-1 block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text pb-1 text-transparent">
                Create an account and promote your campaign.
              </span>
            </h2>
            <div className="mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-5">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
              >
                Learn more
              </a>
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-50 px-4 py-3 text-base font-medium text-indigo-800 shadow-sm hover:bg-indigo-100"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
