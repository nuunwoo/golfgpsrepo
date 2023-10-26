import ReactDOM from 'react-dom/client';
import main from '@pkg/container';

const option = {
  loop: false, // 한개 코스만 있는 골프장
  club_name: import.meta.env.VITE_LOGIN_TITLE, // 골프장 이름
  url: import.meta.env.VITE_API_URL, // api url
  ws: import.meta.env.VITE_WS_URL, // 웹소켓 url
};

ReactDOM.createRoot(document.getElementById('root')!).render(main(option));
