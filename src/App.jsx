import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Clock from "./pages/Clock";
import Memo from "./pages/Memo";
import Fortune from "./pages/Fortune";
import Calendar from "./pages/Calendar";
import News from "./pages/News";
import Weather from "./pages/Weather";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/fortune" element={<Fortune />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/News" element={<News />} />
          <Route path="/Weather" element={<Weather />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;