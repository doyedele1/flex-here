import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default function DateRangePicker() {
    return (
        <div className="date-range-picker-container">
            <div>
                <label>From: </label>
                <DayPickerInput />
            </div>
            <div>
                <label>To: </label>
                <DayPickerInput />
            </div>

            <style jsx>
                {`
                    .date-range-picker-container div {
                        display: grid;
                        grid-template-columns: 30% 70%;
                        padding: 10px;
                    }
                    label {
                        padding-top: 10px;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .DayPickerInput input {
                        width: 120px;
                        padding: 10px;
                        font-size: 16px;
                    }
                `}
            </style>
        </div>
    )
}