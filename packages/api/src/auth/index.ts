import { get } from '../../init';
import { userName, userInfo, mapInfo, ready } from '@pkg/reducer';
import { NavigateFunction } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';

const login = async (
  url: string,
  id: string,
  pw: string,
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  return await fetch(`${url}user/login?login_id=${id}&user_pw=${pw}`, get)
    .then(response => response.json())
    .then(result => {
      if (result) {
        dispatch(userName(result.name));
        if (result.userInfo) {
          dispatch(userInfo(result.userInfo));
          navigate('/admin');
        }
        if (result.mapview) {
          navigate('/gps');
          dispatch(
            mapInfo({
              mapview: result.mapview,
              courseInfo: result.courseInfo,
            })
          );
          dispatch(ready(true));
        }
      } else {
        alert('계정 정보가 다릅니다.');
      }
    })
    .catch(error => console.log('error', error));
};

const auto = async (url: string, dispatch: Dispatch<AnyAction>, navigate: NavigateFunction) => {
  return await fetch(`${url}user/autologin`, get)
    .then(response => response.json())
    .then(result => {
      if (!result) navigate('/login');
      else {
        dispatch(userName(result.name));
        if (result.userInfo) {
          dispatch(userInfo(result.userInfo));
          navigate('/admin');
        }
        if (result.mapview) {
          navigate('/gps');
          dispatch(
            mapInfo({
              mapview: result.mapview,
              courseInfo: result.courseInfo,
            })
          );
          dispatch(ready(true));
        }
      }
    })
    .catch(error => console.log(error));
};

const logout = async (url: string, navigate: NavigateFunction) => {
  return await fetch(`${url}user/logout`, get)
    .then(response => response.text())
    .then(result => (result === 'OK' ? navigate('/login') : ''))
    .catch(error => console.log('error', error));
};
export default { login, auto, logout };
