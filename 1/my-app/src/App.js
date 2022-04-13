import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.css'
import Tab from './component/Tab';
import React from 'react';
import AuthenticationContext from "./component/AuthenticationContext";
import Test from './Test';
export default function App() {
  return (
    <>
      <AuthenticationContext>
        <Tab />
      </AuthenticationContext>
    </>
  );
}

