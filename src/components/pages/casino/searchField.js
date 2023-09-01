import React, {useContext, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {StoreContext } from "../../../context/store"

const SearchComponent = React.memo(
    (props) => {
    const {data}=props
    const [searchTerm, setSearchTerm] = useState('');
    const { state, dispatch } = useContext(StoreContext);

    const handleSearch = e => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        filterData(searchTerm);
    };

    const filterData = searchTerm => {
        if (searchTerm.trim() === '') {
            dispatch({type:"SET", key:'casino_search', payload:[]});

        } else {
            const filteredData = data.filter(item =>
                item.game_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            dispatch({type:"SET", key:'casino_search', payload:filteredData});

        }
    };

    return (
        <div className={'w-50'}>
            <div className="search-container my-2 ">
            <input type="text" name="search" placeholder="Search..."
                   value={searchTerm}
                   onChange={handleSearch} className="search-input"/>
            <a href="#" className="search-btn">
                <FontAwesomeIcon icon={faSearch} />
            </a>

        </div>

        </div>


    );
});

export default React.memo(SearchComponent);
