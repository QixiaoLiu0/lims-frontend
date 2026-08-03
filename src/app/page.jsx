import { redirect } from "next/navigation";

export default function LandingPage() {
  redirect("/login");
  return null;
}
