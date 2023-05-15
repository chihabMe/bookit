import { CommentRate } from "@prisma/client";


const values = [1,2,3,4,5]
const vlauesAsStr:CommentRate[]=["ONE","TWO","THREE","FOUR","FIVE"]
export const getValueFromEnum = (en:CommentRate)=>{
    const idx = vlauesAsStr.indexOf(en)
    if(idx<0)return null
    const vl = values[idx]
    if(!vl)return null
    return vl



}
export const getEnumFromValue=(value:number):CommentRate|null=>{
    const idx = values.indexOf(value)
    if(idx<0)return null
     const en  =  vlauesAsStr[idx] 
     if(!en)return null
     return en

}