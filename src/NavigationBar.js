import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar bg="navbar navbar-dark bg-dark" id="nav-bar">
      <li><NavLink exact to="/" className="nav-link" id="nav-li" activeClassName={"activeLink"}>Home</NavLink></li>
      <li><NavLink to="create-entry" className="nav-link" id="nav-li" activeClassName={"activeLink"}>Create an Entry</NavLink></li>
    </Navbar>
  )
}

export default NavigationBar;