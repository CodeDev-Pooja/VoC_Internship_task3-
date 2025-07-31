// Handle dark mode toggle
const themeToggleBtn = document.getElementById('toggle-theme');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}

// Handle enter key on input
const input = document.getElementById('identifier');
if (input) {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') verifyStudent();
  });
}

function verifyStudent() {
  const idInput = document.getElementById('identifier');
  const id = idInput.value.trim();
  const resultBox = document.getElementById('result');
  const chartCanvas = document.getElementById('assignmentChart');

  if (!id) return alert('Please enter a valid Email or ID');

  showSpinner(true);
  resultBox.innerHTML = '';
  chartCanvas.classList.add('hidden');

  setTimeout(() => {
    const student = {
      name: "John Doe",
      email: "john@example.com",
      mobile: "9876543210",
      domain: "Web Development",
      college: "Dummy University",
      start: "01 July 2025",
      duration: "1 Month",
      photo: "Assest\student-photo.png",
      assignments: [true, false, true, true],
      certificate: "demo-certificate.jpg"
    };

    const html = `
      <div class="card">
        <img src="${student.photo}" alt="Photo" />
        <h3>${student.name}</h3>
        <p>Email: ${student.email}</p>
        <p>Mobile: ${student.mobile}</p>
        <p>Domain: ${student.domain}</p>
        <p>College: ${student.college}</p>
        <p>Start Date: ${student.start}</p>
        <p>Duration: ${student.duration}</p>
        <h4>Assignment Status</h4>
        <div class="assignment-status">
          ${student.assignments.map((done, i) => `<span>A${i + 1}: ${done ? '✅' : '❌'}</span>`).join('')}
        </div>
        <p>Status: Completed</p>
        <a href="#" onclick="showCertificate()">View Certificate</a>
      </div>
    `;

    resultBox.innerHTML = html;
    showSpinner(false);
    showToast('✅ Dummy student data loaded.');

    const completed = student.assignments.filter(a => a).length;
    const pending = student.assignments.length - completed;
    chartCanvas.classList.remove('hidden');
    new Chart(chartCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending'],
        datasets: [{
          data: [completed, pending],
          backgroundColor: ['#2ecc71', '#e74c3c'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }, 1200);
}

function showCertificate() {
  document.getElementById('certificateModal').classList.remove('hidden');
}

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('certificateModal').classList.add('hidden');
});

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.className = 'toast show';
  setTimeout(() => toast.className = 'toast', 3000);
}

function showSpinner(show) {
  const spinner = document.querySelector('.spinner');
  spinner.style.display = show ? 'block' : 'none';
}
