import { withAuth } from "next-auth/middleware";

export default function proxy(req: any) {
  return (withAuth as any)(req);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/equipment/:path*",
    "/work-orders/:path*",
    "/preventive/:path*",
    "/fleet-map/:path*",
    "/inventory/:path*",
  ],
};
