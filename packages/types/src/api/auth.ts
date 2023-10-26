import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { AnyAction } from 'redux';
// 로그인 API 파라미터
type LoginParams = [string, string, string, Dispatch<AnyAction>, NavigateFunction];
export type { LoginParams };
