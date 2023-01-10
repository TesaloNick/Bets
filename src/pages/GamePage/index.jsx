import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import { useNavigate, useParams, Link } from 'react-router-dom'
import DATA_GAMES from '../../constants/data';
import Spinner from '../Spinner/Spinner'
import BetsData from '../../context';
import back from '../../assets/images/back.png'

export default function GamePage() {
  const [gameInfo, setGameInfo] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [radioButtons, setRadioButtons] = useState(false)
  const data = useContext(BetsData)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const searchedInfo = DATA_GAMES.games.find(item => item.id === +id)
    setGameInfo(searchedInfo)
    setRadioButtons([
      {
        id: 1,
        value: 'Победа 1',
        coefficient: searchedInfo.coefficients.home_team_win.toFixed(2),
        checked: false,
      },
      {
        id: 2,
        value: 'Ничья',
        coefficient: searchedInfo.coefficients.draw.toFixed(2),
        checked: false,
      },
      {
        id: 3,
        value: 'Победа 2',
        coefficient: searchedInfo.coefficients.guest_team_win.toFixed(2),
        checked: false,
      },
    ])
  }, [])

  const changeChecked = (event) => {
    const newRadioButtons = radioButtons.map(item => {
      return item.value === event.target.value ? { ...item, checked: true } : { ...item, checked: false }
    })
    setRadioButtons(newRadioButtons)
    setButtonDisabled(false)
  }

  const submitForm = (event) => {
    event.preventDefault()
    data.setConfirmedBet({
      state: true,
      gameInfo: gameInfo,
      bet: radioButtons.find(item => item.checked),
    })
    navigate('/')
  }

  if (!gameInfo) {
    return <Spinner />
  }

  return (
    <section className='game-page'>
      <div className="game-page__head">
        <Link to='/' className="game-page__head_back" onClick={() => data.setConfirmedBet({ state: false })}>
          <img src={back} alt="" />
        </Link>
        <p className="game-page__head_date">{gameInfo.date === 'today' ?
          `${+new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}` :
          `${+new Date().getDate() + 1}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
        }</p>
      </div>
      <div className="game-page__information">
        <div className="game-page__team">{gameInfo.home_team}</div>
        <div className="game-page__score">
          {gameInfo.score.home_team_goals === 0 ?
            0 :
            gameInfo.score.home_team_goals || '-'
          }:{gameInfo.score.guest_team_goals === 0 ?
            0 :
            gameInfo.score.guest_team_goals || '-'
          }
        </div>
        <div className="game-page__team">{gameInfo.guest_team}</div>
      </div>
      {gameInfo.done && <div className="game-page__done">Игра завершилась. Невозможно сделать ставку</div>}
      <form action='' className="game-page__form" onSubmit={(e) => submitForm(e)}>
        <div className="game-page__form_inputs">
          {radioButtons.map(item => (
            <label key={item.id}>
              {item.value}
              <span>{item.coefficient}</span>
              <input
                type="radio"
                name="bets"
                value={item.value}
                checked={item.checked}
                tabindex={item.id}
                onChange={(e) => changeChecked(e)}
                disabled={gameInfo.done ? true : false}
              ></input>
            </label>
          ))}
        </div>
        <button className="game-page__form_button" disabled={buttonDisabled}>Сделать ставку</button>
      </form>
    </section>
  )
}
