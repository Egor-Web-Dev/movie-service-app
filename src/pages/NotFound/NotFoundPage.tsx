import styles from "./notFoundPage.module.scss";
import { Link } from "react-router";
import { ErrorBlock } from "../../components/ErrorBlock";

const DEFAULT_NOT_FOUND_MESSAGE = "Страница не найдена!";

export const NotFoundPage = () => {
  return (
    <div className={`${styles.notFoundPage} flex`}>
      <ErrorBlock text={DEFAULT_NOT_FOUND_MESSAGE} />

      <Link className={styles.notFoundPage__link} to="/" replace>
        На главную
      </Link>
    </div>
  );
};
