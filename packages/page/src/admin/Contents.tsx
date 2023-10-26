import React, { useRef, useCallback, useState } from 'react';
import { AdminContentsProps } from '@pkg/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@pkg/reducer';
import UserAddPop from './UserAddPop';
import { admin } from '@pkg/api';

const Contents = ({ url, menuActive }: AdminContentsProps) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.admin.userInfo);
  const userCheckRef = useRef<HTMLInputElement[] | null[]>([]);

  const [isAdd, setIsAdd] = useState(false);

  const stringDate = useCallback((str: string) => {
    if (str) {
      const year = str.slice(0, 4);
      const month = str.slice(4, 6);
      const day = str.slice(6, 8);
      const hour = str.slice(8, 10);
      const minute = str.slice(10, 12);
      const second = str.slice(12, 14);

      return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
    } else return '';
  }, []);

  const checkAll = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLInputElement;
    userCheckRef.current.forEach(el => {
      if (el) el.checked = target.checked;
    });
  }, []);

  const userDelete = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLButtonElement;
      if (target.classList.contains('isDelete')) {
        userCheckRef.current.forEach((el, i) => {
          if (el && el.checked) {
            if (userInfo[i].user_div === 'U') {
              admin.deleteUser(url, JSON.stringify(userInfo[i]), dispatch);
            } else alert('관리자는 삭제 할 수 없습니다.');
            el.checked = false;
          }
        });
      }

      (document.querySelector('.userDelete') as HTMLElement).style.color = '#fff';
      (document.querySelector('.userDelete svg') as HTMLElement).style.fill = '#fff';
      (document.querySelector('.userDelete') as HTMLElement).style.backgroundColor = '#F44336';
      (document.querySelector('.userAdd') as HTMLElement).style.display = 'none';
      (document.querySelector('.exit') as HTMLElement).style.display = 'block';
      target.classList.add('isDelete');

      userCheckRef.current.forEach(el => {
        if (el) el.style.display = 'block';
      });
    },
    [dispatch, userInfo]
  );

  const userAdd = useCallback(() => {
    setIsAdd(true);
  }, []);

  const exit = useCallback(() => {
    // document.querySelectorAll('.userCheck').forEach(el => {
    //   el as HTMLInputElement;
    //   el.style.display = 'none';
    // })
    // document.querySelector('.userDelete').style.color = '#F44336';
    // document.querySelector('.userDelete svg').style.fill = '#F44336';
    // document.querySelector('.userDelete').style.backgroundColor = '#fff';
    // document.querySelector('.userAdd').style.display = 'block';
    // document.querySelector('.exit').style.display = 'none';
    // document.querySelector('.isDelete').classList.remove('isDelete')
  }, []);

  return (
    <div className="admin_contents">
      <UserAddPop
        url={url}
        isAdd={isAdd}
        setIsAdd={setIsAdd}
      />
      <div className="title">
        <div>
          <img
            src={`/images/admin/st_${menuActive.icon}.png`}
            alt={menuActive.icon}
          />
          <h3>{menuActive.name}</h3>
        </div>
        <div>
          <button
            className="userDelete"
            onClick={e => userDelete(e)}
          >
            <svg
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
            </svg>
            담당자 삭제
          </button>
          <button
            className="exit"
            onClick={exit}
          >
            <svg
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
            나가기
          </button>
          <button
            className="userAdd"
            onClick={userAdd}
          >
            <svg
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
            담당자 추가
          </button>
        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  ref={ref => (userCheckRef.current[0] = ref)}
                  type="checkbox"
                  className="userCheck"
                  onClick={e => checkAll(e)}
                />
              </th>
              <th style={{ borderLeft: '0' }}>이름</th>
              <th>계정</th>
              <th>권한</th>
              <th>등록일</th>
              <th style={{ borderRight: '0' }}>최종수정일</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userInfo.map((el: any, i: number) => {
              // console.log(el)
              return (
                <tr key={`user-table${i}`}>
                  <td>
                    <input
                      ref={ref => (userCheckRef.current[i] = ref)}
                      type="checkbox"
                      className="userCheck"
                    />
                  </td>
                  <td style={{ borderLeft: '0' }}>{el.name}</td>
                  <td>{el.login_id}</td>
                  <td>{el.user_div === 'U' ? '매니저' : '관리자'}</td>
                  <td>{stringDate(el.reg_dtm)}</td>
                  <td style={{ borderRight: '0' }}>{el.upd_dtm ? stringDate(el.upd_dtm) : stringDate(el.reg_dtm)}</td>
                  <td></td>
                </tr>
              );
            })}
            {userInfo.length < 1 ? (
              <tr>
                <td></td>
                <td></td>
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
    </div>
  );
};
export default Contents;
