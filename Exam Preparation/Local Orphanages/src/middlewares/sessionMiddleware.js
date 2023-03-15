import { getUserData } from "../api/utils.js";


export function addSession(ctx, next){
    ctx.user = getUserData();

    next();
}