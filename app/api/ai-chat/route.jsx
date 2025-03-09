import { chatSession } from "@/configs/AiModel";

export async function POST(req) {
    const {prompt} = await req.json();

    try{
        const result=await chatSession.sendMessage(prompt);
        const AIResp=result.responce.text();

        return NextResponce.json({
            result:AIResp
        })
    }catch(e){
        return NextResponce.json({
            error:e
        })
    }
}