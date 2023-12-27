import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Switch,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownItem,
  DropdownMenu,
} from '@nextui-org/react';
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { logoutUser } from '../../Slices/authSlice';
import { storeId } from '../../utils/getStore';

export default function TNavbar({
  setDarkMode,
  darkMode,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDarkMode: any;
  darkMode: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];

  return (
    <Navbar
      className="border-b border-default-100  md:px-5"
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to="/" className="font-bold text-inherit">
            Trendzy
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
            onClick={() => setDarkMode(!darkMode)}
            isSelected={darkMode}
            size="md"
            color="secondary"
            thumbIcon={({ className }) =>
              darkMode ? (
                <BiSolidSun className={className} />
              ) : (
                <BiSolidMoon className={className} />
              )
            }
          ></Switch>
        </NavbarItem>
        {user ? (
          <Dropdown placement="bottom-end" backdrop="blur">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={user.image}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem className={`${user.isAdmin ? 'flex' : 'hidden'}`}>
                {user.isAdmin && (
                  <Link to={`/admin/${storeId}`} className="font-bold block">
                    Admin
                  </Link>
                )}
              </DropdownItem>

              <DropdownItem key="profile">
                <Link className="block" to="/profile">
                  Profile
                </Link>
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  dispatch(logoutUser());
                  navigate('/login');
                }}
                key="logout"
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden md:inline-block">
              <Button as={Link} color="default" to="/login" variant="flat">
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" to="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu className="dark bg-slate-900 text-slate-100">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              className="w-full "
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
