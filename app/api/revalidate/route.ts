import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    // Validate the webhook signature
    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    // Revalidate based on content type
    switch (body._type) {
      case "newsType":
        revalidatePath("/news");
        if (body.slug?.current) {
          revalidatePath(`/news/${body.slug.current}`);
        }
        revalidatePath("/"); // Home page shows news
        break;

      case "peopleType":
        revalidatePath("/people");
        if (body.slug?.current) {
          revalidatePath(`/people/${body.slug.current}`);
        }
        break;

      case "paperType":
        revalidatePath("/research/papers");
        revalidatePath("/"); // Home page shows recent work
        break;

      case "dataset":
        revalidatePath("/data");
        revalidatePath("/"); // Home page shows datasets
        break;

      case "projectType":
        revalidatePath("/research/projects");
        break;

      case "about":
        revalidatePath("/about");
        break;

      case "homeHeader":
      case "footer":
        revalidatePath("/");
        break;

      default:
        // Revalidate everything if we don't know the type
        revalidatePath("/", "layout");
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: any) {
    console.error("Error revalidating:", err);
    return new Response(err.message, { status: 500 });
  }
}
