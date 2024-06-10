import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { BellIcon } from "@heroicons/react/24/outline";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import download from "../images/download.jpeg";
import ReactGA from "react-ga";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [auth]);

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  useEffect(() => {
    function pathRoute() {
      ReactGA.pageview(location.pathname);
    }
    pathRoute();
  }, [location.pathname]);

  const onLogout = async () => {
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        navigate("/sign-in", { replace: true });
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <div className="relative flex min-h-full flex-col">
        {/* Navbar */}
        <Disclosure as="nav" className="flex-shrink-0 bg-indigo-600">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  {/* Logo section */}
                  <div className="flex items-center px-2 lg:px-0 xl:w-64">
                    <div className="flex-shrink-0">
                      <img src={download} alt="" className="h-12 w-56" />
                      {/* <h1
                        onClick={() => navigate("/")}
                        className="text-3xl text-center font-bold text-white cursor-pointer"
                      >
                        Smiles.com
                      </h1> */}
                    </div>
                  </div>

                  {/* Search section */}
                  <div className="flex flex-1 justify-center lg:justify-end">
                    <div className="w-full px-2 lg:px-6">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-indigo-200 focus-within:text-gray-400">
                        <div className="pointer-events-none hidden absolute inset-y-0 left-0 lg:flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full rounded-md border border-transparent bg-indigo-400 bg-opacity-25 py-2 pl-3 lg:pl-10 pr-10 leading-5 text-indigo-100 placeholder-indigo-200 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                          placeholder="Search"
                          type="search"
                        />

                        <Menu as="div" className="relative ml-4 flex-shrink-0">
                          <div>
                            <Menu.Button className="text-gray-400 hover:text-gray-500 absolute bottom-[6px] right-0 flex items-center pr-3 cursor-pointer lg:hidden">
                              <span className="sr-only">
                                View notifications
                              </span>
                              <BellIcon
                                className="h-6 w-6 "
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="ml-4 w-0 flex-1 py-2">
                                <p className="text-sm font-medium text-gray-900">
                                  Notifications!
                                </p>
                              </div>
                              <div className="ml-4 flex-1 py-2">
                                <p className="mt-1 text-sm text-gray-500">
                                  No current notification.
                                </p>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3CenterLeftIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>

                  {/* Links section */}
                  <div className="hidden lg:block lg:w-80">
                    <div className="flex items-center justify-end">
                      <div className="flex">
                        <Menu
                          as="div"
                          className="relative ml-4 pt-2 flex-shrink-0"
                        >
                          <div>
                            <Menu.Button className="text-indigo-200 hover:text-white ">
                              <span className="sr-only">
                                View notifications
                              </span>
                              <BellIcon
                                className="h-6 w-6 "
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="ml-4 w-0 flex-1 py-2">
                                <p className="text-sm font-medium text-gray-900">
                                  Notifications!
                                </p>
                              </div>
                              <div className="ml-4 flex-1 py-2">
                                <p className="mt-1 text-sm text-gray-500">
                                  No current notification.
                                </p>
                              </div>
                              {/* <Menu.Item>
                                {({ active }) => (
                                  <span
                                    onClick={() => navigate("/profile")}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                    )}
                                  >
                                    Profile
                                  </span>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <span
                                    onClick={() => navigate("/dashboard")}
                                    className={`${
                                      active
                                        ? "bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                        : "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                    }`}
                                  >
                                    Dashboard
                                  </span>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <span
                                    onClick={onLogout}
                                    className={`${
                                      active
                                        ? "bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                        : "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                    }`}
                                  >
                                    Sign out
                                  </span>
                                )}
                              </Menu.Item> */}
                            </Menu.Items>
                          </Transition>
                        </Menu>

                        <div className="hidden lg:flex">
                          <ul className="flex">
                            <li
                              className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white border-b-[3px] border-b-transparent ${
                                pathMatchRoute("/") &&
                                "text-black border-b-black"
                              }`}
                              onClick={() => navigate("/")}
                            >
                              Home
                            </li>
                            <li
                              className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white border-b-[3px] border-b-transparent ${
                                pathMatchRoute("/campaigns") &&
                                "text-black border-b-black"
                              }`}
                              onClick={() => navigate("/campaigns")}
                            >
                              Campaign
                            </li>

                            {!user ? (
                              <li
                                className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white border-b-[3px] border-b-transparent ${
                                  (pathMatchRoute("/sign-in") ||
                                    pathMatchRoute("/dashboard")) &&
                                  "text-black border-b-black"
                                }`}
                                onClick={() => navigate("/sign-in")}
                              >
                                Sign in
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        </div>
                      </div>
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-4 flex-shrink-0">
                        {user ? (
                          <div>
                            <Menu.Button className="flex rounded-full bg-indigo-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={auth.currentUser?.photoURL}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                        ) : (
                          ""
                        )}
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  onClick={() => navigate("/profile")}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  )}
                                >
                                  Profile
                                </span>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  onClick={() => navigate("/dashboard")}
                                  className={`${
                                    active
                                      ? "bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                      : "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  }`}
                                >
                                  Dashboard
                                </span>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  onClick={onLogout}
                                  className={`${
                                    active
                                      ? "bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                      : "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  }`}
                                >
                                  Sign out
                                </span>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                  <Disclosure.Button
                    as="a"
                    onClick={() => navigate("/")}
                    className={classNames(
                      pathMatchRoute("/")
                        ? "text-white bg-indigo-800"
                        : "text-indigo-200 ",
                      "block px-3 py-2 rounded-md text-base font-medium cursor-pointer hover:bg-indigo-800 hover:text-white"
                    )}
                    aria-current={pathMatchRoute("/") ? "page" : undefined}
                  >
                    Home
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    onClick={() => navigate("/campaigns")}
                    className={classNames(
                      pathMatchRoute("/campaigns")
                        ? "text-white bg-indigo-800"
                        : "text-indigo-200 ",
                      "block px-3 py-2 rounded-md text-base font-medium cursor-pointer hover:bg-indigo-800 hover:text-white"
                    )}
                    aria-current={
                      pathMatchRoute("/campaigns") ? "page" : undefined
                    }
                  >
                    Campaigns
                  </Disclosure.Button>
                  {!user && (
                    <Disclosure.Button
                      as="a"
                      onClick={() => navigate("/sign-in")}
                      className={classNames(
                        pathMatchRoute("/sign-in")
                          ? "text-white bg-indigo-800"
                          : "text-indigo-200 ",
                        "block px-3 py-2 rounded-md text-base font-medium cursor-pointer hover:bg-indigo-800 hover:text-white"
                      )}
                      aria-current={
                        pathMatchRoute("/sign-in") ? "page" : undefined
                      }
                    >
                      Sign in
                    </Disclosure.Button>
                  )}
                </div>
                {user && (
                  <div className="border-t border-indigo-800 pt-4 pb-3">
                    <div className="space-y-1 px-2">
                      <Disclosure.Button
                        as="a"
                        onClick={() => navigate("/profile")}
                        className={`block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-800 hover:text-white cursor-pointer ${
                          pathMatchRoute("/profile") &&
                          "text-white bg-indigo-800"
                        }`}
                      >
                        Profile
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        onClick={() => navigate("/dashboard")}
                        className={`block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-800 hover:text-white cursor-pointer ${
                          pathMatchRoute("/dashboard") &&
                          "text-white bg-indigo-800"
                        }`}
                      >
                        Dashboard
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        onClick={onLogout}
                        className={`block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-800 hover:text-white cursor-pointer ${
                          pathMatchRoute("/sign-out") &&
                          "text-white bg-indigo-800"
                        }`}
                      >
                        Sign out
                      </Disclosure.Button>
                    </div>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
