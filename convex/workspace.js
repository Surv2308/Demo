import { v } from "convex/values";
import { mutation,query } from "./_generated/server";

export const CreateWokspace=mutation({
    args:{
        message:v.any(),
        user:v.id('users')
    },
    handler:async(convexToJson,args)=>{
        const workspaceId=await convexToJson.db.insert('workspace',{
            message:args.message,
            user:args.user
        });
        return workspaceId;
    }
})

export const GetWorkspace=query({
    args:{
        workspaceId:v.id('workspace')
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.get(args.workspaceId);
        return result;
    }
})

export const UpdateMessage=mutation({
    args:{
        workspaceId:v.id('workspace'),
        message:v.any()
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.patch(args.workspaceId,{
            message:args.message
        });
        return result;
    }
})

export const UpdateFiles=mutation({
    args:{
        workspaceId:v.id('workspace'),
        files:v.any()
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.patch(args.workspaceId,{
            fileData:args.files
        });
        return result;
    }
})