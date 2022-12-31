import './App.css';
import Approve from './pages/managementlevel2/Approve'
import Contract from './pages/managementlevel2/Contract'
import Login from './pages/Login';
import Upload from './pages/user/Upload'
import History from './pages/user/History'
import Payment from './pages/finance/Payment'
import Sales from './pages/managementlevel1/Sales'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
      <div className="App">

        <BrowserRouter>

          <Routes>
            <Route index element={< Login />}></Route>
            {/* User Level 1 */}
            <Route exact path='/upload' element={< Upload />}></Route>
            <Route exact path='/history' element={< History />}></Route>

            {/* Management Level 2 */}
            <Route exact path='/approve' element={< Approve />}></Route>
            <Route exact path='/contract' element={< Contract />}></Route>

            {/* Management Level 1 */}
            <Route exact path='/sales' element={< Sales />}></Route>

            {/* Finance */}
            <Route exact path='/payment' element={< Payment />}></Route>


          </Routes>

        </BrowserRouter>

      </div>
  );
}

export default App;
