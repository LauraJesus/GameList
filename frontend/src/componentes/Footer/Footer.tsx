import "@/componentes/Footer/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>GameList © {new Date().getFullYear()}</p>
    </footer>
  );
}
