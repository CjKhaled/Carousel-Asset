const pictures = [...document.querySelectorAll(".picture")];
const dots = [...document.querySelectorAll(".dot")];
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
let currentPicture = 0; // This acts as the index for our slides array
const slides = [];

class slide {
  constructor(picture, dot) {
    this.picture = picture;
    this.dot = dot;
    this.active = this.initialStatus(picture.classList[1]);
    this.unselectedDot = '<svg width="26px" id="circle" height="26px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 9.125C8.39746 9.125 9.125 8.39746 9.125 7.5C9.125 6.60254 8.39746 5.875 7.5 5.875C6.60254 5.875 5.875 6.60254 5.875 7.5C5.875 8.39746 6.60254 9.125 7.5 9.125ZM7.5 10.125C8.94975 10.125 10.125 8.94975 10.125 7.5C10.125 6.05025 8.94975 4.875 7.5 4.875C6.05025 4.875 4.875 6.05025 4.875 7.5C4.875 8.94975 6.05025 10.125 7.5 10.125Z" fill="#000000"></path> </g></svg>'
    this.selectedDot = '<svg id="circle" width="26px" height="26px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z" fill="#000000"></path> </g></svg>'
    this.setDot();
    this.dot.addEventListener('click', (e) => {
        if (!this.active) {
            currentPicture = e.target.parentNode.id
            updatePicture();
        }
    })
  }

  initialStatus(status) {
    if (status == "active") {
        return true;
      } else return false;
  }

  setStatus(activeSlide) {
    if (activeSlide) {
        this.picture.className = 'picture active'
        this.active = true;
        this.setDot();
    } else {
        this.picture.className = 'picture inactive'
        this.active = false;
        this.setDot();
    }
  }

  setDot() {
    if (!this.active) {
        this.dot.innerHTML = this.unselectedDot
    } else {
        this.dot.innerHTML = this.selectedDot
    }
  }
  
}

for (let i = 0; i < pictures.length; i++) {
    const newSlide = new slide(pictures[i], dots[i]);
    slides.push(newSlide)
}

function updatePicture() {
    for (let i = 0; i < pictures.length; i++) {
        if (i == currentPicture) {
            slides[i].setStatus(true);
        } else {
            slides[i].setStatus(false);
        }
    }
}

function goRight() {
    if (currentPicture !== pictures.length - 1) {
        currentPicture++;
        updatePicture();
    } else {
        currentPicture = 0;
        updatePicture();
    }
}

function goLeft() {
    if (currentPicture !== 0) {
        currentPicture--;
        updatePicture();
    } else {
        currentPicture = 4;
        updatePicture();
    }
}

rightArrow.addEventListener('click', () => {
    goRight();
});

leftArrow.addEventListener('click', () => {
    goLeft();
})

setInterval(goRight, 5000);