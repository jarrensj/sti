import Link from 'next/link'
import styles from './navbar.module.css'
const NavBar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.navlinks}>
        <Link href="/" className={styles.navbrand}>CaredFor</Link>
        <Link href="/" className={styles.link}>Home</Link>
      </div>
    </div>
    );
  };
  
export default NavBar;
  
  