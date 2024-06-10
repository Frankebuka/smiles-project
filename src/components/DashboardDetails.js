import { useEffect, useState } from "react";
import { ScaleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { RiRegisteredFill } from "react-icons/ri";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { HiAcademicCap } from "react-icons/hi";
import { MdHealthAndSafety } from "react-icons/md";
import { AiFillEnvironment } from "react-icons/ai";
import { GiHazardSign } from "react-icons/gi";

export default function DashboardDetails() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [amountDonated, setAmountDonated] = useState(0);
  const [campaigns, setCampaigns] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: auth.currentUser?.uid,
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
    photoURL: auth.currentUser?.photoURL,
    creationTime: auth.currentUser?.metadata.creationTime,
  });

  const { name, email, photoURL, creationTime, id } = formData;

  let sum = 0;
  amounts.forEach((amount) => {
    sum += amount;
  });

  const cards = [
    {
      name: "Campaigns",
      href: "#",
      icon: ScaleIcon,
      amount: amounts?.length,
    },
    {
      name: "Donations received",
      href: "#",
      icon: ScaleIcon,
      amount: `$${sum}`,
    },
    {
      name: "Donations made",
      href: "#",
      icon: ScaleIcon,
      amount: `$${amountDonated}`,
    },
    // More items...
  ];

  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, "users", id), (doc) => {
        if (doc.exists()) {
          setAmountDonated(doc.data().totalDonations);
        }
      });
    } catch (error) {
      // console.log(error);
    }
  }, [id]);

  useEffect(() => {
    try {
      const q = query(collection(db, "campaigns"), where("userRef", "==", id));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const amounts = [];
        querySnapshot.forEach((doc) => {
          amounts.push(doc.data()?.donatedAmount);
        });
        setAmounts(amounts);
      });
    } catch (error) {
      // console.log(error);
    }
  }, [id]);

  useEffect(() => {
    async function fetchUserListings() {
      const campaignRef = collection(db, "campaigns");
      const q = query(
        campaignRef,
        where("userRef", "==", id),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let campaigns = [];
      querySnap.forEach((doc) => {
        return campaigns.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCampaigns(campaigns);
      setLoading(false);
    }
    fetchUserListings();
  }, [id]);

  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "campaigns", listingID));
      const updatedListings = campaigns.filter(
        (campaign) => campaign.id !== listingID
      );
      setCampaigns(updatedListings);
      toast.success("Successfully deleted the listing");
    }
  }

  function onEdit(listingID) {
    navigate(`/edit-campaign/${listingID}`);
  }

  return (
    <>
      <main className="flex-1 pb-8">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="min-w-0 flex-1">
                {/* Profile */}
                <div className="flex items-center">
                  <img
                    className="hidden h-16 w-16 rounded-full sm:block"
                    src={photoURL}
                    alt=""
                  />
                  <div>
                    <div className="flex items-center">
                      <img
                        className="h-16 w-16 rounded-full sm:hidden"
                        src={photoURL}
                        alt=""
                      />
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                        Good morning, {name}
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Company</dt>
                      <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                        <RiRegisteredFill
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        {creationTime}
                      </dd>
                      <dt className="sr-only">Account status</dt>
                      <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                        <CheckCircleIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400"
                          aria-hidden="true"
                        />
                        Basic account
                        {/* Verified account */}
                      </dd>
                      <dt className="sr-only">Upgrade account</dt>
                      <dd
                        onClick={() => navigate("/cards")}
                        className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 hover:text-gray-900 sm:mr-6 sm:mt-0 underline cursor-pointer"
                      >
                        Go Premium
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <button
                  type="button"
                  onClick={() => navigate("/cards")}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  Add money
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/create-campaign")}
                  className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 hover:bg-origin-border px-4 py-2 text-sm font-medium text-white shadow-sm"
                >
                  Start Campaign
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
              {cards.map((card) => (
                <div
                  key={card.name}
                  className="overflow-hidden rounded-lg bg-white shadow"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <card.icon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="truncate text-sm font-medium text-gray-500">
                            {card.name}
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {card.amount}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
            Recent campaigns
          </h2>

          {/* Activity list (smallest breakpoint only) */}
          <div className="shadow sm:hidden">
            <ul
              role="list"
              className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
            >
              {campaigns.map((transaction) => (
                <li key={transaction.id}>
                  <a
                    href={transaction.href}
                    className="block bg-white px-4 py-4 hover:bg-gray-50"
                  >
                    <span className="flex items-center space-x-4">
                      <span className="flex flex-1 space-x-2 truncate">
                        {transaction.type == "medical" ? (
                          <MdHealthAndSafety
                            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        ) : transaction.type == "education" ? (
                          <HiAcademicCap
                            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        ) : transaction.type == "natureDisaster" ? (
                          <GiHazardSign
                            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        ) : transaction.type == "environment" ? (
                          <AiFillEnvironment
                            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        ) : (
                          ""
                        )}
                        <span className="flex flex-col truncate text-sm text-gray-500">
                          <span className="truncate">{transaction.title}</span>
                          <span className="flex whitespace-nowrap">
                            <span className="font-medium text-gray-900">
                              {transaction.donatedAmount}
                            </span>
                            &nbsp;/&nbsp;
                            <span className="font-medium text-gray-900">
                              {transaction.targetAmount}
                            </span>
                            &nbsp;
                            {transaction.currency}
                          </span>
                          <time>
                            {transaction.timestamp.toDate().toDateString()}
                          </time>
                          {transaction.donatedAmount > 0 ? (
                            <Link to="/balances">
                              <p className="text-green-500 hover:text-green-600 hover:underline cursor-pointer">
                                Withdraw
                              </p>
                            </Link>
                          ) : (
                            <span className="flex whitespace-nowrap">
                              <p
                                onClick={() => onEdit(transaction.id)}
                                className="text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
                              >
                                Edit
                              </p>
                              &nbsp;/&nbsp;
                              <p
                                onClick={() => onDelete(transaction.id)}
                                className="text-red-500 hover:text-red-600 hover:underline cursor-pointer"
                              >
                                Delete
                              </p>
                            </span>
                          )}
                        </span>
                      </span>
                      <Link
                        to={`/category/${transaction.type}/${transaction.id}`}
                      >
                        <ChevronRightIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400 cursor-pointer"
                          aria-hidden="true"
                        />
                      </Link>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <nav
              className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
              aria-label="Pagination"
            >
              <div className="flex flex-1 justify-between">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Next
                </a>
              </div>
            </nav>
          </div>

          {/* Activity table (small breakpoint and up) */}
          <div className="hidden sm:block">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mt-2 flex flex-col">
                <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                          scope="col"
                        >
                          Campaigns
                        </th>
                        <th
                          className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 whitespace-nowrap"
                          scope="col"
                        >
                          Amount / Target / Currency
                        </th>
                        <th
                          className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                          scope="col"
                        >
                          Status
                        </th>
                        <th
                          className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                          scope="col"
                        >
                          Date
                        </th>
                        <th
                          className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                          scope="col"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {campaigns?.map((transaction) => (
                        <tr key={transaction.id} className="bg-white">
                          <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            <Link
                              to={`/category/${transaction.type}/${transaction.id}`}
                              className="flex"
                            >
                              <span className="group inline-flex space-x-2 truncate text-sm cursor-pointer">
                                {transaction.type == "medical" ? (
                                  <MdHealthAndSafety
                                    className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                ) : transaction.type == "education" ? (
                                  <HiAcademicCap
                                    className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                ) : transaction.type == "natureDisaster" ? (
                                  <GiHazardSign
                                    className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                ) : transaction.type == "environment" ? (
                                  <AiFillEnvironment
                                    className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  ""
                                )}
                                <p className="truncate text-gray-500 group-hover:text-gray-900">
                                  {transaction.title}
                                </p>
                              </span>
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                            <span className="font-medium text-gray-900">
                              {transaction.donatedAmount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                            &nbsp;/&nbsp;
                            <span className="font-medium text-gray-900">
                              {transaction.targetAmount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                            &nbsp;
                            {transaction.currency}
                          </td>
                          <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                            <span
                              className={`${
                                transaction.status == "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : transaction.status == "Success"
                                  ? "bg-green-100 text-green-800"
                                  : transaction.status == "Failed"
                                  ? "bg-gray-100 text-gray-800"
                                  : ""
                              }inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                            <span>
                              {transaction.timestamp.toDate().toDateString()}
                            </span>
                          </td>
                          {transaction.donatedAmount > 0 ? (
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500 cursor-pointer">
                              <Link
                                to="/balances"
                                className="text-green-500 hover:text-green-600 hover:underline"
                              >
                                Withdraw
                              </Link>
                            </td>
                          ) : (
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500 cursor-pointer">
                              <span className="flex whitespace-nowrap">
                                <p
                                  onClick={() => onEdit(transaction.id)}
                                  className="text-blue-500 hover:text-blue-600 hover:underline"
                                >
                                  Edit
                                </p>
                                &nbsp;/&nbsp;
                                <p
                                  onClick={() => onDelete(transaction.id)}
                                  className="text-red-500 hover:text-red-600 hover:underline"
                                >
                                  Delete
                                </p>
                              </span>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination */}
                  <nav
                    className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                    aria-label="Pagination"
                  >
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to{" "}
                        <span className="font-medium">10</span> of{" "}
                        <span className="font-medium">20</span> results
                      </p>
                    </div>
                    <div className="flex flex-1 justify-between sm:justify-end">
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Previous
                      </a>
                      <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Next
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
