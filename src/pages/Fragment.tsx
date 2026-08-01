import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import Header from "../components/Header/Header";

type State =
  | { type: "loading" }
  | { type: "success"; fragment: string }
  | { type: "error"; message: string };

function Fragment() {
  const { id } = useParams();
  const [state, setState] = useState<State>({ type: "loading" });

  useEffect(() => {
    const API = import.meta.env.VITE_API_BASE_URL ?? "";
    fetch(`${API}/api/books/${id}/fragment`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (typeof data?.fragment !== "string") {
          throw new Error("Bad response shape");
        }
        setState({ type: "success", fragment: data.fragment });
      })
      .catch((e) => setState({ type: "error", message: e.message }));
  }, [id]);

  if (state.type === "loading")
    return (
      <div className="min-h-screen bg-[#f4ecd8]">
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center text-stone-600">
          Loading…
        </div>
      </div>
    );

  if (state.type === "error")
    return (
      <div className="min-h-screen bg-[#f4ecd8]">
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center text-amber-900">
          Book not found. ({state.message})
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f4ecd8]">
      <Header />
      <article className="mx-auto max-w-2xl px-6 py-16">
        <span className="block text-sm font-medium uppercase tracking-[0.3em] text-amber-800">
          Book Fragment
        </span>
        <div className="prose prose-stone mt-8 max-w-none font-['Libre_Baskerville'] text-lg leading-loose">
          <ReactMarkdown>{state.fragment}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

export default Fragment;
