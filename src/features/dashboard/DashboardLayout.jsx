import styled from 'styled-components';
import {useCabins} from "../cabins/useCabins.js";
import Spinner from "../../ui/Spinner.jsx";
import Stats from "./Stats.jsx";
import {useRecentStays} from "./useRecentStays.js";
import {useRecentBookings} from "./useRecentBookings.js";
import SalesChart from "./SalesChart.jsx";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const {isLoading: isLoading1, bookings, numDays} = useRecentBookings();
    const {isLoading: isLoading2, confirmedStays} = useRecentStays();
    const {isLoading: isLoading3, cabins} = useCabins();

    if (isLoading1 || isLoading2 || isLoading3) return <Spinner/>;

    return (
        <StyledDashboardLayout>
            <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}/>

            {/*<TodayActivity/>*/}

            {/*<DurationChart confirmedStays={confirmedStays}/>*/}

            <SalesChart bookings={bookings} numDays={numDays}/>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
