import Link from "next/link";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { prisma } from "@/lib/prisma";
export async function TopArticles() {
  const articles = await prisma.articles.findMany({
    orderBy:{createdAt:"desc"},
    include:{
      comments:true,
      author:{
        select:{
          name: true,
          email: true,
          imageUrl: true
        }
      }
    }
  })
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {
            articles.slice(0,3).map((article)=>(
                <Card
                key={article.id}
        className={cn(
          "group relative overflow-hidden transition-all hover:scale-[1.02]",
          "border border-gray-200/50 dark:border-white/10",
          "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
        )}
      >
        <div className="p-4">
          <Link href={`/articles/${article.id}`}>
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-sm">
              <Image
                alt={article.title}
                // src="https://images.unsplash.com/photo-1519163219899-21d2bb723b3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                src={article.featuredImage as string}
                fill
                className="object-cover"
              />
            </div>
            {/* Author Info */}
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <Avatar>
                <AvatarImage src={article.author.imageUrl as string} />
                {/* <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /> */}
                <AvatarFallback>
                  {article.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{article.author.name}</span>
            </div>
            {/* Article Title */}
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              {article.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {article.category}
            </p>
            {/* Article Meta Info */}
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{new Date(article.createdAt).toDateString()}</span>
              <span>{12} min read</span>
            </div>
          </Link>
        </div>
      </Card>
            ))
        }
      
    </div>
  );
}
