'use client'
import React, { FormEvent, startTransition, useActionState, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import "react-quill-new/dist/quill.snow.css";
import { createArticle } from "@/actions/create-article";
// import ReactQuill from 'react-quill-new';
const ReactQuill = dynamic(()=>import('react-quill-new'),{ssr:false})

type Props = {};

const CreateArticlePage = (props: Props) => {
    const [content, setContent] = useState("");
    const [formState, action, isPending] = useActionState(createArticle, {
      errors: {},
    });
   

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
      formData.append("content", content);
  
      // Wrap the action call in startTransition
      startTransition(() => {
        action(formData);
      });
    };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
          {/* <form action={action} className="space-y-6"> */}
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Enter article Title.."
              />
              {formState.errors.title && <span className="text-red-600 bg-red-100 p-1 rounded-sm text-sm">{formState.errors.title}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category">
                <SelectTrigger 
                id="category"
                name="category"
                className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="web-development">Web-Development</SelectItem>
                </SelectContent>
              </Select>
              {formState.errors.category && <span className="text-red-600 bg-red-100 p-1 rounded-sm text-sm">{formState.errors.category}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
              id="featuredImage"
                type="file"
                name="featuredImage"
                accept="image/*"
              />
            </div>
            <div className="space-y-2">
            <Label>Content</Label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent} 
              />
              {formState.errors.content && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>
            
            <div className="flex justify-end gap-4">
              <Button variant={'outline'}>Cancel</Button>
              <Button type="submit" disabled={isPending}>
              {
                isPending ? "Loading.." : "Publish Article"
              }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateArticlePage;




// 'use client'
// import React, { FormEvent, startTransition, useActionState, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import dynamic from "next/dynamic";
// import { Button } from "../ui/button";
// import "react-quill-new/dist/quill.snow.css";
// import { createArticle } from "@/actions/create-article";

// const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

// type Props = {};

// const CreateArticlePage = (props: Props) => {
//   const [content, setContent] = useState("");
//   const [formState, action, isPending] = useActionState(createArticle, {
//     errors: {},
//   });

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const formData = new FormData(event.currentTarget);
//     formData.append("content", content);

//     startTransition(() => {
//       action(formData);
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl">Create New Article</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="title">Article Title</Label>
//               <Input
//                 type="text"
//                 name="title"
//                 placeholder="Enter article Title.."
//               />
//               {formState.errors?.title && <span className="text-red-600 bg-red-100 p-1 rounded-sm text-sm">{formState.errors.title}</span>}
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Select name="category">
//                 <SelectTrigger id="category" name="category" className="w-full">
//                   <SelectValue placeholder="Select Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="technology">Technology</SelectItem>
//                   <SelectItem value="programming">Programming</SelectItem>
//                   <SelectItem value="web-development">Web-Development</SelectItem>
//                 </SelectContent>
//               </Select>
//               {formState.errors?.category && <span className="text-red-600 bg-red-100 p-1 rounded-sm text-sm">{formState.errors.category}</span>}
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="featuredImage">Featured Image</Label>
//               <Input
//                 id="featuredImage"
//                 type="file"
//                 name="featuredImage"
//                 accept="image/*"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Content</Label>
//               <ReactQuill
//                 theme="snow"
//                 value={content}
//                 onChange={setContent}
//               />
//               {formState.errors?.content && formState.errors.content[0] && (
//                 <span className="font-medium text-sm text-red-500">
//                   {formState.errors.content[0]}
//                 </span>
//               )}
//             </div>

//             <div className="flex justify-end gap-4">
//               <Button variant={'outline'}>Cancel</Button>
//               <Button type="submit" disabled={isPending}>
//                 {isPending ? "Loading.." : "Publish Article"}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CreateArticlePage;