import { LoginPage } from "@pkg/page";
import { LoginProps } from "@pkg/types";

const Login = ({ club_name, url }: LoginProps) => {
  return <LoginPage club_name={club_name} url={url} />;
};

export default Login;
