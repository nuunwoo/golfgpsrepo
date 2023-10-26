import SideMenu from './SideMenu';
import MapMode from './MapMode';
import BlockMode from './BlockMode';
import CartInfo from './CartInfo';
import { GpsContentsProps } from '@pkg/types';
import { useDispatch, useSelector } from 'react-redux';
import { cartInfo as cartInfoHandle, RootState } from '@pkg/reducer';
import { useEffect } from 'react';

const Contents = ({ url, isSide, setIsSide, setIsMessageModal, loop }: GpsContentsProps) => {
  const dispatch = useDispatch();
  const cartInfos = useSelector((state: RootState) => state.gps.cartInfos);
  const cartInfo = useSelector((state: RootState) => state.gps.cartInfo);

  useEffect(() => {
    if (cartInfo !== '')
      cartInfos.forEach(el => {
        if (el.split('|')[2] === cartInfo.split('|')[2]) {
          dispatch(cartInfoHandle(el));
        }
      });
  }, [cartInfos]);

  return (
    <main className="gpsService">
      <SideMenu
        isSide={isSide}
        setIsSide={setIsSide}
        loop={loop}
      />
      <MapMode loop={loop} />
      <BlockMode loop={loop} />
      <CartInfo
        url={url}
        setIsMessageModal={setIsMessageModal}
      />
    </main>
  );
};

export default Contents;
