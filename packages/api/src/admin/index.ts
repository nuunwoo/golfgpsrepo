import { post } from '../../init';
import { userInfo } from '@pkg/reducer';
import { AnyAction } from 'redux';

const addUsers = async (url: string, users: string, dispatch: React.Dispatch<AnyAction>) => {
  return await fetch(`${url}admin/userAdd`, { ...post, body: users })
    .then(respone => respone.json())
    .then(result => dispatch(userInfo(result.userInfo)))
    .catch(error => console.log(error));
};

const deleteUser = async (url: string, user: string, dispatch: React.Dispatch<AnyAction>) => {
  return await fetch(`${url}admin/userDelete`, { ...post, body: user })
    .then(respone => respone.json())
    .then(result => dispatch(userInfo(result.userInfo)))
    .catch(error => console.log(error));
};

export default { addUsers, deleteUser };
