import { format, parseISO, addDays, subDays, startOfMonth, endOfMonth, getDay, getDaysInMonth } from 'date-fns';
import { sk } from 'date-fns/locale';

export interface DayCell {
  date: string;
  day: number;
  names: string[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

/**
 * Format date for display in Slovak locale
 */
export function formatDateSlovak(date: Date | string, formatStr: string = 'd. MMMM yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: sk });
}

/**
 * Format date for URL (YYYY-MM-DD)
 */
export function formatDateForUrl(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
}

/**
 * Parse date from URL format
 */
export function parseDateFromUrl(dateStr: string): Date {
  return parseISO(dateStr);
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayString(): string {
  return formatDateForUrl(new Date());
}

/**
 * Get previous/next day
 */
export function getAdjacentDay(dateStr: string, direction: 1 | -1): string {
  const date = parseDateFromUrl(dateStr);
  const newDate = direction === 1 ? addDays(date, 1) : subDays(date, 1);
  return formatDateForUrl(newDate);
}

/**
 * Generate month matrix for calendar display
 */
export function getMonthMatrix(year: number, month: number): DayCell[] {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = endOfMonth(firstDay);
  const daysInMonth = getDaysInMonth(firstDay);
  const startWeekday = getDay(firstDay); // 0 = Sunday, 1 = Monday, etc.
  
  const matrix: DayCell[] = [];
  const today = new Date();
  const todayStr = formatDateForUrl(today);
  
  // Add days from previous month
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const prevMonthLastDay = getDaysInMonth(new Date(prevYear, prevMonth - 1, 1));
  
  for (let i = startWeekday - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const dateStr = formatDateForUrl(new Date(prevYear, prevMonth - 1, day));
    matrix.push({
      date: dateStr,
      day,
      names: [],
      isCurrentMonth: false,
      isToday: dateStr === todayStr
    });
  }
  
  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDateForUrl(new Date(year, month - 1, day));
    matrix.push({
      date: dateStr,
      day,
      names: [],
      isCurrentMonth: true,
      isToday: dateStr === todayStr
    });
  }
  
  // Add days from next month to complete the grid
  const remainingCells = 42 - matrix.length; // 6 weeks * 7 days
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  
  for (let day = 1; day <= remainingCells; day++) {
    const dateStr = formatDateForUrl(new Date(nextYear, nextMonth - 1, day));
    matrix.push({
      date: dateStr,
      day,
      names: [],
      isCurrentMonth: false,
      isToday: dateStr === todayStr
    });
  }
  
  return matrix;
}

/**
 * Get month name in Slovak
 */
export function getMonthNameSlovak(month: number): string {
  const months = [
    'január', 'február', 'marec', 'apríl', 'máj', 'jún',
    'júl', 'august', 'september', 'október', 'november', 'december'
  ];
  return months[month - 1] || '';
}

/**
 * Get day of week name in Slovak
 */
export function getDayNameSlovak(dayOfWeek: number): string {
  const days = ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota'];
  return days[dayOfWeek] || '';
}
