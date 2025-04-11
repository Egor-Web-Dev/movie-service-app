import "./trailerModal.scss";
import { FC, useState } from "react";
import type Movie from "../../types/Movie";
import { BounceLoader } from "react-spinners";
import { ModalWrapper } from "../ModalWrapper";

const BLOCK_CLASS_NAME = "trailer-modal";

type TrailerModalProps = {
  trailer: Movie;
};

export const TrailerModal: FC<TrailerModalProps> = ({ trailer }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <ModalWrapper>
      <div className={`${BLOCK_CLASS_NAME} flex`}>
        {isLoading && <BounceLoader size={100} color="#27a7e7" />}

        <iframe
          onLoad={() => setLoading(false)}
          className={`${BLOCK_CLASS_NAME}__video`}
          src={`https://www.youtube.com/embed/${trailer.trailerYouTubeId}?si=wpwCAHd4_CPpltTA`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </ModalWrapper>
  );
};
