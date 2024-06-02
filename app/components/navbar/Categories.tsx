'use client';

import { usePathname } from 'next/navigation';
import CategoryBox from '../CategoryBox';
import Container from '../Container';

export const categories = [
  { label: 'Search All', link: '' }, // link is empty string for home page
  { label: 'Hotel', link: 'hotel' },
  { label: 'Things To Do', link: 'activity' },
  { label: 'Restaurant', link: 'restaurant' },
  { label: 'Tour Guide', link: 'tourguide' },
];

const Categories = () => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  return (
    <Container>
      <div>
        <div>
          <h2 className="text-6xl font-bold text-neutral-900 w-[25%] mx-auto mt-12 mb-4">
            Plan Your Trip
          </h2>
        </div>
        <div
          className="
            pt-4
            
            flex 
            flex-row 
            items-center 
            justify-center
            overflow-x-auto
            w-[60%]
            gap-16
            mx-auto
          "
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              link={item.link}
              selected={isMainPage ? item.link === '' : pathname === `/${item.link}`}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Categories;