import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accounts from "./Components/Accounts";
import Home from "./Components/Home";
import ViewOrUpdateBilling from "./Components/ViewOrUpdateBilling";
import Edit from "./Components/Edit";
import CreateBill from "./Components/CreateBill";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="Edit" element={<Edit />} /> */}

        <Route path="/" element={<Home />} />
        <Route exact path="/create-new-bill" element={<CreateBill />} />
        <Route path="/view" element={<ViewOrUpdateBilling />} />
        <Route path="/Edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
