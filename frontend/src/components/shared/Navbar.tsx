import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Switch,
} from '@nextui-org/react';
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function TNavbar({
  setDarkMode,
  darkMode,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDarkMode: any;
  darkMode: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
        <NavbarItem className="hidden lg:flex">
          <Link to="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" to="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
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
