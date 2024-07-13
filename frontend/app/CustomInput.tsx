import React, { forwardRef } from "react";

// CustomInput コンポーネントを定義
// forwardRefを使用してインプットフィールドを作成し、日付の手動入力を可能にする
interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ value, onClick, onChange, placeholder }, ref) => {
  return (
    <input
      ref={ref}
      value={value}
      onClick={onClick}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: "150px", padding: "5px", marginRight: "10px" }}
    />
  );
});

// コンポーネントのdisplayNameを設定
CustomInput.displayName = "CustomInput";

export default CustomInput;
