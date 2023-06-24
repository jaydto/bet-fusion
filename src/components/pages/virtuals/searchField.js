import React, {useContext, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {Context} from "../../../context/store";

const SearchComponent = React.memo(
    (props) => {
    const {data}=props
    const [searchTerm, setSearchTerm] = useState('');
    const [state,dispatch]=useContext(Context)

    console.log("filteredData_data",data)
    const handleSearch = e => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        console.log("filteredData_term",searchTerm)
        filterData(searchTerm);
    };

    const filterData = searchTerm => {
        if (searchTerm.trim() === '') {
            dispatch({type:"SET", key:'naregames_search', payload:[]});

        } else {
            const filteredData = data.filter(item =>item.name&&
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            console.log("filteredData",filteredData)
            dispatch({type:"SET", key:'naregames_search', payload:filteredData});

        }

    };

    return (
        <div className={"w-100"}>
            <div className="search-container">
            <input type="text" name="search" placeholder="Search..."
                   value={searchTerm}
                   onChange={handleSearch} className="search-input"/>
            <a href="#" className="search-btn">
                <FontAwesomeIcon icon={faSearch} />
            </a>
                {/*{console.log("filteredData", filteredData)}*/}
                {/*{filteredData ? (*/}
                {/*    <div>*/}
                {/*        <h2>{filteredData.game_name}</h2>*/}
                {/*        <img src={filteredData.game_icon} alt={filteredData.game_name} />*/}
                {/*    </div>*/}
                {/*) : null}*/}
        </div>

        </div>


    );
});

export default SearchComponent;
