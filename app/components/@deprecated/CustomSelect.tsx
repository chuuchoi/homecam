import ReactDOM from 'react-dom';
import { useLayoutEffect, useRef, useState } from "react";
import './customselect.css';

interface SelectOptionsI{
  value: string[],
  selectedIndex: number
}

export function CustomSelect ({
  options,
  setOptions,
  style,
  selectBoxStyle,
  optionStyle,
  menuHeight,
  children
}:{
  options: SelectOptionsI
  setOptions: React.Dispatch<React.SetStateAction<SelectOptionsI>>
  style?: React.CSSProperties,
  selectBoxStyle?: React.CSSProperties,
  optionStyle?: React.CSSProperties,
  menuHeight?: number,
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleOptionSelect = (index: number) => {
    setOptions(c => ({ ...c, selectedIndex: index }));
    setIsOpen(false);
  };

  useLayoutEffect(() => {
    if (isOpen && selectRef.current && dropdownRef.current) {
      const dh = dropdownRef.current.offsetHeight;
      const rect = selectRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const newPos = spaceBelow >= dh || spaceBelow >= spaceAbove ? "bottom" : "top";

      let top = newPos === 'bottom'
        ? rect.bottom + window.scrollY
        : rect.top + window.scrollY - dh;
      let left = rect.left + window.scrollX;

      const overflowRight = left + rect.width - window.innerWidth;
      if (overflowRight > 0) left -= overflowRight + 8;
      if (left < 8) left = 8;
      if (top < 8) top = 8;
      if (top + dh > window.innerHeight - 8) top = window.innerHeight - 8 - dh;

      setDropdownPos({ top, left, width: rect.width });
    }
  }, [isOpen]);

  return (
    <div className="custom-select" style={style}>
      {isOpen && ReactDOM.createPortal(
        <div className="drovrlay" onClick={closeDropdown} />,
        document.getElementById('root') || document.body
      )}

      {/* children을 클릭했을 때 드롭다운 토글 */}
      <div ref={selectRef} onClick={toggleDropdown} style={selectBoxStyle}>
        {children}
      </div>

      {isOpen && ReactDOM.createPortal(
        <div
          className="options-container scrollstyle0"
          ref={dropdownRef}
          style={{
            overflowY: 'auto',
            scrollbarGutter: 'unset',
            maxHeight: !menuHeight ? '50vh' : `${menuHeight}px`,
            position: 'fixed',
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: dropdownPos.width,
          }}
        >
          {options.value.map((option, index) => (
            <div
              key={index}
              className={
                options.value[options.selectedIndex] === option
                  ? "option cur"
                  : "option"
              }
              style={optionStyle}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </div>
          ))}
        </div>,
        document.getElementById('root') || document.body
      )}
    </div>
  );
}
