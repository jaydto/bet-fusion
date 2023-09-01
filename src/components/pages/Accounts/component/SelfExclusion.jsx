import React, {useEffect, useState} from 'react';
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import makeRequest from "../../../utils/fetch-request";
import {getFromLocalStorage} from "../../../utils/local-storage";
import {useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import ExclusionModal from "../../../modals/ExclusionModal";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
const SelfExclusion = () => {
    const navigate=useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiResponseMessage, setApiResponseMessage] = useState(null);
    const [apiResponseTime, setApiResponseTime] = useState(null);
    const userData=useSelector((state)=>state.data.user)
    const [user, setUser]=useState(getFromLocalStorage("user"))

    useEffect(()=>{
        if(userData){
            setUser(userData||getFromLocalStorage("user"))
        }
    }, userData)

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
        // Perform API call with dateRange.startDate , dateRange.endDate and reason_for_self_exclusion  as the data
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
            }),
            reason_for_self_exclusion: formik.values.reason_for_self_exclusion,

        }

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
    // Calculate today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Custom presets - only show "Today" preset
    const customPresets = {
        'Today': {
            startDate: today,
            endDate: today,
            key: 'today',
        },
    };

    // Calculate the date 6 years from today
    const maxDate = new Date(today);
    maxDate.setFullYear(maxDate.getFullYear() + 6);

    useEffect(() => {
        const hideLabels = () => {
            // Find all elements with the class '.rdrStaticRangeLabel' and text content 'Yesterday'
            const elements = document.querySelectorAll('.rdrStaticRangeLabel[tabindex="-1"]');
            elements.forEach((element) => {
                if (element.textContent === 'Yesterday') {
                    element.style.display = 'none'; // Hide the element
                }
                if(element.textContent==='Last Month'){
                    element.style.display = 'none'; // Hide the element
                }
                if(element.textContent==='Last Week'){
                    element.style.display = 'none'; // Hide the element
                }
            });
        };

        hideLabels(); // Initially hide the labels

        // Optionally, you can call hideLabels() on certain events, such as user interactions or state changes.
        // For example, you can call hideLabels() in response to a button click or any other user action.

        // Clean up: remove the event listener on component unmount if necessary
        return () => {
            // Remove any event listeners or other cleanup tasks as needed
        };
    }, []);


    // Create the Formik form with the text input for reason
    const formik = useFormik({
        initialValues: {
            reason_for_self_exclusion: '',
        },
        validationSchema: Yup.object().shape({
            reason_for_self_exclusion: Yup.string().required('Reason is required'),
        }),
        onSubmit: handleUpdate, // Submit the form on button click
    });


    return (
        <div>
            <h2 className={'text-light w-100 py-1 px-2 self-exclusion_form'}>Select a Date Range:</h2>
            <DateRangePicker
                ranges={[dateRange]}
                onChange={handleDateRangeChange}
                months={2}
                direction="horizontal"
                className="date-range-picker-exclusion w-100 d-flex justify-content-center"
                minDate={today}
                maxDate={maxDate} // Set the maximum date to 6 years from today
                presets={customPresets} // Use custom presets
                showSelectionPreview={true}
            />
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group self-exclusion_form">
                    <label htmlFor="reason_for_self_exclusion">Reason for Self Exclusion:</label>
                    <textarea
                        type="text"
                        id="reason_for_self_exclusion"
                        name="reason_for_self_exclusion"
                        className="form-control"
                        placeholder={'Reason for self Exclusion'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.reason_for_self_exclusion}
                    />
                    {formik.touched.reason_for_self_exclusion && formik.errors.reason_for_self_exclusion ? (
                        <div className="error-message">{formik.errors.reason_for_self_exclusion}</div>
                    ) : null}
                </div>
                <div className={'update_self_exclusion'}>
                <button type="submit" className="update_button">
                    {loading && <div className="custom-loader"></div>}
                    Self Exclude
                </button>
                </div>
            </form>
            {/*<div className={'update_self_exclusion'}>*/}
            {/*    <button className={'update_button'} onClick={handleUpdate}> {loading && <div className="custom-loader"></div>}Self Exclude</button>*/}
            {/*</div>*/}

            {/* Render the ExclusionModal based on the showModal state */}
            {showModal && (
                <ExclusionModal visible={true} setShowLoadingModal={setShowModal} message={apiResponseMessage} timeDuration={apiResponseTime}/>
            )}
        </div>
    );
};

export default SelfExclusion;
