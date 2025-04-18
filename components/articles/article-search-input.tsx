"use client";
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Input } from '../ui/input';
import { searchAction } from '@/actions/search';


const ArticleSearchInput = () => {
    const searchParams = useSearchParams();
    const searchText = searchParams.get("search") || "";
  return (
    <form action={searchAction}>
    {/* <form onSubmit={handleSearchAction}> */}
        <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          name="search"
          defaultValue={searchText}
          placeholder="Search articles..."
          className="w-full pl-10 pr-4 py-6 text-lg"
        />
        </div>
    </form>
  )
}

// const ArticleSearchInput = (props: Props) => {
//     const searchParams = useSearchParams();
//     const handleSearchAction = async(e:React.FormEvent)=>{
//       e.preventDefault();
//       await searchAction(searchParams.get("search") || "");
//     }
//     // const searchText = searchParams.get("search") || "";
//   return (
//     <form onSubmit={handleSearchAction}>
//         <div className="relative">
//         <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//         <Input
//           type="text"
//           name="search"
//           // defaultValue={searchText}
//           placeholder="Search articles..."
//           className="w-full pl-10 pr-4 py-6 text-lg"
//         />
//         </div>
//     </form>
//   )
// }

export default ArticleSearchInput