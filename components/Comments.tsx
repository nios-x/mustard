import React from 'react'

export default function Comments() {
  return (
    <div></div>
  )
}


// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerDescription,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
//   } from "@/components/ui/drawer"
//   import { Button } from "./ui/button"
// import InfiniteScroll from "react-infinite-scroll-component"
// import React from 'react'
// export default function Comments(props:any) {
//   return (
//     <div>
//         <Drawer>
//   <DrawerTrigger>Open</DrawerTrigger>
//   <DrawerContent>
//     <DrawerHeader>
//       <DrawerTitle>Are you absolutely sure?</DrawerTitle>
//       <DrawerDescription>This action cannot be undone.</DrawerDescription>
//     </DrawerHeader>
//     <DrawerFooter>
//          <div className="mt-4 space-y-4 ">
//                 <InfiniteScroll
//                   dataLength={posts.length}
//                   next={fetchPosts}
//                   hasMore={hasMore}
//                   loader={<h4 className='text-center'>Loading...</h4>}
//                   endMessage={<p className="text-gray-500 text-center mt-3 text-sm">No more posts to show.</p>}
//                 >
//                  {posts.map((post: any) => (
//           <Post key={`${post.createdAt}-${post.username}`}  post={post} postLike={postLike} copyText={copyText} />
//         ))}
//                 </InfiniteScroll>
//               </div>
//       <Button>Submit</Button>
//       <DrawerClose>
//         <Button variant="outline">Cancel</Button>
//       </DrawerClose>
//     </DrawerFooter>
//   </DrawerContent>
// </Drawer>

//     </div>
//   )
// }
  