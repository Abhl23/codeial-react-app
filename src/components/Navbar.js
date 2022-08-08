import styles from '../styles/navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </a>
      </div>

      <div className={styles.rightNav}>
        <div className={styles.user}>
          <a href="/">
            <img
              src="https://cdn-icons.flaticon.com/png/512/3899/premium/3899618.png?token=exp=1659965408~hmac=cfbd2926f7111fe58815a22cd8be044a"
              alt=""
              className={styles.userDp}
            />
          </a>
          <span>Aakash</span>
        </div>

        <div className={styles.navLinks}>
          <ul>
            <li>
              <a href="/">Log in</a>
            </li>
            <li>
              <a href="/">Log out</a>
            </li>
            <li>
              <a href="/">Register</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
