import React, { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ArrowLongLeftIcon,
  CheckIcon,
  HandThumbUpIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../firebase";
import { GrFormClose } from "react-icons/gr";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" },
];
const breadcrumbs = [
  { name: "Jobs", href: "#", current: false },
  { name: "Front End Developer", href: "#", current: false },
  { name: "Applicants", href: "#", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const attachments = [
  { name: "resume_front_end_developer.pdf", href: "#" },
  { name: "coverletter_front_end_developer.pdf", href: "#" },
];
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: HandThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Applied to",
    target: "Front End Developer",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Completed interview with",
    target: "Katherine Snyder",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];
const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Comment({ id }) {
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);

  const [currentlyLoggedinUser] = useAuthState(auth);

  useEffect(() => {
    try {
      const docRef = doc(db, "testimonies", id);
      onSnapshot(docRef, (snapshot) => {
        setComments(snapshot.data().comments);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleChangeComment = (e) => {
    e.preventDefault();
    const commentRef = doc(db, "testimonies", id);
    if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          userID: auth.currentUser?.uid,
          userName: auth.currentUser?.displayName,
          photoURL: auth.currentUser?.photoURL,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(() => {
        setComment("");
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const commentRef = doc(db, "testimonies", id);
    updateDoc(commentRef, {
      comments: arrayUnion({
        userID: auth.currentUser?.uid,
        userName: auth.currentUser?.displayName,
        photoURL: auth.currentUser?.photoURL,
        comment: comment,
        createdAt: new Date(),
        commentId: uuidv4(),
      }),
    }).then(() => {
      setComment("");
    });
  };

  //   delete comment function
  const handleDeleteComment = (comment) => {
    const commentRef = doc(db, "testimonies", id);
    console.log(comment);
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="min-h-full">
        <main className="pb-10">
          <div className="mx-auto mt-8 gap-6">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              {/* Comments*/}
              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="notes-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Comments
                      </h2>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <ul role="list" className="space-y-8">
                        {comments !== null &&
                          comments.map(
                            ({
                              commentId,
                              userID,
                              comment,
                              userName,
                              createdAt,
                              photoURL,
                            }) => (
                              <li key={commentId}>
                                <div className="flex space-x-3">
                                  <div className="flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-full"
                                      src={photoURL}
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <div className="text-sm">
                                      <span className="font-medium text-gray-900">
                                        {userName}
                                      </span>
                                    </div>
                                    <div className="mt-1 text-sm text-gray-700">
                                      <p>{comment}</p>
                                    </div>
                                    <div className="mt-2 space-x-2 text-sm">
                                      <span className="font-medium text-gray-500">
                                        {createdAt.toDate().toDateString()}
                                      </span>{" "}
                                      <span className="font-medium text-gray-500">
                                        &middot;
                                      </span>{" "}
                                      {userID === currentlyLoggedinUser.uid && (
                                        <button
                                          type="button"
                                          className="font-extrabold text-base text-gray-900"
                                          onClick={() =>
                                            handleDeleteComment({
                                              commentId,
                                              userID,
                                              comment,
                                              userName,
                                              createdAt,
                                              photoURL,
                                            })
                                          }
                                        >
                                          <GrFormClose />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )
                          )}
                      </ul>
                    </div>
                  </div>
                  {currentlyLoggedinUser && (
                    <div className="bg-gray-50 px-4 py-6 sm:px-6">
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={currentlyLoggedinUser?.photoURL}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <form onSubmit={onSubmit}>
                            <div>
                              <label htmlFor="comment" className="sr-only">
                                About
                              </label>
                              <textarea
                                type="text"
                                id="comment"
                                name="comment"
                                rows={3}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="Add a comment"
                                // defaultValue={""}
                                value={comment}
                                onChange={(e) => {
                                  setComment(e.target.value);
                                }}
                                onKeyUp={(e) => {
                                  handleChangeComment(e);
                                }}
                              />
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="group inline-flex items-start space-x-2 text-sm text-gray-500 hover:text-gray-900">
                                <QuestionMarkCircleIcon
                                  className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              </span>
                              <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                Comment
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
