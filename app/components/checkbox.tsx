// app/components/Checkbox.tsx
import React from "react";
import { cn } from "~/lib/utils"; // cn 유틸을 이미 쓰고 있다면 그대로 사용하세요.

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
}

export function Checkbox({ checked, onChange, id, className }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn("cursor-pointer flex items-center", className)}
    >
      {/* 실제 input은 숨기기 */}
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      {/* 커스텀 박스 */}
      <div
        className={cn(
          "h-5 w-5 flex items-center justify-center rounded border border-blue-600 transition-colors",
          checked ? "bg-neutral-50" : "bg-neutral-50/25",
        )}
      >
        {checked && (
          <svg
            className="h-4 w-4"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.54998 18L3.84998 12.3L5.27498 10.875L9.54998 15.15L18.725 5.97498L20.15 7.39998L9.54998 18Z"
              fill="var(--color-blue-700)"
            />
          </svg>
        )}
      </div>
    </label>
  );
}
