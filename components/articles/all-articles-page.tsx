import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Search } from "lucide-react";
import { fetchArticleByQuery } from "@/lib/query/fetch-article";

// type AllArticlesPageProps={
//   searchText: string
// }

// const AllArticlesPage:React.FC<AllArticlesPageProps> = async ({searchText}) => {
//   // const articles = await prisma.articles.findMany({})
//   const articles = await fetchArticleByQuery(searchText)
//   if(articles.length <= 0) return <NoSearchResults />;

  type SearchPageProps = {
    articles: Prisma.ArticlesGetPayload<{
      include:{
        author:{
          select:{
            name:true,
            email:true,
            imageUrl:true
          }
        }
      }
    }>[];
  };
  
  export function AllArticlesPage({ articles }: SearchPageProps) {
   
    if (articles.length === 0) return <NoSearchResults />;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article)=>(
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg" key={article.id}>
        <div className="p-2">
          {/* Image Container */}
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-sm">
            <Image
              alt="unsp"
              src={article.featuredImage}
              fill
              className="object-cover"
            />
            </div>
            <h3 className="text-xl font-semibold text-foreground">{article.title}</h3>
            <p className="mt-2 text-muted-foreground">
              {article.category}
            </p>
            {/* Author & Metadata */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={article.author.imageUrl || ""}
                  /> 
                  <AvatarFallback>{article.author.name}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{article.author.name}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {article.createdAt.toDateString()}
              </div>
            </div>
          
        </div>
      </Card>
      ))}
      
    </div>
  );
};

export default AllArticlesPage;


export function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Icon */}
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground">
        No Results Found
      </h3>

      {/* Description */}
      <p className="mt-2 text-muted-foreground">
        We could not find any articles matching your search. Try a different
        keyword or phrase.
      </p>
    </div>
  );
}