// ForceNetwork.tsx
import React, { useEffect, useRef, useState } from "react";
import { DefaultNode, Graph } from "@visx/network";
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from "d3-force";
import type * as d3 from "d3-force";
import { localPoint } from "@visx/event";

type NodeType = d3.SimulationNodeDatum & {
  id: string;
  value?: number;
  fill?: string;
};

type LinkType = d3.SimulationLinkDatum<NodeType> & {
  source: string | NodeType;
  target: string | NodeType;
};

const width = 600;
const height = 400;

const initialNodes: NodeType[] = [
  { id: "1", value: 1 , fill:'#9243be'},
  { id: "2", value: 2 , fill:'#69b3a2'},
  { id: "3", value: 3 , fill:'#4354d1'},
  { id: "4", value: 4 , fill:'#9243be'},
  { id: "5", value: 5 , fill:'#69b3a2'},
  { id: "6", value: 6 , fill:'#4354d1'},
];

const initialLinks: LinkType[] = [
  { source: "1", target: "2" },
  { source: "2", target: "3" },
  { source: "3", target: "4" },
  { source: "4", target: "5" },
  { source: "5", target: "6" },
];

export default function ForceNetwork() {
  const [nodes, setNodes] = useState<NodeType[]>(initialNodes);
  const [links] = useState<LinkType[]>(initialLinks);
  // const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeType | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<NodeType, LinkType> | null>(null);

  useEffect(() => {
    const sim = forceSimulation(nodes)
      .force("link", forceLink<NodeType, LinkType>(links).id((d) => d.id))
      .force("charge", forceManyBody().strength(-100))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide().radius(30))
      .on("tick", () => {
        setNodes([...sim.nodes()]);
      });

    simulationRef.current = sim;

    return () => {sim.stop()};
  }, []);

  // 드래그 시작
  const handleDragStart = (node: NodeType) => (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;

    const move = (e: MouseEvent) => {
      const coords = localPoint(svg, e);
      if (!coords) return;
      node.fx = coords.x;
      node.fy = coords.y;
      simulationRef.current?.alpha(1).restart();
      setNodes([...nodes]);
    };

    const end = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      node.fx = null;
      node.fy = null;
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
  };

  const graph = {
    nodes,
    links,
  };

  return (
    <svg ref={svgRef} width={width} height={height} style={{ border: "1px solid #ccc" }}>
      <Graph<LinkType, NodeType>
        graph={graph}
        linkComponent={({ link }) => (
          <line
            x1={(link.source as NodeType).x ?? 0}
            y1={(link.source as NodeType).y ?? 0}
            x2={(link.target as NodeType).x ?? 0}
            y2={(link.target as NodeType).y ?? 0}
            stroke="#999"
            strokeWidth={1.5}
          />
        )}
        nodeComponent={({ node }) => (<>
          <circle
            r={10}
            onMouseDown={handleDragStart(node)}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ cursor: "grab" ,fill:node.fill }}
          />
            {/* hover 라벨 */}
            {/* 
              // {hoveredNodeId === node.id && 
              {hoveredNode === node.id && 
              <text
                y={-20}
                textAnchor="middle"
                fill="#000"
                fontSize={12}
                pointerEvents="none"
              >
                {node.id}
              </text>}
            */}
            {/* {hoveredNodeId === node.id && ( */}
        </>
        )}
        />
        {hoveredNode && (
          <foreignObject
          x={(hoveredNode.x||0) - 50}
          y={(hoveredNode.y||0) - 30}
          width={100}
          height={30}
          style={{zIndex:'1'}}
          // pointerEvents="none"
        >
          <div
            style={{
              background: "white",
              color: "black",
              border: "1px solid #ccc",
              borderRadius: 4,
              padding: "2px 6px",
              fontSize: 12,
              textAlign: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={() => setHoveredNode(hoveredNode)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {hoveredNode.id}
          </div>
        </foreignObject>
        )}
    </svg>
  );
}
