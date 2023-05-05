export function notification(message) {

    const element = document.querySelector('.notification');
    element.firstElementChild.textContent = message;

    element.style.display = 'block';

    setTimeout(() => element.style.display = 'none', 3000);
}
