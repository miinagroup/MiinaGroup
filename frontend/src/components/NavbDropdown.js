import React, { useState } from 'react';
import './NavbDropdown.css';

const HoverableDropdownMenu = ({ items }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const DropdownItem = ({ children, goToMenu }) => {
    return (
      <div
        className="dropdown-item"
        onMouseEnter={() => {
          setActiveMenu(goToMenu);
        }}
        onMouseLeave={() => {
          setActiveMenu(null);
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="hoverable-dropdown">
      {items.map((item) => (
        <DropdownItem key={item.name} goToMenu={item.subMenu}>
          {item.name}
        </DropdownItem>
      ))}
      {activeMenu && (
        <div className="dropdown-menu">
          {activeMenu.map((item) => (
            <div key={item.name}>
              <h3>{item.name}</h3>
              {item.subMenu &&
                item.subMenu.map((subItem) => (
                  <a href={subItem.link} key={subItem.name}>
                    {subItem.name}
                  </a>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HoverableDropdownMenu;
