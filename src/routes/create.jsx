import { useState } from "react";
import { useQuery } from "react-query";
import { redirect, useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import BtnComponent from "../components/buttons/btn.component";
import InputComponent from "../components/input/input.component";
import TextInputComponent from "../components/input/text.input.component";
import { createNoteApi } from "../api/notes";

async function postNote({ queryKey }) {
  const [_, note] = queryKey;
  return await createNoteApi(note);
}

export default function CreateNote() {
  const navigate = useNavigate();
  const [note, SetNote] = useState({ title: "", content: "# hello world" });
  const { isLoading, refetch } = useQuery(["createNote", note], postNote, {
    enabled: false,
    retry: false,
  });
  const createNote = (e) => {
    e.preventDefault();
    refetch().then(({ data: { id } }) => navigate(`/${id}`));
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
      <div className="fixed left-0 right-0 w-full h-[56px] border-b p-4 flex items-center z-[100] bg-accent/50 backdrop-blur">
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
