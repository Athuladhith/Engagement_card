import React from 'react'
import './App.css'
import Hero from './components/Hero'
import DateReveal from './components/DateReveal'
import LoveStory from './components/LoveStory'
import RSVP from './components/RSVP'
import Petals from './components/Petals'

function App() {
  return (
    <div className="App">
      <Petals />
      <Hero />
      <DateReveal />
      <LoveStory />
      <RSVP />
    </div>
  )
}

export default App