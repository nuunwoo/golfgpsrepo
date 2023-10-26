type AdminProps = AdminHeaderProps; // 어드민 페이지
// 어드민페이지 - 헤더
type AdminHeaderProps = {
  url: string;
  isSide: boolean;
  setIsSide: React.Dispatch<React.SetStateAction<boolean>>;
};
// 어드민 페이지 컨텐츠 스위칭
type AdminContentsProps = {
  url: string;
  menuActive: { name: string; icon: string };
};
// 어드민 페이지 메뉴
type AdminMenuProps = {
  menu: string[];
  setMenuActive: React.Dispatch<
    React.SetStateAction<{
      name: string;
      icon: string;
    }>
  >;
};
// 어드민 페이지 사용자 추가 팝업창
type AdminUserAddPopProps = {
  url: string;
  isAdd: boolean;
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

export type { AdminProps, AdminHeaderProps, AdminContentsProps, AdminMenuProps, AdminUserAddPopProps };
