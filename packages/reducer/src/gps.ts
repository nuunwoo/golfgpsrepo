const mapInfo = 'gps/mapInfo' as const; // 맵모드에 사용하는 데이터
const view = 'gps/view' as const; // 현재 보고있는 모드와 코스
const cartInfos = 'gps/cartOnfos' as const; // 로그인한 전체 카트
const cartText = 'gps/cartText' as const; // 메뉴에서 선택한 카트텍스트
const cartInfo = 'gps/cartInfo' as const; // 클릭한 카트 정보
const ready = 'gps/ready' as const; // 관제 준비 상태
const score = 'gps/score' as const; // 클릭한 카트의 스코어 정보

export const mapInfoHandle = (value: { mapview: any; courseInfo: any }) => ({
  type: mapInfo,
  payload: value,
});
export const viewHandle = (value: { mode: string; course: number }) => ({
  type: view,
  payload: value,
});
export const cartInfosHandle = (value: string[]) => ({
  type: cartInfos,
  payload: value,
});
export const cartTextHandle = (value: number) => ({
  type: cartText,
  payload: value,
});
export const cartInfoHandle = (value: string) => ({
  type: cartInfo,
  payload: value,
});
export const readyHandle = (value: boolean) => ({
  type: ready,
  payload: value,
});
export const scoreHandle = (value: any) => ({
  type: score,
  payload: value,
});

export type CounterAction =
  | ReturnType<typeof mapInfoHandle>
  | ReturnType<typeof viewHandle>
  | ReturnType<typeof cartInfosHandle>
  | ReturnType<typeof cartTextHandle>
  | ReturnType<typeof cartInfoHandle>
  | ReturnType<typeof readyHandle>
  | ReturnType<typeof scoreHandle>;

type CounterState = {
  mapInfo: {
    mapview: any;
    courseInfo: any;
  };
  view: {
    mode: string;
    course: number;
  };
  cartInfos: string[];
  cartText: number;
  cartInfo: string;
  ready: boolean;
  score: any;
};

const initialState = {
  mapInfo: {
    mapview: [],
    courseInfo: [],
  },
  view: {
    mode: 'Block',
    course: 0,
  },
  cartInfos: [],
  cartText: 4,
  cartInfo: '',
  ready: false,
  score: [],
};

const gps = (state: CounterState = initialState, action: CounterAction) => {
  switch (action.type) {
    case mapInfo:
      return {
        mapInfo: action.payload,
        view: state.view,
        cartInfos: state.cartInfos,
        cartText: state.cartText,
        cartInfo: state.cartInfo,
        ready: state.ready,
        score: state.score,
      };
    case view:
      return {
        mapInfo: state.mapInfo,
        view: action.payload,
        cartInfos: state.cartInfos,
        cartText: state.cartText,
        cartInfo: state.cartInfo,
        ready: state.ready,
        score: state.score,
      };
    case cartInfos:
      return {
        mapInfo: state.mapInfo,
        view: state.view,
        cartInfos: action.payload,
        cartText: state.cartText,
        cartInfo: state.cartInfo,
        ready: state.ready,
        score: state.score,
      };
    case cartText:
      return {
        mapInfo: state.mapInfo,
        view: state.view,
        cartInfos: state.cartInfos,
        cartText: action.payload,
        cartInfo: state.cartInfo,
        ready: state.ready,
        score: state.score,
      };
    case cartInfo:
      return {
        mapInfo: state.mapInfo,
        view: state.view,
        cartInfos: state.cartInfos,
        cartText: state.cartText,
        cartInfo: action.payload,
        ready: state.ready,
        score: state.score,
      };
    case ready:
      return {
        mapInfo: state.mapInfo,
        view: state.view,
        cartInfos: state.cartInfos,
        cartText: state.cartText,
        cartInfo: state.cartInfo,
        ready: action.payload,
        score: state.score,
      };
    case score:
      return {
        mapInfo: state.mapInfo,
        view: state.view,
        cartInfos: state.cartInfos,
        cartText: state.cartText,
        cartInfo: state.cartInfo,
        ready: state.ready,
        score: action.payload,
      };
    default:
      return state;
  }
};
export default gps;
