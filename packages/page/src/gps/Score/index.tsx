import { RootState } from '@pkg/reducer';
import { useDispatch, useSelector } from 'react-redux';
import ScoreTable from './ScoreTable';
import { useCallback, useEffect, useRef, useState } from 'react';
import { score as scoreHandle } from '@pkg/reducer';

const Score = () => {
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.gps.score);
  const table = useRef<HTMLDivElement | null>(null);
  const pre = useRef<HTMLButtonElement | null>(null);
  const next = useRef<HTMLButtonElement | null>(null);

  const [tableMove, setTableMove] = useState(false);

  // 테이블 이동 ( 추가 스코어 있을 때 )
  const tableMoveHandle = useCallback((e: React.MouseEvent) => {
    if (table.current) {
      let tableWidth = table.current.querySelectorAll('div')[0]?.getBoundingClientRect().height;
      if (document.body.clientWidth > 700)
        tableWidth = table.current.querySelectorAll('div')[0]?.getBoundingClientRect().width;

      if (!(e.target as HTMLButtonElement).classList.contains('disabled')) {
        if ((e.target as HTMLButtonElement).classList.contains('next')) {
          table.current.style.transform = `translateX(-${tableWidth}px)`;
          setTableMove(true);
        }
        if ((e.target as HTMLButtonElement).classList.contains('pre')) {
          table.current.style.transform = `translateX(0)`;
          setTableMove(false);
        }
      }
    }
  }, []);

  const closeHandle = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(scoreHandle([]));
    if (table.current) table.current.style.transform = `translateX(0)`;
    setTableMove(false);
  };

  // 테이블 이동 화살표 색상 변경 ( 추가 스코어 있을 때 )
  useEffect(() => {
    if (pre.current && next.current && score.length > 0 && score[0].score_total_c !== 0)
      if (tableMove) {
        pre.current.classList.remove('disabled');
        pre.current.classList.add('active');
        next.current.classList.add('disabled');
        next.current.classList.remove('active');
      } else {
        pre.current.classList.add('disabled');
        pre.current.classList.remove('active');
        next.current.classList.remove('disabled');
        next.current.classList.add('active');
      }
  }, [tableMove]);

  return (
    <div className="scoreWrap">
      <div
        className="score"
        style={
          score.length > 0
            ? { transform: 'translate(-50%, -100%) scale(1)', transition: 'transform .3s' }
            : { transform: 'translate(-50%, -100%) scale(0)' }
        }
      >
        <div className="score_closeBtn">
          <button onClick={closeHandle}>
            <img
              src="images/close.png"
              alt="close"
            />
          </button>
        </div>
        <div className="scoreTableWrap">
          <div
            ref={table}
            className="scoreTableInner"
          >
            <ScoreTable />
          </div>
        </div>
        <div className="scoreBtn">
          <button
            ref={pre}
            className="pre disabled"
            onClick={e => tableMoveHandle(e)}
            onMouseDown={e => {
              ((e.target as HTMLButtonElement).querySelector('img') as HTMLImageElement).src = 'images/pre_action.png';
            }}
            onMouseUp={e => {
              ((e.target as HTMLButtonElement).querySelector('img') as HTMLImageElement).src = 'images/pre.png';
            }}
            onMouseLeave={e => {
              ((e.target as HTMLButtonElement).querySelector('img') as HTMLImageElement).src = 'images/pre.png';
            }}
          >
            <img
              src="images/pre.png"
              alt="pre"
            />
          </button>

          <button
            ref={next}
            className={`next ${score.length > 0 && score[0].score_total_c !== 0 ? 'active' : 'disabled'}`}
            onClick={e => tableMoveHandle(e)}
            onMouseDown={e => {
              ((e.target as HTMLButtonElement).querySelector('img') as HTMLImageElement).src = 'images/next_action.png';
            }}
            onMouseUp={e => {
              ((e.target as HTMLButtonElement).querySelector('img') as HTMLImageElement).src = 'images/next.png';
            }}
            onMouseLeave={e => {
              ((e.target as HTMLButtonElement).querySelector('img') as HTMLImageElement).src = 'images/next.png';
            }}
          >
            <img
              src="images/next.png"
              alt="next"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Score;
