import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { key } from '@pkg/constant';
import { cartInfo as cartInfoHandle, RootState } from '@pkg/reducer';
import { AnyAction, Dispatch } from 'redux';
import { BlockCartRef, MapCartRef } from '@pkg/types';

const { id, reserTm, gameTp, boardIdx, colorIdx, course, hole, par, geoX, geoY } = key.cart;

// 카트 배경 색상 별 텍스트 색상 배열
const textColor = [
  '#febc11', // 0
  '#febc11', // 1
  '#febc11', // 2
  '#febc11', // 3
  '#febc11', // 4
  '#febc11', // 5
  '#febc11', // 6
  '#febc11', // 7
  '#febc11', // 8
  '#febc11', // 9
  '#febc11', // 10
  '#333333', // 11
  '#333333', // 12
  '#333333', // 13
  '#333333', // 14
  '#333333', // 15
  '#febc11', // 16
  '#febc11', // 17
  '#333333', // 18
  '#333333', // 19
  '#febc11', // 20
  '#333333', // 21
  '#febc11', // 22
];

// html 태그 속성값에 cart_id와 course 추가
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    cart_id?: string;
    course?: string;
  }
}

const cartClick = (e: React.MouseEvent, cartInfos: string[], patch: Dispatch<AnyAction>) => {
  const target = e.target as HTMLDivElement;
  const cartIndex = cartInfos.findIndex(el => el.split('|')[id] === target.getAttribute('cart_id'));
  patch(cartInfoHandle(cartInfos[cartIndex]));
  // 카트 정보 팝업창 생성
};

export const MapCarts = ({ cartRef }: { cartRef: React.MutableRefObject<MapCartRef[] | null[]> }) => {
  const cartInfos = useSelector((state: RootState) => state.gps.cartInfos);
  const cartText = useSelector((state: RootState) => state.gps.cartText);
  const dispatch = useDispatch();

  return (
    <>
      {cartInfos.map((cart: string | string[], idx: number) => {
        if (typeof cart === 'string') cart = cart.split('|');
        const reserTm_format = cart[reserTm].slice(0, 2) + ':' + cart[reserTm].slice(2, 4);

        const cartinfo = {
          id: cart[id],
          course: cart[course],
          geoX: Number(cart[geoX]),
          geoY: Number(cart[geoY]),
          gameTp: cart[gameTp],
        };

        return (
          <div
            key={`map_cart_${cart[id]}`}
            ref={ref => (cartRef.current[idx] = { ...cartinfo, cart: ref })}
            className={`map_cart map_cart_${cart[id]}`}
            cart_id={cart[id]}
            course={cart[course]}
            style={{ zIndex: cartInfos.length - idx }}
            onClick={e => cartClick(e, cartInfos, dispatch)}
          >
            <img
              src={`/images/cart/Cart_C_${
                cart[gameTp] === '5' ? cart[gameTp] : Number(cart[colorIdx]) > 5 ? cart[colorIdx] : cart[gameTp]
              }.png`}
            />
            {Number(cart[boardIdx]) > 0 ? <img src={`/images/cart/Cart_B_${cart[boardIdx]}.png`} /> : ''}
            <span>{cartText === reserTm ? reserTm_format : cart[cartText]}</span>
          </div>
        );
      })}
    </>
  );
};

export const BlockCarts = ({ cartRef }: { cartRef: React.MutableRefObject<BlockCartRef[] | null[]> }) => {
  const dispatch = useDispatch();
  const cartInfos = useSelector((state: RootState) => state.gps.cartInfos);
  const cartText = useSelector((state: RootState) => state.gps.cartText);

  const block_cart = cartInfos.map((cart: string | string[], idx) => {
    if (typeof cart === 'string') cart = cart.split('|');
    const reserTm_format = cart[reserTm].slice(0, 2) + ':' + cart[reserTm].slice(2, 4);

    const cartinfo = {
      id: cart[id],
      course: cart[course],
      hole: cart[hole],
      par: cart[par],
      gameTp: cart[gameTp],
    };

    return (
      <div key={`block_cart_${cart[id]}`}>
        <div
          ref={ref => (cartRef.current[idx] = { ...cartinfo, cart: ref })}
          className={`block_cart block_cart_${cart[id]}`}
          cart_id={cart[id]}
          course={cart[course]}
          style={{ zIndex: cartInfos.length - idx }}
          onClick={e => cartClick(e, cartInfos, dispatch)}
        >
          <img
            src={`/images/cart/Cart_C_${
              cart[gameTp] === '5' ? cart[gameTp] : Number(cart[colorIdx]) > 5 ? cart[colorIdx] : cart[gameTp]
            }.png`}
          />
          {Number(cart[boardIdx]) > 0 ? <img src={`/images/cart/Cart_B_${cart[boardIdx]}.png`} /> : ''}
          <span
            style={
              cartText !== reserTm && cart[cartText].length > 3
                ? {
                    color:
                      textColor[
                        cart[gameTp] === '5'
                          ? Number(cart[gameTp])
                          : Number(cart[colorIdx]) > 5
                          ? Number(cart[colorIdx])
                          : Number(cart[gameTp])
                      ],
                    width: '200%',
                    transform: 'scale(.7) translate(-72.5%, -65%)',
                  }
                : {
                    color:
                      textColor[
                        cart[gameTp] === '5'
                          ? Number(cart[gameTp])
                          : Number(cart[colorIdx]) > 5
                          ? Number(cart[colorIdx])
                          : Number(cart[gameTp])
                      ],
                  }
            }
          >
            {cartText === reserTm ? reserTm_format : cart[cartText]}
          </span>
        </div>
      </div>
    );
  });

  return <>{block_cart}</>;
};
