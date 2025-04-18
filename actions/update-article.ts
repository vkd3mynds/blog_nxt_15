"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.ClODINARY_CLOUD_NAME,
  api_key: process.env.ClODINARY_API_KEY,
  api_secret: process.env.ClODINARY_API_SECRET,
});

const upateArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});

type UpateArticlesFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const updateArticles = async (
  articleId: string,
  prevState: UpateArticlesFormState,
  formData: FormData
): Promise<UpateArticlesFormState> => {
  const result = upateArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formErrors: ["You must be logged in to update an article."],
      },
    };
  }

  // ✅ Find the existing article
  const existingArticle = await prisma.articles.findUnique({
    where: { id: articleId },
  });
  if (!existingArticle) {
    return {
      errors: { formErrors: ["Articles not Found"] },
    };
  }

  // ✅ Fix: Find the actual user using `clerkUserId` and get their `id`
  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser || existingArticle.authorId !== existingUser.id) {
    return {
      errors: {
        formErrors: [
          "User not found. Please register before creating an article.",
        ],
      },
    };
  }

   
  // start EDITING articles

  let imageUrl = existingArticle.featuredImage;
  const imageFile = formData.get("featuredImage") as File | null;
  if (imageFile && imageFile.name !== "undefined") {
    try{
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
    
      const uploadResult: UploadApiResponse | undefined = await new Promise(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "blog_nxt" }, // ✅ Fix: Ensure correct file type handling
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(buffer);
        }
      );

      if (uploadResult?.secure_url) {
        imageUrl = uploadResult.secure_url;
    } else {
        return {
            errors: { featuredImage: ["Failed to upload image. Please try again."] },
        };
    }
    }catch(error){
      return{
        errors:{
          formErrors:["Error in upoading Image, please try again"]
        }
      }
    }
  }



  

  // if (!imageUrl) {
  //   return {
  //     errors: {
  //       featuredImage: ["Failed to upload image. Please try again."],
  //     },
  //   };
  // }

  try {
    // ✅ Fix: Use `existingUser.id` instead of `userId` (which is `clerkUserId`)
    await prisma.articles.update({
      where: { id: articleId },
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Some internal server error occurred."],
        },
      };
    }
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
};
