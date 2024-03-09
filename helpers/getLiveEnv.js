export const getLiveEnv = () => {
  const url = window.location.href;
  if (url.includes('localhost') || url.includes('dev')) {
    return 'dev';
  } else if (url.includes('qa')) {
    return 'qa';
  } else if (url.includes('demo')) {
    return 'demo';
  } else {
    return 'prod';
  }
};
