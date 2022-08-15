import styles from '../styles/home.module.css';

import {Comment, Loader} from '../components';

import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Link } from 'react-router-dom';

const Home = (props) => {
  const [posts, setPosts]=useState([]);
  const [loading, setLoading]=useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response=await getPosts();

      console.log('In Home', response);

      if(response.success){
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if(loading){
    return <Loader />;
  }

  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                alt="user-pic"
              />
              <div>
                <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>{post.user.name}</Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/889/889140.png"
                  alt="likes-icon"
                />
                <span>5</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1789/1789313.png"
                  alt="comments-icon"
                />
                <span>2</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
                {post.comments.map((comment) => (
                  <Comment comment={comment} key={`comment-${comment._id}`} />
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Home;
