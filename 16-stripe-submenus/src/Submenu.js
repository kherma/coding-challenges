import React, { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from './context';

const Submenu = () => {
  const [columns, setColumns] = useState('col-2');

  const {
    isSubmenuOpen,
    location,
    page: { page, links },
  } = useGlobalContext();

  const container = useRef(null);

  useEffect(() => {
    setColumns('col-2');
    const submenu = container.current;
    const { center, bottom } = location;
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;
    links.length > 2 && setColumns(`col-${links.length}`);
  }, [location, links]);
  return (
    <aside className={`submenu ${isSubmenuOpen && 'show'}`} ref={container}>
      <h4>{page}</h4>
      <div className={`submenu-center ${columns}`}>
        {links.map(({ label, icon, url }, index) => (
          <a key={index} href={url}>
            {icon}
            {label}
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Submenu;
