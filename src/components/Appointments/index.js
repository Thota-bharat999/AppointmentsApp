import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    isLike: false,
  }

  addAppointment = event => {
    const {title, date} = this.state
    event.preventDefault()

    const formatDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''

    const newAppointment = {
      id: uuidv4(),
      title,
      date: formatDate,
      isTrue: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onTitleAppointment = event => {
    this.setState({title: event.target.value})
  }

  dateAppiontment = event => {
    this.setState({date: event.target.value})
  }

  getTogglebutton = id => {
    // const {appointmentList} = this.state
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isTrue: !each.isTrue}
        }
        return each
      }),
    }))
  }

  onClickStarred = () => {
    this.setState(prevState => ({isLike: !prevState.isLike}))
  }

  getStarrtedList = () => {
    const {appointmentList, isLike} = this.state

    if (isLike) {
      return appointmentList.filter(each => each.isTrue === true)
    }
    return appointmentList
  }

  render() {
    const {title, date, isLike} = this.state

    const filterList = this.getStarrtedList()
    //const starrtedText = isLike ? 'Starrted' : 'Star'
    console.log(filterList)
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="img-container">
            <form className="form-details" onSubmit={this.addAppointment}>
              <h1 className="card-heading">Add Appointment</h1>
              <label className="form-title" htmlFor="input">
                Title
              </label>
              <input
                id="input"
                type="text"
                className="input-title"
                placeholder="Title"
                onChange={this.onTitleAppointment}
                value={title}
              />
              <label htmlFor="form-title" className="form-title">
                Date
              </label>
              <input
                type="date"
                id="form-title"
                className="input-title"
                placeholder="DATE"
                onChange={this.dateAppiontment}
                value={date}
              />
              <div>
                <button type="submit">Add</button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img"
            />
          </div>
          <hr className="line" />
          <div className="down-container">
            <h1 className="down-heading">Appointments</h1>
            <button
              type="button"
              className="starred-button"
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>
          <ul>
            {filterList.map(each => (
              <AppointmentItem
                appointmentDetails={each}
                key={each.id}
                getTogglebutton={this.getTogglebutton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
