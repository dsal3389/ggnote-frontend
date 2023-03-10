import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

import IcoBtnComponent from "./buttons/ico.btn.component";
import { deleteNoteApi } from "../api/notes";

function NoteComponent({ id, title, content, onDelete }) {
  const [deleted, setDeleted] = useState();
  const deleteNote = () =>
    deleteNoteApi(id).then(() => {
      setDeleted(true);
      if (onDelete) onDelete(id);
    });

  return (
    <div
      className={
        "bg-accent border" + (deleted ? " bg-red-600/5 border-red-600/50" : "")
      }
    >
      <div className="p-4 duration-200 flex">
        <Link to={!deleted && id ? `/${id}` : "#"}>
          <h2 className="text-2xl font-bold" title={title}>
            {title}
          </h2>
        </Link>
        <div className="flex-1"></div>
        {id ? (
          <div>
            <IcoBtnComponent
              disabled={deleted}
              onClick={deleteNote}
              className="bg-red-600/10 hover:bg-red-600 text-red-800 dark:text-red-200"
              Icon={<FiTrash2 />}
            />
          </div>
        ) : null}
      </div>
      <hr />
      <div className="p-4">
        <p className="text-base">
          <ReactMarkdown className="markdown-block">{content}</ReactMarkdown>
          {content.length > 250 ? (
            <>
              <br />
              <Link to={`/${id}`}>
                <span>read more...</span>
              </Link>
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
}

export default React.memo(NoteComponent);
