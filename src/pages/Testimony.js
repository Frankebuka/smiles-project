import { doc, onSnapshot } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChatBubbleLeftEllipsisIcon,
  CodeBracketIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FlagIcon,
  HandThumbUpIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import Comment from "../components/Comment";
import { RiDeleteBin6Line } from "react-icons/ri";
import LikeTestimony from "../components/LikeTestimony";
import DeleteTestimony from "../components/DeleteTestimony";
import { useAuthState } from "react-firebase-hooks/auth";

const Testimony = () => {
  const { id } = useParams();
  const [testimonies, setTestimonies] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "testimonies", id);
    onSnapshot(docRef, (snapshot) => {
      setTestimonies({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="min-h-full">
      <div className="mx-auto py-10 max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:gap-8 lg:px-8">
        <main className="lg:col-span-9 xl:col-span-6 mx-3 sm:mx-0">
          <div className="mt-0">
            <h1 className="sr-only">Recent questions</h1>
            <ul role="list" className="space-y-4">
              <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                <article aria-labelledby={"question-title-" + testimonies?.id}>
                  <div>
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={testimonies?.photoURL}
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          <span className="hover:underline">
                            {testimonies?.name}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="hover:underline">
                            {testimonies?.timestamp.toDate().toDateString()}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-shrink-0 self-center">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div>
                            <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                              <span className="sr-only">Open options</span>
                              <EllipsisVerticalIcon
                                className="h-5 w-5"
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
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                {/* <Menu.Item>
                                  {({ active }) => (
                                    <span
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "flex px-4 py-2 text-sm cursor-pointer"
                                      )}
                                    >
                                      <RiDeleteBin6Line
                                        className="mr-3 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span>Delete</span>
                                    </span>
                                  )}
                                </Menu.Item> */}
                                {user && user.uid === testimonies?.userRef && (
                                  <DeleteTestimony
                                    id={id}
                                    imgUrls={testimonies?.imgUrls}
                                  />
                                )}
                                <Menu.Item>
                                  {({ active }) => (
                                    <span
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "flex px-4 py-2 text-sm cursor-pointer"
                                      )}
                                    >
                                      <FlagIcon
                                        className="mr-3 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span>Report content</span>
                                    </span>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <h2 className="mt-4 text-base font-medium text-gray-900">
                      {testimonies?.title}
                    </h2>
                  </div>
                  <div
                    className="mt-2 space-y-4 text-sm text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: testimonies?.description,
                    }}
                  />
                  <div className="mt-6 flex justify-between space-x-8">
                    <div className="flex space-x-6">
                      <LikeTestimony id={id} likes={testimonies?.likes} />

                      <span className="inline-flex items-center text-sm">
                        <button
                          type="button"
                          className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                        >
                          <EyeIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="font-medium text-gray-900">
                            {testimonies?.views.length}
                          </span>
                          <span className="sr-only">views</span>
                        </button>
                      </span>
                    </div>

                    <div className="flex text-sm">
                      <span className="inline-flex items-center text-sm">
                        <button
                          type="button"
                          className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                        >
                          <ShareIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="font-medium text-gray-900">
                            Share
                          </span>
                        </button>
                      </span>
                    </div>
                  </div>
                </article>
              </li>
              <Comment id={testimonies?.id} />
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Testimony;
