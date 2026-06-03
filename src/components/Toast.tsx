import { useEffect, useRef } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: ToastProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (visible) {
      ref.current.classList.add('show');
    } else {
      ref.current.classList.remove('show');
    }
  }, [visible, message]);

  return (
    <div ref={ref} className="toast">
      {message}
    </div>
  );
}
