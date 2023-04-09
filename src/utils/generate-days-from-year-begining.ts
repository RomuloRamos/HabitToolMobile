import dayjs from "dayjs";


export function generateDaysFromYearBegining(){
    const firstDayOfTheYear = dayjs().startOf('year');
    const today = new Date();

    const dates = [];
    let compareDate = firstDayOfTheYear;

    while(compareDate.isBefore(today))//From first day of the year until today
    {
        dates.push(compareDate.toDate()); //add the day in the array
        compareDate = compareDate.add(1, 'day'); //increment to the next day
    }

    return dates; //Return the Days Array
} 