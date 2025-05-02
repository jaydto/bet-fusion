import { LazyLoadImage } from "react-lazy-load-image-component";
import notification from "../../../assets/img/notification.png";

 
 const Broadcast = () => {
    return (
        <div className="notification-icon-container  my-2">
        <button className="notification-icon-btn">
          <LazyLoadImage src={notification} alt="popular" height={"20px"} />
        </button>
      </div>
    );
  };

  export default Broadcast