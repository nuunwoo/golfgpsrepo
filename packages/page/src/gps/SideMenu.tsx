import { useDispatch, useSelector } from 'react-redux';
import { cartText as cartTextHandle, view as viewHandle } from '../../../reducer';
import { useCallback } from 'react';
import { RootState } from '../../../reducer';

const SideMenu = ({ isSide, setIsSide, loop }: any) => {
  const dispatch = useDispatch();
  const mapInfo = useSelector((state: RootState) => state.gps.mapInfo);
  const view = useSelector((state: RootState) => state.gps.view);

  const modeHandle = useCallback(
    (mode: string) => {
      dispatch(viewHandle({ mode: mode, course: view.course }));
      setIsSide(false);
    },
    [dispatch, setIsSide, view.course]
  );

  const courseHandle = useCallback(
    (idx: number) => {
      if (!idx) idx = 0;
      dispatch(viewHandle({ mode: view.mode, course: idx }));
      setIsSide(false);
    },
    [dispatch, setIsSide, view.mode]
  );

  const cartTextChaneHandle = useCallback(
    (txt: number) => {
      dispatch(cartTextHandle(txt));
      setIsSide(false);
    },
    [dispatch, setIsSide]
  );

  return (
    <aside
      className="sideMenu"
      style={
        isSide
          ? {
              width: '150px',
              cursor: 'pointer',
              pointerEvents: 'all',
              left: '0',
            }
          : {
              width: '0px',
              opacity: 0,
              cursor: 'auto',
              pointerEvents: 'none',
              left: '-150px',
            }
      }
    >
      <ul>
        <li onClick={() => modeHandle('Map')}>
          <span>맵모드</span>
        </li>
        <li onClick={() => modeHandle('Block')}>
          <span>블럭모드</span>
        </li>
      </ul>
      <div className="menuLine"></div>
      <ul>
        {!loop ? ( // 코스가 한개인 골프장은 전체맵만 사용
          mapInfo.mapview.map((el: any, idx: number) => {
            // 맵모드에 전체맵만 사용하는 경우
            if (idx > 0) {
              if (el.hidden === 'Y') return '';
              else
                return (
                  <li
                    key={`course_viewr_${el.map_name}`}
                    onClick={() => courseHandle(idx)}
                  >
                    <span>{el.map_name}</span>
                  </li>
                );
            } else
              return (
                <li
                  key={`course_viewr_${el.map_name}`}
                  onClick={() => courseHandle(idx)}
                >
                  <span>전체</span>
                </li>
              );
          })
        ) : (
          <li onClick={() => courseHandle(0)}>
            <span>전체</span>
          </li>
        )}
      </ul>
      <div className="menuLine"></div>
      <ul>
        <li onClick={() => cartTextChaneHandle(4)}>
          <span>캐디이름</span>
        </li>
        <li onClick={() => cartTextChaneHandle(3)}>
          <span>카트번호</span>
        </li>
        <li onClick={() => cartTextChaneHandle(6)}>
          <span>예약시간</span>
        </li>
      </ul>
    </aside>
  );
};
export default SideMenu;
