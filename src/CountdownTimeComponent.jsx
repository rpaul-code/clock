import React from 'react';

const CountdownTimeComponent = ( { measurement, timeMetric, additionalClassName='' } ) => {
    const containerClassName = `countdown-component__container ${additionalClassName}`;
    return (
        <div className={containerClassName} >
            <div className='countdown-component__measurement' >{measurement}</div>
            <div className='countdown-component__time-metric'>{timeMetric}</div>
        </div>
    );
}

export default CountdownTimeComponent;
