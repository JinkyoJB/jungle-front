import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';


function PictureNode({ data, isConnectable }) {

  console.log('image data: ',data)
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="PictureNodeblock rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 pt-2">
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
      {/* {
        // Render each tag as a separate label
        data.tags.split(',').map((tag, index) => (
          <label key={index} htmlFor="text" className="text-center">
            Tag: {tag.trim()} 
          </label>
        ))
      } */}
      <img src={data.url} alt="image" style={{ width: "300px" }} />
      <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} />
    </div>
  );
}


export default PictureNode;
