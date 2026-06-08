import { RouteTransition } from "@/components/layout/RouteTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <RouteTransition>{children}</RouteTransition>;
}
