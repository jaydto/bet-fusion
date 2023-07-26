import React, {useState} from 'react';
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import makeRequest from "../../../utils/fetch-request";
import {getFromLocalStorage} from "../../../utils/local-storage";
import {useNavigate} from "react-router-dom";
import ExclusionModal from "../../../modals/ExclusionModal";
const SelfExclusion = () => {
    const [user,] = useState(getFromLocalStorage("user"));
    const navigate=useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiResponseMessage, setApiResponseMessage] = useState(null);
    const [apiResponseTime, setApiResponseTime] = useState(null);

    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleDateRangeChange = (ranges) => {
        setDateRange(ranges.selection);
    };

    const handleUpdate = async () => {
        setLoading(true)
        console.log("date range", dateRange)
        // Perform API call with dateRange.startDate and dateRange.endDate as the data
        const data = {
            start_date: dateRange.startDate.toLocaleDateString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }),
            end_date: dateRange.endDate.toLocaleDateString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
        }
        console.log("dateRange", data)

        if(user){
            let endpoint = "/v1/self-exclude"
            const [self_exclusion_results] = await Promise.all([
                makeRequest({url: endpoint, method: "POST", data: data})
            ]);
            let [status, exclusion] = self_exclusion_results;
            if (status === 200) {
                setApiResponseMessage(exclusion?.success);
                setApiResponseTime(exclusion?.time_duration);
                setShowModal(true);
                setLoading(false)
            }
        }else{
            navigate('/login')
        }
    }

    return (
        <div>
            <h2 className={'text-light w-100 py-1 px-2'}>Select a Date Range:</h2>
            <DateRangePicker
                ranges={[dateRange]}
                onChange={handleDateRangeChange}
                months={2}
                direction="horizontal"
                className="date-range-picker-exclusion"
            />
            <div className={'update_self_exclusion'}>
                <button className={'update_button'} onClick={handleUpdate}> {loading && <div className="custom-loader"></div>}Self Exclude</button>
            </div>

            {/* Render the ExclusionModal based on the showModal state */}
            {showModal && (
                <ExclusionModal visible={true} setShowLoadingModal={setShowModal} message={apiResponseMessage} timeDuration={apiResponseTime}/>
            )}
        </div>
    );
};

export default SelfExclusion;
