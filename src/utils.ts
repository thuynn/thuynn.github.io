import { getCollection } from 'astro:content';

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const readingTime = (text: string) => Math.max(1, Math.round(text.split(/\s+/).length / 220));

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getWork() {
  const work = await getCollection('work', ({ data }) => import.meta.env.DEV || !data.draft);
  return work.sort((a, b) => a.data.order - b.data.order);
}
