import { format, parseISO, addMinutes } from 'date-fns';

export interface MeninyICSOptions {
  name: string;
  dates: string[];
  withReminder?: boolean;
  minutesBefore?: number;
  wish?: string;
}

/**
 * Generate iCal content for a name's meniny dates with AI concierge features
 */
export function makeMeninyICS(options: MeninyICSOptions): string {
  const { name, dates, withReminder = false, minutesBefore = 1440, wish } = options;
  const now = new Date();
  const uid = `meniny-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}@meniny365.sk`;
  
  let ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//meniny365.sk//Meniny Calendar//SK',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  dates.forEach(dateStr => {
    const date = parseISO(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const dtstart = `${year}${month}${day}`;
    const dtstamp = format(now, 'yyyyMMddTHHmmssZ');
    
    // Create description with wish if provided
    let description = `Meniny pre meno ${name} na Slovensku`;
    if (wish) {
      description += `\\n\\n${wish}`;
    }
    
    ics.push(
      'BEGIN:VEVENT',
      `UID:${uid}-${dtstart}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${dtstart}`,
      `DTEND;VALUE=DATE:${dtstart}`,
      `SUMMARY:Meniny - ${name}`,
      `DESCRIPTION:${description}`,
      'RRULE:FREQ=YEARLY'
    );

    // Add reminder if requested
    if (withReminder) {
      const reminderTime = addMinutes(date, -minutesBefore);
      const reminderFormatted = format(reminderTime, 'yyyyMMddTHHmmssZ');
      
      ics.push(
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `TRIGGER:-PT${minutesBefore}M`,
        `DESCRIPTION:Pripomienka: ${name} má zajtra meniny${wish ? `\\n\\n${wish}` : ''}`,
        'END:VALARM'
      );
    }

    ics.push('END:VEVENT');
  });

  ics.push('END:VCALENDAR');
  
  return ics.join('\r\n');
}

/**
 * Legacy function for backward compatibility
 */
export function generateICS(name: string, dates: string[]): string {
  return makeMeninyICS({ name, dates });
}

/**
 * Generate iCal content for a single date with multiple names
 */
export function generateICSForDate(dateStr: string, names: string[]): string {
  const now = new Date();
  const date = parseISO(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const dtstart = `${year}${month}${day}`;
  const dtstamp = format(now, 'yyyyMMddTHHmmssZ');
  const uid = `meniny-${dtstart}-${Date.now()}@meniny365.sk`;
  
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//meniny365.sk//Meniny Calendar//SK',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;VALUE=DATE:${dtstart}`,
    `DTEND;VALUE=DATE:${dtstart}`,
    `SUMMARY:Meniny - ${names.join(', ')}`,
    `DESCRIPTION:Meniny pre mená: ${names.join(', ')}`,
    'RRULE:FREQ=YEARLY',
    'END:VEVENT',
    'END:VCALENDAR'
  ];
  
  return ics.join('\r\n');
}

/**
 * Get filename for iCal download
 */
export function getICSFilename(name: string): string {
  const slug = name.toLowerCase()
    .replace(/[áä]/g, 'a')
    .replace(/[č]/g, 'c')
    .replace(/[ď]/g, 'd')
    .replace(/[ľĺ]/g, 'l')
    .replace(/[ň]/g, 'n')
    .replace(/[óô]/g, 'o')
    .replace(/[ŕ]/g, 'r')
    .replace(/[š]/g, 's')
    .replace(/[ť]/g, 't')
    .replace(/[ú]/g, 'u')
    .replace(/[ý]/g, 'y')
    .replace(/[ž]/g, 'z')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `${slug}-meniny.ics`;
}
