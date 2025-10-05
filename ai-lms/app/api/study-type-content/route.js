import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    // const {chapters,courseId,type}=await req.json();
    const body = await req.json();
    console.log("Request body:", body);
    const { chapters, courseId, type } = body;
    const PROMPT=type==='Flashcard'?
    `Generate flashcard on topic: ${chapters} in JSON format with front back content, Maximum 15`:
    `generate quiz on topic: ${chapters} with question and options along with
 answer in JSON format`

    //Insert data to database, Update status to generating
    const result=await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId:courseId,
        type:type
    }).returning({id:STUDY_TYPE_CONTENT_TABLE.id})


    //Trigger Inngest Function
    inngest.send({
        name:'studyType.content',
        data:{
            studyType:type,
            prompt:PROMPT,
            courseId:courseId,
            recordId:result[0].id
        }
    })
    return NextResponse.json(result[0].id)
}