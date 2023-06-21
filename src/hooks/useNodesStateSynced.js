import { useCallback, useEffect, useState } from 'react';
import {
  applyNodeChanges,
  getConnectedEdges,
  // Node,
  // NodeAddChange,
  // NodeChange,
  // NodeResetChange,
  // OnNodesChange,
  // useNodes,
} from 'reactflow';

import ydoc from '../components/Editor/ydoc';
import { edgesMap } from './useEdgesStateSynced';

//🌵 NodesMap은 Nodes에 해당하는 교체를 다 여기서 해결함
export const nodesMap = ydoc.getMap('nodes')

const initialNodes = [
  { id: '1', 
//   type: 'textUpdater',
   data: { label: '공사 초기 현장' }, 
   position: { x: -42, y: 59 } },
  
   { id: '2', 
//   type: 'textUpdater', 
  data: { label: '공사 중기 현장' }, 
  position: { x: 75, y: 286 } 
  }
];

const isNodeAddChange = (change) => change.type === 'add';
const isNodeResetChange = (change) => change.type === 'reset';

function useNodesStateSynced() {
  const [nodes, setNodes] = useState(initialNodes);

  //🌸 콜백함수 array의 교체 된것을 하나하나 바꿔줌 
  const onNodesChanges = useCallback((changes) => {
    const nodes = Array.from(nodesMap.values());

    //🌸 노드의 교체를 바꿔줌, 계속해서 현재를 업데이트 시켜줌, 노드가 바뀌면 엣지도 바뀜을 알아야한다
    const nextNodes = applyNodeChanges(changes, nodes);
    changes.forEach((change) => {
      if (!isNodeAddChange(change) && !isNodeResetChange(change)) {
        const node = nextNodes.find((n) => n.id === change.id);

        if (node && change.type !== 'remove') {
          nodesMap.set(change.id, node);
        } else if (change.type === 'remove') {
          const deletedNode = nodesMap.get(change.id);
          nodesMap.delete(change.id);
          const edges = Array.from(edgesMap.values()).map((e) => e);
          const connectedEdges = getConnectedEdges(deletedNode ? [deletedNode] : [], edges);
          connectedEdges.forEach((edge) => edgesMap.delete(edge.id));
        }
      }
    });
  }, []);

  // 🌸 옵저버를 세팅하는 건데, 조금이라도 change가 있다면 노드의 상황을 계속해서 바꿔줌
  useEffect(() => {
    const observer = () => {
      setNodes(Array.from(nodesMap.values()));
    };

    setNodes(Array.from(nodesMap.values()));
    nodesMap.observe(observer);

    return () => nodesMap.unobserve(observer);
  }, [setNodes]);

  return [nodes.filter((n) => n), onNodesChanges];
}

export default useNodesStateSynced;
