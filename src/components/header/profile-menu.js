import React, { useContext} from 'react';
import { Context } from '../../context/store';
import { ToastContainer} from 'react-toastify';

const ProfileMenu = (props) =>{
    
    const [state, dispatch] = useContext(Context);
    
    return (
        <>
        { state?.user && 
            <>
            <ToastContainer enableMultiContainer />
            <div className="container og ale ss profile">
                
                <div className="row right">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    {state?.user?.msisdn} 
                </div>
                <div className="row right">
                    <div className="col">Balance: KES {state.user.balance || 0} </div>
                    <div className="col"> | Bonus: KES {state.user.bonus_balance || 0 } </div>
                    <div className="col"><a href="/logout">Logout<i className="fa fa-sign-out" aria-hidden="true"></i> </a></div>
                </div>
            </div> 
            </>
        }
        </>

    )
}


export default ProfileMenu;
