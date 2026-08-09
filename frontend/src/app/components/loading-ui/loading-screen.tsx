import { Ripple } from "./ripple";

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Ripple className="w-16 h-16 text-primary" />
    </div>
  );
}