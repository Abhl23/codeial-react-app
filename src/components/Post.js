import styles from '../styles/home.module.css';

import { Comment } from '../components';

import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';
import { addComment } from '../api';
import { useToasts } from 'react-toast-notifications';
import { useState } from 'react';


const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);

  const auth = useAuth();
  const posts = usePosts();
  const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter' && comment) {
      setCreatingComment(true);

      const response = await addComment(comment, post._id);

      if (response.success) {
        setComment('');

        posts.addCommentToState(response.data.comment, post._id);

        addToast('Comment Added!', {
          appearance: 'success',
        });
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
      }

      setCreatingComment(false);
    }
  };

  return (
    <div className={styles.postWrapper}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={
                auth.user?._id === post.user._id
                  ? '/settings'
                  : `/user/${post.user._id}`
              }
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
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
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1789/1789313.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
            disabled={creatingComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
