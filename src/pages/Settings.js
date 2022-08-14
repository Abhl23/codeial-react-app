import styles from '../styles/settings.module.css';

import { useAuth } from '../hooks';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

const Settings = () => {
  const auth = useAuth();

  const [name, setName] = useState(auth.user?.name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [editMode, setEditMode] = useState(false);
  const [savingForm, setSavingForm] = useState(false);

  const { addToast } = useToasts();

  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const updateProfile = async () => {
    setSavingForm(true);

    if (!name || !password || !confirmPassword) {
      setSavingForm(false);

      return addToast('Please fill all the fields!', {
        appearance: 'error',
      });
    }

    if (password !== confirmPassword) {
      setSavingForm(false);

      return addToast('Password and Confirm Password does not match!', {
        appearance: 'error',
      });
    }

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    if (response.success) {
      setEditMode(false);
      clearForm();

      addToast('Profile Updated Successfully!', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }

    setSavingForm(false);
  };

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
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={styles.saveBtn}
              disabled={savingForm}
              onClick={updateProfile}
            >
              {savingForm ? 'Saving Profile...' : 'Save Profile'}
            </button>
            <button
              className={styles.goBack}
              disabled={savingForm}
              onClick={() => setEditMode(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <button className={styles.editBtn} onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
