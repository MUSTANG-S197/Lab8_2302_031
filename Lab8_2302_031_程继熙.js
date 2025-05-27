const students = [
    "张三", "李四", "王五", "赵六", "钱七", 
];

const studentsList = document.getElementById('studentsList');
const selectedStudent = document.getElementById('selectedStudent');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

let isRunning = false;
let intervalId = null;
let currentStudent = null;

function initStudentsList() {
    studentsList.innerHTML = students.map(student => 
        `<div class="student-item">${student}</div>`
    ).join('');
}

function getRandomStudent() {
    return Math.floor(Math.random() * students.length);
}

function updateHighlight(index) {
    document.querySelectorAll('.student-item').forEach(item => {
        item.classList.remove('highlight');
    });
    const items = document.querySelectorAll('.student-item');
    if (items[index]) {
        items[index].classList.add('highlight');
        currentStudent = students[index];
        selectedStudent.textContent = currentStudent;
    }
}

function startRandomSelection() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    let speed = 100;
    let lastUpdate = Date.now();
    
    function run() {
        if (Date.now() - lastUpdate >= speed) {
            updateHighlight(getRandomStudent());
            lastUpdate = Date.now();
            speed = Math.min(speed + 10, 200);
        }
        if (isRunning) requestAnimationFrame(run);
    }
    
    intervalId = requestAnimationFrame(run);
}

function stopRandomSelection() {
    if (!isRunning) return;
    
    isRunning = false;
    cancelAnimationFrame(intervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    if (currentStudent) {
        selectedStudent.textContent = currentStudent;
        selectedStudent.classList.add('final-selection');
        setTimeout(() => {
            selectedStudent.classList.remove('final-selection');
        }, 500);
    }
}

startBtn.addEventListener('click', startRandomSelection);
stopBtn.addEventListener('click', stopRandomSelection);

initStudentsList();