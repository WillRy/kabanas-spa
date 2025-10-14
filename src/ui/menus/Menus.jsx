import { EllipsisVertical } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRef } from "react";
import {useClickOutside} from "../../hooks/useClickOutside";

const MenuContext = createContext({});

function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  const [position, setPosition] = useState(null);

  const open = (id) => setOpenId(id);
  const close = () => setOpenId("");
  const toggle = (id) => setOpenId(openId === id ? "" : id);

  return (
    <MenuContext.Provider
      value={{
        openId,
        position,
        setPosition,
        open,
        close,
        toggle,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Menu({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenuContext);

  const ref = useRef();

  function handleClick(e) {
    e.stopPropagation();

    if (openId === "" || openId !== id) {
      const rect = e.target.closest("button").getBoundingClientRect();
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });

      return open(id);
    }

    close();
  }

  useEffect(() => {
    function fixPosition() {
      if (!ref.current) return;

      if (!openId) return;

      if (openId === id) {
        const rect = ref.current.getBoundingClientRect();
        setPosition({
          x: window.innerWidth - rect.width - rect.x,
          y: rect.y + rect.height + 8,
        });
      }
    }

    if (openId) {
      document.querySelector("main")?.addEventListener("scroll", fixPosition);
    }

    return () =>
      document
        .querySelector("main")
        ?.removeEventListener("scroll", fixPosition);
  }, [openId, id, setPosition]);

  return (
    <button
      onClick={handleClick}
      ref={ref}
      className="bg-transparent border-0 p-[0.4rem] rounded-sm transform translate-x-[0.8rem] transition-all duration-200 hover:bg-gray-100 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-gray-400"
    >
      <EllipsisVertical className="w-5 h-5 text-color-700" />
    </button>
  );
}

function List({ id, children }) {
  const { openId, close, position } = useContext(MenuContext);

  const ref = useClickOutside(close, false);

  if (openId !== id) return null;

  return createPortal(
    <ul ref={ref} style={{ right: `${position.x}px`, top: `${position.y}px` }} className="fixed  bg-white shadow-sm rounded-md">
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, icon, onClick, disabled }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();

    close();
  }

return (
    <li>
        <button
            className="w-full text-left bg-none border-none py-3 px-6 text-sm transition-all duration-200 flex items-center gap-3 hover:bg-gray-100 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-gray-400 [&>svg]:transition-all [&>svg]:duration-300"
            onClick={handleClick}
            disabled={disabled}
        >
            {icon}
            <span>{children}</span>
        </button>
    </li>
);
}


Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;