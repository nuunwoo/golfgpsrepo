import { Route, Routes, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Gps from './pages/Gps';
import { useDispatch } from 'react-redux';
import { RouterProps } from '../../types/src/page';
import { auth } from '@pkg/api';

// 소켓통신과 자동로그인 윈도우 인터페이스
declare global {
  interface Window {
    client: WebSocket;
    onload: any;
  }
}

const router = ({ loop, club_name, url, ws }: RouterProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkLogin = useCallback(async () => {
    auth.auto(url, dispatch, navigate);
  }, [dispatch, navigate]);

  // 자동 로그인
  useEffect(() => {
    window.onload = checkLogin();
  }, []);

  const [isSide, setIsSide] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login
            club_name={club_name}
            url={url}
          />
        }
      />
      <Route
        path="/login"
        element={
          <Login
            club_name={club_name}
            url={url}
          />
        }
      />
      <Route
        path="/admin"
        element={
          <Admin
            url={url}
            isSide={isSide}
            setIsSide={setIsSide}
          />
        }
      />
      <Route
        path="/gps"
        element={
          <Gps
            url={url}
            ws={ws}
            isSide={isSide}
            setIsSide={setIsSide}
            loop={loop}
          />
        }
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default router;
