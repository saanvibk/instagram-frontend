import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import "./follow.css";

const Follow = ({ user }) => {
  const navigate = useNavigate();
  const [followed, setFollowed] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const checkFollowStatus = async () => {
    try {
      const res = await fetch(
        `http://localhost:6500/user/checkFollowStatus?profileId=${user._id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        setIsFollowing(data.isFollowing);
      }
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };

  const follow = async (userID) => {
    const res = await fetch(`${config.backendURL}/user/follow`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ userID }),
      credentials: "include", // Include credentials (cookies)
    });

    if (res.status === 401) {
      navigate("/");
    }

    if (res.status === 200) {
      const updatedUser = await res.json();
      console.log(updatedUser);
    }
  };

  const unfollow = async (userID) => {
    const res = await fetch(`${config.backendURL}/user/unfollow`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ userID }),
      credentials: "include", // Include credentials (cookies)
    });

    if (res.status === 401) {
      navigate("/");
    }

    if (res.status === 200) {
      const updatedUser = await res.json();
      console.log(updatedUser);
      setFollowed(true);
    }
  };
  return (
    <>
      <h2>{user.username}</h2>
      {/* follow button */}
      {isFollowing ? (
        <button
          className="unfollow-btn profile-btn"
          onClick={() => {
            setFollowed(false);
            unfollow(user._id);
          }}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="follow-btn profile-btn"
          onClick={() => {
            setFollowed(true);
            follow(user._id);
          }}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default Follow;
