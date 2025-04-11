import "./notFoundPage.scss";
import { Link } from "react-router";
import { ErrorBlock } from "../../components/ErrorBlock";

const PAGE_CLASS_NAME = "not-found-page";
const DEFAULT_NOT_FOUND_MESSAGE = "Страница не найдена!";

export const NotFoundPage = () => {
  return (
    <div className={`${PAGE_CLASS_NAME} flex`}>
      <ErrorBlock text={DEFAULT_NOT_FOUND_MESSAGE} />

      <Link className={`${PAGE_CLASS_NAME}__link`} to="/" replace>
        На главную
      </Link>
    </div>
  );
};
