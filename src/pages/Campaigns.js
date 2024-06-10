import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import Search from "../components/Search";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Line } from "rc-progress";

export default function Campaigns() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchListing] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "campaigns");
        const q = query(
          listingRef,
          // where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
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

  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, "campaigns");
      const q = query(
        listingRef,
        // where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listing");
    }
  }

  return (
    <div
      className={`max-w-6xl mx-auto px-3 ${
        listings?.length === 0 ? "sm:h-[530px]" : ""
      }`}
    >
      <h1 className="text-3xl text-center mt-6 font-bold mb-6">Campaigns</h1>
      <Search />
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <div className="relative bg-gray-50 pb-12 pt-1 mt-6 sm:pb-24 sm:pt-12">
            <div className="relative">
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
                          <p className="mt-2 mb-4 text-base text-gray-500 tracking-wider line-clamp-2">
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
          </div>

          {lastFetchedListing && (
            <div className="flex justify-center items-center">
              <button
                onClick={onFetchMoreListings}
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
              >
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="justify-center items-center text-center my-10">
          There are no current Campaign
        </p>
      )}
      {/* <ListingCampaign /> */}
    </div>
  );
}
