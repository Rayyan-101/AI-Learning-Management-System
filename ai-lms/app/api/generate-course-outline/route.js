import { courseOutline } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req){
    const {courseId,topic,courseType,difficultyLevel,createdBy} = await req.json();

    const PROMPT='Generate a study material for' + topic + 'for' + courseType + ' and level of difficulty will be' + difficultyLevel + '. Output should be in JSON format with course_title, difficulty, summary, chapters (each with title, summary, and list of topics).'
    
    const aiResp=await courseOutline.sendMessage(PROMPT);
    let rawText = await aiResp.response.text();
    const aiResult= JSON.parse(rawText);

    //Save the result along with User Input
    const dbResult=await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseId,
        courseType:courseType,
        createdBy:createdBy,
        topic:topic,
        courseLayout:aiResult
    }).returning({resp:STUDY_MATERIAL_TABLE})

    //Trigger ingest function to generate chapter notes

    const result=await inngest.send({
        name:'notes.generate',
        data:{
            course:dbResult[0].resp
        }
    })
    console.log(result);

    return NextResponse.json({result:dbResult[0]});
}