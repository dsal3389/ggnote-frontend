import { useState } from "react";
import { useQuery } from "react-query";
import { redirect } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import BtnComponent from "../components/buttons/btn.component";
import InputComponent from "../components/input/input.component";
import TextInputComponent from "../components/input/text.input.component";

async function postNote({ queryKey }) {
  const [_, note] = queryKey;
  const results = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/post`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(note),
  });

  if (results.status != 201)
    throw Error(`unexpected status code ${results.status}`);
  return await results.json();
}

export default function CreateNote() {
  const [note, SetNote] = useState({ title: "", content: "# hello world" });
  const { data, isLoading, refetch } = useQuery(
    ["createNote", note],
    postNote,
    {
      enabled: false,
      retry: false,
    }
  );
  const createNote = (e) => {
    e.preventDefault();
    refetch().then(({ data: { id } }) => redirect(`/${id}`));
  };
  const handleInputText = (field) => {
    return (e) => {
      SetNote((prevState) => ({
        ...prevState,
        [field]: e.target.value,
      }));
    };
  };

  return (
    <>
      <div className="fixed left-0 right-0 w-full h-[56px] border-b p-3 flex items-center z-[100] bg-accent/50 backdrop-blur">
        <h2 className="text-lg font-bold">{note.title}</h2>
        <div className="flex-1"></div>
        <BtnComponent
          onClick={createNote}
          disabled={!(note.title && note.content) || isLoading}
        >
          <p>create</p>
        </BtnComponent>
      </div>
      <div className="border-x min-h-screen overflow-hidden">
        <div className="p-3 pt-[64px] border-b">
          <form className="space-y-6" onSubmit={createNote}>
            <InputComponent
              placeholder="note title..."
              label="title"
              onChange={handleInputText("title")}
              value={note.title}
            />
            <TextInputComponent
              label="content"
              minHeight="300px"
              onChange={handleInputText("content")}
              value={note.content}
            />
          </form>
        </div>
        <div className="p-3">
          <h2 className="text-xl font-bold">markdown preview</h2>
          <div className="p-2 mt-2">
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}
