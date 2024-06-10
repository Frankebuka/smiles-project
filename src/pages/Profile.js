import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, RadioGroup, Transition } from "@headlessui/react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getAuth, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import Camera from "../components/svg/Camera";
import Delete from "../components/svg/Delete";
import icon from "../images/icon.jpeg";

const user = {
  name: "Floyd Miles",
  email: "floy.dmiles@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" },
];
const breadcrumbs = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const team = [
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Bessie Richards",
    email: "bessie.richards@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Floyd Black",
    email: "floyd.black@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
const settings = [
  {
    name: "Public access",
    description: "Your campaign would be available to anyone who has the link",
  },
  {
    name: "Private to Smiles Members",
    description: "Only members of Smiles would be able to access your campaign",
  },
  {
    name: "Private to you",
    description: "You are the only one able to access your campaign",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(settings[0]);
  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
    photoURL: auth.currentUser?.photoURL,
    createdAt: auth.currentUser?.metadata.creationTime,
    id: auth.currentUser?.uid,
    bio: "",
  });

  const { name, email, photoURL, createdAt, id, bio } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase auth
        await updateProfile(auth?.currentUser, {
          displayName: name,
        });
        // update name in the firestore
        const docRef = doc(db, "users", auth.currentUser?.uid);
        await updateDoc(docRef, {
          name,
        });
        toast.success("Name updated");
      }

      if (bio !== "" && user?.bio !== bio) {
        // update name in the firestore
        const docRef = doc(db, "users", auth.currentUser?.uid);
        await updateDoc(docRef, {
          bio,
        });
        toast.success("Bio updated");
      }
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }

  useEffect(() => {
    getDoc(doc(db, "users", id)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
    if (img) {
      const UploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }

          //update display name in firebase auth
          await updateProfile(auth.currentUser, {
            photoURL: url,
          });

          await updateDoc(doc(db, "users", id), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImg("");
          toast.success("Profile photo updated");
        } catch (error) {
          console.log(error.message);
          toast.error("Could not update the profile details");
        }
      };
      UploadImg();
    }
  }, [img, id]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete image?");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));

        await updateProfile(auth.currentUser, {
          photoURL: "",
        });

        await updateDoc(doc(db, "users", id), {
          avatar: "",
          avatarPath: "",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <main className="mx-auto max-w-lg px-4 pt-10 pb-12 lg:pb-16">
        <form onSubmit={onSubmit}>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-medium leading-6 text-gray-900">
                Profile
              </h1>
              {/* <div className="mt-2 flex justify-end"> */}
              {/* <img className="h-24 w-24 rounded-full" src={photoURL} alt="" /> */}
              <div className="img_container profile_container mt-2 flex justify-end">
                <img src={user?.avatar || icon} alt="" />
                <div className="overlay flex justify-right items-right">
                  <label htmlFor="photo">
                    <Camera />
                  </label>
                  {user?.avatar ? <Delete deleteImage={deleteImage} /> : null}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="photo"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
              </div>
              {/* </div> */}
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  minLength={1}
                  maxLength={15}
                  disabled={!changeDetail}
                  onChange={onChange}
                  className={`block w-full rounded-md h-8 p-1 border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm ${
                    changeDetail && "bg-sky-50 focus:bg-sky-50"
                  }`}
                  defaultValue={name}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  disabled
                  className="block w-full rounded-md h-8 p-1 border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  placeholder={email}
                  // defaultValue={email}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  type="text"
                  id="bio"
                  name="bio"
                  rows={2}
                  minLength={1}
                  maxLength={50}
                  disabled={!changeDetail}
                  onChange={onChange}
                  className={`block w-full rounded-md h-20 p-1 border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm ${
                    changeDetail && "bg-sky-50 focus:bg-sky-50"
                  }`}
                  defaultValue={user?.bio}
                />
              </div>
            </div>

            {selected.name === "Private to Smiles Members" && (
              <div className="space-y-2">
                <div className="space-y-1">
                  <label
                    htmlFor="add-team-members"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Add members
                  </label>
                  <p id="add-team-members-helper" className="sr-only">
                    Search by email address
                  </p>
                  <div className="flex">
                    <div className="flex-grow">
                      <input
                        type="text"
                        name="add-team-members"
                        id="add-team-members"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                        placeholder="Email address"
                        aria-describedby="add-team-members-helper"
                      />
                    </div>
                    <span className="ml-3">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      >
                        <PlusIcon
                          className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Add</span>
                      </button>
                    </span>
                  </div>
                </div>

                <div className="border-b border-gray-200">
                  <ul role="list" className="divide-y divide-gray-200">
                    {team.map((person) => (
                      <li key={person.email} className="flex py-4">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={person.imageUrl}
                          alt=""
                        />
                        <div className="ml-3 flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {person.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {person.email}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <RadioGroup value={selected} onChange={setSelected}>
              <RadioGroup.Label className="text-sm font-medium text-gray-900">
                Privacy
              </RadioGroup.Label>

              <div className="isolate mt-1 -space-y-px rounded-md bg-white shadow-sm">
                {settings.map((setting, settingIdx) => (
                  <RadioGroup.Option
                    key={setting.name}
                    value={setting}
                    className={({ checked }) =>
                      classNames(
                        settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                        settingIdx === settings.length - 1
                          ? "rounded-bl-md rounded-br-md"
                          : "",
                        checked
                          ? "bg-sky-50 border-sky-200 z-10"
                          : "border-gray-200",
                        "relative border p-4 flex cursor-pointer focus:outline-none"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <span
                          className={classNames(
                            checked
                              ? "bg-sky-600 border-transparent"
                              : "bg-white border-gray-300",
                            active ? "ring-2 ring-offset-2 ring-sky-500" : "",
                            "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                          )}
                          aria-hidden="true"
                        >
                          <span className="rounded-full bg-white w-1.5 h-1.5" />
                        </span>
                        <span className="ml-3 flex flex-col">
                          <RadioGroup.Label
                            as="span"
                            className={classNames(
                              checked ? "text-sky-900" : "text-gray-900",
                              "block text-sm font-medium"
                            )}
                          >
                            {setting.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={classNames(
                              checked ? "text-sky-700" : "text-gray-500",
                              "block text-sm"
                            )}
                          >
                            {setting.description}
                          </RadioGroup.Description>
                        </span>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tag Smiles members to notify of your new campaign
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                disabled={!changeDetail}
                className="mt-1 block w-full rounded-md h-8 p-1 border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end">
              <Link to="/account">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </Link>
              {changeDetail ? (
                <button
                  type="submit"
                  onClick={(e) => {
                    setChangeDetail((prevState) => !prevState);
                    onSubmit(e);
                  }}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {/* {changeDetail ? "Apply change" : "Edit"} */}
                  Apply change
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    setChangeDetail((prevState) => !prevState);
                    // changeDetail && onSubmit(e);
                  }}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {/* {changeDetail ? "Apply change" : "Edit"} */}
                  Edit
                </button>
              )}
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
