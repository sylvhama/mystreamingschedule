import React from 'react';

const style = {
  twitch: {
    display: 'inline-block',
    verticalAlign: 'middle'
  }
}

const twitch = () => ( 
  <svg style={style.twitch} fill="#fff" width="24" height="24" viewBox="0 0 32 32">
    <path d="M3 0l-3 5v23h8v4h4l4-4h5l9-9v-19h-27zM26 17l-5 5h-5l-4 4v-4h-6v-18h20v13z"></path>
    <path d="M19 8h3v8h-3v-8z"></path>
    <path d="M13 8h3v8h-3v-8z"></path>
  </svg>
);

export default twitch;
