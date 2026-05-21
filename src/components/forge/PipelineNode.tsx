type PipelineNodeProps = {
  id: string;
  title: string;
  description: string;
};

export function PipelineNode({ id, title, description }: PipelineNodeProps) {
  return (
    <article className="pipeline-node relative min-w-[200px] flex-1 rounded-xl border border-[var(--indigo)]/30 bg-[#0a0a14] p-5 shadow-lg">
      <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--indigo)]/20 font-mono text-sm font-medium text-[var(--indigo-soft)]">
        {id}
      </span>
      <h3 className="mb-2 text-lg font-medium text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/60">{description}</p>
    </article>
  );
}
