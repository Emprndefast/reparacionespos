import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NewRepair from '../pages/NewRepair';
import RepairList from '../pages/RepairList';
import PrintLabel from '../pages/PrintLabel';
const AppRouter = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/new' element={<NewRepair />} />
      <Route path='/list' element={<RepairList />} />
      <Route path='/print/:id' element={<PrintLabel />} />
    </Routes>
  </Router>
);
export default AppRouter;