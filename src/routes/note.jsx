import { useLoaderData } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import IcoBtnComponent from "../components/buttons/ico.btn.component";

export async function loader({ params }) {
  const note = await (
    await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/${params.noteId}`)
  ).json();
  return { note };
}

export default function Note() {
  const { note } = useLoaderData();
  return (
    <>
      <div className="fixed left-0 right-0 w-full h-[56px] border-b p-4 flex items-center z-[100] bg-accent/50 backdrop-blur">
        <h2 className="text-lg font-bold">{note.title}</h2>
        <div className="flex-1"></div>
        <div className="space-x-2">
          <IcoBtnComponent Icon={<FiTrash2 />} />
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
