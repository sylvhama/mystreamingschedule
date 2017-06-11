export function getCookie(k){return(document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2]}

export function labelWithCounter(length, max, text) {
  return `${text} ${length}/${max}`;
}

export const fetchOptions = {
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};