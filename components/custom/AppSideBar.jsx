import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { MessageCircleCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import WorkspaceHistory from '@/components/custom/WorkspaceHistory'

function AppSideBar() {
    return (
        <Sidebar>
            <SidebarHeader classNames="p-5">
                <Image src={'/logo.png'} alt='log' width={30} height={30} />
            </SidebarHeader>
            <SidebarContent className="p-5">
                <Button><MessageCircleCode />Start New Chat</Button>
                <SidebarGroup>
                    <WorkspaceHistory />
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSideBar