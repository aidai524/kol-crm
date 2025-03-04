import type { FC, MouseEvent } from 'react';
import React, { useCallback } from 'react';
import type { ButtonProps } from './Button';
import { Button as BaseWalletConnectionButton } from './Button';
import { useWalletModal } from './useWalletModal';

export const WalletModalButton: FC<ButtonProps> = ({
  children = 'Select Wallet',
  onClick,
  ...props
}) => {
  const { visible, setVisible } = useWalletModal();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) setVisible(!visible);
    },
    [onClick, setVisible, visible],
  );

  return (
    <BaseWalletConnectionButton
      {...props}
      className={`${props.className} wallet-adapter-button-trigger`}
      onClick={handleClick}
    >
      {children}
    </BaseWalletConnectionButton>
  );
};
