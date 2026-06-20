import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SelectionPage } from "./presentation/pages/SelectionPage";
import { PlayPage } from "./presentation/pages/PlayPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectionPage />} />
        <Route path="/play/:id" element={<PlayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
