import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Clock from "./pages/Clock";
import Memo from "./pages/Memo";
import Fortune from "./pages/Fortune";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/fortune" element={<Fortune />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;