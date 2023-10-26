import { useCallback } from "react";
import { AdminMenuProps } from "@pkg/types";

const Menu = ({ menu, setMenuActive }: AdminMenuProps) => {
  const menuHandle = useCallback(
    (menu: string, idx: number) => {
      setMenuActive({ name: menu, icon: `ico0${idx}` });
    },
    [setMenuActive]
  );

  return (
    <aside className="admin_menu">
      <ul>
        {menu.map((el: string, i: number) => (
          <li key={`admin_menu_${el}`} onClick={() => menuHandle(el, i + 1)}>
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
            <span>{el}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};
export default Menu;
