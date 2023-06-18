import React from 'react';
import { Link } from 'react-router-dom';

const Button=React.memo(
    (props)=> {
    const { to, children, choice, ...rest } = props;

    return (
        <Link className={'border-0'} to={to} {...rest}>
            <button className={`more-market-button btn border-0 ${choice}`} style={{background:"transparent", fontSize:'13px'}}>{children}</button>
        </Link>
    );
})

export default Button;
