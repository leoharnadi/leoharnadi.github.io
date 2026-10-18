interface PageHeadingProps {
  title: string;
  eyebrow: string;
  introduction: string;
}

export function PageHeading({ title, eyebrow, introduction }: PageHeadingProps) {
  return (
    <header className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-introduction">{introduction}</p>
    </header>
  );
}
