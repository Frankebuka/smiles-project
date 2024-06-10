import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { FaShare, FaMapMarkerAlt } from "react-icons/fa";
import { BsFillTagFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Line } from "rc-progress";
import Moment from "react-moment";
import CampaignFraud from "../components/CampaignFraud";
import Donate from "../components/Donate";
import icon from "../images/icon.jpeg";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { campaignId } from "../redux/Actions";
import ReactGA from "react-ga";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";

export default function Campaign() {
  const auth = getAuth();
  const params = useParams();
  const dispatch = useDispatch();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  const [donate, setDonate] = useState(false);
  const [donor, setDonor] = useState([]);
  const [campaignFraud, setCampaignFraud] = useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    async function fetchListing() {
      const unsub = onSnapshot(
        doc(db, "campaigns", params.listingId),
        (doc) => {
          if (doc.exists()) {
            setListing(doc?.data());
            setLoading(false);
          }
        }
      );
    }
    fetchListing();
  }, [params.listingId]);

  useEffect(() => {
    const docRef = doc(db, "campaigns", params.listingId);
    onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setDonor(snapshot.data().donations);
      }
    });
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
                height: "400px",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="hovertext fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        data-hover="Click to copy link"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
          Link Copied
        </p>
      )}

      <div className="m-4 flex flex-col-reverse md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full">
          <div className="flex items-center mt-[10px] justify-between">
            <div className="flex items-center space-x-1 my-3">
              <p className="font-bold text-lg">
                Target:$
                {listing.targetAmount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-lg">
                $
                {listing.donatedAmount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                (
                {parseInt(
                  (+listing.donatedAmount * 100) / +listing.targetAmount
                )}
                %)
              </p>
            </div>
          </div>
          <Line
            percent={parseInt(
              (+listing.donatedAmount * 100) / +listing.targetAmount
            )}
            strokeWidth="3"
            strokeColor={
              +listing.donatedAmount < +listing.targetAmount ? "green" : "red"
            }
          />
          {+listing.donatedAmount === +listing.targetAmount ? (
            <p className="font-bold text-lg mt-3">
              Congratulations! We have reached the $
              {listing.targetAmount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              donation target.
            </p>
          ) : (
            !donate && (
              <button
                type="button"
                onClick={() => {
                  setDonate(true);
                  setCampaignFraud(false);
                  setContactLandlord(false);
                  dispatch(campaignId(params.listingId));
                }}
                className="w-full bg-blue-600 text-white px-7 py-3 mt-6 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-1000 ease-in-out hover:shadow-lg active:bg-blue-800"
              >
                <Link to="" className="flex justify-center items-center">
                  Donate Now
                </Link>
              </button>
            )
          )}
          {donate && (
            <Donate
              userRef={listing.userRef}
              listing={listing}
              setDonate={setDonate}
              listingId={params.listingId}
            />
          )}

          <div className="flex items-center my-[10px] justify-between">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {`${donor?.length} ${
                  donor?.length === 0
                    ? "donation"
                    : donor?.length === 1
                    ? "donation"
                    : "donations"
                } `}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">Amount</p>
            </div>
          </div>

          <div
            className={`${
              donor?.length <= 2 ? "h-24" : "h-48 overflow-scroll"
            }`}
          >
            {donor !== null &&
              donor.map(({ name, timestamp, amount, donorId, imgUrls }) => (
                <div
                  className="flex justify-between items-center mb-3 font-bold text-xs"
                  style={{ alignItems: "center", fontSize: "12px" }}
                  key={donorId}
                >
                  <div className="flex items-center whitespace-nowrap">
                    <div
                      className="mr-2 flex items-center justify-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "rgb(241, 241, 241)",
                        padding: "0px",
                      }}
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={imgUrls || icon}
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="m-0 p-0 text-black">{name}</p>
                      <Moment fromNow className="m-0 p-0 text-neutral-500">
                        {timestamp?.toDate()}
                      </Moment>
                    </div>
                  </div>
                  <p>
                    ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              ))}
          </div>

          {!campaignFraud && (
            <button
              type="button"
              onClick={() => {
                setCampaignFraud(true);
                setDonate(false);
                setContactLandlord(false);
              }}
              className="w-full bg-red-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-red-700 transition duration-1000 ease-in-out hover:shadow-lg active:bg-red-800"
            >
              <Link to="" className="flex justify-center items-center">
                Flag Campaign as Fraud
              </Link>
            </button>
          )}
          {campaignFraud && (
            <CampaignFraud
              userRef={listing.userRef}
              listing={listing}
              setCampaignFraud={setCampaignFraud}
              setContactLandlord={setContactLandlord}
            />
          )}
        </div>

        <div className="w-full mt-6 md:mt-0 md:ml-2 overflow-x-auto">
          <div
            className="flex justify-between items-center my-3 pb-3 font-bold text-4xl"
            style={{
              borderBottom: "1px solid rgb(241, 241, 241)",
            }}
          >
            <span className="pt-3">
              {listing.title}
              <p className="flex items-center justify-start text-lg">
                <BsFillTagFill className="mr-2" />
                {listing.type}
              </p>
            </span>
          </div>
          <p className="pt-0 h-[200px] md:h-[315px] z-10 overflow-scroll">
            {listing.description}
          </p>
        </div>
      </div>

      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full ">
          <div
            className="flex justify-between items-center mb-3 text-base pb-3"
            style={{
              borderBottom: "1px solid rgb(241, 241, 241)",
            }}
          >
            <div className="flex items-center whitespace-nowrap">
              <div
                className="mr-2 flex items-center justify-center"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgb(241, 241, 241)",
                  padding: "0px",
                }}
              >
                <img
                  className="h-9 w-9 rounded-full"
                  src={listing.photoURL || icon}
                  alt=""
                />
              </div>
              <div>
                <p className="m-0 p-0 text-black">{listing.name}</p>
                <p className="m-0 p-0 text-black text-sm">
                  {listing?.account === "basic" ? (
                    <p className="flex whitespace-nowrap">
                      Basic account&nbsp;
                      <CheckCircleIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400"
                        aria-hidden="true"
                      />
                    </p>
                  ) : (
                    <p className="flex whitespace-nowrap">
                      Official account&nbsp;
                      <CheckCircleIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                        aria-hidden="true"
                      />
                    </p>
                  )}
                  {/* {listing.account && (
                    <CheckCircleIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400"
                      aria-hidden="true"
                    />
                  )} */}
                  {/* {listing.account} */}
                </p>
              </div>
            </div>

            <div>
              <p className="m-0 p-0 text-black">
                created on {listing.timestamp?.toDate().toDateString()}
              </p>
              <p>0 view</p>
            </div>
          </div>
          <div className="flex justify-between mb-3 text-base pb-3">
            <div className="items-center whitespace-nowrap">
              <p className="flex items-center mt-6 mb-3 font-semibold">
                <FaMapMarkerAlt className="text-green-700 mr-1" />
                {listing.address}
              </p>
              <p className="flex items-center mt-6 mb-3 font-semibold">
                <MdEmail className="text-green-700 mr-1" />
                {listing.email}
              </p>
              {listing.phoneNumber && (
                <p className="flex items-center mt-6 mb-3 font-semibold">
                  <BsFillTelephoneFill className="text-green-700 mr-1" />
                  {listing.phoneNumber}
                </p>
              )}
            </div>
            {listing.bio && (
              <p className="flex mt-6 mb-3 font-semibold">{listing.bio}</p>
            )}
          </div>

          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => {
                  setContactLandlord(true);
                  setCampaignFraud(false);
                  setDonate(false);
                }}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
              >
                Contact {listing.name}
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact
              userRef={listing.userRef}
              listing={listing}
              setContactLandlord={setContactLandlord}
            />
          )}
        </div>
        <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
