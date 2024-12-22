export const setRefreshTokenToLS = (refresh_token) => {
  localStorage.setItem("refresh_token", refresh_token);
};
export const setAccessTokenToLS = (access_token) => {
  localStorage.setItem("access_token", access_token);
};
export const getAccessTokenFormLS = () => {
  return localStorage.getItem("access_token") || "";
};
export const clearFormLS = () => {
  localStorage.removeItem("refresh_token"),
    localStorage.removeItem("profile"),
    localStorage.removeItem("access_token");
};
export const getRefreshTokenFormLS = () => {
  return localStorage.getItem("refresh_token") || "";
};
export const getProfilefromLS = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};
export const setProfileToLS = (profile) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};
