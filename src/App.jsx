import React from 'react'
import './App.css'
import Hero from './components/Hero'
import DateReveal from './components/DateReveal'
import Gallery from './components/Gallery'
import EventDetails from './components/EventDetails'
import RSVP from './components/RSVP'
import Petals from './components/Petals'

function App() {
  return (
    <div className="App">
      <Petals />
      <Hero />
      <DateReveal />
      <Gallery />
      <EventDetails />
      <RSVP />
    </div>
  )
}

export default App