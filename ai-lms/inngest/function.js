import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { GenerateNotesAiModel, GenerateQuizAiModel, GenerateStudyTypeContentAiModel } from "@/configs/AiModel";
import { type } from "os";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello World!` };
  },
);

export const CreateNewUser=inngest.createFunction(
    {id:'create-user'},
    {event:'user.create'},
    async({event,step})=>{
        const {user}=event.data;
        //get event data
        const result=await step.run('Check User and create New if Not in DB',async()=>{
                    const result=await db.select().from(USER_TABLE)
                    .where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
            
                    console.log(result);
                    if(result?.length==0){
                        //If not then add to db
                        const userResp=await db.insert(USER_TABLE).values({
                            name:user?.fullName,
                            email:user?.primaryEmailAddress?.emailAddress
                        }).returning({id:USER_TABLE.id})
                        return userResp;
                    }
                    return result;
        })
           return 'Success';
}

    //Step is to Send welcome Email Notification

    //
)

export const GenerateNotes=inngest.createFunction(
  {id:'generate-course'},
  {event:'notes.generate'},
  async({event,step})=>{
    const {course}=event.data;

    const notesResult=await step.run('Generate chapter notes',async()=>{
      const Chapters=course?.courseLayout?.chapters;
      let index=0;
      Chapters.forEach(async(chapter) => {
        const PROMPT='Generate exam material detail content for each chapter, Mkae sure to include all topic point in the content, make sure to give content in HTML format(Do not add HTMLKL,Head,Body,title tag), The chapters:'+JSON.stringify(chapter);
        const result=await GenerateNotesAiModel.sendMessage(PROMPT);
        const aiResp=result.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId:index,
          courseId:course?.courseId,
          notes:aiResp
        })
        index=index+1;
      });
      return "Completed"
    })

    //Update status to ready
    const updateCourseStatusResult=await step.run('Update course status to ready',async()=>{
      const result=await db.update(STUDY_MATERIAL_TABLE).set({
        status:'Ready'
      }).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId));
      return 'Success';
    });

  
  }
)

//Used to generate flashcard, quiz, Question and answers
export const GenerateStudyTypeContent=inngest.createFunction(
  {id:'Generate study type content'},
  {event:'studyType.content'},

  async({event,step})=>{
    const {studyType,prompt,courseId,recordId}=event.data;

    const AiResult=await step.run('Generating flashcard using ai',async()=>{
        const result=
        studyType=='Flashcard'?
        await GenerateStudyTypeContentAiModel.sendMessage(prompt):
        await GenerateQuizAiModel.sendMessage(prompt);
        const AIResult=JSON.parse(result.response.text());
        return AIResult
    });
  

    //Save Result

    const DbResult=await step.run('Save Result to DB',async()=>{
      const result=await db.update(STUDY_TYPE_CONTENT_TABLE)
      .set({
        content:AiResult,
        status:'Ready'
      }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))

      return 'Data Inserted Successfully';
    })
  }
)