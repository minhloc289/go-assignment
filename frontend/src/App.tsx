import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import SearchScores from "./pages/SearchScores";
import Settings from "./pages/Settings";
import Report from "./pages/Report";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>

            <Route index path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/search" element={<SearchScores />} />
            <Route path="/report" element={<Report />} />

          </Route>
        </Routes>
      </Router>
    </>
  );
}
