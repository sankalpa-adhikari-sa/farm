import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.scss"
function Navbar() {
  return (
    <div className='NavbarWrapper'>
    <NavLink 
        to="/"
        className={({isActive, isPending}) =>
        isPending ? "NavPen": isActive ? "NavAct": ""}>
            Home
    </NavLink>
    <NavLink 
        to="/farm"
        className={({isActive, isPending}) =>
        isPending ? "NavPen": isActive ? "NavAct": ""}>
            Farm
    </NavLink>
    <NavLink 
        to="/livestock"
        className={({isActive, isPending}) =>
        isPending ? "NavPen": isActive ? "NavAct": ""}>
            Livestock
    </NavLink>
    <NavLink 
        to="/employees"
        className={({isActive, isPending}) =>
        isPending ? "NavPen": isActive ? "NavAct": ""}>
            Employees
    </NavLink>

    </div>
  )
}

export default Navbar