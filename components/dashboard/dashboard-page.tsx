import { Clock, FileText, MessageCircle, PlusCircle } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import RecentArticles from './recent-articles';
import { prisma } from '@/lib/prisma';

type Props = {}

const BlogDashboard = async(props: Props) => {
  // const articles = [1,2,3,4,5,6,7,8,9,10,11,12];
  const [articles,totalComments] = await Promise.all([
    prisma.articles.findMany({
      orderBy:{
        createdAt: "desc"
      },
      include:{
        comments:true,
        author:{
          select:{
            name: true,
            email:true,
            imageUrl: true
          }
        }
      }
    }),
    prisma.comment.count(),
  ])
  return (
    <main className="flex-1 p-4 md:p-8">
           {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your content and analytics
          </p>
        </div>
        <Link href={"/dashboard/articles/create"}>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
              Total Articles
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div> 
            <p className="text-xs text-muted-foreground mt-1">
              +5 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Comments
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              12 awaiting moderation
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Reading Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2m</div>
            <p className="text-xs text-muted-foreground mt-1">
              +0.8m from last month
            </p>
          </CardContent>
        </Card>
        
      </div>
      {/* Recent Articles */}
      <RecentArticles articles={articles}/>
    </main>
  )
}

export default BlogDashboard;