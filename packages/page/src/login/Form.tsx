import React, { useCallback, useRef } from 'react';
import { auth } from '@pkg/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginFormProps } from '@pkg/types';

const Form = ({ url /* api url */ }: LoginFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const RefID = useRef<HTMLInputElement | null>(null);
  const RefPass = useRef<HTMLInputElement | null>(null);

  const loginHandle = useCallback(async () => {
    if (RefID.current && RefPass.current) {
      await auth.login(url, RefID?.current?.value, RefPass?.current?.value, dispatch, navigate);
    }
  }, []);

  const onKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') loginHandle();
    else return;
  }, []);

  return (
    <div className="login_contents">
      <div className="login_contents_inner">
        <form>
          <div className="login_input">
            <input
              ref={RefID}
              type="text"
              title="아이디를 입력하세요."
              id="loginId"
              name="loginId"
              placeholder="아이디를 입력하세요"
              required
              defaultValue={''}
              onKeyPress={onKeyPress}
            />
            <input
              ref={RefPass}
              type="password"
              title="비밀번호를 입력하세요."
              id="loginPassword"
              name="loginPassword"
              placeholder="비밀번호"
              required
              defaultValue={''}
              autoComplete="off"
              onKeyPress={onKeyPress}
            />
          </div>

          <button
            type="button"
            className="login_btn"
            onClick={loginHandle}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};
export default Form;
