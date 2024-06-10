import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export default function History() {
  const auth = getAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [receivedDonors, setReceivedDonors] = useState([]);
  const [donationMade, setDonationMade] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: auth.currentUser?.uid,
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
    photoURL: auth.currentUser?.photoURL,
    creationTime: auth.currentUser?.metadata.creationTime,
  });

  const { name, email, photoURL, creationTime, id } = formData;

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

  useEffect(() => {
    try {
      const q = query(collection(db, "campaigns"), where("userRef", "==", id));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const donors = [];
        querySnapshot.forEach((doc) => {
          donors.push(doc.data()?.donations);
        });
        setReceivedDonors(donors);
      });
    } catch (error) {
      // console.log(error);
    }
  }, [id]);

  const newReceivedDonors = receivedDonors[0];

  const new1 = newReceivedDonors?.length;

  const newReceivedDonors1 = newReceivedDonors
    ?.concat(...receivedDonors)
    .slice(new1);

  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, "users", id), (doc) => {
        if (doc.exists()) {
          setDonationMade(doc.data().donations);
        }
      });
    } catch (error) {
      // console.log(error);
    }
  }, [id]);

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">History</h1>
          <p className="mt-4 text-sm text-gray-700">
            List of all your campaigns.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Campaign
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 flex whitespace-nowrap"
                    >
                      Amount / Target / Currency
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Activity
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {campaigns.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                        {transaction.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
                      <td
                        className={`${
                          transaction.status == "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : transaction.status == "Success"
                            ? "bg-green-100 text-green-800"
                            : transaction.status == "Failed"
                            ? "bg-gray-100 text-gray-800"
                            : ""
                        }inline-flex items-center pl-4 rounded-full text-xs font-medium capitalize `}
                      >
                        {transaction.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {transaction.timestamp.toDate().toDateString()}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="text-indigo-500">
                          Campaign
                          <span className="sr-only">, {transaction.name}</span>
                        </span>
                      </td> */}
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

      <div className="sm:flex sm:items-center mt-8">
        <div className="sm:flex-auto">
          {/* <h1 className="text-xl font-semibold text-gray-900">History</h1> */}
          <p className="mt-2 text-sm text-gray-700">
            List of all the donations received.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Campaign
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Donor
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 flex whitespace-nowrap"
                    >
                      Amount / Currency
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {newReceivedDonors1?.map((transaction, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500">
                        {transaction.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="font-medium text-gray-900">
                          {transaction.name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="font-medium text-gray-900">
                          {transaction.amount

                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                        {/* &nbsp;/&nbsp; */}
                        {/* <span className="font-medium text-gray-900">
                          {transaction.targetAmount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span> */}
                        &nbsp;
                        {transaction.currency}
                      </td>
                      <td
                        className={`${
                          transaction.status == "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : transaction.status == "Success"
                            ? "bg-green-100 text-green-800"
                            : transaction.status == "Failed"
                            ? "bg-gray-100 text-gray-800"
                            : ""
                        }inline-flex items-center pl-4 rounded-full text-xs font-medium capitalize `}
                      >
                        {transaction.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {transaction.timestamp.toDate().toDateString()}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="text-indigo-500">
                          Campaign
                          <span className="sr-only">, {transaction.name}</span>
                        </span>
                      </td> */}
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

      <div className="sm:flex sm:items-center mt-8">
        <div className="sm:flex-auto">
          {/* <h1 className="text-xl font-semibold text-gray-900">History</h1> */}
          <p className="mt-2 text-sm text-gray-700">
            List of all the donations you made.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Campaign
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Donor
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 flex whitespace-nowrap"
                    >
                      Amount / Currency
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {donationMade?.map((transaction, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500">
                        {transaction.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="font-medium text-gray-900">
                          {transaction.name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="font-medium text-gray-900">
                          {transaction.amount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                        {/* &nbsp;/&nbsp; */}
                        {/* <span className="font-medium text-gray-900">
                          {transaction.targetAmount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span> */}
                        &nbsp;
                        {transaction.currency}
                      </td>
                      <td
                        className={`${
                          transaction.status == "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : transaction.status == "Success"
                            ? "bg-green-100 text-green-800"
                            : transaction.status == "Failed"
                            ? "bg-gray-100 text-gray-800"
                            : ""
                        }inline-flex items-center pl-4 rounded-full text-xs font-medium capitalize `}
                      >
                        {transaction.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {transaction.timestamp.toDate().toDateString()}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="text-indigo-500">
                          Campaign
                          <span className="sr-only">, {transaction.name}</span>
                        </span>
                      </td> */}
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
  );
}
