import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";

import BtnComponent from "../components/buttons/btn.component";
import NoteComponent from "../components/note.component";
import SpinnerComponent from "../components/spinner";

export default function ListNotes() {
  const fetchNotes = ({ pageParam = { max: 30, offset: 0, total_count: 0 } }) =>
    fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/?max=${pageParam.max}&offset=${
        pageParam.offset
      }`
    ).then((res) => res.json());
  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery("notesList", fetchNotes, {
      getNextPageParam: (lastpage) =>
        lastpage.total_count >= lastpage.offset
          ? { max: lastpage.max, offset: lastpage.offset + lastpage.max }
          : undefined,
    });

  useEffect(() => {
    const onBottomHit = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isFetchingNextPage
      )
        fetchNextPage();
    };

    document.addEventListener("scroll", onBottomHit);
    return () => document.removeEventListener("scroll", onBottomHit);
  }, []);

  if (isLoading)
    return (
      <>
        <div className="flex justify-center">
          <SpinnerComponent />
        </div>
      </>
    );

  if (!data.pages[0].content.length)
    return (
      <>
        <div className="flex flex-col items-center space-y-4 my-6">
          <h1>its empty here, start taking notes!</h1>
          <BtnComponent href="/new">create new note</BtnComponent>
        </div>
      </>
    );

  return (
    <>
      {data.pages.map((page) => {
        return page.content.map((n, i) => {
          return (
            <div key={i} className="my-2">
              <NoteComponent id={n.id} title={n.title} content={n.content} />
            </div>
          );
        });
      })}
      {isFetchingNextPage ? (
        <div className="flex justify-center">
          <SpinnerComponent />
        </div>
      ) : null}
    </>
  );
}
