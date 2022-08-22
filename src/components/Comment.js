import styles from '../styles/home.module.css';

import PropTypes from 'prop-types';
import { toggleLike } from '../api';
import { useToasts } from 'react-toast-notifications';

const Comment = ({ comment }) => {
  const { addToast } = useToasts();

  const handleCommentLike = async () => {
    const response = await toggleLike(comment._id, 'Comment');

    if (response.success) {
      if (response.data.deleted) {
        addToast('Like Removed!', {
          appearance: 'success',
        });
      } else {
        addToast('Like Added!', {
          appearance: 'success',
        });
      }
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
  };

  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        <span className={styles.postCommentLikes} onClick={handleCommentLike}>
          {comment.likes.length} Likes
        </span>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
