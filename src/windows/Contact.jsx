import { WindowControls } from '#components'
import { socials } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import React from 'react'

const Contact = () => {
  return (
    <>
        <div id="window-header">
            <WindowControls target="contact"/>
            <h2>Contact Me</h2>
        </div>

        <div className="p-5 space-y-5">
            <img src="/images/adrian.jpg" alt="Yash" className='w-20 rounded-full'/>

            <h3>Let's Connect</h3>
            <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
            <p>mvmoraiyashraj@gmail.com</p>

            <ul>
                {socials.map(({id, bg, link, icon, text}) => (
                    <li key={id} style = {{background: bg}}>
                        <a href={link} target="_blank" rel="noreferrer noopener" title={text}>
                            <img src={icon} alt={text} className='size-5'/>
                            <p>{text}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </>
  )
}

const ContactWindow = WindowWrapper(Contact, 'contact')

export default ContactWindow
