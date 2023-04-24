import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import 'semantic-ui-css/semantic.min.css';


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    );
  }
}


/*import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Customer from './Crud App/Customer';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Customer />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App*/


















