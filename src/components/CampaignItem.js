import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Line } from "rc-progress";

export default function CampaignItem({ listing, id }) {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.imgUrls[0]}
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <p className="font-semibold m-0 text-xl truncate">{listing.title}</p>
          <p className="text-[#457b9d] my-2 font-semibold truncate">
            ${listing.description}
          </p>
          <Line
            percent={parseInt(
              (+listing.donatedAmount * 100) / +listing.targetAmount
            )}
            strokeWidth="2"
            strokeColor={
              +listing.donatedAmount < +listing.targetAmount ? "green" : "red"
            }
          />

          <div className="flex items-center mt-[10px] justify-between">
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
                  (+listing.donatedAmount * 100) / +listing.targetAmount
                )}
                %)
              </p>
            </div>
          </div>
        </div>
      </Link>
      <button
        type="button"
        className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-1000 ease-in-out hover:shadow-lg active:bg-blue-800"
      >
        <Link to="" className="flex justify-center items-center">
          Donate now
        </Link>
      </button>
    </li>
  );
}
