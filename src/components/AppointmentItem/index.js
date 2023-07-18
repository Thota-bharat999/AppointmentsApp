import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, getTogglebutton} = props
  const {id, title, date, isTrue} = appointmentDetails

  const onStartedButton = () => {
    getTogglebutton(id)
  }

  const starImage = isTrue
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li>
      <div className="item-container">
        <p className="app-heading">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={onStartedButton}
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p className="app-date">{date}</p>
    </li>
  )
}

export default AppointmentItem
