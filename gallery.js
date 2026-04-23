let current = 0;
let images = document.querySelectorAll(".gallery img");

function openLightbox(img) {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = img.src;
    current = [...images].indexOf(img);
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function next() {
    current = (current + 1) % images.length;
    document.getElementById("lightbox-img").src = images[current].src;
}

function prev() {
    current = (current - 1 + images.length) % images.length;
    document.getElementById("lightbox-img").src = images[current].src;
}

function filterImages(category) {
    images.forEach(img => {
        img.style.display = (category === "all" || img.classList.contains(category))
            ? "block" : "none";
    });
}