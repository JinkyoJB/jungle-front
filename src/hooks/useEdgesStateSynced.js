import { useCallback, useEffect, useState } from 'react';
import {
  applyEdgeChanges,
} from 'reactflow';


const isEdgeAddChange = (change) => change.type === 'add';
const isEdgeRemoveChange = (change) => change.type === 'remove';
const isEdgeResetChange = (change) => change.type === 'reset';

export function useEdgesStateSynced(ydoc) {
    const edgesMap = ydoc.getMap('edges');
    const [edges, setEdges] = useState([]);

    const onEdgesChange = useCallback((changes) => {
        // 현재 바뀌는 edge들 
        const currentEdges = Array.from(edgesMap.values()).filter((e) => e);
        const nextEdges = applyEdgeChanges(changes, currentEdges);
        changes.forEach((change) => {
        if (isEdgeRemoveChange(change)) {
            edgesMap.delete(change.id);
        } else if (!isEdgeAddChange(change) && !isEdgeResetChange(change)) {
            edgesMap.set(change.id, nextEdges.find((n) => n.id === change.id));
        }
        });
    }, []);

  const onConnect = useCallback((params) => {
    const { source, sourceHandle, target, targetHandle } = params;
    const id = `e-${source}${sourceHandle || ''}-${target}${targetHandle || ''}`;

    edgesMap.set(id, {
      id,
      ...params,
    });
  }, []);

  useEffect(() => {
    const observer = () => {
      setEdges(Array.from(edgesMap.values()));
    };

    setEdges(Array.from(edgesMap.values()));
    edgesMap.observe(observer);

    return () => edgesMap.unobserve(observer);
  }, [setEdges]);

  return [edges, onEdgesChange, onConnect];
}
