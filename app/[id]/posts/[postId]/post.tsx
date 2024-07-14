// post.tsx
'use client';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // 스타일 시트 추가
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Header from './header';

interface PostProps {
  post: {
    title: string;
    tags: string[];
    markdown: string;
    userName: string;
    timeAgo: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <article className="w-full max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <Header title={post.title} userName={post.userName} timeAgo={post.timeAgo} tags={post.tags} />
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
          {post.markdown}
        </ReactMarkdown>
      </div>
    </article>
  );
}
