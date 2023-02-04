import { useLoaderData, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import IcoBtnComponent from "../components/buttons/ico.btn.component";
import { deleteNoteApi, getNote } from "../api/notes";

export async function loader({ params }) {
  return { note: await getNote(params.noteId) };
}

export default function Note() {
  const navidagate = useNavigate();
  const { note } = useLoaderData();
  const deleteNote = () => 
    deleteNoteApi(note.id).then(() => 
      navidagate('/')
    )

  return (
    <>
      <div className="fixed left-0 right-0 w-full h-[56px] border-b p-4 flex items-center z-[100] bg-accent/50 backdrop-blur">
        <h2 className="text-lg font-bold">{note.title}</h2>
        <div className="flex-1"></div>
        <div className="space-x-2">
          <IcoBtnComponent Icon={<FiTrash2 />} onClick={deleteNote} />
          <IcoBtnComponent Icon={<FiEdit2 />} />
        </div>
      </div>
      <div className="border-x h-screen relative pt-[64px]">
        <div className="p-4">
          <ReactMarkdown className="markdown-block">
            {note.content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
