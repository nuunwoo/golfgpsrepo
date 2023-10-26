import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@pkg/reducer';
import { AdminUserAddPopProps } from '@pkg/types';
import { admin } from '@pkg/api';

const UserAddPop = ({ url, isAdd, setIsAdd }: AdminUserAddPopProps) => {
  const levelRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  type PushUser = {
    login_id: string;
    pwd: string;
    name: string;
    user_div: string;
    reg_id: string;
  }[];
  const [pushUser, setPushUser] = useState<PushUser>([]);
  const reg_id = useSelector((state: RootState) => state.admin.userName);

  useEffect(() => {
    levelRef?.current?.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== 'LI') {
        const ul = target.querySelector('ul') as HTMLUListElement;
        if (ul) {
          if (!ul.classList.contains('show')) {
            ul.classList.add('show');
          } else {
            ul.classList.remove('show');
          }
        }
      } else {
        (document.querySelector('.level span') as HTMLSpanElement).textContent = target.textContent;
      }
    });

    document.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains('level')) {
        const levle_ul = document.querySelector('.add_box .level ul') as HTMLUListElement;
        if (levle_ul) {
          levle_ul.classList.remove('show');
        }
      }
    });
  }, []);

  // 계정 추가
  const userAdd = useCallback(() => {
    let login_id = (document.querySelector('.userAdd-input.login_id') as HTMLInputElement).value;
    let pwd = (document.querySelector('.userAdd-input.pwd') as HTMLInputElement).value;
    let name = (document.querySelector('.userAdd-input.name') as HTMLInputElement).value;
    let user_div = (document.querySelector('.level span') as HTMLSpanElement).textContent;

    if (login_id !== '' && pwd !== '' && name !== '' && user_div !== '권한') {
      setPushUser([
        ...pushUser,
        {
          login_id: login_id,
          pwd: pwd,
          name: name,
          user_div: user_div === '매니저' ? 'U' : 'A',
          reg_id: reg_id,
        },
      ]);
      (document.querySelector('.userAdd-input.login_id') as HTMLInputElement).value = '';
      (document.querySelector('.userAdd-input.pwd') as HTMLInputElement).value = '';
      (document.querySelector('.userAdd-input.name') as HTMLInputElement).value = '';
      (document.querySelector('.level span') as HTMLSpanElement).textContent = '권한';
    } else {
    }
  }, [pushUser, reg_id]);

  // 계정 추가 취소
  const userCancle = useCallback(
    (i: number) => {
      pushUser.splice(i, 1);
      setPushUser([...pushUser]);
    },
    [pushUser]
  );

  // 계정 데이터 베이스 저장
  const userPush = useCallback(() => {
    admin.addUsers(url, JSON.stringify(pushUser), dispatch);
    setPushUser([]);
  }, [dispatch, pushUser]);

  return (
    <div
      style={{ display: isAdd ? 'flex' : 'none' }}
      className="userAdd-bg"
    >
      <div className="userAdd-pop">
        <div className="top">
          <h3>담당자 추가</h3>
          <button onClick={() => setIsAdd(false)}>
            <svg
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </button>
        </div>
        <div className="level_explantion">
          <h4>
            <svg
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
            </svg>
            담당자 권한 등급
          </h4>
          <ul>
            <li>
              <b>관리자</b> 관리자 페이지 계정 삭제 및 추가
            </li>
            <li>
              <b>매니저</b> 관제 페이지 이용 가능
            </li>
          </ul>
        </div>
        <div className="add_box">
          <input
            className="userAdd-input login_id"
            placeholder="계정"
          />
          <input
            className="userAdd-input pwd"
            placeholder="비밀번호"
          />
          <input
            className="userAdd-input name"
            placeholder="이름"
            style={{ width: '100px' }}
          />
          <div
            className="level"
            ref={levelRef}
          >
            <span>등급</span>
            <svg
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M7 10l5 5 5-5z"></path>
            </svg>
            <ul>
              <li className="selectLevel">관리자</li>
              <li className="selectLevel">매니저</li>
            </ul>
          </div>
          <button onClick={userAdd}>
            <svg
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
            추가
          </button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="userCheck"
                  />
                </th>
                <th style={{ borderLeft: '0' }}>계정</th>
                <th>이름</th>
                <th>권한</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pushUser.map((el, i) => {
                return (
                  <tr key={`user-table${i}`}>
                    <td>
                      <input
                        type="checkbox"
                        className="userCheck"
                      />
                    </td>
                    <td>{el.login_id}</td>
                    <td>{el.name}</td>
                    <td>{el.user_div === 'U' ? '매니저' : '관리자'}</td>
                    <td>
                      <button onClick={() => userCancle(i)}>제거</button>
                    </td>
                  </tr>
                );
              })}
              {pushUser.length < 1 ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
        <div className="pushBtn">
          <button onClick={userPush}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default UserAddPop;
