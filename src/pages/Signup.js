import styles from '../styles/login.module.css';

import { useAuth, useFormInput } from '../hooks';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const name = useFormInput('');
  const email = useFormInput('');
  const password = useFormInput('');
  const confirmPassword = useFormInput('');

  const [signingUp, setSigningUp] = useState(false);

  const { addToast } = useToasts();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSigningUp(true);

    if (
      !name.value ||
      !email.value ||
      !password.value ||
      !confirmPassword.value
    ) {
      setSigningUp(false);

      return addToast('Please fill all the Fields!', {
        appearance: 'error',
      });
    }

    if (password.value !== confirmPassword.value) {
      setSigningUp(false);

      return addToast('Password and Confirm Password does not match!', {
        appearance: 'error',
      });
    }

    const response = await auth.signup(
      name.value,
      email.value,
      password.value,
      confirmPassword.value
    );

    if (response.success) {
      navigate('/login');

      addToast('Sign Up Successful, Account Created!', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }

    setSigningUp(false);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Sign Up</span>

      <div className={styles.field}>
        <input type="text" placeholder="Name" {...name} />
      </div>

      <div className={styles.field}>
        <input type="email" placeholder="Email" {...email} />
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="Password" {...password} />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Confirm Password"
          {...confirmPassword}
        />
      </div>

      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
