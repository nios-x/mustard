import React from 'react'

export default function PostContainer(props:any) {
  return (
    <div className='p-2'>
        {props.posts.map((e)=>(<>
            <div key={e.createdAt} className='text-sm p-3 rounded-lg  border'>
                <div>{e.user.name} - {e.createdAt}</div>
                <div>{e.user.username}</div>
                
                {e.content}    
            </div>
        
        </>))}

    </div>
  )
}
