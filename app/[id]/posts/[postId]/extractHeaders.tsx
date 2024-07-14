import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

export default async function extractHeaders(markdown: string) {
  const headers: { id: string; text: string }[] = [];
  const processor = remark().use(remarkGfm);
  const file = await processor.process(markdown);
  const tree = processor.parse(file);

  visit(tree, 'heading', (node: any) => {
    const text = node.children.map((child: any) => child.value).join('');
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-가-힣]/g, ''); // 비영어 문자도 포함
    headers.push({ id, text });
  });

  return headers;
}
