import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';

const FriendsList = () => {
  const auth = useAuth();

  const { friendships } = auth.user;

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {friendships && friendships.length === 0 && (
        <div className={styles.noFriends}>No friends found!</div>
      )}

      {friendships &&
        friendships.map((friendship) => (
          <div key={`friend-${friendship._id}`}>
            <Link
              to={`/user/${friendship.to_user._id}`}
              className={styles.friendsItem}
            >
              <div className={styles.friendsImg}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                  alt=""
                />
              </div>
              <div className={styles.friendsName}>{friendship.to_user.email}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendsList;
