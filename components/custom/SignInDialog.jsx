import React from 'react'
import Button from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'

function SignInDialog({openDialog,closeDialog}) {
    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription className="flex flex-col items-center justify-center">
                        <div>
                            <h2 className='font-bold text-2xl text-center text-white'>{Lookup.SIGNIN_HEADING}</h2>
                            <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
                            <Button className="bg-blue-500 text-white hover:bg-blue-400">Sign In With Google</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SignInDialog