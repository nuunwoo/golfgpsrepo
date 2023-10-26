import { useCallback } from 'react';
import { AdminHeaderProps } from '@pkg/types';
import { auth } from '@pkg/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@pkg/reducer';

const Header = ({ url, isSide, setIsSide }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const mode = useSelector((state: RootState) => state.gps.view).mode;
  const userName = useSelector((state: RootState) => state.admin.userName);
  const cartInfos = useSelector((state: RootState) => state.gps.cartInfos);

  const title = window.location.pathname.slice(1, 20).replace(/^[a-z]/, char => char.toUpperCase());

  const logoutHandle = useCallback(async () => {
    await auth.logout(url, navigate);
  }, [navigate]);

  // 경기 진행중인 카트의 개수
  const startCart = useCallback(() => {
    return cartInfos.filter(el => el.split('|')[13] !== 'N').length;
  }, [cartInfos]);

  // 대기중인 카트의 개수
  const stopCart = useCallback(() => {
    return cartInfos.length - startCart();
  }, [cartInfos.length, startCart]);

  return (
    <header>
      <div>
        <img
          src="/images/admin/btn_menu.png"
          alt="menu"
          onClick={() => setIsSide(!isSide)}
        />
        <h2>{title === 'Admin' ? title : mode}</h2>
      </div>
      {title !== 'Admin' ? (
        <div>
          <div>
            진행중 : <span>{startCart()}</span>
          </div>
          <div>
            대기중 : <span>{stopCart()}</span>
          </div>
        </div>
      ) : (
        ''
      )}
      <div>
        <span>{userName}</span>
        <img
          src="/images/admin/logout.png"
          alt="back"
          onClick={logoutHandle}
        />
      </div>
    </header>
  );
};

export default Header;
