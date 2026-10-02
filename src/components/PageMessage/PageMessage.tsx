interface PageMessageProps {
  kind: "loading" | "error" | "notice";
  text?: string;
}

function PageMessage({ kind, text }: PageMessageProps) {
  if (kind === "loading")
    return (
      <p className="mx-auto w-full max-w-2xl px-6 py-16 text-center text-stone-600">
        Загрузка…
      </p>
    );

  if (kind === "error")
    return (
      <p className="mx-auto w-full max-w-2xl px-6 py-16 text-center text-amber-900">
        Не удалось загрузить книги{text ? ` (${text})` : ""}
      </p>
    );

  return (
    <p className="mx-auto w-full max-w-2xl px-6 py-16 text-center text-amber-900">
      {text}
    </p>
  );
}

export default PageMessage;
