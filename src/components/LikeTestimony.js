import { HandThumbUpIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const LikeTestimony = ({ id, likes }) => {
  const [user] = useAuthState(auth);

  const likesRef = doc(db, "testimonies", id);

  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <span className="inline-flex items-center text-sm">
      <button
        onClick={handleLike}
        type="button"
        className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
      >
        <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
        <span className="font-medium text-gray-900">{likes?.length}</span>
        <span className="sr-only">likes</span>
      </button>
    </span>
  );
};

export default LikeTestimony;
