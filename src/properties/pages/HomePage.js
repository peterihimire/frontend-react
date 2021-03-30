import React from "react";
import NewForm from "../../shared/components/FormElements/NewForm";
import PropertiesPage from '../../properties/pages/PropertiesPage';

const HomePage = () => {
  return (
    <>
      <h1 className='center'>This is my homepage</h1>
      <PropertiesPage />
      <NewForm />
    </>
  );
};

export default HomePage;
