import styles from "./scrollUpButton.module.scss";
import { Button } from "../Button";
import { useState, useEffect } from "react";
import throttle from "../../utils/throttle";
import IconArrowBack from "../Icon/ArrowBack.svg?react";

export const ScrollUpButton = () => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const pagePosition = window.scrollY;
      setVisible(pagePosition > window.innerHeight);
    }, 1000);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setVisible(false);
  };

  return (
    isVisible && (
      <Button
        className={`${styles.scrollBtn} flex`}
        kind="primary"
        onClick={scrollUp}
      >
        <IconArrowBack /> <span>Наверх</span>
      </Button>
    )
  );
};
