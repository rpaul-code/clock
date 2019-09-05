import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import CountdownTimeComponent from './CountdownTimeComponent';

class CountDownComponent extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
       date: moment(),
       dateDiff: {
         days: -1,
         hours: 0,
         minutes: 0,
         seconds: 0
       },
       eventName: '',
       showEventNameInput: true,
       clockTimeFormat: 'clockreal'
     };
     this.secondsDurationMeasurements = {
         daysInSeonds:  60*60*24,
         hoursInSeconds: 60*60,
         minutesInSeconds: 60,
     };
     this.setFutureDate = this.setFutureDate.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.toggleEventNameLabel = this.toggleEventNameLabel.bind(this);
     this.toggleEventNameInputLabel = this.toggleEventNameInputLabel.bind(this);
  }

  setFutureDate(date) {
    this.setState({ date, showEventNameInput: true });
    this.getDateDiffData(date);
  }

  getDateDiffData(date) {
    this.futureDate = date.startOf('days');
    this.setCountdownValues();
    this.startCountDown();
  }

  startCountDown() {
    this.intervalId = setInterval(() => {
      this.setCountdownValues();
    }, 1000)
  }

  setCountdownValues() {
    const currentDate = moment();

    const totalSecondsDiff = this.futureDate.diff(currentDate, 'seconds');

    const daysDifference = Math.round(totalSecondsDiff / this.secondsDurationMeasurements.daysInSeonds);
    const secondsRemainingAfterDaysAccountedFor = totalSecondsDiff % this.secondsDurationMeasurements.daysInSeonds;
    const hoursDifference = Math.round(secondsRemainingAfterDaysAccountedFor / this.secondsDurationMeasurements.hoursInSeconds);
    const secondsRemainingAfterHoursAccountedFor = secondsRemainingAfterDaysAccountedFor % this.secondsDurationMeasurements.hoursInSeconds;
    const minutesDifference = Math.round(secondsRemainingAfterHoursAccountedFor / this.secondsDurationMeasurements.minutesInSeconds);
    const secondsRemainingAfterMinutesAccountedFor = Math.round((secondsRemainingAfterHoursAccountedFor + 30) % this.secondsDurationMeasurements.minutesInSeconds);

    const dateDiff = {
      days: daysDifference,
      hours: hoursDifference,
      minutes: minutesDifference,
      seconds: secondsRemainingAfterMinutesAccountedFor
    };
    this.setState({ dateDiff });
  }

  handleChange({ target }) {
      const { name, value } = target;
      this.setState({
          [ name ]: value
      });
  }

  toggleEventNameLabel() {
      this.setState((state) => {
          return { showEventNameInput: !state.showEventNameInput };
      });
  }

  toggleEventNameInputLabel(isEventNameInput) {
    return () => {
        this.setState({
             showEventNameInput: isEventNameInput
         });
    }
  }

  handleSelectTimeFormatChange(event) {

  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { days, hours, minutes, seconds } = this.state.dateDiff;
    const showEventNameInput = this.state.showEventNameInput;
    const clockTimeFormat  = this.state.clockTimeFormat;
    const hasDays = days >= 0;
    const clockReal = <div className="countdown-component__time-components">
                        <CountdownTimeComponent measurement={days} timeMetric='days' additionalClassName='countdown-component__container-left'/>
                        <CountdownTimeComponent measurement={hours} timeMetric='hours'/>
                        <CountdownTimeComponent measurement={minutes} timeMetric='minutes'/>
                        <CountdownTimeComponent measurement={seconds} timeMetric='seconds' additionalClassName='countdown-component__container-right'/>
                      </div>;
    const clockText = <div> {days} days, {hours} hours, {minutes} minutes, {seconds} seconds </div>;
    let clockRenderer;
    if (clockTimeFormat === 'clocktext') {
        clockRenderer = clockText;
    } else {
        clockRenderer = clockReal;
    }
    return (
      <div className='countdown-clock--container'>
        <div className='countdown-clock--component'>
            <h2>Please select future date and enter event name (ie. holiday) for clock to count down to : </h2>
        </div>
        <div>
            <SingleDatePicker
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={this.setFutureDate}
              focused={this.state.focused}
              onFocusChange={({ focused }) => this.setState({ focused })}
              id="future_date_picker"
            />
        </div>
        { hasDays &&
          <div>
              { showEventNameInput && <input type='text' name='eventName' value={this.state.eventName} onChange={this.handleChange} onBlur={this.toggleEventNameInputLabel(false)} placeHolder='Enter event name' className='countdown-component__event-name' /> }
              { !showEventNameInput && <label className='countdown-component__event-name' onClick={this.toggleEventNameInputLabel(true)} >{this.state.eventName}</label> }
              <div>
              <label>
                 Please select clock count down time format :
                 <select name='clockTimeFormat' value={clockTimeFormat} onChange={this.handleChange}>
                   <option value="clockreal">Clock Real</option>
                   <option value="clocktext">Clock text</option>
                 </select>
               </label>
              </div>
              {clockRenderer}
          </div>
        }
      </div>
    );
  }

}

export default CountDownComponent;
