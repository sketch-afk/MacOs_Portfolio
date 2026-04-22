import React from 'react'
import dayjs from 'dayjs'


import { navLinks, navIcons} from '#constants'
import useWindowStore from '#store/window.js'

const Navbar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="" />
        <p className='font-bold max-sm:hidden'>Yash's Portfolio</p>

        <ul className='max-sm:hidden'>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className='icon-hover' alt={`icon-${id}`} />
            </li>
          ))}
        </ul>
        <time dateTime="">{dayjs().format('ddd MMM D h:mm A')}</time>
      </div>
    </nav>
  )
}

export default Navbar
