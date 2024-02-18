import NavigationBar from "../components/navigation-bar";

import styles from "../styles.module.css";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <h1 className={styles.heading}>Welcome to the store</h1>
      <p className={styles.description}>
        This project is part of The Odin Project&apos;s curriculum, you could
        view the{" "}
        <a href="https://www.theodinproject.com/lessons/react-new-shopping-cart">
          project description at here
        </a>
      </p>
    </>
  );
}
