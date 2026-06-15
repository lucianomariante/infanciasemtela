import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getPageBySlug } from "@/lib/content";

type Context = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: NextRequest, { params }: Context) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page || page.type !== "bestof") {
    return new Response("Not Found", { status: 404 });
  }

  const destination = request.nextUrl.clone();
  destination.pathname = `/${slug}`;

  return NextResponse.redirect(destination, 301);
}
