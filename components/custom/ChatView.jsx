"use client"
import { useParams } from 'next/navigation'
import { useConvex } from 'convex/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { api } from '@/convex/_generated/api'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import Colors from '@/data/Colors'
import { usecontext } from 'react'
import React from 'react'
import { Image } from 'next/image'
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import { useMutation } from 'convex/react'
import ReactMarkdown from 'react-markdown'
import Prompt from '@/data/Prompt'

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail, setUserDetail } = usecontext(UserDetailContext);
  const { messages, setMessages } = useState(MessagesContext);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);
  const UpdateMessages=useMutation(api.workspace.UpdateMessage); 

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id])
  /**
   * Used to get the workspace data using workspace ID
   */
  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id
    });
    setMessages(result?.message);
    console.log(result);
  }

  useEffect(() => {
    if (messages?.length > 0) {
      console.log(messages);
      const role = messages[messages.length - 1]?.role;
      if (role == 'user') {
        GetAiResponce();
      }
    }
  }, [messages])
  const GetAiResponce = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post('/api/ai-chat', {
      prompt: PROMPT
    });
    console.log(result.data.result);

    const aiResp={
      role:'ai',
      content:result.data.result
    }
    setMessages(prev => [...prev, aiResp])
    await UpdateMessages({
      messages:[...messages,aiResp],
      workspaceId:id
    })
    setLoading(false);
  }

  const onGenerate = (input) => {
    setMessages(prev=>[...prev,{
      role:'user',
      content:input
    }]);
    setUserInput('');
  }
  return (
    <div className='relative h-[85vh] flex flex-col'>
      <div className='flex-1 overflow-y-scroll scroolbar-hide'>
        {messages?.map((msg, index) => (
          <div key={index}
            className='p-3 rounded-lg mb-2 flex gap-2 items-center leading-7'
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND
            }}>
            {msg?.role == 'user' &&
              <Image src={userDetail?.picture} alt='userImage'
                width={35} height={35} className='roundex-full' />}
            <ReactMarkdown className='flex flex-col'>{msg.content}</ReactMarkdown>
            {loading && 
            <div className='p-3 rounded-lg mb-2 flex gap-2 items-center'
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND
            }}>
              <Loader2Icon className='animate-spin' />
              <h2>Generating response...</h2>
            </div>
            }
          </div>
        ))}
      </div>
      {/**Input Section*/}
      <div className='p-5 border rounded-xl max-w-xl w-full mt-3'
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className='flex gap-2'>
          <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            className='outline-none bg-transparent w-full h-32 max-h-56 resize-none' />
          {userInput && <ArrowRight
            onClick={() => onGenerate(userInput)}
            className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer' />}
        </div>
        <div>
          <Link className='h-5 w-5' />
        </div>
      </div>
    </div >
  )
}
export default ChatView