// title & content

import { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

function TextNode2({ data, isConnectable }) {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);

  const onTitleChange = useCallback((evt) => {
    setTitle(evt.target.value);
    console.log(evt.target.value);
  }, []);

  const onContentChange = useCallback((evt) => {
    setContent(evt.target.value);
    console.log(evt.target.value);
  }, []);

  return (
    <div className="textNode2 bg-white px-5 py-2 rounded-lg" style={{ border: '2px solid black', paddingTop: '25px' }}>
      <Handle className="w-4 h-4" type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
      <div>
        <label htmlFor="title" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '5px'}}>제목</label>
        <input
          type="text"
          id="title"
          value={data.title}
          onChange={onTitleChange}
          className="input-box"
        />
      </div>
      <div>
        <label htmlFor="content" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '5px'}}>내용</label>
        <textarea
          id="content"
          value={content}
          onChange={onContentChange}
          className="input-box overflow-auto"
          rows={5}
        ></textarea>
      </div>
      <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextNode2;
