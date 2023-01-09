import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

export default function GameHomePage({ games, date }) {
  return (
    <ul className='games'>
      <h1 className='games__title'>
        {date ? 'Завтра: ' : 'Сегодня: '}
        {`${+new Date().getDate() + date}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}
      </h1>
      {games.map(item => (
        <li key={item.id}>
          <Link to={'/game/' + item.id} className='game'>
            <div className='game__time'>{item.time}</div>
            <div className='game__team'>
              <p className='game__team_name'>{item.home_team}</p>
              <p className='game__team_goals'>{item.score.home_team_goals === 0 ?
                0 :
                item.score.home_team_goals || '-'
              }</p>
            </div>
            <div className='game__colon'>:</div>
            <div className='game__team'>
              <p className='game__team_name'>{item.guest_team}</p>
              <p className='game__team_goals'>{item.score.guest_team_goals === 0 ?
                0 :
                item.score.guest_team_goals || '-'
              }</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
