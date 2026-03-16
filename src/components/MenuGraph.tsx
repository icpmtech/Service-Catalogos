import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import menuData from '../../menu.json';

export default function MenuGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const nodes: any[] = [];
    const links: any[] = [];

    menuData.forEach((category: any) => {
      nodes.push({ id: category.id, name: category.name, type: 'category' });
      category.items.forEach((item: any) => {
        nodes.push({ id: item.id, name: item.name, type: 'item' });
        links.push({ source: category.id, target: item.id });
      });
    });

    const width = 900;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height])
      .attr('width', '100%')
      .attr('height', 'auto');

    svg.selectAll('*').remove();

    const g = svg.append('g');

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    d3.select(svgRef.current).call(zoom as any);

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#e4e4e7')
      .attr('stroke-width', 2);

    const node = g.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d: any) => d.type === 'category' ? 12 : 8)
      .attr('fill', (d: any) => d.type === 'category' ? '#18181b' : '#71717a')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('mouseover', function(event, d: any) {
        d3.select(this).attr('r', (d: any) => d.type === 'category' ? 16 : 12);
        // Highlight connected nodes
        node.attr('opacity', (n: any) => {
          const isConnected = links.some((l: any) => (l.source.id === d.id && l.target.id === n.id) || (l.target.id === d.id && l.source.id === n.id) || n.id === d.id);
          return isConnected ? 1 : 0.2;
        });
        link.attr('opacity', (l: any) => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.1);
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', (d: any) => d.type === 'category' ? 12 : 8);
        node.attr('opacity', 1);
        link.attr('opacity', 1);
      });

    const label = g.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text((d: any) => d.name)
      .attr('font-size', 12)
      .attr('font-weight', (d: any) => d.type === 'category' ? 'bold' : 'normal')
      .attr('fill', '#27272a')
      .attr('dx', 16)
      .attr('dy', 4)
      .style('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      label
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6">Mapa do Catálogo</h2>
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden cursor-grab active:cursor-grabbing">
        <svg ref={svgRef} className="w-full h-auto" />
      </div>
      <p className="text-sm text-zinc-500 mt-4">Use o rato para arrastar e o scroll para fazer zoom.</p>
    </div>
  );
}
