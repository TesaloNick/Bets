import React, { useEffect, useState, useContext } from 'react'
import './style.scss'
import BetsData from '../../context'
import GameHomePage from '../../components/GameHomePage'
import DATA_GAMES from '../../constants/data'

export default function HomePage() {
  const [todayGame, setTodayGame] = useState([])
  const [tomorrowGame, setTomorrowGame] = useState([])
  const data = useContext(BetsData)

  useEffect(() => {
    setTodayGame(DATA_GAMES.games.filter(item => item.date === 'today'))
    setTomorrowGame(DATA_GAMES.games.filter(item => item.date === 'tomorrow'))
  }, [])

  return (
    <section className='home-page'>
      {data.confirmedBet.state &&
        <h1 className='home-page__notification'>
          {`Спасибо. Ваша ставка на матч 
          ${data.confirmedBet.gameInfo.home_team}
           - 
          ${data.confirmedBet.gameInfo.guest_team}
          ${data.confirmedBet.bet.value}
           с коэффициентом 
          ${data.confirmedBet.bet.coefficient}
           принята`}
        </h1>
      }
      <GameHomePage games={todayGame} date={0} />
      <GameHomePage games={tomorrowGame} date={1} />
    </section >
  )
}
