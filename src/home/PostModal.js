import React from 'react';

function PostModal({
  show,
  item,
  comment,
  setComment,
  makeComment,
  likePost,
  unLikePost,
  toggleComment,
  liked,
  likes,
}) {
  return (
    <div>
      {show && (
        <div className='showComment'>
          <div className='container'>
            <div className='postPic'>
              <img src={item.post} alt='' />
            </div>
            <div className='details'>
              {/* card header */}
              <div
                className='card-header'
                style={{ borderBottom: '1px solid #00000029' }}
              >
                <div className='card-pic'>
                  <img src={item.postedBy.profilePic} alt='' />
                </div>
                <h5>{item.postedBy.username}</h5>
              </div>

              {/* commentSection */}
              <div
                className='comment-section'
                style={{ borderBottom: '1px solid #00000029' }}
              >
                {item.comments.map((comment) => {
                  console.log(comment);

                  return (
                    <p key={comment._id} className='comm'>
                      <span
                        className='commenter'
                        style={{
                          fontWeight: 'bolder',
                          marginRight: '10px',
                        }}
                      >
                        {comment.postedBy.username}
                      </span>
                      <span className='commentText'>{comment.comment}</span>
                    </p>
                  );
                })}
              </div>

              {/* card content */}
              <div className='card-content'>
                {liked ? (
                  <span
                    className='material-symbols-outlined material-symbols-outlined-red'
                    onClick={() => {
                      unLikePost(item._id);
                    }}
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    className='material-symbols-outlined'
                    onClick={() => {
                      likePost(item._id);
                    }}
                  >
                    favorite
                  </span>
                )}
                <p>{likes} Likes</p>

                <p>
                  <b style={{ marginRight: '5px' }}>
                    {item.postedBy.username}{' '}
                  </b>
                  <span>{item.caption}</span>
                </p>
              </div>

              {/* add Comment */}
              <div className='add-comment'>
                <input
                  type='text'
                  placeholder='Add a comment'
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className='comment'
                  onClick={() => {
                    makeComment(item._id);
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div
            className='close-comment'
            onClick={() => {
              toggleComment();
            }}
          >
            <span className='material-symbols-outlined material-symbols-outlined-comment'>
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostModal;
