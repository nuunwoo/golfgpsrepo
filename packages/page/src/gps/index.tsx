import { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Contents from './Contents';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, cartInfos, reset } from '@pkg/reducer';
import { key } from '@pkg/constant';
import { GpsProps } from '@pkg/types';
import Score from './Score';

const { cart_info_add, cart_info_req_send, cart_gps, cart_time, cart_delete, cart_board, cart_color, cart_off } =
  key.division; // 소켓통신 프로토콜
const {
  division,
  id,
  gameTp,
  commStatus,
  stopStatus,
  boardIdx,
  colorIdx,
  course,
  hole,
  par,
  geoY,
  geoX,
  frontS,
  frontE,
  endS,
  endE,
  addS,
  addE,
  frontCrs,
  endCrs,
  addCrs,
} = key.cart; // 카트 배열 키

let cartState: string[] = []; // 카트 저장 시 중복 체크, 카트삭제를 위한 변수

const Gps = ({ url, ws, loop }: GpsProps) => {
  const mapInfo = useSelector((state: RootState) => state.gps.mapInfo);
  const ready = useSelector((state: RootState) => state.gps.ready);
  const packet = useSelector((state: RootState) => state.websocket.packet);
  const dispatch = useDispatch();
  const [isSide, setIsSide] = useState(false);
  const [isMessageModal, setIsMessageModal] = useState(false);
  const clientRef = useRef<WebSocket | null>(null);
  const [webSocket, setWepSocket] = useState<null | boolean>(null);

  const connection = useCallback(
    (co_div: string) => {
      const client = new WebSocket(ws);
      clientRef.current = client;

      window.client = client;

      client.onerror = e => console.error(e);

      client.onopen = () => {
        client.send(`007|${co_div}`);

        if (packet === `017|${co_div}`) {
          client.send(packet);
          dispatch(reset());
        }
      };

      client.onclose = () => {
        if (clientRef.current) {
          // console.log("ws closed by server");
        } else {
          // console.log("ws closed by app component unmount");
          return;
        }

        if (webSocket) {
          return;
        }

        // console.log("ws closed");
        setWepSocket(true);
        setTimeout(() => setWepSocket(null), 1000);
      };

      client.onmessage = message => {
        const data = `${message.data}`;

        const dataArray = data.split('|');
        if (dataArray.length > 0) {
          const protocol = dataArray[0]; // 소켓통신 프로토콜
          if (protocol === cart_info_req_send) {
            cartState = data.split('&|').filter(el => el !== '');
            dispatch(cartInfos(cartState));
          } else {
            const cart_id = dataArray[id];
            if (protocol === cart_info_add) {
              if (cartState.findIndex(el => el.split('|')[id] === cart_id) < 0) {
                cartState.push(data);
                dispatch(cartInfos(cartState));
              }
            } else {
              const index = cartState.findIndex(el => el.split('|')[id] === cart_id);
              if (cartState[index]) {
                const cart = cartState[index].split('|');
                if (cart) {
                  if (protocol === cart_gps) {
                    cart[division] = dataArray[0];
                    cart[course] = dataArray[3];
                    cart[hole] = dataArray[4];
                    cart[par] = dataArray[5];
                    cart[geoY] = dataArray[6];
                    cart[geoX] = dataArray[7];
                    cart[gameTp] = dataArray[8];
                    cart[commStatus] = dataArray[9];
                    cart[stopStatus] = dataArray[10];
                  }
                  if (protocol === cart_time) {
                    cart[division] = dataArray[0];
                    cart[gameTp] = dataArray[3];
                    cart[frontS] = dataArray[4];
                    cart[frontE] = dataArray[5];
                    cart[endS] = dataArray[6];
                    cart[endE] = dataArray[7];
                    cart[addS] = dataArray[8];
                    cart[addE] = dataArray[9];
                    cart[frontCrs] = dataArray[10];
                    cart[endCrs] = dataArray[11];
                    cart[addCrs] = dataArray[12];
                  }
                  if (protocol === cart_board) {
                    cart[division] = dataArray[0];
                    cart[boardIdx] = dataArray[3];
                  }
                  if (protocol === cart_color) {
                    cart[division] = dataArray[0];
                    cart[colorIdx] = dataArray[3];
                  }
                  cartState[index] = cart.reduce((a, b) => a + '|' + b);
                  dispatch(cartInfos([...cartState]));

                  if (protocol === cart_delete || protocol === cart_off) {
                    cartState.splice(index, 1);
                    dispatch(cartInfos([...cartState]));
                  }
                } else {
                  window.location.reload();
                }
              }
            }
          }
        }
      };

      return () => {
        // console.log("Cleanup");
        clientRef.current = null;
        client.close();
      };
    },
    [dispatch, packet, webSocket]
  );

  useEffect(() => {
    if (webSocket) {
      return;
    }

    if (ready && mapInfo.mapview[0].co_div) {
      if (!clientRef.current) {
        connection(mapInfo.mapview[0].co_div);
      }
    }
  }, [dispatch, webSocket, ready, connection]);

  useEffect(() => {
    if (ready && mapInfo.mapview[0].co_div) {
      const co_div = mapInfo.mapview[0].co_div;
      if (
        clientRef.current &&
        (clientRef.current.readyState === clientRef.current.CONNECTING ||
          clientRef.current.readyState === clientRef.current.OPEN)
      ) {
        if (packet === `017|${co_div}`) {
          clientRef.current.send(packet);
          dispatch(reset());
        }
      } else {
        connection(co_div);
      }
    }
  }, [connection, dispatch, packet, ready]);

  return (
    <>
      <div className={`gps ${isMessageModal ? '' : 'onchat'}`}>
        <Header
          url={url}
          isSide={isSide}
          setIsSide={setIsSide}
        />
        <Contents
          url={url}
          isSide={isSide}
          setIsSide={setIsSide}
          setIsMessageModal={setIsMessageModal}
          loop={loop}
        />
        <Footer />
        <Score />
      </div>
    </>
  );
};

export default Gps;
