import React from "react";
import { Menu } from "@headlessui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DeleteTestimony = ({ id, imgUrls }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this testimony?")) {
      try {
        await deleteDoc(doc(db, "testimonies", id));
        toast("Testimony delected successfully", { type: "success" });
        const storageRef = ref(storage, imgUrls);
        await deleteObject(storageRef);
        navigate("/testimonies");
      } catch (error) {
        toast("Error delecting testimony", { type: "error" });
        console.log(error);
      }
    }
  };

  return (
    <Menu.Item>
      {({ active }) => (
        <span
          onClick={handleDelete}
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
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
    </Menu.Item>
  );
};

export default DeleteTestimony;
