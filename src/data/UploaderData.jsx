import Button from "../ui/Button.jsx";
import {uploadAll, uploadBookings} from "./Uploader.js";

function UploaderData() {

    return (
        <div style={{
            marginTop: 'auto',
            backgroundColor: '#e0e7ff',
            padding: '8px',
            borderRadius: '5px',
            textAlign: 'center'}}
        >
            <h3>DEV AREA</h3>

            <Button onClick={uploadAll} >Upload ALL sample data</Button>

            <hr />

            <Button onClick={uploadBookings}>Upload CURRENT bookings</Button>
        </div>
    );
}

export default UploaderData;