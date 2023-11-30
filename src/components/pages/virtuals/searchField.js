import React, {useContext, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {StoreContext } from "../../../context/store"

const SearchComponent = React.memo(
    (props) => {
    const {data}=props

    console.log('data ', data)
    const [searchTerm, setSearchTerm] = useState('');
    const { state, dispatch } = useContext(StoreContext);

    const handleSearch = e => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        filterData(searchTerm);
    };

    const filterData = searchTerm => {
        if (searchTerm.trim() === '') {
            dispatch({type:"SET", key:'naregames_search', payload:[]});

        } else {
            const filteredData = data.filter(item =>item.name&&
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            dispatch({type:"SET", key:'naregames_search', payload:filteredData});

        }

    };

    return (
        <div className={"w-100"}>
            <div className="search-container">
            <input type="text" name="search" placeholder="Search..."
                   value={searchTerm}
                   onChange={handleSearch} className="search-input"/>
            <div  className="search-btn cursor-pointer">
                <FontAwesomeIcon icon={faSearch} />
            </div>
               
        </div>

        </div>


    );
});

export default SearchComponent;
