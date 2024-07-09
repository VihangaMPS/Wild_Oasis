import {HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineBanknotes, HiOutlineChartBar,} from 'react-icons/hi2';

import Stat from './Stat';
import {formatCurrency} from "../../utils/helpers.js";

function Stats({bookings, confirmedStays, numDays, cabinCount}) {
    // Stat 1) How much Bookings
    const numBookings = bookings.length;

    // Stat 2) Total Sales
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

    // Stat 3) Confirm Stays
    const checkins = confirmedStays.length;

    // Stat 4) Occupancy Rate
    // We can have a total of 'numDays * cabinCount' days to occupy,from how many days were actually booked.
    // we can compute the percentage
    const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

    return (
        <>
            <Stat icon={<HiOutlineBriefcase/>} title='Bookings' value={numBookings} color='blue'/>

            <Stat icon={<HiOutlineBanknotes/>} title='Sales' value={formatCurrency(sales)} color='green'/>

            <Stat icon={<HiOutlineCalendarDays/>} title='Check ins' value={checkins} color='indigo'/>

            <Stat icon={<HiOutlineChartBar/>} title='Occupancy rate' value={Math.round(occupation * 100) + '%'} color='yellow'/>
        </>
    );
}

export default Stats;
