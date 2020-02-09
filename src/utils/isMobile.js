const mobileThreshold = 500;

const isMobile = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < mobileThreshold) {
      return true;
    }
  }
  return false;
};

export default isMobile;
