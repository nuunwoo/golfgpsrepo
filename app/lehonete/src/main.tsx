import ReactDOM from "react-dom/client";
import main from "@pkg/container";

const option = {
  loop: true,
  club_name: import.meta.env.VITE_LOGIN_TITLE,
  url: import.meta.env.VITE_API_URL,
  ws: import.meta.env.VITE_WS_URL,
};

ReactDOM.createRoot(document.getElementById("root")!).render(main(option));
