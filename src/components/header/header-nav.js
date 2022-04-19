import React, { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { Context } from '../../context/store';

const HeaderNav = (props) => {
    const [state, ] = useContext(Context);
    const pathname = window.location.pathname;


    return (
          <Container  id="navbar-collapse-main" className="header-menu">

            <ListGroup as="ul" xs="9" horizontal className="nav navbar-nav og ale ss">

                <li className={pathname === '/' ? "active": ''}>
                    <a className="cg fm ox anl url-link not-selectable" href="/"  title="Home">Home</a>
                </li>
                <li >
                    <a className={ `g url-link live-game ${pathname==='/live'? 'active':''}` }  href="/live" title="Live">Live</a> 
                </li>
                <li className={pathname === '/highlights' ? 'active' : ''}>
                    <a className="cg fm ox anl url-link" href="/highlights"  title="Todays Highlights">Highlights</a>
                </li>
                
                <li className={pathname === '/jackpot' ? 'active' : ''}>
                    <a className="cg fm ox anl url-link" href="/jackpot" title="Jackpot">Jackpot</a>
                </li>
                <li className={pathname === '/app' ? 'active' : ''}>
                    <a className="g url-link" href="/app" title="App">APP </a>
                </li>
                <li className={pathname === '/how-to-play' ? 'active' : ''}>
                    <a className="g url-link" href="/how-to-play" title="How to play">How to play</a>
                </li>
                { state?.user && 
                <>
                    <li className={pathname === '/deposit' ? 'active' : ''}>
                         <a className="url-link" href="/deposit" title="Deposit"> Deposit</a>
                    </li>
                    <li className={pathname === 'withdraw' ? 'active' : ''}>
                         <a className="url-link" href="/withdraw" title="Withdraw"> Withdraw</a>
                    </li>
                    <li className={pathname === '/my-bets' ? 'active' : ''}>
                         <a className="url-link" href="/my-bets" title="My bets">My Bets</a>
                    </li>
                </>
                }
            </ListGroup>
        </Container>
    )

}
export default React.memo(HeaderNav);
