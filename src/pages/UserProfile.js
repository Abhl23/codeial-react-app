import styles from '../styles/settings.module.css';

import { useParams, useNavigate } from 'react-router-dom';

import { useToasts } from 'react-toast-notifications';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);

  const { addToast } = useToasts();
  const navigate = useNavigate();

  const { userId } = useParams();

  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });

        return navigate('/');
      }

      setLoading(false);
    };

    getUser();
  }, [userId, addToast, navigate]);

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friendships;

    const friendIds = friends.map((friend) => friend.to_user._id);

    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  const handleAddFriend = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);

    if (response.success) {
      auth.updateUserFriends(true, response.data.friendship);

      addToast('Friend Added!', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }

    setRequestInProgress(false);
  };

  const handleRemoveFriend = async () => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);

    if(response.success){
      auth.updateUserFriends(false, userId);

      addToast('Friend Removed!', {
        appearance : 'success'
      });
    }
    else{
      addToast(response.message, {
        appearance: 'error'
      });
    }

    setRequestInProgress(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="user-profile"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={styles.saveBtn}
            disabled={requestInProgress}
            onClick={handleRemoveFriend}
          >
            {requestInProgress ? 'Removing Friend...' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={styles.saveBtn}
            disabled={requestInProgress}
            onClick={handleAddFriend}
          >
            {requestInProgress ? 'Adding Friend...' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
