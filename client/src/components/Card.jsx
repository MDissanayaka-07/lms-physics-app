export default function Card({
  children,
  className = "",
  title,
  eyebrow,
  action,
  tone = "default"
}) {
  const classes = ["ui-card", `ui-card-${tone}`, className].filter(Boolean).join(" ");

  return (
    <section className={classes}>
      {(title || eyebrow || action) && (
        <header className="ui-card-header">
          <div>
            {eyebrow ? <p className="ui-card-eyebrow">{eyebrow}</p> : null}
            {title ? <h3 className="ui-card-title">{title}</h3> : null}
          </div>
          {action ? <div>{action}</div> : null}
        </header>
      )}
      {children}
    </section>
  );
}
