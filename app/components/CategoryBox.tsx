'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface CategoryBoxProps {
  link: string;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ link, label, selected }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/${link}`);
  }, [link, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-4
        text-lg
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <div className="font-medium text-lg">
        {label}
      </div>
      <hr />
    </div>
  );
}

export default CategoryBox;