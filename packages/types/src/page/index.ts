import { LoginProps, LoginTitleProps, LoginFormProps } from "./login";
import {
  AdminProps,
  AdminHeaderProps,
  AdminContentsProps,
  AdminMenuProps,
  AdminUserAddPopProps,
} from "./admin";
import {
  GpsProps,
  GpsContentsProps,
  GpsBlockParProps,
  MapCartRef,
  BlockCartRef,
} from "./gps";

type RouterProps = {
  loop: boolean;
  club_name: string;
  url: string;
  ws: string;
};

export type {
  RouterProps,
  LoginProps,
  LoginTitleProps,
  LoginFormProps,
  AdminProps,
  AdminHeaderProps,
  AdminContentsProps,
  AdminMenuProps,
  AdminUserAddPopProps,
  GpsProps,
  GpsContentsProps,
  GpsBlockParProps,
  MapCartRef,
  BlockCartRef,
};
