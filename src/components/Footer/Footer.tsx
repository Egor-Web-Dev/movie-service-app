import styles from "./footer.module.scss";
import { FC, ReactNode } from "react";
import { Link } from "react-router";
import { Container } from "../Container";
import Vk from "../Icon/Vk.svg?react";
import Ok from "../Icon/Ok.svg?react";
import Youtube from "../Icon/Youtube.svg?react";
import Telegram from "../Icon/Telegram.svg?react";

type ItemProps = {
  className: string;
  children: ReactNode;
  path: string;
};

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container contentClassName={styles.footer__content}>
        <ul className={`${styles.socialList} list-reset flex`}>
          <SocialItem className={styles.vk} path="#">
            <Vk />
          </SocialItem>

          <SocialItem className={styles.youtube} path="#">
            <Youtube />
          </SocialItem>

          <SocialItem className={styles.ok} path="#">
            <Ok />
          </SocialItem>

          <SocialItem className={styles.telegram} path="#">
            <Telegram />
          </SocialItem>
        </ul>
      </Container>
    </footer>
  );
};

const SocialItem: FC<ItemProps> = ({ className, path, children }) => {
  return (
    <li className={styles.socialList__item}>
      <Link
        className={`${styles.socialList__link} ${className} flex`}
        to={path}
      >
        {children}
      </Link>
    </li>
  );
};
