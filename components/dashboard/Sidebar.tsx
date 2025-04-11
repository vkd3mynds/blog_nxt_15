'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BarChart, FileText, LayoutDashboard, LogIn, MessageCircle, Settings } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const Sidebar = () =>{
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
      <Button variant="outline" className="md:hidden m-4">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px]">
        <DashboardSidebar closeSheet={()=>setIsOpen(false)}/>
      </SheetContent>
      <div className="hidden md:block h-screen w-[250px] border-r bg-background">
        <DashboardSidebar />
      </div>
      
    </Sheet>
  )
}
export default Sidebar;



const DashboardSidebar = ({ closeSheet }: { closeSheet?: () => void }) => {
    return (
        <div className="h-full px-4 py-6 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 mb-8 px-2">
                    <Link href={"/"}>
                        <span className="text-xl font-bold">ByteCode</span>
                    </Link>
                </div>
                <nav className="space-y-1">
                    <Link href={"/dashboard"}>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={closeSheet}
                        >
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Overview
                        </Button>
                    </Link>

                    <Link href={"/dashboard/articles/create"}>
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={closeSheet}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Articles
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={closeSheet}
                    >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Comments
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={closeSheet}
                    >
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={closeSheet}
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                </nav>
            </div>
            {/* <SheetFooter className="p-0">
                <SheetClose asChild>
                    <Button type="submit" className="w-full flex justify-evenly"><LogIn/> Login</Button>
                </SheetClose>
            </SheetFooter> */}
        </div>
    )
}
// const DashboardSidebar=({closeSheet}:{closeSheet ?:()=> void})=>{
//   return(
//     <div className="h-full px-4 py-6">
//        <div className="flex items-center gap-2 mb-8 px-2">
//         <Link href={"/"}>
//         <span className="text-xl font-bold">ByteCode</span>
//         </Link>
//       </div>
//       <nav className="space-y-1">
//       <Link href={"/dashboard"}>
//           <Button
//             variant="ghost"
//             className="w-full justify-start"
//             onClick={closeSheet}
//           >
//             <LayoutDashboard className="mr-2 h-4 w-4" />
//             Overview
//           </Button>
//         </Link>
        
//         <Link href={"/dashboard/articles/create"}>
//           <Button
//             variant="ghost"
//             className="w-full justify-start"
//             onClick={closeSheet}
//           >
//             <FileText className="mr-2 h-4 w-4" />
//             Articles
//           </Button>
//         </Link>
//         <Button
//           variant="ghost"
//           className="w-full justify-start"
//           onClick={closeSheet}
//         >
//           <MessageCircle className="mr-2 h-4 w-4" />
//           Comments
//         </Button>
//         <Button
//           variant="ghost"
//           className="w-full justify-start"
//           onClick={closeSheet}
//         >
//           <BarChart className="mr-2 h-4 w-4" />
//           Analytics
//         </Button>
//         <Button
//           variant="ghost"
//           className="w-full justify-start"
//           onClick={closeSheet}
//         >
//           <Settings className="mr-2 h-4 w-4" />
//           Settings
//         </Button>
//       </nav>
//     </div>
//   )
// }