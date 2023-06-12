import { useQuery } from "react-query"; 
import axios from 'axios';

const fetchNodes = () => {
    return axios.get('http://localhost:4000/nodes')
}


function Practicepage2() {
    const {isLoading, data} = useQuery('nodes', fetchNodes)
    // console.log('Yalla: ', data.data);
    
    if(isLoading){
        return <h2>Loaing.. </h2>
    }
    
    return (
        <>
        <h2>Node page2</h2>    
        {data?.data.map((nodes) => {
                return <div key={nodes.id}> {nodes.data.label} </div>
        })}
        </>
    )
}

export default Practicepage2;