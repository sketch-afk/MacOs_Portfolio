import React from 'react'
import { Navbar, Welcome, Dock } from '#components'
import { Terminal } from '#windows'


import { Draggable } from 'gsap/draggable'
import { gsap } from 'gsap'
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome/>
      <Dock/>

      <Terminal/>
    </main>
  
  )
}

export default App
