import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { amountDonated } from "../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";

export default function Donate({ userRef, listing, setDonate, listingId }) {
  const [landlord, setLandlord] = useState(null);
  const [amount, setAmount] = useState("");
  const [previousAmount, setPreviousAmount] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const campaignId = useSelector((state) => state.id);

  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    }
    getLandlord();
  }, [userRef]);

  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, "campaigns", listingId), (doc) => {
        if (doc.exists()) {
          setPreviousAmount(doc.data().donatedAmount);
        }
      });
    } catch (error) {
      // console.log(error);
    }
  }, [listingId]);

  function onChange(e) {
    setAmount(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    ReactGA.event({ category: "Text", action: "submit", label: "label" });
    const newIncrease = +previousAmount + +amount;
    const amountLeft = +listing.targetAmount - +previousAmount;

    if (+newIncrease > +listing.targetAmount) {
      toast.error(
        `Please donate less than or equal to $${amountLeft
          .toString()
          .replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )} to reach the $${listing.targetAmount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} target.`
      );
      return;
    }

    dispatch(amountDonated(+amount));
    setAmount("");
    setDonate(false);
    navigate(`/checkout/${campaignId}`);
  };

  const amountLeft = +listing.targetAmount - +previousAmount;

  return (
    <>
      {landlord !== null && (
        <form onSubmit={onSubmit} className="flex flex-col w-full">
          {amountLeft < +listing.targetAmount && amountLeft !== 0 ? (
            <p className="mt-3">
              Thank you for your donation. We still $
              {amountLeft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} left
              to reach the $
              {listing.targetAmount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              target.
            </p>
          ) : amountLeft <= 0 ? (
            <p className="mt-3">
              Congratulation, we have reached the{" "}
              {listing.targetAmount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              target donation.
            </p>
          ) : null}

          <div className="mt-3 mb-6">
            <input
              name="amount"
              type="number"
              placeholder="$"
              id="amount"
              value={amount}
              onChange={onChange}
              min="10"
              max="1000000"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
            />
          </div>
          <button
            onClick={onSubmit}
            className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-3"
            type="submit"
          >
            Donate
          </button>
        </form>
      )}
    </>
  );
}
