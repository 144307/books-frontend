import { useEffect } from "react";

const SITE_NAME = "Лидия Стрелкова Кошечкина";

function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  }, [title]);
}

export default usePageTitle;
