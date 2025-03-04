'use client';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { FC, useContext } from 'react';

type LoginButtonProps = {
  className?: string;
  text: string;
  loggedInText?: string;
  href?: string;
}

const LoginButton: FC<LoginButtonProps> = ({ className, text, loggedInText, href }) => {
  const { signIn, user } = useContext(AuthContext)
  const { push } = useRouter()
  const handleClick = () => {
    if (!user) {
      signIn(href)
    } else if (href) {
      push(href)
    }
  }
  return (
    <button type="button" onClick={handleClick} className={className}>{user && loggedInText ? loggedInText : text}</button>
  );
};

export default LoginButton;