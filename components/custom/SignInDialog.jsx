import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import axios from 'axios'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useMutation } from 'convex/react'

function SignInDialog({ openDialog, closeDialog }) {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const CreateUser = useMutation(api.user.CreateUser);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer' + tokenResponce?.access_token } },
            );
            console.log(userInfo);
            const user = userInfo.data;
            await CreateUser({
                name: user.name,
                email: user.email,
                picture: user.picture,
                uid: uuid()
            })

            if(typeof window !== 'undefined'){
                localStorage.setItem('user',JSON.stringify(user));//userInfo.data
            }

            setUserDetail(userInfo?.data);
            //Save this inside out Database
            closeDialog(false);
        },
        onError: errorResponse => console.log(errorResponse),
    });
    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription className="flex flex-col items-center justify-center gap-3">
                        <div>
                            <h2 className='font-bold text-2xl text-center text-white'>{Lookup.SIGNIN_HEADING}</h2>
                            <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
                            <Button className="bg-blue-500 text-white hover:bg-blue-400 mt-3" onClick={googleLogin}
                            >Sign In With Google</Button>
                            <p>{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SignInDialog