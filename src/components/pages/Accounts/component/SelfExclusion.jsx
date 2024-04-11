import React, {useEffect, useState} from 'react';
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {getFromLocalStorage} from "../../../utils/local-storage";
import {useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import ExclusionModal from "../../../modals/ExclusionModal";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {resetState, userSelfExclusion} from "../../../../redux/dataSlice";
import { Dropdown, DropdownButton } from 'react-bootstrap';
// import "../assets/css/bottomSheet.css"

const SelfExclusion = () => {
    const navigate=useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const userData=useSelector((state)=>state.auth.user)
    const show_modal=useSelector((state)=>state.data.show_modal)
    const exclusion_time=useSelector((state)=>state.data.self_exclsuion_time)
    const exclusion_message=useSelector((state)=>state.data.self_exclsuion_message)
    const dispatchRedux=useDispatch()
    const [user, setUser]=useState(getFromLocalStorage("user"))
    const [selectedReason, setSelectedReason] = useState(null);


    const handleReasonSelect = (reason) => {
        setSelectedReason(reason);
        formik.setFieldValue('reason_for_self_exclusion', reason.title);
    };

    useEffect(()=>{
        if(userData){
            setUser(userData||getFromLocalStorage("user"))
        }
    }, [userData])

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
            dispatchRedux(userSelfExclusion(data))

        }else{
            navigate('/login')
        }
    }
    useEffect(() => {
        const abort=new AbortController()
        return()=>{
            dispatchRedux(resetState("show_modal"))
            dispatchRedux(resetState("self_exclsuion_message"))
            dispatchRedux(resetState("self_exclsuion_time"))
            abort.abort()
        }
    }, []);
    // Calculate today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Custom presets - only show "Today" preset
    const customPresets = {
        '3 months': {
            startDate: today, // Set the start date to today
            endDate: new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()), // Set the end date to 3 months from today
            key: '3months',
        },
        '6 months': {
            startDate: today, // Set the start date to today
            endDate: new Date(today.getFullYear(), today.getMonth() + 6, today.getDate()), // Set the end date to 6 months from today
            key: '6months',
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
                if (element.textContent === 'Today') {
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

    let reasons_for_self_exclusion = [
        {"title": "Problem Gambling", "type": "Addiction", id:1},
        {"title": "Financial Concerns", "type": "Financial", id:2},
        {"title": "Emotional Distress", "type": "Mental Health", id:3},
        {"title": "Relationship Strain", "type": "Interpersonal", id:4},
        {"title": "Legal Issues", "type": "Legal", id:5},
        {"title": "Employment or Education", "type": "Professional/Academic", id:6},
        {"title": "Personal Integrity", "type": "Ethical", id:7},
        {"title": "Seeking Help", "type": "Treatment", id:8},
        {"title": "Protecting Assets", "type": "Financial", id:9},
        {"title": "Regaining Control", "type": "Personal Growth", id:10}
    ]
    const dropdownTitle = selectedReason ? selectedReason.title : 'Select Reason';


    return (
        <div>
            <h2 className={'text-light w-100 py-1 px-2 self-exclusion_form'}>Select Duration of Self Exclusion </h2>
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
                <div className="form-group self-exclusion_form mb-3">
                    <label htmlFor="reason_for_self_exclusion">Reason for Self Exclusion:</label>
                    
                    <DropdownButton id="reason-dropdown" title={dropdownTitle}>
                            {reasons_for_self_exclusion.map((reason) => (
                    <Dropdown.Item key={reason.id} id="reason-dropdown-data" onClick={() => handleReasonSelect(reason)}>
                        {reason.title}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
                    {formik.touched.reason_for_self_exclusion && formik.errors.reason_for_self_exclusion ? (
                        <div className="error-message">{formik.errors.reason_for_self_exclusion}</div>
                    ) : null}
                </div>
                <div className={'update_self_exclusion'}>
                <button type="submit" className="update_button" disabled={loading} style={{width:"85%"}}>
                    {loading && <div className="loader"></div>}
                    Self Exclude
                </button>
                </div>
            </form>
            {/*<div className={'update_self_exclusion'}>*/}
            {/*    <button className={'update_button'} onClick={handleUpdate}> {loading && <div className="custom-loader"></div>}Self Exclude</button>*/}
            {/*</div>*/}

            {/* Render the ExclusionModal based on the showModal state */}
            {showModal && (
                <ExclusionModal visible={true} setShowLoadingModal={show_modal} message={exclusion_message} timeDuration={exclusion_time}/>
            )}
        </div>
    );
};

export default SelfExclusion;
