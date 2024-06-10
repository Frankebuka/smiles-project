import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getAuth } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardDetails from "../components/DashboardDetails";
import History from "../components/History";
import Balances from "../components/Balances";
import Cards from "../components/Cards";
import Analytics from "../components/Analytics";
import Reports from "../components/Reports";
import Settings from "../components/Settings";
import Help from "../components/Help";
import Privacy from "../components/Privacy";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Account() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [current, setCurrent] = useState(false);
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [campaigns, setCampaigns] = useState(null);
  const [userDonations, setUserDonations] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
    photoURL: auth.currentUser?.photoURL,
    createdAt: auth.currentUser?.metadata.creationTime,
    id: auth.currentUser?.uid,
  });

  const { name, email, photoURL, createdAt, id } = formData;

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <>
      <div className="min-h-full h-[580px] overflow-scroll">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-[#ffffff] pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    {/* <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
                      alt="Easywire logo"
                    /> */}
                  </div>
                  <nav
                    className="mt-14 h-full flex-shrink-0 divide-y divide-gray-300 overflow-y-auto"
                    aria-label="Sidebar"
                  >
                    <div className="space-y-1 px-2">
                      <span
                        onClick={() => navigate("/dashboard")}
                        className={classNames(
                          pathMatchRoute("/dashboard")
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                            : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                          "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                        )}
                        aria-current={
                          pathMatchRoute("/dashboard") ? "page" : undefined
                        }
                      >
                        <HomeIcon
                          className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                          aria-hidden="true"
                        />
                        Dashboard
                      </span>
                      <span
                        onClick={() => navigate("/history")}
                        className={classNames(
                          pathMatchRoute("/history")
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                            : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                          "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                        )}
                        aria-current={
                          pathMatchRoute("/history") ? "page" : undefined
                        }
                      >
                        <ClockIcon
                          className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                          aria-hidden="true"
                        />
                        History
                      </span>
                      <span
                        onClick={() => navigate("/analytics")}
                        className={classNames(
                          pathMatchRoute("/analytics")
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                            : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                          "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                        )}
                        aria-current={
                          pathMatchRoute("/analytics") ? "page" : undefined
                        }
                      >
                        <TbBrandGoogleAnalytics
                          className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                          aria-hidden="true"
                        />
                        Analytics
                      </span>
                      <span
                        onClick={() => navigate("/cards")}
                        className={classNames(
                          pathMatchRoute("/cards")
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                            : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                          "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                        )}
                        aria-current={
                          pathMatchRoute("/cards") ? "page" : undefined
                        }
                      >
                        <CreditCardIcon
                          className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                          aria-hidden="true"
                        />
                        Cards
                      </span>
                      <span
                        onClick={() => navigate("/balances")}
                        className={classNames(
                          pathMatchRoute("/balances")
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                            : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                          "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                        )}
                        aria-current={
                          pathMatchRoute("/balances") ? "page" : undefined
                        }
                      >
                        <ScaleIcon
                          className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                          aria-hidden="true"
                        />
                        Balances
                      </span>
                      <span
                        onClick={() => navigate("/reports")}
                        className={classNames(
                          pathMatchRoute("/reports")
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                            : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                          "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                        )}
                        aria-current={
                          pathMatchRoute("/reports") ? "page" : undefined
                        }
                      >
                        <DocumentChartBarIcon
                          className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                          aria-hidden="true"
                        />
                        Reports
                      </span>
                    </div>
                    <div className="mt-6 pt-6">
                      <div className="space-y-1 px-2">
                        <span
                          onClick={() => navigate("/settings")}
                          className={classNames(
                            pathMatchRoute("/settings")
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                              : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                            "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                          )}
                          aria-current={
                            pathMatchRoute("/settings") ? "page" : undefined
                          }
                        >
                          <CogIcon
                            className="mr-4 h-6 w-6 text-black"
                            aria-hidden="true"
                          />
                          Settings
                        </span>
                        <span
                          onClick={() => navigate("/help")}
                          className={classNames(
                            pathMatchRoute("/help")
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                              : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                            "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                          )}
                          aria-current={
                            pathMatchRoute("/help") ? "page" : undefined
                          }
                        >
                          <QuestionMarkCircleIcon
                            className="mr-4 h-6 w-6 text-black"
                            aria-hidden="true"
                          />
                          Help
                        </span>
                        <span
                          onClick={() => navigate("/privacy")}
                          className={classNames(
                            pathMatchRoute("/privacy")
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                              : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                            "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                          )}
                          aria-current={
                            pathMatchRoute("/privacy") ? "page" : undefined
                          }
                        >
                          <ShieldCheckIcon
                            className="mr-4 h-6 w-6 text-black"
                            aria-hidden="true"
                          />
                          Privacy
                        </span>
                      </div>
                    </div>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto bg-#ffffff pt-5 pb-4">
            {/* <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300"
                alt="Easywire logo"
              />
            </div> */}
            <nav
              className="mt-14 flex flex-1 flex-col divide-y divide-gray-300 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="space-y-1 px-2">
                <span
                  onClick={() => navigate("/dashboard")}
                  className={classNames(
                    pathMatchRoute("/dashboard")
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                      : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                    "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                  )}
                  aria-current={
                    pathMatchRoute("/dashboard") ? "page" : undefined
                  }
                >
                  <HomeIcon
                    className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                    aria-hidden="true"
                  />
                  Dashboard
                </span>
                <span
                  onClick={() => navigate("/history")}
                  className={classNames(
                    pathMatchRoute("/history")
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                      : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                    "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                  )}
                  aria-current={pathMatchRoute("/history") ? "page" : undefined}
                >
                  <ClockIcon
                    className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                    aria-hidden="true"
                  />
                  History
                </span>
                <span
                  onClick={() => navigate("/analytics")}
                  className={classNames(
                    pathMatchRoute("/analytics")
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                      : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                    "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                  )}
                  aria-current={
                    pathMatchRoute("/analytics") ? "page" : undefined
                  }
                >
                  <TbBrandGoogleAnalytics
                    className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                    aria-hidden="true"
                  />
                  Analytics
                </span>
                <span
                  onClick={() => navigate("/cards")}
                  className={classNames(
                    pathMatchRoute("/cards")
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                      : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                    "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                  )}
                  aria-current={pathMatchRoute("/cards") ? "page" : undefined}
                >
                  <CreditCardIcon
                    className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                    aria-hidden="true"
                  />
                  Cards
                </span>
                <span
                  onClick={() => navigate("/balances")}
                  className={classNames(
                    pathMatchRoute("/balances")
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                      : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                    "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                  )}
                  aria-current={
                    pathMatchRoute("/balances") ? "page" : undefined
                  }
                >
                  <ScaleIcon
                    className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                    aria-hidden="true"
                  />
                  Balances
                </span>
                <span
                  onClick={() => navigate("/reports")}
                  className={classNames(
                    pathMatchRoute("/reports")
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                      : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                    "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                  )}
                  aria-current={pathMatchRoute("/reports") ? "page" : undefined}
                >
                  <DocumentChartBarIcon
                    className="mr-4 h-6 w-6 flex-shrink-0 text-black"
                    aria-hidden="true"
                  />
                  Reports
                </span>
              </div>
              <div className="mt-6 pt-6">
                <div className="space-y-1 px-2">
                  <span
                    onClick={() => navigate("/settings")}
                    className={classNames(
                      pathMatchRoute("/settings")
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                        : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                      "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                    )}
                    aria-current={
                      pathMatchRoute("/settings") ? "page" : undefined
                    }
                  >
                    <CogIcon
                      className="mr-4 h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                    Settings
                  </span>
                  <span
                    onClick={() => navigate("/help")}
                    className={classNames(
                      pathMatchRoute("/help")
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                        : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                      "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                    )}
                    aria-current={pathMatchRoute("/help") ? "page" : undefined}
                  >
                    <QuestionMarkCircleIcon
                      className="mr-4 h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                    Help
                  </span>
                  <span
                    onClick={() => navigate("/privacy")}
                    className={classNames(
                      pathMatchRoute("/privacy")
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white"
                        : "text-black hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:bg-origin-border",
                      "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer"
                    )}
                    aria-current={
                      pathMatchRoute("/privacy") ? "page" : undefined
                    }
                  >
                    <ShieldCheckIcon
                      className="mr-4 h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                    Privacy
                  </span>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:h-0 lg:border-none">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {pathMatchRoute("/dashboard") && <DashboardDetails />}
          {pathMatchRoute("/history") && <History />}
          {pathMatchRoute("/balances") && <Balances />}
          {pathMatchRoute("/cards") && <Cards />}
          {pathMatchRoute("/analytics") && <Analytics />}
          {pathMatchRoute("/reports") && <Reports />}
          {pathMatchRoute("/settings") && <Settings />}
          {pathMatchRoute("/help") && <Help />}
          {pathMatchRoute("/privacy") && <Privacy />}
        </div>
      </div>
    </>
  );
}
