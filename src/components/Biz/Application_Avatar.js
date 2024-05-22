import React from 'react';

const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const getInitials = (name) => {
  const splitName = name.split(' ')
    .filter(n => n !== '')
    .map(n => n[0].toUpperCase());
  if (splitName.length > 1) {
    return splitName[0] + splitName[1];
  } else {
    return splitName[0] + splitName[0]; 
  }
};

const Avatar = ({ name, size = 50 }) => {
  const initials = getInitials(name);
  const backgroundColor = stringToColor(name);

  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      backgroundColor,
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: `${size / 2}px`,
      fontWeight: 'bold'
    }}>
      {initials}
    </div>
  );
};

export default Avatar;
