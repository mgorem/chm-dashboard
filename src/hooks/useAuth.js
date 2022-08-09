export const useAuth = (idToken) => {
  return sessionStorage.getItem(idToken);
};
