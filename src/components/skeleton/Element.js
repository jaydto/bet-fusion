import { Skeleton} from 'antd';

const Element=()=> {
    return (
      <div>
        <div style={{background:"#16202c"}}>
          <Skeleton.Button  active  shape={"default"} style={{width:'80vw'}} />
        </div>
      </div>
    );

}

export default Element
