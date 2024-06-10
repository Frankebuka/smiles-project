import React, { useEffect, useState } from "react";
import { ScaleIcon } from "@heroicons/react/24/outline";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

const accounts = [
  { id: "checking", name: "Checking", description: "CIBC ••••6610" },
  { id: "savings", name: "Savings", description: "Bank of America ••••0149" },
  { id: "mastercard", name: "Mastercard", description: "Capital One ••••7877" },
];

export default function Balances() {
  const auth = getAuth();
  const [amountDonated, setAmountDonated] = useState(0);
  const [amounts, setAmounts] = useState([]);
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
      name: "Total balance",
      href: "#",
      icon: ScaleIcon,
      amount: `$${0}`,
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

  return (
    <div className="min-h-full h-[580px] overflow-scroll py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
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

        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Transfer funds
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Transfer your balance to your bank account.
        </p>
        <fieldset className="mt-2">
          <legend className="sr-only">Bank account</legend>
          <div className="divide-y divide-gray-200">
            {accounts.map((account, accountIdx) => (
              <div key={accountIdx} className="relative flex items-start py-4">
                <div className="min-w-0 flex-1 text-sm">
                  <label
                    htmlFor={`account-${account.id}`}
                    className="font-medium text-gray-700"
                  >
                    {account.name}
                  </label>
                  <p
                    id={`account-${account.id}-description`}
                    className="text-gray-500"
                  >
                    {account.description}
                  </p>
                </div>
                <div className="ml-3 flex h-5 items-center">
                  <input
                    id={`account-${account.id}`}
                    aria-describedby={`account-${account.id}-description`}
                    name="account"
                    type="radio"
                    defaultChecked={account.id === "checking"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
            >
              Transfer
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
