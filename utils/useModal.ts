import { useEffect, useState } from 'react';

export default function useModal() {
  const [modal, setModal] = useState({
    show: false,
    title: '',
    desc: '',
    content: '',
  });
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (isHidden) {
      document.body.classList.remove('overflow-y-hidden');
    } else {
      document.body.classList.add('overflow-y-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-y-hidden');
    };
  }, [isHidden]);

  const dismissModal = () => {
    setModal({ ...modal, show: false });
    setTimeout(() => {
      setIsHidden(true);
    }, 150);
  };

  const revealModal = ({ title = '', desc = '', content = '' }) => {
    setIsHidden(false);
    setTimeout(() => {
      setModal({ show: true, title, desc, content });
    }, 150);
  };

  return {
    modal,
    isHidden,
    dismissModal,
    revealModal,
  };
}
