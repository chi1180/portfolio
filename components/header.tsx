export default function Header() {
  const LINKS = ["home", "skills", "projects", "contacts"];

  // For SSR
  if (typeof window !== "undefined") {
    const pageLocation = window.location.pathname;
    console.log(pageLocation);
  }

  return (
    <header className="w-full h-24 bg-(--background) flex items-center justify-between p-8">
      <h1 className="text-4xl font-medium">Chi1180</h1>
      <nav>
        <ol className="flex gap-10 pr-2">
          {LINKS.map((link) => (
            <li key={link}>
              <a href={`/${link}`} className="text-2xl font-medium">
                {link.at(0)?.toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}
