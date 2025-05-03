import { createPortal } from 'react-dom';
import { useIframeWindow } from '../../utils/useIframeWindow';

interface PortalProps {
  children: JSX.Element;
}

export const Portal = ({ children }: PortalProps) => {
  const window = useIframeWindow();

  if (!window) return null;

  return createPortal(children, window.document.body);
};
