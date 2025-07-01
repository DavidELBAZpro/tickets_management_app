import { formatDistanceToNow, format } from 'date-fns';

export const formatCreatedAt = (dateString: string): string => {
  const date = new Date(dateString);
  
  // If the date is within the last week, show relative time
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  if (date > oneWeekAgo) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  
  // Otherwise show formatted date
  return format(date, 'MMM d, yyyy');
};
