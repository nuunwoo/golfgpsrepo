// 관제 페이지
type GpsProps = {
  url: string;
  ws: string;
  isSide: boolean;
  setIsSide: React.Dispatch<React.SetStateAction<boolean>>;
  loop: boolean;
};
// 관제 페이지 모드 스위칭
type GpsContentsProps = {
  url: string;
  isSide: boolean;
  setIsSide: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
  loop: boolean;
};
// 블록모드 - 파블록
type GpsBlockParProps = {
  blockRef: React.MutableRefObject<HTMLDivElement[][][] | null[][][]>;
  course: string;
  hole: number;
  section: string[];
};
// 카트
type CartRef = {
  id: string;
  course: string;
  gameTp: string;
  cart: HTMLDivElement | null;
};
// 맵모드 카트
type MapCartRef = {
  geoX: number;
  geoY: number;
} & CartRef;
// 블록모드 카트
type BlockCartRef = {
  hole: string;
  par: string;
} & CartRef;

export type { GpsProps, GpsContentsProps, GpsBlockParProps, MapCartRef, BlockCartRef };
