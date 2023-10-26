import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { geo } from '@pkg/calculate';
import MapView from './MapView';
import { RootState } from '@pkg/reducer';
import { MapCartRef } from '@pkg/types';

const { inputData, process, calcScreenCoordinates } = geo.transformer;

let data: {
  x: number;
  y: number;
  lat: number;
  lon: number;
  lon_rotated: number;
  lat_rotated: number;
}[][] = [];
let theta: number[] = [];
let lonQuation: { slope: number; intercept: number }[] = [];
let latQuation: { slope: number; intercept: number }[] = [];

let width = 14; // 카트 가로크기 반

const MapMode = ({ loop }: { loop: boolean }) => {
  const mapInfo = useSelector((state: RootState) => state.gps.mapInfo);
  const view = useSelector((state: RootState) => state.gps.view);
  const ready = useSelector((state: RootState) => state.gps.ready);
  const cartInfos = useSelector((state: RootState) => state.gps.cartInfos);
  const [isCoordinate, setIsCoordinate] = useState(false);

  const cartRef = useRef<MapCartRef[] | null[]>([]);

  // 사각좌표 데이터 세팅
  // https://gitlab.mintech.kr/-/snippets/222 참고
  const transformBbox = () => {
    for (let i = 0; i < mapInfo.mapview.length; i++) {
      data[i] = inputData(
        mapInfo.mapview[i].tl_la_y,
        mapInfo.mapview[i].tl_lo_x,
        mapInfo.mapview[i].tr_la_y,
        mapInfo.mapview[i].tr_lo_x,
        mapInfo.mapview[i].bl_la_y,
        mapInfo.mapview[i].bl_lo_x
      );
      const processData = process(data[i]);
      theta[i] = processData.theta;
      lonQuation[i] = processData.lonQuation;
      latQuation[i] = processData.latQuation;
    }

    if (data.length === mapInfo.mapview.length) {
      setIsCoordinate(true);
    } else transformBbox();
  };

  useEffect(() => {
    if (ready && mapInfo.mapview.length > 0) transformBbox();
    else return;
  }, [mapInfo, ready]);

  useEffect(() => {
    // 데이터 세팅 완료시 맵모드의 카트 위치 그리기
    const isDataSet = data.length > 0 && theta.length > 0 && latQuation.length > 0 && lonQuation.length > 0;
    if (isCoordinate && isDataSet) {
      cartRef.current.forEach(el => {
        if (el?.cart) {
          if (el.geoX > 0 && el.geoY > 0) {
            const coordinate = calcScreenCoordinates(
              data[view.course],
              theta[view.course],
              el.geoY,
              el.geoX,
              latQuation[view.course],
              lonQuation[view.course]
            );
            el.cart.style.left = `calc(${coordinate.x}% - ${width}px)`;
            el.cart.style.bottom = `calc(${coordinate.y}%)`;
            el.cart.style.display = 'block';
          } else el.cart.style.display = 'none';
          if (cartInfos.length < 1) el.cart.style.display = 'none';
        } else {
          if (el?.id) {
            document.querySelector(`.map_cart_${el.id}`)?.remove();
          }
        }
      });
    } else transformBbox();
  }, [cartRef, view, cartInfos]);

  return (
    <div
      className="map_mode"
      style={{ display: view.mode === 'Map' ? 'flex' : 'none' }}
    >
      <MapView
        loop={loop}
        cartRef={cartRef}
      />
    </div>
  );
};

export default MapMode;
