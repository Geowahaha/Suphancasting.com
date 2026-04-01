export function StitchFrame({
  slug,
  title,
  className = "",
}: {
  slug: string;
  title?: string;
  className?: string;
}) {
  return (
    <iframe
      title={title ?? slug}
      src={`/stitch/${slug}/index.html`}
      className={`block w-full border-0 bg-[#0a0a0a] [min-height:calc(100dvh-3.75rem)] ${className}`}
    />
  );
}
