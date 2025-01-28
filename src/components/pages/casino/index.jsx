import CasinoCarouselLoader from "./carousel";
import CrashGames from "./casinoBody";
import CasinoFilters from "./categories";
import "./index.css";
import SportsList from "./sportList";

const Index = () => {
    return (
      <div style={{margin:"auto", maxWidth:"991px",marginTop:"6rem"}}>
        {/* Menu / Sport List */}
        {/* <SportsList/> */}
  
        <CasinoCarouselLoader/>
  
        {/* Casino Filters */}
        <CasinoFilters/>
  
        <CrashGames/>
      </div>
    );
  };

export default Index;