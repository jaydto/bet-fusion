import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {getFromLocalStorage} from "./local-storage";
import {useDispatch} from "react-redux";
import {setState} from "../../redux/nareLeague";

const LinkOption = React.memo(
    (props) => {
        const {to, pathname, children, ...rest} = props;


        return (
            <option value={`/nare-league?${to}`} {...rest} >
                {children}
            </option>
        );

    })


const LinkSelect = React.memo(
    (props) => {
        const {options, ...rest} = props;
        const navigate = useNavigate();
        const dispatchRedux = useDispatch();

        const [pathname, setPathname] = useState(() => {
            const searchParams = new URLSearchParams(window.location.search);
            const hasSubTypeId = searchParams.has('sub_type_id');
            const subTypeId = getFromLocalStorage('kiron_search_data')?.sub_type_id || '3';
            const initialPathname = `sub_type_id=${subTypeId}`;

            if (hasSubTypeId) {
                return window.location.search;
            } else {
                return initialPathname;
            }
        });

        const location = useLocation();

        useEffect(() => {
            const searchParams = new URLSearchParams(location.search);
            const hasSubTypeId = searchParams.has('sub_type_id');
            const subTypeId = getFromLocalStorage('kiron_search_data')?.sub_type_id || '3';
            const updatedPathname = hasSubTypeId ? location.search : `sub_type_id=${subTypeId}`;
            setPathname(updatedPathname);
        }, [location.search]);

        // Function to extract the value of "sub_type_id" from the URL
        function getSubTypeIdFromURL(url) {
            const params = new URLSearchParams(url.split('?')[1]);
            return params.get('sub_type_id');
        }

        // handleSelectChange function
        const handleSelectChange = (event) => {
            const selectedValue = event.target.value;
            // Call the function to get the value of "sub_type_id"
            const subTypeId = getSubTypeIdFromURL(selectedValue);
            dispatchRedux(setState('active_market', subTypeId))
            // console.log("selected_value", subTypeId)
            navigate(selectedValue);
        };

        const showOptions = () => {
            const matchingOption = options.find(option => option.to === pathname.split('?')[1]);

            const matchingOptionLabel = matchingOption ? matchingOption : {
                "to": "Select Market",
                "label": "More Markets"
            };

            const otherOptions = options.filter(option => option.to !== pathname.split('?')[1]);

            const optionLabels = [matchingOptionLabel, ...otherOptions.map(option => ({
                to: option.to,
                label: option.label
            }))];

            return optionLabels.map((option, index) => (
                <LinkOption key={index} to={`${option.to}`} pathname={pathname} className={`btn more-market-button `} >
                    {option.label}
                </LinkOption>
            ));
        };


        return (
            <Form.Select
                {...rest}
                value={`/nare-league=${pathname ? pathname : 'Select Market'}`}
                className={`btn ${options.filter((option) => {
                        return option.to === pathname.split('?')[1]
                    }
                ).length > 0 && ' opt-color'} more-market-button px-4`}
                onChange={handleSelectChange}
                style={{fontSize: '12px'}}
                id={'more_markets_selection_kiron'}
            >
                {showOptions()}
            </Form.Select>
        );
    })

export default LinkSelect;


