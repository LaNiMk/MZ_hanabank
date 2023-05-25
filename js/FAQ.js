const accordionItems = document.querySelectorAll('.accordion-item');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

accordionItems.forEach(item => {
    const title = item.querySelector('.accordion-title');
    const content = item.querySelector('.accordion-content');
  
    title.addEventListener('click', () => {
      content.classList.toggle('active');
      if (content.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }
    });
  });
  

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();

  accordionItems.forEach(item => {
    const title = item.querySelector('.accordion-title');
    const content = item.querySelector('.accordion-content');
    const question = title.innerText.toLowerCase();

    if (question.includes(searchTerm)) {
      item.style.display = 'block';
      content.classList.add('active');
    } else {
      item.style.display = 'none';
      content.classList.remove('active');
    }
  });
});