import React from 'react';


const SearchBar = React.memo((
    props) => {
    return (
        <div className="col-sm-12 top-matches">                                   
          <div id="search-event" className="top-matches match-header events-header web-element">
              <form name="search" action="" method="post">                         
                  <div className="col-sm-3">Search events</div>
                      <div className="col-sm-6">
                          <input type="text" name="keyword" 
                             className="form-control" 
                             data-action="grow" 
                             placeholder="Team, Competition or Game ID" />
                   </div>
                   <div className="col-sm-2">
                      <button type="submit" className="cg fp ">Search</button>
                   </div>
              </form>                                                       
          </div>                                                            
        </div>      
    )
})
