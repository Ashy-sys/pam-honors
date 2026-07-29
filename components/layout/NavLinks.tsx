const links = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Nominees", href: "/nominees" },
  { name: "Judges", href: "/judges" },
  { name: "Winners", href: "/winners" },
  { name: "About", href: "/about" },
];

export default function NavLinks() {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="text-sm text-ink-muted hover:text-gold transition duration-300"
        >
          {link.name}
        </a>
      ))}
    </nav>
  );
}