import "./footer.scss";
import { FC } from "react";
import { Link } from "react-router";
import { Container } from "../Container";
import Vk from "../Icon/Vk.svg?react";
import Ok from "../Icon/Ok.svg?react";
import Youtube from "../Icon/Youtube.svg?react";
import Telegram from "../Icon/Telegram.svg?react";

const FOOTER_CLASS_NAME = "footer";
const LIST_CLASS_NAME = "social-list";

const socialIcons = {
  vk: Vk,
  ok: Ok,
  youtube: Youtube,
  telegram: Telegram,
};

type ItemProps = {
  name: keyof typeof socialIcons;
  path: string;
};

export const Footer = () => {
  return (
    <footer className={FOOTER_CLASS_NAME}>
      <Container sectionClassName={FOOTER_CLASS_NAME}>
        <ul
          className={`${FOOTER_CLASS_NAME}__social-list ${LIST_CLASS_NAME} list-reset flex`}
        >
          <SocialMediaItem name="vk" path="#" />
          <SocialMediaItem name="youtube" path="#" />
          <SocialMediaItem name="ok" path="#" />
          <SocialMediaItem name="telegram" path="#" />
        </ul>
      </Container>
    </footer>
  );
};

const SocialMediaItem: FC<ItemProps> = ({ name, path }) => {
  const Icon = socialIcons[name];

  return (
    <li className={`${LIST_CLASS_NAME}__item`}>
      <Link className={`${LIST_CLASS_NAME}__link link-${name} flex`} to={path}>
        <Icon />
      </Link>
    </li>
  );
};
