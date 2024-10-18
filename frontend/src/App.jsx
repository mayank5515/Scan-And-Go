import { Routes, Route } from "react-router-dom";
import ShoppingListPage from "./pages/ShoppingListPage";
import BillPage from "./pages/BillPage";
function App() {
  return (
    <>
      <div className=" p-4 w-full h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<ShoppingListPage />} />
          <Route path="/bill" element={<BillPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
