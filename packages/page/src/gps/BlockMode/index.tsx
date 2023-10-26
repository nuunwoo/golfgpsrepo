import { BlockCarts } from '../Carts';
import BlockCourse from './BlockCourse';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@pkg/reducer';
import { BlockCartRef } from '@pkg/types';

const BlockMode = ({ loop }: { loop: boolean }) => {
  const cartInfos = useSelector((state: RootState) => state.gps.cartInfos);
  const view = useSelector((state: RootState) => state.gps.view);

  const waitRef = useRef<HTMLDivElement[] | null[]>([]);
  const waitCountRef = useRef<HTMLDivElement[] | null[]>([]);
  const blockRef = useRef<HTMLDivElement[][][] | null[][][]>([]);
  const cartRef = useRef<BlockCartRef[] | null[]>([]);

  useEffect(() => {
    if (cartInfos.length < 1) {
      const cart = document.querySelector('.block_cart') as HTMLDivElement;
      if (cart) cart.style.display = 'none';
    }

    cartRef.current.forEach(el => {
      // 카트ref와 리덕스의 카트정보 아이디 체크
      if (cartInfos.find(info => info.split('|')[2] === el?.id)) {
        if (el?.cart && cartInfos.find(info => info.split('|')[2] === el.id)) {
          // 경기 진행중, 게임종료 안함
          if (el.course !== 'N' || el.gameTp !== '5') {
            let course = el.course;

            if (loop) course = 'A';
            // 대기중인 카트 ( 코스 대기로 이동 )
            if (el.hole === '0' || el.par === '4') {
              el.cart.style.display = 'block';
              waitRef.current[course.charCodeAt(0) - 64]?.appendChild(el?.cart);
            } else {
              // 경기 진행 중 ( 해당 위치로 카트 이동 )
              el.cart.style.display = 'block';
              blockRef.current[course.charCodeAt(0) - 65][Number(el.hole) - 1][Number(el.par)]?.append(el.cart);
            }
          } else {
            // 경기 대기 혹은 경기 종료 ( 경기 대기로 이동 )
            el.cart.style.display = 'block';
            waitRef.current[0]?.appendChild(el?.cart);
          }

          // if (el.gameTp === "5") el.cart.style.display = "none";
          if (cartInfos.length < 1) el.cart.style.display = 'none';
        }
      } else {
        // 리덕스에 카트가 없으면 삭제
        document.querySelector(`.block_cart_${el?.id}`)?.remove();
      }
    });

    // 코스 대기의 카트 개수 카운팅 ( 5 보다 높으면 카트 가리기 )
    waitRef.current.forEach((el, course) => {
      if (course > 0) {
        if (el?.childElementCount && el?.childElementCount > 5) {
          (waitCountRef?.current[course - 1] as HTMLDivElement).style.display = 'flex';
          let count = 0;
          el?.childNodes.forEach((cart, i) => {
            let counting = 0;
            if (i > 2) {
              (cart as HTMLDivElement).style.display = 'none';
              counting++;
            } else (cart as HTMLDivElement).style.display = 'block';

            count = counting;
          });

          (waitCountRef?.current[course - 1]?.children[1] as HTMLSpanElement).textContent = String(count);
        } else {
          (waitCountRef?.current[course - 1] as HTMLDivElement).style.display = 'none';
        }
      }
    });
  }, [cartRef, view, cartInfos]);

  return (
    <div
      className="block_mode"
      style={{ display: view.mode === 'Block' ? 'flex' : 'none' }}
    >
      <div className="waiting">
        <div className="waiting_icon">
          <img
            src="/images/block/waiting.png"
            alt="대기팀"
          />
          <p>대기팀</p>
        </div>
        <div
          className="waiting_carts"
          ref={ref => (waitRef.current[0] = ref)}
        >
          <BlockCarts cartRef={cartRef} />
        </div>
      </div>
      <BlockCourse
        loop={loop}
        waitRef={waitRef}
        waitCountRef={waitCountRef}
        blockRef={blockRef}
      />
    </div>
  );
};

export default BlockMode;
