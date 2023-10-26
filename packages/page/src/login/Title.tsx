import { LoginTitleProps } from '@pkg/types';

const Title = ({ club_name /* 골프장 이름 */ }: LoginTitleProps) => {
  return (
    <div className="login_title">
      <div className="login_title_inner">
        <h2>로그인</h2>
        <div className="smallline">
          <img
            src="images/img_small_line.png"
            alt="img_small_line"
          />
        </div>
        <h3>{club_name}</h3>
      </div>
    </div>
  );
};
export default Title;
