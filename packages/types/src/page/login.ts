type LoginProps = LoginTitleProps & LoginFormProps; // 로그인 페이지
// 로그인 페이지 - 타이틀
type LoginTitleProps = {
  club_name: string;
}; // 로그인 페이지 로그인폼박스

type LoginFormProps = {
  url: string;
};
export type { LoginProps, LoginTitleProps, LoginFormProps };
