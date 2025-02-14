import { z } from "astro/zod";
export const topicSchema = z.object({});
export type TopicFrontmatterSchema = z.input<typeof topicSchema>;
