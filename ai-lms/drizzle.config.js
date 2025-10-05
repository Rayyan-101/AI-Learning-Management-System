import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_IegbrquGx5P0@ep-soft-sun-a15a8hrf-pooler.ap-southeast-1.aws.neon.tech/AI_LMS?sslmode=require&channel_binding=require'
  }
});