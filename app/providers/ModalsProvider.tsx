'use client';

import GuideModal from "../components/modals/GuideModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import RentModal from "../components/modals/RentModal";
import RestaurantModal from "../components/modals/RestaurantModal";
import SearchModal from "../components/modals/SearchModal";
import TodoModal from "../components/modals/TodoModal";

const ModalsProvider = () => {
  return ( 
    <>
      <LoginModal />
      <RegisterModal />
      <SearchModal />
      <RentModal />
      <TodoModal />
      <RestaurantModal />
      <GuideModal />
      
    </>
   );
}
 
export default ModalsProvider;