// How every section opens: copper eyebrow, a heading whose second line is
// muted, and an optional line of copy. One component so the pages read as
// one brand rather than a stack of differently styled blocks.
export default function SectionHeader({ eyebrow, title, muted, lede, as: Heading = "h2", id, className = "" }) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading id={id} className={`heading ${eyebrow ? "mt-4" : ""}`}>
        {title}
        {muted && (
          <>
            {" "}
            <span className="heading-muted block">{muted}</span>
          </>
        )}
      </Heading>
      {lede && <p className="lede mt-5">{lede}</p>}
    </div>
  );
}
