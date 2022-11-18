export const scrolly = (action, location) => {
  if (action === 'navigate') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  console.log('lesgooooo')

  action(location)
}

export function scrollTop() {
  console.log('scroll top')
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
