import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function getTimeAgo(createdAt: string): string {
    const postDate = new Date(createdAt);
    const now = new Date();
    const diffInDays = (now.getTime() - postDate.getTime()) / (1000 * 3600 * 24);
    return diffInDays < 7
      ? formatDistanceToNow(postDate, { addSuffix: true, locale: ko })
      : format(postDate, 'yyyy-MM-dd', { locale: ko });
  };