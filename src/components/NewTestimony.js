import React, { useState } from "react";
import Spinner from "./Spinner";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const NewTestimony = ({ setShow }) => {
  const [loading, setLoading] = useState(false);

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
      timestamp: Timestamp.now().toDate(),
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
    // navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <aside className="flex ml-12 xl:hidden mb-12 col-span-4">
        <div className="sticky top-4 space-y-4">
          <section aria-labelledby="who-to-follow-heading">
            <div className="rounded-lg bg-white shadow">
              <form onSubmit={onSubmit} className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h2
                    id="who-to-follow-heading"
                    className="text-base font-medium text-gray-900"
                  >
                    New Testimony
                  </h2>
                  <GrFormClose
                    onClick={() => setShow(false)}
                    className="text-black text-xl font-extrabold cursor-pointer"
                  />
                </div>
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
  );
};

export default NewTestimony;
