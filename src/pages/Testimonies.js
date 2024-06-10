import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChatBubbleLeftEllipsisIcon,
  CodeBracketIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FlagIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../components/Spinner";
import NewTestimony from "../components/NewTestimony";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import DeleteTestimony from "../components/DeleteTestimony";
import LikeTestimony from "../components/LikeTestimony";

const questions = [
  {
    id: "81614",
    likes: "29",
    replies: "11",
    views: "2.7k",
    author: {
      name: "Dries Vincent",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
    },
    date: "December 9 at 11:43 AM",
    datetime: "2020-12-09T11:43:00",
    href: "#",
    title: "What would you have done differently if you ran Jurassic Park?",
    body: `
      <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
      <p>Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be&hellip;</p>
    `,
  },
  {
    id: "81615",
    likes: "29",
    replies: "11",
    views: "2.7k",
    author: {
      name: "Dries Vincent",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
    },
    date: "December 9 at 11:43 AM",
    datetime: "2020-12-09T11:43:00",
    href: "#",
    title: "What would you have done differently if you ran Jurassic Park?",
    body: `
      <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
      <p>Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be&hellip;</p>
    `,
  },
  {
    id: "81616",
    likes: "29",
    replies: "11",
    views: "2.7k",
    author: {
      name: "Dries Vincent",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
    },
    date: "December 9 at 11:43 AM",
    datetime: "2020-12-09T11:43:00",
    href: "#",
    title: "What would you have done differently if you ran Jurassic Park?",
    body: `
      <p>Jurassic Park was an incredible idea and a magnificent feat of engineering, but poor protocols and a disregard for human safety killed what could have otherwise been one of the best businesses of our generation.</p>
      <p>Ultimately, I think that if you wanted to run the park successfully and keep visitors safe, the most important thing to prioritize would be&hellip;</p>
    `,
  },
  // More questions...
];
const whoToFollow = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];
const trendingPosts = [
  {
    id: 1,
    user: {
      name: "Floyd Miles",
      imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    body: "What books do you have on your bookshelf just to look smarter than you actually are?",
    comments: 291,
  },
  // More posts...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Testimonies() {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [user] = useAuthState(auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: {},
  });

  const { title, description, images } = formData;

  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  useEffect(() => {
    const testimonyRef = collection(db, "testimonies");
    const q = query(testimonyRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      const testimonies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(testimonies);
      setTestimonies(testimonies);
    });
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (images.length > 4) {
      setLoading(false);
      toast.error("maximum 4 images are allowed");
      return;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      name: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
      imgUrls,
      // timestamp: Timestamp.now().toDate(),
      timestamp: new Date(),
      userRef: auth.currentUser.uid,
      photoURL: auth.currentUser?.photoURL,
      comments: [],
      likes: [],
      views: [],
    };
    delete formDataCopy.images;
    const docRef = await addDoc(collection(db, "testimonies"), formDataCopy);
    setLoading(false);
    toast.success("Testimony created");
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
            <div></div>
            <main className="lg:col-span-9 xl:col-span-6 mx-3 sm:mx-0">
              {!show && (
                <div className="px-4 sm:px-0 mb-12">
                  <div className="sm:hidden">
                    <span
                      onClick={() => setShow(true)}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border text-white px-4 py-2 text-base font-medium hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 hover:bg-origin-border cursor-pointer"
                    >
                      New Testimony
                    </span>
                  </div>
                </div>
              )}
              {show && <NewTestimony setShow={setShow} />}
              <div className="mt-0">
                <h1 className="sr-only">Recent questions</h1>
                <ul role="list" className="space-y-4">
                  {testimonies.length === 0 ? (
                    <p className="text-center md:text-start mt-6 ml-9">
                      No articles found!
                    </p>
                  ) : (
                    testimonies?.map(
                      ({
                        id,
                        photoURL,
                        name,
                        timestamp,
                        title,
                        description,
                        views,
                        imgUrls,
                        likes,
                        comments,
                        userRef,
                      }) => (
                        <li
                          key={id}
                          className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
                        >
                          <article aria-labelledby={"question-title-" + id}>
                            <div>
                              <div className="flex space-x-3">
                                <div className="flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={photoURL}
                                    alt=""
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    <span className="hover:underline">
                                      {name}
                                    </span>
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    <span className="hover:underline">
                                      {timestamp.toDate().toDateString()}
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
                                        <span className="sr-only">
                                          Open options
                                        </span>
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
                                          {user && user.uid === userRef && (
                                            <DeleteTestimony
                                              id={id}
                                              imgUrls={imgUrls}
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
                                {title}
                              </h2>
                            </div>
                            <div
                              className="mt-2 space-y-4 text-sm text-gray-700"
                              dangerouslySetInnerHTML={{
                                __html: description,
                              }}
                            />
                            <div className="mt-6 flex justify-between space-x-8">
                              <div className="flex space-x-6">
                                <LikeTestimony id={id} likes={likes} />

                                <span className="inline-flex items-center text-sm">
                                  <button
                                    type="button"
                                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                  >
                                    <Link to={`/testimony/${id}`}>
                                      <ChatBubbleLeftEllipsisIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </Link>
                                    <span className="font-medium text-gray-900">
                                      {comments.length}
                                    </span>
                                    <span className="sr-only">replies</span>
                                  </button>
                                </span>

                                <span className="inline-flex items-center text-sm">
                                  <button
                                    type="button"
                                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                  >
                                    <EyeIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    <span className="font-medium text-gray-900">
                                      {views.length}
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
                                    <ShareIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    <span className="font-medium text-gray-900">
                                      Share
                                    </span>
                                  </button>
                                </span>
                              </div>
                            </div>
                          </article>
                        </li>
                      )
                    )
                  )}
                </ul>
              </div>
            </main>
            <aside className="hidden xl:col-span-4 xl:block mb-24">
              <div className="sticky top-4 space-y-4">
                <section aria-labelledby="who-to-follow-heading">
                  <div className="rounded-lg bg-white shadow">
                    <form onSubmit={onSubmit} className="p-6 space-y-6">
                      <h2
                        id="who-to-follow-heading"
                        className="text-base font-medium text-gray-900"
                      >
                        New Testimony
                      </h2>
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <div className="mt-1">
                          <input
                            type="title"
                            name="title"
                            id="title"
                            onChange={onChange}
                            className="block w-full rounded-md h-8 p-1 border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            type="text"
                            id="description"
                            name="description"
                            rows={2}
                            minLength={1}
                            maxLength={200}
                            onChange={onChange}
                            className="block w-full rounded-md h-8 p-1 border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="flex text-sm font-medium text-gray-700 whitespace-nowrap">
                          Images &nbsp;
                          <p className="font-light">(max 4 images)</p>
                        </p>
                        <input
                          type="file"
                          id="images"
                          onChange={onChange}
                          accept=".jpg,.png,.jpeg"
                          multiple
                          required
                          className="w-full px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600 cursor-pointer"
                        />
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer"
                        >
                          Publish
                        </button>
                      </div>
                    </form>
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
