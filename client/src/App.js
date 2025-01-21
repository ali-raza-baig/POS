import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import Items from './Pages/Items';
import Bills from './Pages/Bills'
import CartPage from './Pages/CartPage';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={< HomePage />} />
        <Route path='/items' element={< Items />} />
        <Route path='/bills' element={< Bills />} />
        <Route path='/cart' element={< CartPage />} />
      </Routes>
    </>
  );
}

export default App;
