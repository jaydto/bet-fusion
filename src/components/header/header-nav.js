import React, { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Context } from '../../context/store';

const HeaderNav = (props) => {
    const [state, dispatch] = useContext(Context);
    return (
          <Container  id="navbar-collapse-main">
            <ListGroup as="ul" xs="9" horizontal className="nav navbar-nav og ale ss">
                <li>
                    <a className="cg fm ox anl url-link not-selectable" href="/"  title="Home">Home</a>
                </li>
                <li>
                    <a className="g url-link live-game" href="/live" title="Live">Live</a> 
                </li>
                <li>
                    <a className="cg fm ox anl url-link" href="/highlights"  title="Todays Highlights">Highlights</a>
                </li>
                
                <li>
                    <a className="cg fm ox anl url-link" href="/jackpot" title="Jackpot">Jackpot</a>
                </li>
                <li>
                    <a className="g url-link" href="/app" title="App">APP </a>
                </li>
                <li>
                    <a className="g url-link" href="/how-to-play" title="How to play">How to play</a>
                </li>
                { state?.user && 
                <>
                    <li>
                         <a className="url-link" href="/deposit" title="Deposit"> Deposit</a>
                    </li>
                    <li>
                         <a className="url-link" href="/withdraw" title="Withdraw"> Withdraw</a>
                    </li>
                    <li>
                         <a className="url-link" href="/mybets" title="My bets">My Bets</a>
                    </li>
                </>
                }
            </ListGroup>
        </Container>
    )

}
export default HeaderNav;
