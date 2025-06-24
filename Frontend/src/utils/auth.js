import Cookies from 'js-cookie';

export const getUserIdFromToken = () => {
  const token = Cookies.get('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id; 
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
};
