import styles from '../styles/settings.module.css';

import { useToasts } from 'react-toast-notifications';

const UserProfile = () => {
  const user = {};

  const { addToast } = useToasts();

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
        <button className={styles.saveBtn}>
          Add Friend
        </button>

        <button className={styles.saveBtn}>
          Remove Friend
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
