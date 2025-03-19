import { UserDetailContext } from '@/context/UserDetailContext'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useConvex } from 'convex/react'
import { useState } from 'react'
import { api } from '@/convex/_generated/api'

function WorkspaceHistory() {
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const convex=useConvex();
    const [workspaceList,setWorkspaceList]=useState();
    useEffect(() => {
        userDetail&&GetAllWorkspace();
    }, [userDetail])
    const GetAllWorkspace=async()=>{
        const result=await convex.query(api.workspace.GetAllWorkspace,{
            userId:userDetail?._id
        });

        setWorkspaceList(result);
        console.log(result);
    }
  return (
    <div>
        <h2 className='font-medium text-lg'>Your Chats</h2>
        <div>
            {workspaceList&&workspaceList?.map((workspace,index)=>(
                <h2 key={index} className='text-sm text-gray-400 mt-2 font-light'>
                    {workspace?.message[0]?.content}
                </h2>
            ))}</div>
    </div>
  )
}

export default WorkspaceHistory