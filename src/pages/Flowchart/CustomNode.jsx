import React from 'react';
import { Handle, useReactFlow } from 'reactflow';

import styles from './styles.module.css';

// this function returns the label for the node based on the current state
function getLabel({ expanded, expandable }) {
  if (!expandable) {
    return 'nothing to expand';
  }

  return expanded ? 'Click to collapse ▲' : 'Click to expand ▼';
}

export default function CustomNode({ data, id, xPos, yPos }) {
  const { addNodes, addEdges } = useReactFlow();

  const addChildNode = (evt) => {
    // prevent the expand/collapse behaviour when a new node is added while the
    // node is expanded
    if (data.expanded) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    const newNodeId = `${id}__${new Date().getTime()}`;

    // the edge between the clicked node and the child node is created
    addNodes({ id: newNodeId, position: { x: xPos, y: yPos + 100 }, data: { label: 'X' } });
    addEdges({ id: `${id}->${newNodeId}`, source: id, target: newNodeId });
  };

  // based on the state of the node, we show the label accordingly
  const label = getLabel(data);

  return (
    <div className={styles.node}>
      <div className={styles.label}>{label}</div>
      <Handle position="top" type="target" />
      <Handle position="bottom" type="source" />
      <div className={styles.button} onClick={addChildNode}>
        + add child node
      </div>
    </div>
  );
}
