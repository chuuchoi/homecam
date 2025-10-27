// NetworkGraph.tsx
import React, { useRef, useEffect, useState } from "react";
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from "d3-force";
import type * as d3 from "d3-force";
import { localPoint } from "@visx/event";
import { Circle, Line } from "@visx/shape";
import { Group } from "@visx/group";

interface NodeType {
  id: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  value?: number;
}

interface LinkType {
  source: string | NodeType;
  target: string | NodeType;
}

const width = 600;
const height = 400;

const initialNodes: NodeType[] = [
  { id: "1", value: 1 },
  { id: "2", value: 1 },
  { id: "3", value: 1 },
];

const initialLinks: LinkType[] = [
  { source: "1", target: "2" },
  { source: "2", target: "3" },
];

export default function NetworkGraph() {
  const [nodes, setNodes] = useState<NodeType[]>(initialNodes);
  const [links, setLinks] = useState<LinkType[]>(initialLinks);
  const simulationRef = useRef<d3.Simulation<NodeType, undefined> | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const sim = forceSimulation(nodes)
      .force("link", forceLink(links).id((d: any) => d.id))
      .force("charge", forceManyBody().strength(-100))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide().radius((d: any) => 30));

    sim.on("tick", () => {
      setNodes([...sim.nodes()]);
    });

    simulationRef.current = sim;

    return () => {sim.stop()};
  }, []);

  const handleDragStart = (node: NodeType) => (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const svg = svgRef.current;
    if (!svg) return;

    const move = (moveEvent: MouseEvent) => {
      const point = localPoint(svg, moveEvent);
      if (!point) return;

      node.fx = point.x;
      node.fy = point.y;
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

  return (
    <svg ref={svgRef} width={width} height={height} style={{ border: "1px solid #ccc" }}>
      <Group>
        {/* Links */}
        {links.map((link, i) => {
          const source = link.source as NodeType;
          const target = link.target as NodeType;
          return (
            <Line
              key={i}
              from={{ x: source.x ?? 0, y: source.y ?? 0 }}
              to={{ x: target.x ?? 0, y: target.y ?? 0 }}
              stroke="#999"
              strokeWidth={1.5}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <Circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={15}
            fill="#69b3a2"
            onMouseDown={handleDragStart(node)}
          />
        ))}
      </Group>
    </svg>
  );
}
