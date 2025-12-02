import { useState } from "react";
import { useFloating, offset, shift, autoUpdate, flip } from "@floating-ui/react";
import { cn } from "~/lib/utils";

export function FloatingSelect({
  options,
  seleted,
  onSelect,
  children,
  style
}: {
  options: string[]
  seleted: string | null
  onSelect: (index: number) => void
  children: React.ReactNode,
  style?: React.CSSProperties
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom',
    middleware: [
      offset(4),
      flip(),
      shift({ padding: { top: 80, bottom: 4, left: 4, right: 4 }, mainAxis: true, crossAxis: true }) // 화면 밖으로 안 나가게
    ],
    whileElementsMounted: autoUpdate // 스크롤/리사이즈 시 자동 재계산
  });

  const toggleDropdown = () => setIsOpen(o => !o);
  const closeDropdown = () => setIsOpen(false);

  const handleOptionSelect = (index: number) => {
    onSelect(index)
    closeDropdown();
  };

  return (
    <div style={style}>
      {isOpen && (
        <div className="drovrlay" onClick={closeDropdown} />
      )}

      <div ref={refs.setReference} onClick={toggleDropdown} className="w-fit h-fit">
        {children}
      </div>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            overflowY: 'auto'
          }}
          className="scrollstyle1 max-h-[50vh] z-4
          bg-(--color-bg-20) border border-gray-50 rounded-[5px]
          shadow-[0px_2px_5px_0px_rgba(0,0,0,0.1)]"
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={cn("px-4 py-2.5 cursor-pointer text-red font-light hover:bg-[rgba(46,100,254,0.1)]",
                seleted !== null && option === seleted && "bg-[rgba(46,100,254,0.2)] hover:bg-[rgba(46,100,254,0.2)]")}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
