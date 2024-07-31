import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
import { Session } from "next-auth";

const NavBar = async () => {
  const session = await auth();

  if (!session) {
    return;
  }

  return (
    <div className="p-4 w-full bg-orange-400">
      <nav className="flex container mx-auto items-center justify-between">
        <span>Project Hyves</span>
        {session ? <Authenticated session={session} /> : <NotAuthenticated />}
      </nav>
    </div>
  );
};

const Authenticated = ({ session }: { session: Session }) => {
  return (
    <div className="flex gap-4">
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
      <span>{session.user?.name}</span>
    </div>
  );
};

const NotAuthenticated = () => {
  return <Button>Sign in</Button>;
};

export default NavBar;
