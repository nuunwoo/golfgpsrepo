import { LoginProps } from '@pkg/types';
import Title from './Title';
import Form from './Form';

const Login = ({ club_name /* 골프장 이름 */, url /* api url */ }: LoginProps) => {
  return (
    <>
      <Title club_name={club_name} />
      <Form url={url} />
    </>
  );
};

export default Login;
