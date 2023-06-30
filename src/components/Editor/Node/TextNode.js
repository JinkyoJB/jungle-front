import { fontSize } from '@mui/system';
import { useState, useCallback, useEffect, DragEvent} from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { nodesMap, edgesMap } from '../Editingbox2';
import cx from 'classnames'

import styles from './index.css';

function TextNode({ data, isConnectable, sourcePosition, targetPosition }) {
  const [title, setTitle] = useState(data.title);

  const onTitleChange = useCallback((evt) => {
    const normalizedTitle = evt.target.value.normalize('NFKD');
    setTitle(normalizedTitle);
  }, []);

  /********* 🔥 노드를 드롭영역으로 지정 **********/
  const [isDropzoneActive, setDropzoneActive] = useState(false);

  const onDrop = () => {
    setDropzoneActive(false);
  };

  const onDragOver = (evt) => {
    evt.preventDefault();
  };

  const onDragEnter = () => {
    setDropzoneActive(true);
  };

  const onDragLeave = () => {
    setDropzoneActive(false);
  };

  // 노드 영역에 드랍시킬 때 스타일 지정.
  const className = styles.node;
  if (isDropzoneActive) {
    className += ' ' + styles.nodeDropzone;
  }

  /****************************************/

  useEffect(() => {

    // This is your map iteration code 
    nodesMap.forEach((node, nodeId) => {
      if (node.selected === true) {
        node.data = {
          ...node.data,
          title: title
        };
        nodesMap.set(nodeId, node);
        // updateNodeInternals(nodeId);  // Trigger re-render of this node.
        // onNodesChange(nodes.map(node => node.id === id ? { ...node, data: { ...node.data, memo: content } } : node));
      }
    });
  }, [title]);


  return (
    <div 
      className={className} 
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}>
      <Handle type="target" position={targetPosition || Position.Top} id="top" isConnectable={isConnectable} />

      <div>
        <textarea
          id="title"
          value={data.title}
          onChange={onTitleChange}
          style={{
            width: '300px',
            height: '100px',
            fontSize: '20pt',
            border: '1px solid transparent',
            outline: 'none',
            overflowWrap: 'break-word',
          }}
        />
      </div>

      <Handle
        type="source"
        position={sourcePosition || Position.Bottom}
        id="bottom"
        // style={handleStyle}
        isConnectable={isConnectable}
      />

    </div>
  );
}

export default TextNode;