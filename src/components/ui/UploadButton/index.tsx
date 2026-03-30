import { useRef } from 'react';
import { IconButton } from '../IconButton';
import type { InputHTMLAttributes, ReactNode, ChangeEvent } from 'react';

interface UploadButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  onFileSelect: (file: File) => void;
}

export function UploadButton({
  icon,
  onFileSelect,
  ...props
}: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      onFileSelect(file);
      e.target.value = '';
    }
  };

  return (
    <>
      <IconButton icon={icon} title={props.title} onClick={handleClick} />

      <input
        type="file"
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
        {...props}
      />
    </>
  );
}
