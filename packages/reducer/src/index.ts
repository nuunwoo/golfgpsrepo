import { combineReducers } from 'redux';
import gps, {
  CounterAction as gpsAction,
  mapInfoHandle,
  viewHandle,
  cartInfosHandle,
  cartTextHandle,
  cartInfoHandle,
  readyHandle,
  scoreHandle,
} from './gps';
import admin, { CounterAction as adminAction, userNameHandle, userInfoHandle } from './admin';
import websocket, { CounterAction as websocketAction, packetReset, packetHandle } from './websocket';

const rootReducer = combineReducers({
  gps,
  admin,
  websocket,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
export type { gpsAction, adminAction, websocketAction };

export const mapInfo = mapInfoHandle;
export const view = viewHandle;
export const cartInfos = cartInfosHandle;
export const cartText = cartTextHandle;
export const cartInfo = cartInfoHandle;
export const ready = readyHandle;
export const score = scoreHandle;
export const userName = userNameHandle;
export const userInfo = userInfoHandle;
export const reset = packetReset;
export const packet = packetHandle;

export { default as admin } from './admin';
export { default as websocket } from './websocket';
