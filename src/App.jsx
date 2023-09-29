import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes} from 'react-router-dom';
import Home from './Pages/Home/Home';
import PageNotFound from './Pages/404/PageNotFound';
import Navbar from './UI Components/Navbar';
import Employees from './Pages/Employees/Employees';
import EmployeeDetails from './Pages/Employees/EmployeeDetails';
import EmployeeUpdate from './Pages/Employees/EmployeeUpdate';
import Farm from './Pages/Farm/Farm';
import Livestock from './Pages/Livestock/Livestock'
import EmployeeAdd from './Pages/Employees/EmployeeAdd';
import LivestockAdd from './Pages/Livestock/LivestockAdd';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/employees/add' element={<EmployeeAdd/>}/>
        <Route path='/employees/:id' element={<EmployeeDetails/>}/>
        <Route path='/employees/:id/edit' element={<EmployeeUpdate/>}/>
        <Route path='/farm' element ={<Farm/>} />
        <Route path='/livestock' element ={<Livestock/>} />
        <Route path='/livestock/add' element ={<LivestockAdd/>} />

        <Route path="*" element={<PageNotFound/>} />
      </Routes>
        
    </>
  )
}

export default App
