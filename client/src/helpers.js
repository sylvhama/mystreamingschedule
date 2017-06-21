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

export function isFavorite(id) {
  const favorites = this.state.favorites;
  if(favorites === false) return false;
  const index = favorites.indexOf(id);
  return index;
} 

export function toggleFavorite(id) {
  if(this.state.favorites === false) return;
  const favorites = [...this.state.favorites],
        index = this.isFavorite(id);
  if(index === -1) favorites.push(id);
  else favorites.splice(index, 1);
  fetch(`/favorites/${this.props.twitch_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      favorites
    }),
    ...fetchOptions
  })
  .then((res) => res.json())
  .then((json) => {
    if(json.error) this.props.displayMsg(json.error, true, json);
    else {
      this.setState({
        favorites
      })
    }
  })
  .catch((err) => this.props.displayMsg('An error has occured', true, err));
}
