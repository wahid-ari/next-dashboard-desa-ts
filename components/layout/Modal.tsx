import { useRef } from 'react';
import Button from '@components/systems/Button';
import Container from '@components/systems/Container';
import Heading from '@components/systems/Heading';
import Text from '@components/systems/Text';

type Props = {
  modal?: any;
  isHidden?: boolean;
  isDanger?: boolean;
  onDismiss?: () => void;
  onConfirm?: () => void;
};

export default function Modal({ modal, isHidden, isDanger, onDismiss, onConfirm }: Props) {
  const ref = useRef();
  const onCancel = (e: any) => {
    console.log(e);
    e.stopPropagation();
    onDismiss();
  };

  const onOutsideClick = (e: any) => {
    if (e.target === ref.current) {
      onDismiss();
    }
  };
  return (
    <div
      ref={ref}
      onClick={onOutsideClick}
      className={`${modal.show ? 'opacity-100' : 'opacity-0'} ${
        isHidden ? 'hidden' : ''
      } fixed top-0 left-0 z-[51] grid h-screen w-screen place-items-center bg-black bg-opacity-70 transition-all`}
    >
      <Container
        className={`${modal.show ? 'scale-100' : 'scale-50'} ${
          isHidden ? 'hidden' : ''
        } !mb-0 w-[38rem] max-w-[calc(100vw_-_4rem)] !rounded-lg border-2 !p-6 transition-all`}
      >
        <Heading>{modal.title}</Heading>
        <Text.semibold>{modal.desc}</Text.semibold>
        <br />
        <Text>{modal.content}</Text>
        <br />
        <div className='flex items-center justify-end gap-2'>
          <Button.secondary onClick={onCancel}>Batal</Button.secondary>
          <Button
            className={`${isDanger ? '!bg-red-600 hover:!bg-red-700 dark:!bg-red-600 dark:hover:!bg-red-700' : ''}`}
            onClick={onConfirm}
          >
            Konfirmasi
          </Button>
        </div>
      </Container>
    </div>
  );
}
