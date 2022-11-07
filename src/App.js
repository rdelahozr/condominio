import * as React from "react";
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignIn from './SignIn';
import { Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <div>
      <SignIn></SignIn>
    </div>
  );
}
export default App;
