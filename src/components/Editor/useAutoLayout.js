import { useEffect } from 'react';
import { Node, Edge, Position, ReactFlowState, useStore, useReactFlow } from 'reactflow';
import { stratify, tree } from 'd3-hierarchy';

const Direction = 'TB' | 'LR' | 'RL' | 'BT';

const positionMap = {
  T: 'top',
  L: 'left',
  R: 'right',
  B: 'bottom',
};

const getPosition = (x, y, direction) => {
  switch (direction) {
    case 'LR':
      return { x: y, y: x };
    case 'RL':
      return { x: -y, y: -x };
    case 'BT':
      return { x: -x, y: -y };
    default:
      return { x, y };
  }
};

const layout = tree()
  .nodeSize([130, 120])
  .separation(() => 1);

function useAutoLayout(options) {
  const { direction } = options;

  const nodeCountSelector = state => state.nodeInternals.size;
  const nodesInitializedSelector = state =>
    Array.from(state.nodeInternals.values()).every(node => node.width && node.height);

  const nodeCount = useStore(nodeCountSelector);
  const nodesInitialized = useStore(nodesInitializedSelector);
  const { getNodes, getEdges, setNodes, setEdges, fitView } = useReactFlow();

  useEffect(() => {
    if (!nodeCount || !nodesInitialized) {
      return;
    }

    const nodes = getNodes();
    const edges = getEdges();

    const hierarchy = stratify()
      .id(d => d.id)
      .parentId(d => edges.find(e => e.target === d.id)?.source)(nodes);

    const root = layout(hierarchy);

    setNodes(nodes =>
      nodes.map(node => {
        const { x, y } = root.find(d => d.id === node.id) || { x: node.position.x, y: node.position.y };

        return {
          ...node,
          sourcePosition: positionMap[direction[1]],
          targetPosition: positionMap[direction[0]],
          position: getPosition(x, y, direction),
          style: { opacity: 1 },
        };
      })
    );

    setEdges(edges => edges.map(edge => ({ ...edge, style: { opacity: 1 } })));
  }, [nodeCount, nodesInitialized, getNodes, getEdges, setNodes, setEdges, fitView, direction]);
}

export default useAutoLayout;
