import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { setUserSignOut } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUserSignOut());
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="center">
        <div>
          <div>Profile</div>
          <div>
            <button style={{ display: "block" }} onClick={handleSignOut}>
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
