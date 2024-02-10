import NavigationBar from "../components/navigation-bar";

import styles from "../styles.module.css";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <h1 className={styles.heading}>Welcome to the store</h1>
    </>
  );
}
