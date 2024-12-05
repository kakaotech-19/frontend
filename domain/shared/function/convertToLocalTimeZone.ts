export function convertToLocalTimezone(date: Date): string {
    console.log("convertToLocalTimezone pivot date="+date.toISOString());
    try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // 해당 시간대에 맞는 formatter 생성
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZoneName: 'shortOffset',
            fractionalSecondDigits: 3  // 밀리초 표시를 위해 추가
        });

        // 시간대 오프셋 추출 (예: "+09:00")
        const parts = formatter.formatToParts(date);
        const timeZonePart = parts.find(part => part.type === 'timeZoneName')?.value || '+00:00';

        // 날짜와 시간을 ISO 형식으로 포맷팅
        const localDate = new Date(date.toLocaleString('en-US', { timeZone }));
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

        const isoDate = localDate.getFullYear().toString().padStart(4, '0') + '-' +
            String(localDate.getMonth() + 1).padStart(2, '0') + '-' +
            String(localDate.getDate()).padStart(2, '0') + 'T' +
            String(localDate.getHours()).padStart(2, '0') + ':' +
            String(localDate.getMinutes()).padStart(2, '0') + ':' +
            String(localDate.getSeconds()).padStart(2, '0') + '.' +
            milliseconds +
            timeZonePart;

        return isoDate;
    } catch (error) {
        console.error('Time conversion error:', error);
        return date.toISOString();
    }
}