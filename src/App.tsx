import { Route, Routes } from "react-router-dom";
import { Qr } from "./components/Qr";
import Upload from "./components/Upload";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Qr />} />
      <Route path="/Upload" element={<Upload />} /> {/* Corrected path */}
    </Routes>
  );
}

export default App;
