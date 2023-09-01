
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import './App.css';
import ShowUser from './Components/AllUser/ShowUser';
import CreateUser from './Components/CreateUser/CreateUser';


function App() {
  return <Router>
    <nav className='bg-blue-950 py-3'>
      <ul className='flex align-center justify-center text-white text-base font-medium'>
        <li className='py-1.5 px-2 bg-white hover:bg-black text-black hover:text-white mr-2 rounded transition ease-in-out delay-150'>
          <Link to="/">Home</Link>
        </li>
        <li className='py-1.5 px-2 bg-white hover:bg-black text-black hover:text-white mr-2 rounded transition ease-in-out delay-150'>
          <Link to="/create-user">Create User</Link>
        </li>
        <li className='py-1.5 px-2 bg-white hover:bg-black text-black hover:text-white rounded transition ease-in-out delay-150'>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path="/create-user" element={<CreateUser />}></Route>
      <Route path="/users" element={<ShowUser />}></Route>
    </Routes>
  </Router>

}

export default App;
