// Force a scroll to top with navigate... or perhaps more?
export const scrolly = (action, location) => {
  if (action === 'navigate') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  action(location)
}

// If if you don't want to navigate with scrolly
export function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
