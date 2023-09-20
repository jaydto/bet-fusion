import React from "react";
import {Link} from "react-router-dom";

const MainTabs = (props) => {
    const {tab, competition} = props;

    const u_class = tab === 'upcoming' ? "home-tabs-filters-active myButton" : "home-tabs-filters myButton";
    const c_class = tab === "countries" ? "home-tabs-filters-active myButton" : "home-tabs-filters myButton";
    const h_class = (!tab || tab === 'highlights') ? "home-tabs-filters-active myButton" : "home-tabs-filters myButton";
    const t_class = tab === 'tomorrow' ? "home-tabs-filters-active myButton" : "home-tabs-filters myButton";

    const getLink = (tab_competition) => {

        const urlSearchParams = new URLSearchParams(window.location.search);
        const url = new URL(window.location)
        const params = Object.fromEntries(urlSearchParams.entries());
        let sportId = new URLSearchParams(window.location.search).get('sport_id') || '79'
        if(competition){
            url.pathname = `/${competition}`
        }else{
            url.pathname = `/${tab}`
        }
        url.searchParams.set('sport_id', sportId)
        Object.keys(params)?.forEach((param, val) => {
            url.searchParams.set(param, params[param])
        })

        return url.searchParams.toString()

    }

    return (
        // + `${user ? "highlight-logged-in-menu" : "highlight-menu"}`
        <div className={"full-mobile main-navigations"} >
            <div className=" d-flex flex-row ">
                <div className="col  px-1  ">
                    <Link className={`cursor-pointer w-100 ${h_class}`} to={(competition?`/highlights-competition${competition}?`:'/highlights?') + getLink('highlights')}>
                        <span className="col ">Highlights</span>
                    </Link>
                </div>
                <div className="col  px-1  ">
                    <Link className={`cursor-pointer w-100 ${u_class}`} to={(competition?`/upcoming-competition${competition}?`:'/upcoming?') + getLink('upcoming')}>
                        <span className="col ">Upcoming</span>
                    </Link>
                </div>
                <div className="col  px-1  ">
                    <Link className={`cursor-pointer w-100 ${t_class}`} to={(competition?`/tomorrow-competition${competition}?`:'/tomorrow?') + getLink('tomorrow')}>
                        <span className="col ">Tomorrow</span>
                    </Link>
                </div>
                <div className="col  px-1 ">
                    <Link className={`cursor-pointer w-100 ${c_class}`} to={'/countries?' + getLink()}>
                        <span className="col ">Countries</span>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default MainTabs;
