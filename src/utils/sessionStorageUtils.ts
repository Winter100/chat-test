export const saveTokenToSession = (tokenData: string) => {
  sessionStorage.setItem('token', JSON.stringify(tokenData));
};

export const getTokenFromSession = () => {
  const tokenString = sessionStorage.getItem('token');
  if (tokenString) {
    try {
      return JSON.parse(tokenString);
    } catch (error) {
      return null;
    }
  }
  return null;
};

export const removeTokenFromSession = () => {
  sessionStorage.removeItem('token');
};
