// 소켓통신과 자동로그인 윈도우 인터페이스
declare global {
  interface Window {
    client: WebSocket;
    onload: any;
  }
}

export { default as LoginPage } from './login'; // 로그인 페이지 export
export { default as AdminPage } from './admin'; // 어드민 페이지 export
export { default as GpsPage } from './gps'; // 관제 페이지 export
export { default as NotFoundPage } from './NotFound'; // 404 페이지 export
