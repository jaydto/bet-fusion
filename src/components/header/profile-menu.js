import React  from 'react';

const ProfileMenu = (props) =>{
    
    const { user } = props;
    
    return (
        <>
        { user && 
            <>
            <div className="container og ale ss profile">
                
                <div className="row right">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    {user?.msisdn} 
                </div>
                <div className="row right">
                    <div className="col">Balance {user.balance || 0} </div>
                    <div className="col">Bonus {user.bonus || 0 } </div>
                    <div className="col"><a href="/logout">Logout<i className="fa fa-sign-out" aria-hidden="true"></i> </a></div>
                </div>
            </div> 
            </>
        }
        </>

    )
}


export default ProfileMenu;
