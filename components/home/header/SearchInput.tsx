'use client'
import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '../../ui/input'
import { useSearchParams } from 'next/navigation'
import { searchAction } from '@/actions/search'

type Props = {}

const SearchInput = (props: Props) => {
  const searchParams = useSearchParams()
  //  const handleSearchAction = async(e:React.FormEvent)=>{
  //       e.preventDefault();
  //       await searchAction(searchParams.get("search") || "");
  //     }
  return (
    <form action={searchAction}>
    {/* <form onSubmit={handleSearchAction}> */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          name="search"
          placeholder="Search articles..."
          className="pl-10 w-48 focus-visible:ring-1"
          // defaultValue={searchParams.get('search') || ""}
        />
      </div>
    </form>
  )
}

export default SearchInput
// const SearchInput = (props: Props) => {
//   const searchParams = useSearchParams()
//    const handleSearchAction = async(e:React.FormEvent)=>{
//         e.preventDefault();
//         await searchAction(searchParams.get("search") || "");
//       }
//   return (
//     <form onSubmit={handleSearchAction}>
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//         <Input
//           type="search"
//           name="search"
//           placeholder="Search articles..."
//           className="pl-10 w-48 focus-visible:ring-1"
//           // defaultValue={searchParams.get('search') || ""}
//         />
//       </div>
//     </form>
//   )
// }

// export default SearchInput