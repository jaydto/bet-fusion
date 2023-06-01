import React, {useState, useEffect, useContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {getFromLocalStorage} from "./local-storage";
import {Context} from "../../context/store";

export function LinkOption(props) {
    const {to,pathname, children, ...rest} = props;



    return (
        <option value={`/nare-league?${to}`} {...rest} >
            {children}
        </option>
    );

}

function LinkSelect(props) {
    const { options, ...rest } = props;
    const navigate = useNavigate();
    const [state, dispatch] = useContext(Context);


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



    const handleSelectChange = (event) => {
        const selectedValue = event.target.value
        dispatch({ type: "SET", key: 'start_fetching_match', payload: true })
        navigate(selectedValue);
    };

    const showOptions = () => {
        const matchingOption = options.find(option => option.to === pathname.split('?')[1]);

        const matchingOptionLabel = matchingOption ? matchingOption  : {
            "to": "Select Market",
            "label": "More Markets"
        };

        const otherOptions = options.filter(option => option.to !== pathname.split('?')[1]);

        const optionLabels = [matchingOptionLabel , ...otherOptions.map(option => ({
            to: option.to,
            label: option.label
        }))];

        return optionLabels.map((option, index) => (
            <LinkOption key={index} to={`${option.to}`} pathname={pathname} className={`btn `}>
                {option.label}
            </LinkOption>
        ));
    };




    return (
        <Form.Select
            {...rest}
            value={`/nare-league=${pathname?pathname:'Select Market'}`}
            className={`btn ${options.filter((option)=> {
                   return  option.to === pathname.split('?')[1]
                }
                
            ).length>0&&' opt-color' } text-light px-4`}
            onChange={handleSelectChange}
            style={{ fontSize: '12px' }}
        >
            {/*{options.map((option, index) => (*/}
            {/*    <LinkOption key={index} to={option.to} pathname={pathname}  className={`btn ${pathname.includes(`${option.to}`)&&' opt-color    '}`}>*/}
            {/*        /!*{options.filter((option)=>option.to==pathname.split('?')[1])?options.filter((option)=>option.to==pathname.split('?')[1])[0].label:option.label}*!/*/}
            {/*    </LinkOption>*/}
            {/*))}*/}
            {showOptions()}
        </Form.Select>
    );
}

export default LinkSelect;


