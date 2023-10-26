let targetLon = 37; //위도
const radiusOfEarth = 6371.009; //지구 반지름(km)
const circumferenceOfEarth = 2 * Math.PI * radiusOfEarth; //지구 둘레
const distancePerLat = circumferenceOfEarth / 360; //경도당 거리(km)
const distancePerLon =
  (Math.cos((targetLon * Math.PI) / 180) * circumferenceOfEarth) / 360; //위도당 거리(km)

/**
 * 입력된 경도를 위도로 단위를 변경한다.
 * @param {number} lonValue 경도
 */
const convertUnitToLat = (lonValue: number) => {
  return (lonValue * distancePerLon) / distancePerLat;
};

// /**
//  * 입력된 위도를 경도로 단위를 변경한다.
//  * @param {number} LatValue 위도
//  */
const convertUnitToLon = (latValue: number) => {
  return (latValue * distancePerLat) / distancePerLon;
};

/**
 * 원점과 y값이 같은 임의의 점을 잇는 선분과, 원점과 지정한 점을 잇는 선분이 이루는 각도
 * The angle between the line connecting the origin and any point with the same y value and the line connecting the origin and the specified point.
 * @param {number} origin_x
 * @param {number} origin_y
 * @param {number} x
 * @param {number} y
 * @param {boolean} is_rad 리턴받을 각도가 Rad 여부
 */
const calcTheta: (
  origin_x: number,
  origin_y: number,
  x: number,
  y: number,
  is_rad: boolean
) => number = (origin_x, origin_y, x, y, is_rad) => {
  const a = y - origin_y;
  const b = x - origin_x;

  const theta = Math.atan(a / b);

  if (is_rad) {
    return theta;
  } else {
    return theta * (180 / Math.PI);
  }
};

/**
 * 원점에서 떨어진 임의의 점을 지정한 각도만큼 회전했을 때 좌표
 * Coordinates when rotated by the specified angle
 * @param {number} origin_x
 * @param {number} origin_y
 * @param {number} x
 * @param {number} y
 * @param {number} theta
 * @param {boolean} is_rad 입력한 각도가 Rad 여부
 */
const calcCoordinatesAfterRotation: (
  origin_x: number,
  origin_y: number,
  x: number,
  y: number,
  theta: number,
  is_rad: boolean
) => { x: number; y: number } = (origin_x, origin_y, x, y, theta, is_rad) => {
  const rebased_x = x - origin_x;
  const rebased_y = y - origin_y;

  let rad_theta;

  if (is_rad) {
    rad_theta = theta;
  } else {
    rad_theta = theta * (Math.PI / 180);
  }
  const rotatedX =
    rebased_x * Math.cos(rad_theta) - rebased_y * Math.sin(rad_theta);
  const rotatedY =
    rebased_x * Math.sin(rad_theta) + rebased_y * Math.cos(rad_theta);
  const xx = rotatedX + origin_x;
  const yy = rotatedY + origin_y;
  return { x: xx, y: yy };
};

/**
 * 평면위에 점 (origin_x,origin_y) 와 (to_x, to_y) 를 지나는 직선의 기울기와 절편을 계산하여 방정식을 만든다.
 * The slope and intercept of the line passing through the point (origin_x, origin_y) and (to_x, to_y)
 * @param {number} origin_x
 * @param {number} origin_y
 * @param {number} to_x
 * @param {number} to_y
 */
const makeLinearEquation: (
  origin_x: number,
  origin_y: number,
  to_x: number,
  to_y: number
) => { slope: number; intercept: number } = (
  origin_x,
  origin_y,
  to_x,
  to_y
) => {
  const x_variation = to_x - origin_x;
  const y_variation = to_y - origin_y;
  const slope = y_variation / x_variation;

  const intercept = origin_y - slope * origin_x;

  return { slope: slope, intercept: intercept };
};

/**
 * 화면상 좌표를 계산한다.
 * @param {number} lat 위도
 * @param {number} lon 경도
 */
const inputData: (
  tl_la_y: number,
  tl_lo_x: number,
  tr_la_y: number,
  tr_lo_x: number,
  bl_la_y: number,
  bl_lo_x: number
) => {
  x: number;
  y: number;
  lat: number;
  lon: number;
  lon_rotated: number;
  lat_rotated: number;
}[] = (tl_la_y, tl_lo_x, tr_la_y, tr_lo_x, bl_la_y, bl_lo_x) => {
  if (targetLon === 37) targetLon = tl_la_y;
  const data = [] as any;
  data.push({
    x: 0,
    y: 100,
    lat: tl_la_y,
    lon: tl_lo_x,
    lon_rotated: 0,
    lat_rotated: 0,
  });
  data.push({
    x: 100,
    y: 0,
    lat: tr_la_y,
    lon: tr_lo_x,
    lon_rotated: 0,
    lat_rotated: 0,
  });
  data.push({
    x: 0,
    y: 0,
    lat: bl_la_y,
    lon: bl_lo_x,
    lon_rotated: 0,
    lat_rotated: 0,
  });
  return data;
};
const process: (
  data: {
    x: number;
    y: number;
    lat: number;
    lon: number;
    lon_rotated: number;
    lat_rotated: number;
  }[]
) => {
  theta: number;
  lonQuation: { slope: number; intercept: number };
  latQuation: { slope: number; intercept: number };
} = (data) => {
  //   if (data.length < 3) return;

  // 각도 계산
  const theta: number =
    calcTheta(
      convertUnitToLat(data[0].lon),
      data[0].lat,
      convertUnitToLat(data[1].lon),
      data[1].lat,
      true
    ) * -1;
  // 회전후 좌표 계산
  // 두 번째 입력한 위치 회전변환
  const tempCoordi = calcCoordinatesAfterRotation(
    convertUnitToLat(data[0].lon),
    data[0].lat,
    convertUnitToLat(data[1].lon),
    data[1].lat,
    theta,
    true
  );

  tempCoordi.x = convertUnitToLon(tempCoordi.x);
  data[1].lon_rotated = tempCoordi.x;
  data[1].lat_rotated = tempCoordi.y;

  // 세 번째 입력한 위치 회전변환
  const tempCoordi2 = calcCoordinatesAfterRotation(
    convertUnitToLat(data[0].lon),
    data[0].lat,
    convertUnitToLat(data[2].lon),
    data[2].lat,
    theta,
    true
  );

  tempCoordi2.x = convertUnitToLon(tempCoordi2.x);
  data[2].lon_rotated = tempCoordi2.x;
  data[2].lat_rotated = tempCoordi2.y;

  // 위도, 경도 방정식 만들기
  const lonQuation = makeLinearEquation(
    data[0].lon,
    data[0].x,
    data[1].lon_rotated,
    data[1].x
  );
  const latQuation = makeLinearEquation(
    data[0].lat,
    data[0].y,
    data[2].lat_rotated,
    data[2].y
  );

  return {
    theta: theta,
    lonQuation: lonQuation,
    latQuation: latQuation,
  };
};

/**
 * 특정 gps 좌표를 화면상 100분률로 계산
 * @param {{ lat: number; lon: number }[]} data bbox의 좌상단, 우상단, 좌하단의 gps 좌표 ( 변경 된 각도 기준 )
 * @param {number} lat 위도
 * @param {number} lon 경도
 * @param {{slope: number, intercept: number}} latQuation 위도 기울기/y절편
 * @param {{slope: number, intercept: number}} lonQuation 경도 기울기/y절편
 */
const calcScreenCoordinates: (
  data: { lat: number; lon: number }[],
  theta: number,
  lat: number,
  lon: number,
  latQuation: { slope: number; intercept: number },
  lonQuation: { slope: number; intercept: number }
) => { x: number; y: number } = (
  data,
  theta,
  lat,
  lon,
  latQuation,
  lonQuation
) => {
  let tempCoordi = calcCoordinatesAfterRotation(
    convertUnitToLat(data[0].lon),
    data[0].lat,
    convertUnitToLat(lon),
    lat,
    theta,
    true
  );

  tempCoordi.x = convertUnitToLon(tempCoordi.x);

  let x = lonQuation.slope * tempCoordi.x + lonQuation.intercept;
  let y = latQuation.slope * tempCoordi.y + latQuation.intercept;
  return { x: x, y: y };
};

export default { inputData, process, calcScreenCoordinates };
