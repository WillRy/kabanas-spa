import {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {useClickOutside} from "../../hooks/useClickOutside.js";
import { XIcon } from "lucide-react";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");

  const open = (name) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, name }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(name),
  });
}
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useClickOutside(() => close());

  if (openName !== name) return null;

  return createPortal(
    <>
      <div className="fixed top-0 left-0 w-full h-screen bg-slate-400/50 backdrop-blur-sm z-50 transition-all duration-500">
        <div ref={ref} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md py-6 px-8 z-60 transition-all duration-500">
          <button onClick={() => close()} className={"bg-transparent border-0 p-0.5 rounded-sm translate-x-3 transition-all duration-200 absolute top-3 right-5 hover:bg-gray-100"}>
            <XIcon className={"w-[24px] h-[24px] text-gray-500"} />
          </button>
          <div>
            {cloneElement(children, {
              onCloseModal: () => close(),
            })}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;