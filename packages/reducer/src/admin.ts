const userName = 'admin/userName' as const; // 로그인한 사용자 이름
const userInfo = 'admin/userInfo' as const; // 골프장 전체 사용자

export const userNameHandle = (value: string) => ({
  type: userName,
  payload: value,
});

export const userInfoHandle = (value: any) => ({
  type: userInfo,
  payload: value,
});

export type CounterAction = ReturnType<typeof userNameHandle> | ReturnType<typeof userInfoHandle>;

type CounterState = {
  userInfo: any;
  userName: string;
};

const initialState = {
  userInfo: [],
  userName: '',
};

function admin(state: CounterState = initialState, action: CounterAction) {
  switch (action.type) {
    case userName:
      return {
        userName: action.payload,
        userInfo: state.userInfo,
      };
    case userInfo:
      return {
        userName: state.userName,
        userInfo: action.payload,
      };
    default:
      return state;
  }
}
export default admin;
