import { Nunito } from 'next/font/google'

import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';
import Footer from './components/Footer';
import GuideModal from './components/modals/GuideModal';
import TodoModal from './components/modals/TodoModal';
import RestaurantModal from './components/modals/RestaurantModal';

export const metadata = {
  title: 'Easy Stay',
  description: 'Easy Stay',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <GuideModal />
          <TodoModal />
          <RestaurantModal />
          <Navbar currentUser={currentUser}/>
          
        </ClientOnly>
        <div className="pb-20 pt-[14%]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
