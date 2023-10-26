import { useSelector } from 'react-redux';
import { BlockPar } from './BlockPar';
import { RootState } from '@pkg/reducer';

const BlockCourse = ({
  loop,
  waitRef,
  waitCountRef,
  blockRef,
}: {
  loop: boolean;
  waitRef: React.MutableRefObject<HTMLDivElement[] | null[]>;
  waitCountRef: React.MutableRefObject<HTMLDivElement[] | null[]>;
  blockRef: React.MutableRefObject<HTMLDivElement[][][] | null[][][]>;
}) => {
  const courseInfo = useSelector((state: RootState) => state.gps.mapInfo).courseInfo;
  const cartInfos = useSelector((state: RootState) => state.gps.cartInfos);
  [
    // 샘플 데이터
    '004|130|73001|73|교육|GPSM11000289,플레이어1,GPSM12000290,플레이어2,GPSM13000291,플레이어3,GPSM14000292,플레이어4|0214|A|1|0|0|0|1|A|1|0|37.203869|128.043564|1113|0000|0000|0000|0000|0000|A|B|N|',
    '004|130|77003|77|교육|GPSM11000305,플레이어1,GPSM12000306,플레이어2,GPSM13000307,플레이어3,GPSM14000308,플레이어4|0218|A|1|0|0|0|1|B|0|0|37.202881|128.043594|0000|0000|0000|0000|0000|0000|A|B|N|',
    '004|130|106004|106|교육|GPSM11000421,플레이어1,GPSM12000422,플레이어2,GPSM13000423,플레이어3,GPSM14000424,플레이어4|0247|B|1|0|0|0|1|A|0|0|37.202728|128.043503|0000|0000|0000|0000|0000|0000|B|A|N|',
    '004|130|216002|216|교육|GPSM11000861,플레이어1,GPSM12000862,플레이어2,GPSM13000863,플레이어3,GPSM14000864,플레이어4|0439|B|1|0|0|0|1|A|1|1|37.204391|128.044724|1111|0000|0000|0000|0000|0000|A|B|N|',
  ];
  return (
    <div className="block_course">
      {courseInfo.map((el: any, i: number) => {
        if (loop && i > 0) return <div key={'none'}></div>;
        else {
          const wait_filter = cartInfos.filter(info => info.split('|')[14] === '0');
          const wait_course = wait_filter.filter(ele => ele.split('|')[13] === el.cour_cd);
          const progress_filter = cartInfos.filter(info => info.split('|')[14] !== '0');
          const progress_course = progress_filter.filter(ele => ele.split('|')[13] === el.cour_cd);

          // 코스 대기 카트 카운팅
          let wait_count: string | number = loop
            ? wait_filter.length > 0
              ? wait_filter.length
              : ''
            : wait_course.length > 0
            ? wait_course.length
            : '';

          // 코스 진행 카트 카운팅
          let progress_count: string | number = loop
            ? progress_filter.length > 0
              ? progress_filter.length
              : ''
            : progress_course.length > 0
            ? progress_course.length
            : '';

          return (
            <div
              key={`course_cd_${el.cour_cd}`}
              className={`course_${el.cour_cd}`}
            >
              <div className="progress_wait">
                <div className="course_name">
                  <span className="wait_count">{wait_count}</span>
                  <span className="progress_count">{progress_count}</span>
                  <img
                    src={`/images/block/course_name_${i + 1}.png`}
                    alt="대기"
                  />
                </div>
                <div className="progress_cart">
                  <div
                    className="count"
                    ref={ref => (waitCountRef.current[i] = ref)}
                  >
                    <img
                      src="/images/cart/plus.png"
                      alt="+"
                    />
                    <span></span>
                  </div>
                  <div
                    className="wait_cart"
                    ref={ref => (waitRef.current[i + 1] = ref)}
                  ></div>
                </div>
              </div>
              <div className="game_progress">
                {el.parinfo.map((par: number, hi: number) => {
                  let section = [];
                  for (let i = 0; i < par - 1; i++) {
                    let sectionNo = i;
                    if (i === par - 2) sectionNo = 3;
                    let sectionNm = `course${el.cour_cd}_hole${hi + 1}_section${sectionNo}`;
                    section.push(sectionNm);
                  }

                  return (
                    <div
                      key={`course_${el.cour_cd}_hole${hi + 1}`}
                      className={`hole_${hi + 1}`}
                    >
                      <img
                        src={`/images/block/par_${par}.png`}
                        alt={`${hi + 1}hole`}
                      />
                      <p>{el[`hole_no_0${hi + 1}`]}</p>
                      {
                        <BlockPar
                          blockRef={blockRef}
                          course={el.cour_cd}
                          hole={hi + 1}
                          section={section}
                        />
                      }
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
export default BlockCourse;
