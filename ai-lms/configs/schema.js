import { json } from "drizzle-orm/gel-core";
import { pgTable, serial, varchar, boolean, integer,text } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  isMember: boolean('is_member').default(false),
});

export const STUDY_MATERIAL_TABLE=pgTable('studyMaterialTable',{
  id:serial().primaryKey(),
  courseId:varchar().notNull(),
  courseType:varchar().notNull(),
  topic:varchar().notNull(),
  difficultyLevel:varchar().default('Easy'),
  courseLayout:json(),
  createdBy:varchar().notNull(),
  status:varchar().default('Generating')
})

export const CHAPTER_NOTES_TABLE=pgTable('chapterNotes',{
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: integer().notNull(),
  notes: text()
});

export const STUDY_TYPE_CONTENT_TABLE=pgTable('studyTypeContent',{
  id:serial().primaryKey(),
  courseId:varchar().notNull(),
  content:json(),
  type:varchar().notNull(),
  status:varchar().default('Generating')
})