import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Donate({ userRef, listing, setCampaignFraud }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
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
  function onChange(e) {
    setMessage(e.target.value);
  }

  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full">
          <p>
            Message will be send to the management for verification and prompt
            action.
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              type="text"
              placeholder="Write reason for any suspicion of fraud"
              rows="2"
              value={message}
              onChange={onChange}
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
            />
          </div>
          {/* <a
            href={`mailto:${landlord.email}?Subject=${listing.title}&body=${message}`}
          > */}
          <button
            onClick={() => {
              setCampaignFraud(false);
            }}
            className="px-7 py-3 bg-red-600 text-white uppercase rounded text-sm shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6"
            type="button"
          >
            Send Report
          </button>
          {/* </a> */}
        </div>
      )}
    </>
  );
}
