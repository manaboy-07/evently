import { SignIn } from "@clerk/nextjs";

//as recommended by clerk
export default function page() {
  return <SignIn />;
}
