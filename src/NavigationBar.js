import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar bg="primary">
      <li><NavLink exact to="/" className="nav-link" activeClassName={"activeLink"}>Home</NavLink></li>
      <li><NavLink to="create-entry" className="nav-link" activeClassName={"activeLink"}>Create an Entry</NavLink></li>
    </Navbar>
  )
}

export default NavigationBar;