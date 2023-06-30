import { useEffect } from 'react';
import { Position, useStore, useReactFlow } from 'reactflow';
import dagre from 'dagre';

const Direction = 'TB' || 'LR' || 'RL' || 'BT';

const Options = {
  direction: Direction,
};

const positionMap = {
  T: Position.Top,
  L: Position.Left,
  R: Position.Right,
  B: Position.Bottom,
};

const nodeCountSelector = (state) => state.nodeInternals.size;
const nodesInitializedSelector = (state) =>
  Array.from(state.nodeInternals.values()).every((node) => node.width && node.height);

function useAutoLayout(options) {
  console.log(options);
  const { direction } = options;
  console.log(direction);
  const nodeCount = useStore(nodeCountSelector);
  const nodesInitialized = useStore(nodesInitializedSelector);
  const { getNodes, setNodes, setEdges, fitView } = useReactFlow();

  useEffect(() => {
    if (!nodeCount || !nodesInitialized) {
      return;
    }

    const nodes = getNodes();
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, {
        width: node.width,
        height: node.height,
      });
    });

    dagre.layout(dagreGraph);

    const edges = dagreGraph.edges();

    setNodes((nodes) =>
      nodes.map((node) => {
        const { x, y } = dagreGraph.node(node.id);

        return {
          ...node,
          sourcePosition: positionMap[direction[1]],
          targetPosition: positionMap[direction[0]],
          position: { x, y },
          style: { opacity: 1 },
        };
      })
    );

    edges.forEach((edge) => {
      const { points } = edge;
      const sourceNode = dagreGraph.node(edge.v);
      const targetNode = dagreGraph.node(edge.w);

      const sourcePort = positionMap[direction[1]];
      const targetPort = positionMap[direction[0]];

      const sourcePosition = {
        x: sourceNode.x + points[0].x,
        y: sourceNode.y + points[0].y,
      };

      const targetPosition = {
        x: targetNode.x + points[points.length - 1].x,
        y: targetNode.y + points[points.length - 1].y,
      };

      const sourceHandle = sourceNode.id + sourcePort;
      const targetHandle = targetNode.id + targetPort;

      const newEdge = {
        id: `${sourceNode.id}-${targetNode.id}`,
        source: sourceNode.id,
        target: targetNode.id,
        sourceHandle,
        targetHandle,
        sourcePosition,
        targetPosition,
        style: { opacity: 1 },
      };

      setEdges((edges) => [...edges, newEdge]);
    });

    fitView();
  }, [nodeCount, nodesInitialized, getNodes, setNodes, setEdges, fitView, direction]);
}

export default useAutoLayout;
