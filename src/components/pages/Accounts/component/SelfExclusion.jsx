import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { getFromLocalStorage, removeItem } from "../../../utils/local-storage";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetState, userSelfExclusion } from "../../../../redux/dataSlice";
import "../../../../assets/css/bottomSheet.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { setState } from "../../../../redux/dataSlice";
import { notification } from "antd";
import Notify from "../../../utils/Notify";

// import { Dropdown, DropdownButton } from 'react-bootstrap';

const SelfExclusion = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.user);
  // const exclusion_time=useSelector((state)=>state.data.self_exclsuion_time)
  // const exclusion_message=useSelector((state)=>state.data.self_exclsuion_message)
  const dispatchRedux = useDispatch();
  const [user, setUser] = useState(getFromLocalStorage("user"));
//   const [selectedReason, setSelectedReason] = useState(8);
  const bottomSheetRef = useRef();
  const bottom_sheet = useSelector((state) => state.data.show_exclusion_modal);
  // const games = virtualGameChoiceOptions();

  const handleConfirmation = () => {
    dispatchRedux(setState("show_exclusion_modal", false)); // Hide the confirmation bottom sheet
    handleUpdate(); // Call the handleUpdate function to submit the form
  };

  const handleShowModal = () => {
    dispatchRedux(setState("show_exclusion_modal", true)); // Hide the confirmation bottom sheet
    
  };
  const navigate2 = async () => {
    await removeItem("user"); 
  };

  // const handleReasonSelect = (reason) => {
  //     setSelectedReason(reason);
  //     formik.setFieldValue('reason_for_self_exclusion', reason.title);
  // };

  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleDateRangeChange = (ranges) => {
    const elements = document.querySelectorAll(
        '.rdrStaticRangeLabel[tabindex="-1"]'
      );

      elements.forEach((element) => {
        
        if (element.textContent === "6 months") {
                const startDate = new Date();
                    // Set end date to 6 months from today
                    const endDate = new Date(
                        startDate.getFullYear(),
                        startDate.getMonth() + 6,
                        startDate.getDate()
                    );
                    // Set key
                    const key = "selection";
                    setDateRange({ startDate, endDate, key });

                  

        //   element.style.display = "none"; // Hide the element
        }
        if (element.textContent === "3 months") {
                
                const startDate = new Date();
                // Set end date to 3 months from today
                const endDate = new Date(
                    startDate.getFullYear(),
                    startDate.getMonth() + 3,
                    startDate.getDate()
                );

                // Set key
                const key = "selection";
                            setDateRange({ startDate, endDate, key });

               

        }
        else{
            setDateRange(ranges.selection);
        }
      });
   
  };

  const handleUpdate = async () => {
    setLoading(true);
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
    };


    if(user){
        dispatchRedux(userSelfExclusion(data)).then((response)=>{
            let message='';
            if(userSelfExclusion.fulfilled.match(response)){
                navigate2().then(() => {
                    // notification.success({
                    //   message: "Self Excluded",
                    //   description: response.message
                    // });
                    // message={
                    //     status: 200,
                    //     message: response.payload.success
                    // }

                     notification.success({
                      message: "Self Excluded",
                      description: response.payload.success
                    });
                    //  Delay the redirection to the logout page (e.g., 3 seconds)
                     setTimeout(() => {
                      window.location.href = "/logout";
                    }, 3000);
                  });
            }
            else if(userSelfExclusion.rejected.match(response)){
               
                    // notification.error({
                    //   message: "Error",
                    //   description: response.error.message
                    // });
                    message={
                        status: 200,
                        message: response.errormessage
                    }
                    Notify(message);

                    
            

            }
        })

    }else{
        navigate('/login')
    }
  };
  useEffect(() => {
    const abort = new AbortController();
    return () => {
      dispatchRedux(resetState("show_modal"));
      dispatchRedux(resetState("self_exclsuion_message"));
      dispatchRedux(resetState("self_exclsuion_time"));
      abort.abort();
    };
  }, []);
  // Calculate today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Custom presets - only show "Today" preset
  const customPresets = {
    "3 months": {
      startDate: today, // Set the start date to today
      endDate: new Date(
        today.getFullYear(),
        today.getMonth() + 3,
        today.getDate()
      ), // Set the end date to 3 months from today
      key: "selection",
    },
    "6 months": {
      startDate: today, // Set the start date to today
      endDate: new Date(
        today.getFullYear(),
        today.getMonth() + 6,
        today.getDate()
      ), // Set the end date to 6 months from today
      key: "selection",
    },
  };

  // Calculate the date 6 years from today
  const maxDate = new Date(today);
  maxDate.setFullYear(maxDate.getFullYear() + 6);

  useEffect(() => {
    const hideLabels = () => {
      // Find all elements with the class '.rdrStaticRangeLabel' and text content 'Yesterday'
      const elements = document.querySelectorAll(
        '.rdrStaticRangeLabel[tabindex="-1"]'
      );
      elements.forEach((element) => {
        if (element.textContent === "Yesterday") {
          element.style.display = "none"; // Hide the element
        }
        if (element.textContent === "Today") {
            // element.textContent="3 months"
          element.style.display = "none"; // Hide the element
        }
        if (element.textContent === "Last Month") {
            // element.textContent="6 months"
            // element.onclick = () => {
            //     const startDate = new Date();
            //         // Set end date to 6 months from today
            //         const endDate = new Date(
            //             startDate.getFullYear(),
            //             startDate.getMonth() + 6,
            //             startDate.getDate()
            //         );
            //         // Set key
            //         const key = "selection";
            //         setDateRange({ startDate, endDate, key });

            //         // Handle onClick behavior for '6 months' here
            //         console.log("Clicked on '6 months' element");
            //         console.log("Start Date:", startDate);
            //         console.log("End Date:", endDate);
            //         console.log("Key:", key);
            //     // Handle onClick behavior for 'Last Week' here
            //     console.log("Clicked on '6 months' element");
            // };

          element.style.display = "none"; // Hide the element
        }
        if (element.textContent === "Last Week") {
          element.style.display = "none"; // Hide the element
            // element.textContent="3 months"
            // element.onclick = () => {
                
            //     const startDate = new Date();
            //     // Set end date to 3 months from today
            //     const endDate = new Date(
            //         startDate.getFullYear(),
            //         startDate.getMonth() + 3,
            //         startDate.getDate()
            //     );

            //     // Set key
            //     const key = "selection";
            //     setDateRange({ startDate, endDate, key });

                
            // };

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
      reason_for_self_exclusion: 8,
    },
    validationSchema: Yup.object().shape({
      reason_for_self_exclusion: Yup.string().required("Reason is required"),
    }),
    onSubmit: handleShowModal, // Submit the form on button click
  });

  // let reasons_for_self_exclusion = [
  //     {"title": "Problem Gambling", "type": "Addiction", id:1},
  //     {"title": "Financial Concerns", "type": "Financial", id:2},
  //     {"title": "Emotional Distress", "type": "Mental Health", id:3},
  //     {"title": "Relationship Strain", "type": "Interpersonal", id:4},
  //     {"title": "Legal Issues", "type": "Legal", id:5},
  //     {"title": "Employment or Education", "type": "Professional/Academic", id:6},
  //     {"title": "Personal Integrity", "type": "Ethical", id:7},
  //     {"title": "Seeking Help", "type": "Treatment", id:8},
  //     {"title": "Protecting Assets", "type": "Financial", id:9},
  //     {"title": "Regaining Control", "type": "Personal Growth", id:10}
  // ]
  // const dropdownTitle = selectedReason ? selectedReason.title : 'Select Reason';

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        bottomSheetRef.current &&
        !bottomSheetRef.current.contains(event.target)
      ) {
        dispatchRedux(setState("show_exclusion_modal", false));
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bottomSheetRef, bottom_sheet]);

  const collapseBottomSheet = () => {
    dispatchRedux(setState("show_exclusion_modal", false));
  };

  return (
    <div>
      <h2 className={"text-light w-100 py-1 px-2 self-exclusion_form"}>
        Select Duration of Self Exclusion{" "}
      </h2>
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
          {/* <label htmlFor="reason_for_self_exclusion">Reason for Self Exclusion:</label> */}

          {/* <DropdownButton id="reason-dropdown" title={dropdownTitle}>
                            {reasons_for_self_exclusion.map((reason) => (
                    <Dropdown.Item key={reason.id} id="reason-dropdown-data" onClick={() => handleReasonSelect(reason)}>
                        {reason.title}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
                    {formik.touched.reason_for_self_exclusion && formik.errors.reason_for_self_exclusion ? (
                        <div className="error-message">{formik.errors.reason_for_self_exclusion}</div>
                    ) : null} */}
        </div>
        <div className={"update_self_exclusion"}>
          <button
            type="submit"
            className="update_button"
            disabled={loading}
            style={{ width: "63%" }}
          >
            {loading && <div className="loader"></div>}
            Self Exclude
          </button>
        </div>
      </form>

      <div className={`${bottom_sheet ? "bottom-sheet show " : "d-none"}`}>
        <div className="sheet-overlay"></div>
        <div ref={bottomSheetRef} className="content gap-2">
          <div className="header d-flex justify-content-between">
            <div className="drag-icon">
              <span></span>
            </div>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => {
                collapseBottomSheet();
              }}
              className={"filter-close-icon"}
            />
          </div>
          <h2 className="text-warning"> Are You sure you want to continue?</h2>

          <div className="d-flex flex-column">
            <p className="text-light">
              Self-exclusion will log you out and restrict access to our
              platform. For further assistance or guidance please reach out to
              customer care
            </p>
            <p className="bold text-center text-light"> @ 0701087777</p>
          </div>
          <div className={"d-flex justify-content-center w-100 gap-2"}>
            <strong style={{ color: "var(--orange)" }}>Time</strong>{" "}
            <strong className="text-light d-flex align-items-center">
              :
              {dateRange?.startDate.toLocaleDateString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              <div className="text-secondary"> &nbsp;-&nbsp; </div>
              {dateRange?.endDate.toLocaleDateString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </strong>
          </div>
          <div style={{ position: "relative" }}>
            <div
              className="d-flex justify-content-between align-items-center gap-5 mt-4"
            >
              <Button
                onClick={() => {
                  handleConfirmation();
                }}
                style={{background:'var(--red)'}}
                className={"text-light py-2 bold px-5  btn border-0 "}
              >
                Deactivate
              </Button>

              <Button
                onClick={() => {
                  collapseBottomSheet();
                }}
                className={
                  "text-light bold bg-secondary py-2 px-5  btn border-0 "
                }
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfExclusion;
