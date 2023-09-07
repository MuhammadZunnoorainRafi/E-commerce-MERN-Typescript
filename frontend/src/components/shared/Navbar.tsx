import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="flex justify-between">
      <Link to="/">home</Link>
      <Link to="/login">login</Link>
      <Link to="/register">register</Link>
    </div>
  );
}

export default Navbar;
