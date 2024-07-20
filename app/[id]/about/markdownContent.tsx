'use client';

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Add your desired highlight.js theme here
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  bio: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ bio }) => {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <pre>
                <code
                  className={`hljs ${className}`}
                  {...props}
                  dangerouslySetInnerHTML={{
                    __html: hljs.highlight(children?.toString(), {
                      language: match[1],
                    }).value,
                  }}
                />
              </pre>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {bio}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
