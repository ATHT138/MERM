import assert from "@/asserts";
import { Button } from "@/components/ui";
import { getItem, removeItem } from "@/lib/localStorage";
import Show from "@/lib/show";
import { useUserZustand } from "@/stores";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUserZustand();
  const [current, setCurrent] = useState<string>("Home");

  const navigation = [
    { name: "Home", link: "/" },
    { name: "Watches", link: "/watches" },
    { name: "Contact", link: "/contact-us" },
    { name: "About", link: "/about" },
  ];

  useEffect(() => {
    const path = location.pathname;
    const savedNav = getItem("redirectPath");
    if (savedNav && savedNav !== path) {
      setCurrent(savedNav);
    } else if (path === "/") {
      setCurrent("Home");
    } else if (path === "/watches") {
      setCurrent("Watches");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    removeItem("token");
    removeItem("redirectPath");
    setUser(null);
    navigate("/");
  };

  const handleNavClick = (name: string, link: string) => {
    setCurrent(name);
    navigate(link);
  };

  return (
    <Disclosure as="nav" className="py-2 bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <img
                    className="w-auto h-8"
                    src={assert.image.mark}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.name, item.link)}
                        className={classNames(
                          item.name === current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          item.name === current ? "page" : undefined
                        }
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user && (
                  <div className="flex flex-row items-center gap-6 ">
                    <div className="text-white ">Welcome, {user?.name}</div>
                    <div className="flex gap-2">
                      <button type="button">
                        <BellIcon
                          className="text-gray-400 size-6 hover:text-white"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/shopping-cart")}
                      >
                        <ShoppingCart
                          className="text-gray-400 size-6 hover:text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                )}

                {/* Profile dropdown */}
                <Show>
                  <Show.When isTrue={user == null}>
                    <div>
                      <Link to="/login">
                        <Button className="mr-4">Sign in</Button>
                      </Link>
                      <Link to="/register">
                        <Button variant="outline">Sign up</Button>
                      </Link>
                    </div>
                  </Show.When>
                  <Show.Else>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="rounded-full size-10"
                            src={assert.avatar}
                            alt=""
                          />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </MenuItem>
                        {user?.isAdmin && (
                          <MenuItem>
                            {({ active }) => (
                              <Link
                                to="/dashboard"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Dashboard
                              </Link>
                            )}
                          </MenuItem>
                        )}
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <a
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </Show.Else>
                </Show>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  onClick={() => handleNavClick(item.name, item.link)}
                  className={classNames(
                    item.name === current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.name === current ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
