import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { key } from '@pkg/constant';
import { time } from '@pkg/calculate';

import { RootState, packet as packetHandle, cartInfo as cartInfoHandle, score as scoreHandle } from '@pkg/reducer';

const { id, cartNo, caddyNm, guestNm, reserTm, course, reserCrs, hole, frontS, frontE, endS, endE, addS, addE } =
  key.cart;

type CartInfoProps = {
  url: string;
  setIsMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartInfo = ({ url, setIsMessageModal }: CartInfoProps) => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const dispatch = useDispatch();
  const courseInfo = useSelector((state: RootState) => state.gps.mapInfo).courseInfo;
  const cartInfo = useSelector((state: RootState) => state.gps.cartInfo);

  // 코스 코드로 코스명 찾기
  const findCourseName = useCallback(
    (courseCd: string) => {
      if (courseCd) {
        if (courseCd !== 'N') {
          return courseInfo.find((el: any) => el.cour_cd === courseCd).cour_name;
        } else {
          return courseCd;
        }
      } else return 'N';
    },
    [courseInfo]
  );

  const optionCos = courseInfo.map((el: any, index: number) => {
    return (
      <option
        key={el.cour_name}
        value={256 + index}
      >
        {el.cour_name}
      </option>
    );
  });

  // 메세지 전송
  const messageHanlder = async (selectCart: string) => {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
      },
      body: JSON.stringify({
        co_div: courseInfo[0].co_div, // 업장 코드
        to_no: selectCart, // 선택한 카트
        msg: textRef?.current?.value, // 메세지 내용
      }),
      redirect: 'follow',
      credentials: 'include',
    };

    fetch(`${url}message/send`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success && textRef.current) {
          textRef.current.value = '';
          dispatch(packetHandle(`017|${courseInfo[0].co_div}`));
          setIsMessageModal(false);
        }
      })
      .catch(error => console.log('error', error));
  };

  // 스코어 팝업
  const scorePopupHandle = async () => {
    const cartId = cartInfo.split('|')[id];
    const date = new Date();
    var yy = String(date.getFullYear());
    var mm = new String(date.getMonth() + 1);
    var dd = new String(date.getDate());

    if (mm.length == 1) {
      mm = '0' + mm;
    }
    if (dd.length == 1) {
      dd = '0' + dd;
    }
    const gameDt = `${yy}${mm}${dd}`; // 현재 날짜

    await fetch(`${url}score/guestScore?co_div=${courseInfo[0].co_div}&game_dt=${gameDt}&game_sid=${cartId}`)
      .then(response => response.json())
      .then(result => {
        if (result.length > 0) {
          const plaer_name = information.players.split(', ');
          let score = [];
          for (let i = 0; i < plaer_name.length; i++) {
            score.push(result.find((el: any) => el.cust_nm === plaer_name[i]));
          }
          dispatch(scoreHandle(score));
        } else {
          alert('스코어 데이터가 없습니다.');
        }
      })
      .catch(error => console.log(error));
  };

  const textareaFocus = useCallback(() => {
    setIsMessageModal(true);
  }, [setIsMessageModal]);

  const close = useCallback(() => {
    dispatch(cartInfoHandle(''));
    setIsMessageModal(false);
  }, [dispatch, setIsMessageModal]);

  const CartInfoHeader = () => {
    return (
      <div className="cart_info_header">
        <span className="information_cartNum">{information.cartNo}</span>
        <span className="information_caddyName">{information.caddyName}</span>
        <button
          className="information_closeBtn"
          onClick={close}
        >
          <img
            src="images/close.png"
            alt="close"
          />
        </button>
      </div>
    );
  };

  const [selectCart, setSelectCart] = useState('');

  useEffect(() => {
    if (cartInfo && cartInfo !== '') {
      const info = cartInfo.split('|');

      if ((Number(selectCart) !== 0 && Number(selectCart) < 256) || selectCart === '') {
        setSelectCart(info[cartNo]);
      }
    }
  }, [cartInfo, selectCart]);

  useEffect(() => {
    if (cartInfo !== '') information.setCartInfo = cartInfo;
  }, [cartInfo]);

  // 팝업창 생성시 초기값 세팅
  class Information {
    cartInfo = cartInfo;
    cart_no = cartInfo.split('|')[cartNo];
    caddy_name = cartInfo.split('|')[caddyNm];
    reservationCourse = cartInfo.split('|')[reserCrs];
    reservationTime = cartInfo.split('|')[reserTm];
    firstStartTime = cartInfo.split('|')[frontS];
    firstEndTime = cartInfo.split('|')[frontE];
    secondStartTime = cartInfo.split('|')[endS];
    secondEndTime = cartInfo.split('|')[endE];
    thirdStartTime = cartInfo.split('|')[addS];
    thirdEndTime = cartInfo.split('|')[addE];
    currentCourse = cartInfo.split('|')[course];
    currentHole = cartInfo.split('|')[hole];
    players_name = cartInfo.split('|')[guestNm];

    get cartNo() {
      // 카트 번호
      return this.cart_no;
    }
    get caddyName() {
      // 캐디 이름
      return this.caddy_name;
    }
    get reservationInfo() {
      // 에약 정보
      if (Number(this.reservationTime) > 0)
        return `${findCourseName(this.reservationCourse)} ${this.reservationTime.slice(
          0,
          2
        )}:${this.reservationTime.slice(2, 4)}`;
      else return '**_**:**';
    }
    get firstTime() {
      // 전반 시간
      let startTime = '',
        endTime = '';

      if (Number(this.firstStartTime) > 0)
        startTime = `${this.firstStartTime.slice(0, 2)}:${this.firstStartTime.slice(2, 4)}`;
      else startTime = '**_**:**';

      if (Number(this.firstEndTime) > 0)
        endTime = ` / ${this.firstEndTime.slice(0, 2)}:${this.firstEndTime.slice(2, 4)}`;

      return startTime + endTime;
    }
    get secondTime() {
      // 후반 시간
      let startTime = '',
        endTime = '';

      if (Number(this.secondStartTime) > 0)
        startTime = `${this.secondStartTime.slice(0, 2)}:${this.secondStartTime.slice(2, 4)}`;
      else startTime = '**_**:**';

      if (Number(this.secondEndTime) > 0)
        endTime = ` / ${this.secondEndTime.slice(0, 2)}:${this.secondEndTime.slice(2, 4)}`;

      return startTime + endTime;
    }
    get thirdTime() {
      // 추가 시간
      let startTime = '',
        endTime = '';

      if (Number(this.thirdStartTime) > 0)
        startTime = `${this.thirdStartTime.slice(0, 2)}:${this.thirdStartTime.slice(2, 4)}`;
      else startTime = '**_**:**';

      if (Number(this.thirdEndTime) > 0)
        endTime = ` / ${this.thirdEndTime.slice(0, 2)}:${this.thirdEndTime.slice(2, 4)}`;

      return startTime + endTime;
    }
    get location() {
      // 현재 코스, 홀 위치
      return `${findCourseName(this.currentCourse)} ${this.currentHole}`;
    }
    get players() {
      // 내장객 이름
      if (this.players_name && this.players_name.length > 0) {
        return this.players_name
          .split(',')
          .filter((_item, index) => index % 2 !== 0)
          .reduceRight((c, p) => p + `, ` + c);
      } else return '';
    }

    get contents() {
      // 카트 정보 출력 내용
      return [
        { contents: '예약정보', result: this.reservationInfo },
        { contents: '전반시작', result: this.firstTime },
        { contents: '후반시작', result: this.secondTime },
        { contents: '추가시작', result: this.thirdTime },
        { contents: '경과시간', result: time.progress(this.cartInfo) },
        { contents: '현재위치', result: this.location },
        { contents: '내장고객', result: this.players },
      ];
    }

    set setCartInfo(cartInfo: string) {
      // this.cartInfo = cartInfo;
    }
  }
  const information = new Information();

  return (
    <>
      <div
        className="cart_info"
        style={{
          display: cartInfo !== '' ? 'block' : 'none',
        }}
      >
        <CartInfoHeader />
        <div className="cart_info_contents">
          <ul>
            {information.contents.map(el => (
              <li
                key={`infoContents${el.contents}`}
                className={el.contents === '경과시간' ? 'cont-elapsed' : ''}
              >
                <span className="info_title">{`${el.contents} : `}</span>
                <span className="info_item">{el.result}</span>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', paddingTop: 10, paddingLeft: 10 }}>
            <select
              defaultValue={information.cartNo}
              onFocus={textareaFocus}
              onChange={e => setSelectCart(e.target.value)}
            >
              <option value={information.cartNo}>카트</option>
              {optionCos}
              <option value={'0'}>전체</option>
            </select>
          </div>
          <div style={{ padding: 10, display: 'flex' }}>
            <textarea
              ref={textRef}
              onFocus={textareaFocus}
              style={{ padding: 5, resize: 'none' }}
              rows={4}
              cols={40}
            />
          </div>
        </div>
        <div className="cart_info_footer">
          <button onClick={scorePopupHandle}>스코어</button>
          <button
            style={{
              padding: 10,
              borderRadius: 8,
              marginLeft: 10,
              background: '#000',
              color: '#fff',
            }}
            onClick={() => messageHanlder(selectCart)}
          >
            메시지 전송
          </button>
        </div>
      </div>
    </>
  );
};

export default CartInfo;
