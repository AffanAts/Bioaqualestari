// components/Icon.tsx
import React from 'react';
import Image from 'next/image';

interface IconProps {
  type: 'edit' | 'delete' | 'comment';
  alt: string;
}

const Icon: React.FC<IconProps> = ({ type, alt }) => {
  const iconSrc = {
    edit: '/icons/edit.svg',
    delete: '/icons/delete.svg',
    comment: '/icons/comment.svg',
  };

  return <Image src={iconSrc[type]} alt={alt} width={24} height={24} />;
};

export default Icon;
