import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PostModal from "./PostModal";
import ViewProfile from "../profile/ViewProfile";

function SinglePost({ post, userID }) {
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const makeComment = async (postId) => {
    const res = await fetch("http://localhost:6500/post/comment", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment, postId }),
      credentials: "include", // Include credentials (cookies)
    });

    if (res.status === 401) {
      navigate("/");
    }
    if (res.status === 200) {
      setComment([]);
    }
  };

  const toggleComment = (post) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(post);
      console.log("item", item);
    }
  };

  const likePost = async (postId) => {
    try {
      const res = await fetch("http://localhost:6500/post/like", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
        credentials: "include", // Include credentials (cookies)
      });

      console.log(`like before ${liked}`);
      if (res.status === 401) {
        navigate("/");
      }

      if (res.status === 200) {
        setLiked(true);
        setLikes(likes + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unLikePost = async (postId) => {
    try {
      const res = await fetch("http://localhost:6500/post/unlike", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
        credentials: "include", // Include credentials (cookies)
      });

      if (res.status === 401) {
        navigate("/");
      }

      if (res.status === 200) {
        setLiked(false);
        setLikes(likes - 1);
        console.log("unliked");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLiked(post.likes.includes(userID));
    setLikes(post.likes.length);
  }, []);

  return (
    <div>
      {post && (
        <div key={post._id} className="card">
          {/* card header */}
          <div className="card-header">
            <div className="card-pic">
              <img
                src={post.postedBy.profilePic}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/viewProfile", { state: post.postedBy })
                }
              />
            </div>
            <h5
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/viewProfile", { state: post.postedBy })}
            >
              {post.postedBy.username}
            </h5>
          </div>
          {/* card image */}
          <div className="card-image">
            <img src={post.post} alt="" />
          </div>

          {/* card content */}

          <div className="card-content">
            {liked ? (
              <span
                className="material-symbols-outlined material-symbols-outlined-red"
                onClick={() => {
                  unLikePost(post._id);
                }}
              >
                favorite
              </span>
            ) : (
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  likePost(post._id);
                }}
              >
                favorite
              </span>
            )}
            <p>{likes} Likes</p>

            <p>
              <b style={{ marginRight: "5px" }}>{post.postedBy.username} </b>{" "}
              <span>{post.caption}</span>
              <p
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  toggleComment(post);
                }}
              >
                View all comments
              </p>
            </p>
          </div>

          {/* add Comment */}
          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              className="comment"
              onClick={() => {
                makeComment(post._id);
              }}
            >
              Post
            </button>
          </div>
        </div>
      )}

      <PostModal
        show={show}
        item={item}
        comment={comment}
        setComment={setComment}
        likePost={likePost}
        unLikePost={unLikePost}
        makeComment={makeComment}
        toggleComment={toggleComment}
        likes={likes}
        liked={liked}
      />
    </div>
  );
}

export default SinglePost;
