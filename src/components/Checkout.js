import { LockClosedIcon } from "@heroicons/react/20/solid";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Checkout() {
  const [previousUserAmount, setPreviousUserAmount] = useState(null);
  const [newCampaign, setNewCampaign] = useState(null);

  const amount = useSelector((state) => state.amount);
  const auth = getAuth();
  const id = auth.currentUser?.uid;
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, "users", id), (doc) => {
        if (doc.exists()) {
          setPreviousUserAmount(doc.data().totalDonations);
        }
      });
    } catch (error) {
      // console.log(error);
    }
  }, [id]);

  useEffect(() => {
    try {
      const unsub = onSnapshot(
        doc(db, "campaigns", params.campaignIdz),
        (doc) => {
          if (doc.exists()) {
            setNewCampaign({ ...doc.data(), id: doc.id });
          }
        }
      );
    } catch (error) {
      // console.log(error);
    }
  }, [params.campaignIdz]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newIncrease = +newCampaign?.donatedAmount + amount;

    const docRef = doc(db, "campaigns", params.campaignIdz);
    const donor = Number(amount);
    await updateDoc(docRef, {
      donatedAmount: +newIncrease,
      donations: arrayUnion({
        name: auth.currentUser?.displayName,
        userRef: id,
        timestamp: Timestamp.now().toDate(),
        amount: donor,
        donorId: uuidv4(),
        status: "Success",
        imgUrls: auth.currentUser?.photoURL,
        title: newCampaign?.title,
        currency: newCampaign?.currency,
      }),
    });

    const newAmount = +previousUserAmount + +amount;
    const userRef = doc(db, "users", id);
    auth.currentUser &&
      (await updateDoc(userRef, {
        totalDonations: +newAmount,
        donations: arrayUnion({
          name: auth.currentUser?.displayName,
          userRef: id,
          timestamp: Timestamp.now().toDate(),
          amount: donor,
          donorId: uuidv4(),
          status: "Success",
          imgUrls: auth.currentUser?.photoURL,
          title: newCampaign?.title,
          currency: newCampaign?.currency,
        }),
      }));
    navigate(`/thank-you/${params.campaignIdz}`);
    toast.success(`$${amount} donated successfully`);
  };

  return (
    <>
      <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
        <h1 className="sr-only">Checkout</h1>

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
        >
          <h2 id="payment-heading" className="sr-only">
            Payment and shipping details
          </h2>

          <div className="mx-auto max-w-lg lg:pt-16">
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-black py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              <span className="sr-only">Pay with Apple Pay</span>
              <Link to={`/category/${newCampaign?.type}/${newCampaign?.id}`}>
                Go back to the campaign
              </Link>
            </button>

            <div className="relative mt-8">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm font-medium text-gray-500">
                  Or continues with payment
                </span>
              </div>
            </div>

            <form className="mt-6">
              <div className="grid grid-cols-12 gap-y-6 gap-x-4">
                <div className="col-span-full">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      name="email-address"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-8 sm:col-span-9">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="region"
                      name="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <label htmlFor="terms" className="text-sm text-gray-500">
                  I have read the terms and conditions and agree to be
                  responsible for the payment made.
                </label>
              </div>

              <button
                type="button"
                onClick={onSubmit}
                className="mt-6 w-full rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 hover:bg-origin-border py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
              >
                Pay ${amount}
              </button>

              <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
                <LockClosedIcon
                  className="mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Payment details stored in plain text
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
