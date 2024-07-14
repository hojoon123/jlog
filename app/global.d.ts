// global.d.ts
declare module 'react-markdown' {
    import * as React from 'react';
  
    export interface ReactMarkdownProps {
      children: string;
      remarkPlugins?: any[];
      rehypePlugins?: any[];
      components?: { [key: string]: React.ElementType };
    }
  
    const ReactMarkdown: React.FC<ReactMarkdownProps>;
    export default ReactMarkdown;
  }
  
  declare module 'rehype-raw';
  declare module 'remark-gfm';
  declare module 'highlight.js' {
    export function highlight(
      code: string,
      options: { language: string }
    ): { value: string };
  }
  