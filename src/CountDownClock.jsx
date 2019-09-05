import React from 'react';

import CountDownComponent from './CountDownComponent';

class CountDownClock extends React.Component {

   constructor(props) {
      super(props);
   }

    render() {
      return (
        <div className='countdown-clock--container'>
          <div className='countdown-clock--component'>
            <CountDownComponent/>
          </div>
        </div>
      );
    }

}

export default CountDownClock;
