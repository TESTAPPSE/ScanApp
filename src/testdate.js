import React from 'react';

const WeekCounter = (dt) => {
  const startDate = new Date('2023.02.01');
  const endDate = new Date(new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear());

  const getWeeksBetweenDates = (start, end) => {
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

    const diffInTime = Math.abs(end - start);
    const diffInWeeks = Math.floor(diffInTime / oneWeek);

    return diffInWeeks;
  };

  const numberOfWeeks = getWeeksBetweenDates(startDate, endDate);

  return (
    <div>
      <p>Number of weeks between the dates: {new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear()}</p>


      {numberOfWeeks}
    </div>
  );
};

export default WeekCounter;
