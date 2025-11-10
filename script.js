// Carousel functionality
window.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.carousel-img');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  let current = 0;

  function showSlide(idx) {
    images.forEach((img, i) => {
      img.style.display = i === idx ? 'block' : 'none';
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-gray-400', i === idx);
      dot.classList.toggle('bg-gray-300', i !== idx);
    });
    current = idx;
  }

  prevBtn.onclick = () => {
    showSlide((current - 1 + images.length) % images.length);
  };
  nextBtn.onclick = () => {
    showSlide((current + 1) % images.length);
  };
  dots.forEach((dot, i) => {
    dot.onclick = () => showSlide(i);
  });
  showSlide(0);

  // Infinite vertical scroll for hero image grid (JS-based)
  const columns = document.querySelectorAll('#image-carousel > .grid');
  columns.forEach((col) => {
    const items = Array.from(col.children);
    let positions = items.map((item, i) => i * (item.offsetHeight + 32)); // 32px gap-y
    let speed = 0.5; // px per frame
    function animate() {
      positions = positions.map(pos => pos - speed);
      items.forEach((item, i) => {
        item.style.transform = `translateY(${positions[i]}px)`;
      });
      // If an item is out of view, move it to bottom
      items.forEach((item, i) => {
        if (positions[i] + item.offsetHeight < -32) {
          // Find max position
          const maxPos = Math.max(...positions);
          positions[i] = maxPos + item.offsetHeight + 32;
        }
      });
      requestAnimationFrame(animate);
    }
    items.forEach(item => { item.style.transition = 'none'; });
    animate();
  });
});
