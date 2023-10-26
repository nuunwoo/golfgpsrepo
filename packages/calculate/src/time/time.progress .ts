import { key } from '@pkg/constant';

const { gameTp, frontS, frontE, endS } = key.cart;

// 진행시간 계산
const progress = (velue: string) => {
  const cartInfo = velue.split('|');

  var setElapsed = '00:00';

  if (cartInfo[frontS] !== '0000') {
    const date = new Date();
    var time = '0';
    var hour = '00';
    var minutes = '00';
    var setdate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      Number(cartInfo[frontS]?.slice(0, 2)),
      Number(cartInfo[frontS]?.slice(2, 4))
    );

    time = String(Math.floor((date.getTime() - setdate.getTime()) / 1000 / 60));
    if (Number(time) >= 60) {
      hour = String(Math.floor(parseInt(String(time)) / 60));
      minutes = String(Number(time) - 60 * Number(hour));
      if (Number(hour) < 10) {
        hour = '0' + hour;
      }
      if (Number(minutes) < 10) {
        minutes = '0' + minutes;
      }
    } else {
      if (Number(time) < 10) {
        time = '0' + time;
      }
      minutes = time;
    }

    setElapsed = `${hour}:${minutes}`;
  }

  return setElapsed;
};
export default progress;
