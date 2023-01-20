import { useLoaderData } from "react-router-dom";
import ReactMarkdown from "react-markdown";

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
      <div className="border-x h-screen relative">
        <div className="p-4 w-full border-b">
          <h1 className="text-4xl">{note.title}</h1>
        </div>
        <div className="p-4">
          <ReactMarkdown className="markdown-block">
            {note.content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
