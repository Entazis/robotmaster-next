import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import {locales} from './translations/config';

const postsDirectory = path.join(process.cwd(), '/content/blog');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.publishDate === b.publishDate) {
      return (a.title < b.title) ? 1 : -1;
    }
    else {
      return (a.publishDate < b.publishDate) ? 1 : -1;
    }
  });
}

export function getAllPostPaths() {
  const fileNames = fs.readdirSync(postsDirectory);
  const paths = fileNames.map(fileName => {
    return locales.map(locale => {
      return {
        params: {
          lang: locale,
          id: fileName.replace(/\.md$/, '')
        }
      };
    });
  });
  return [].concat(...paths);
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
  .use(html)
  .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}

export async function getLatestPostData() {
  return getSortedPostsData()[0];
}