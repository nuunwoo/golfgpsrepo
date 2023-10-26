const packet = 'websocket/packet' as const; // websocket 전송 패킷

export const packetReset = () => ({
  type: packet,
  payload: '',
});
export const packetHandle = (value: string) => ({
  type: packet,
  payload: value,
});

export type CounterAction = ReturnType<typeof packetReset> | ReturnType<typeof packetHandle>;

type CounterState = {
  packet: string;
};

const initialState = {
  packet: '',
};

function websocket(state: CounterState = initialState, action: CounterAction) {
  switch (action.type) {
    case packet:
      return {
        packet: action.payload,
      };
    default:
      return state;
  }
}
export default websocket;
