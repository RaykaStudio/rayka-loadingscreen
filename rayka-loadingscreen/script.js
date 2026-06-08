let totalFiles = 0;
let loadedFiles = 0;

const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value; 
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const safePercent = Math.max(0, Math.min(Math.round(percent), 100));
    const offset = circumference - (safePercent / 100 * circumference);
    
    circle.style.strokeDashoffset = offset;
    const progressText = document.getElementById('progress-text');
    if (progressText) {
        progressText.innerText = safePercent + '%';
    }
}

window.addEventListener('message', function(e) {
    const data = e.data;

    if (data.type === 'initFunctionInvoking') {
        if (data.name === 'startDataFileEntries') {
            totalFiles = data.count;
        }
    }
    
    if (data.direction === 'progress') {
        loadedFiles++;
        if (totalFiles > 0) {
            let progress = (loadedFiles / totalFiles) * 100;
            setProgress(progress);
        }
    }

    if (data.eventName === 'loadProgress') {
        let progress = data.progress * 100;
        setProgress(progress);
    }
});

function openTab(tabName, element) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(tab => tab.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    if (element) {
        element.classList.add('active');
    }
}

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });
    }
});

function setupCursorInteractions() {
    const interactiveElements = document.querySelectorAll('button, .info-item, .team-member, li');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            if (cursorOutline && cursorDot) {
                cursorOutline.classList.add('cursor-active');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursorOutline && cursorDot) {
                cursorOutline.classList.remove('cursor-active');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        const music = document.getElementById('bg-music');
        if (music) { 
            music.muted = !music.muted; 
        }
    }
});

window.onload = function() {
    const music = document.getElementById('bg-music');
    if (music) {
        music.volume = 0.4;
    }
    
    setupCursorInteractions();
};