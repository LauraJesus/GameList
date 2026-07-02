import "@/componentes/Header/Header.css";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "@/componentes/LogoutButton/LogoutButton";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link href="/reviews">Reviews</Link>
          </li>
        </ul>
      </nav>
      <div>
        <ul>
          {!token && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Criar Conta</Link>
              </li>
            </>
          )}
          {token && (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
