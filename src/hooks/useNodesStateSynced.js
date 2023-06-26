import { useCallback, useEffect, useState } from 'react';
import {
  applyNodeChanges,
  getConnectedEdges,
} from 'reactflow';


//🌵 NodesMap은 Nodes에 해당하는 교체를 다 여기서 해결함


const isNodeAddChange = (change) => change.type === 'add';
const isNodeResetChange = (change) => change.type === 'reset';

export function useNodesStateSynced(ydoc, edgesMap) {
  const nodesMap = ydoc.getMap('nodes');
  // console.log('nodes state🔥: ', ydoc)
     const [nodes, setNodes] = useState([]);

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
