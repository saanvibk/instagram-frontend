import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./profilePage.css";
import ProfilePic from "./profilePic";
import Navbar from "../home/navbar";
import config from "../config";
import Posts from "./Posts";
import Follow from "./Follow";

function ViewProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(location.state);
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  const viewProfile = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:6500/user/viewProfile?userId=${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include credentials (cookies)
        }
      );

      if (res.status === 401) {
        navigate("/");
      }

      if (res.status === 200) {
        const data = await res.json();
        setUser(data.user);
        console.log("other user profile - ", data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewPost = async (userId) => {
    const data = await fetch(
      `${config.backendURL}/post/viewPost?userId=${userId}`,
      {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include", // Include credentials (cookies)
      }
    );

    if (data.status === 401) {
      navigate("/");
    }

    if (data.status === 200) {
      const response = await data.json();
      setPosts(response.userPost);
    }
  };

  useEffect(() => {
    viewProfile(userId._id);
    viewPost(userId._id);
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-picture">
            <img
              src={
                user.profilePic
                  ? user.profilePic
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7-_ejhfjun3WS6ya6cX5xO38IAZcA5S8em6u-wQHQwrijW4jrI57-NDbbszUJXhZjbo&usqp=CAU"
              }
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            {user ? (
              <div className="profile-info-header">
                <Follow user={user} />
              </div>
            ) : (
              <p>Loading...</p>
            )}

            <div className="profile-stats">
              <p>{posts.length ? posts.length : 0} posts</p>
              <p>{user.followers ? user.followers.length : 0} followers</p>
              <p>{user.following ? user.following.length : 0} following</p>
            </div>

            <h3>{user.fullname}</h3>
            <p>{user.bio} hello</p>
          </div>
        </div>
        <div className="profile-posts">{/* <Posts /> */}</div>
      </div>
    </>
  );
}

export default ViewProfile;
