export const scrollNavigate = (action, location) => {
    if (action === 'navigate') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    
    action(location)
}

export function scrollTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}