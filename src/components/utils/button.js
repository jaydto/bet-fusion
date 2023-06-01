import React from 'react';
import { Link } from 'react-router-dom';

const Button=(props)=> {
    const { to, children, ...rest } = props;

    return (
        <Link className={'border-0'} to={to} {...rest}>
            <button className={`more-market-button btn border-0`} style={{background:"transparent", fontSize:'13px'}}>{children}</button>
        </Link>
    );
}

export default Button;
