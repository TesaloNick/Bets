import React, { useEffect, useState } from 'react'
import './style.scss'
import GameHomePage from '../../components/GameHomePage'
import DATA_GAMES from '../../constants/data'

export default function HomePage() {
  const [todayGame, setTodayGame] = useState([])
  const [tomorrowGame, setTomorrowGame] = useState([])

  useEffect(() => {
    setTodayGame(DATA_GAMES.games.filter(item => item.date === 'today'))
    setTomorrowGame(DATA_GAMES.games.filter(item => item.date === 'tomorrow'))
  }, [])

  return (
    <section className='main'>
      <GameHomePage games={todayGame} date={0} />
      <GameHomePage games={tomorrowGame} date={1} />
    </section >
  )
}
