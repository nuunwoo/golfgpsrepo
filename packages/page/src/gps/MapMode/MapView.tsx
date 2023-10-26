import { MapCarts } from '../Carts';
import { useSelector } from 'react-redux';
import { RootState } from '@pkg/reducer';
import { MapCartRef } from '@pkg/types';

const MapView = ({ loop, cartRef }: { loop: boolean; cartRef: React.MutableRefObject<MapCartRef[] | null[]> }) => {
  const mapview = useSelector((state: RootState) => state.gps.mapInfo).mapview;
  const course = useSelector((state: RootState) => state.gps.view).course;

  return (
    <div className="map_view">
      {!loop ? ( // 코스 개수가 한개인 골프장은 전체맵만 보임
        mapview.map((el: any) => {
          if (el.hidden === 'Y') return '';
          else
            return (
              <img
                key={`map_view_${el.map_seq}`}
                src={`/images/map/map_${el.map_seq}.png`}
                alt="courseMap"
                style={{
                  display: Number(el.map_seq) === course + 1 ? 'block' : 'none',
                }}
              />
            );
        })
      ) : (
        <img
          src={`/images/map/map_1.png`}
          alt="courseMap"
          style={{
            display: 1 === course + 1 ? 'block' : 'none',
          }}
        />
      )}
      <MapCarts cartRef={cartRef} />
    </div>
  );
};

export default MapView;
