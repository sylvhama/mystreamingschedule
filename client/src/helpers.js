export function getCookie(k){return(document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2]}

export function labelWithCounter(length, max, text) {
  return `${text} ${length}/${max}`;
}

export function formatTime(hour, min) {
  const suffix = (hour >= 12) ? 'pm' : 'am';
  let h = (hour === 0) ?  hour : 12,
      m = min.toString();
  h = (hour > 12) ? (hour-12).toString() : hour.toString();
  if(h.length === 1) h = '0'+h;
  if(m.length === 1) m = '0'+m;
  return `${h}:${m} ${suffix}`;
}

export const fetchOptions = {
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}
