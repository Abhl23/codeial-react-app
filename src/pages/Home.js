import styles from '../styles/home.module.css';

import {Comment} from '../components';

import PropTypes from 'prop-types';

const Home = (props) => {
  const { posts } = props;

  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://cdn-icons.flaticon.com/png/512/3899/premium/3899618.png?token=exp=1659965408~hmac=cfbd2926f7111fe58815a22cd8be044a"
                alt="user-pic"
              />
              <div>
                <span className={styles.postAuthor}>{post.user.name}</span>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons.flaticon.com/png/512/3670/premium/3670215.png?token=exp=1659965453~hmac=9fc53bc3b636d8ba244fdf9ae1a491c2"
                  alt="likes-icon"
                />
                <span>5</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6460/6460733.png"
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

Home.propTypes={
    posts : PropTypes.array.isRequired
};

export default Home;
