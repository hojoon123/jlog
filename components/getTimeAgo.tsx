import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function getTimeAgo(createdAt: string): string {
  const postDate = new Date(createdAt);
  const kstDate = new Date(postDate.getTime() + 9 * 60 * 60 * 1000);
  const now = new Date();

  // 시간차 계산
  const diffInDays = (now.getTime() - postDate.getTime()) / (1000 * 3600 * 24);

  // 시간차가 7일 미만일 경우 상대적인 시간 표시, 그 외에는 절대적인 날짜 표시
  return diffInDays < 7
    ? formatDistanceToNow(postDate, { addSuffix: true, locale: ko })
    : format(kstDate, 'yyyy-MM-dd', { locale: ko });
}

