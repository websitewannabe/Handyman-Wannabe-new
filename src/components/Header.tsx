<li>
              <NavLink
                to="/services"
                className={({isActive}) => 
                  isActive ? 'font-bold text-primary' : 'hover:text-primary transition-colors'
                }
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/packages"
                className={({isActive}) => 
                  isActive ? 'font-bold text-primary' : 'hover:text-primary transition-colors'
                }
              >
                Packages
              </NavLink>
            </li>
            <li className="mx-auto">
              <NavLink
                to="/service-area"
                className={({isActive}) => 
                  isActive ? 'font-bold text-primary' : 'hover:text-primary transition-colors'
                }
              >
                Service Area
              </NavLink>
            </li>