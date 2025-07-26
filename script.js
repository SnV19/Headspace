function showSection(sectionId) {
  document.body.className = '';
  document.getElementById("home").style.display = "none";

  ["idea", "debug", "curious"].forEach(id => {
    document.getElementById(id).style.display = (id === sectionId) ? "block" : "none";
  });

  if (sectionId === 'idea') document.body.classList.add('idea-bg');
  if (sectionId === 'debug') document.body.classList.add('debug-bg');
  if (sectionId === 'curious') document.body.classList.add('curious-bg');

  renderEntries(sectionId);
}

function goHome() {
  document.body.className = '';
  document.getElementById("home").style.display = "block";
  ["idea", "debug", "curious"].forEach(id => {
    document.getElementById(id).style.display = "none";
  });
}

// FORM HANDLERS
const ideaForm = document.getElementById('ideaForm');
const debugForm = document.getElementById('debugForm');
const curiousForm = document.getElementById('curiousForm');

ideaForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const entry = {
    name: ideaForm.ideaName.value,
    thought: ideaForm.ideaThought.value,
    use: ideaForm.ideaUse.value
  };
  saveEntry('ideaEntries', entry);
  ideaForm.reset();
  renderEntries('idea');
});

debugForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const entry = {
    irrational: debugForm.irrational.value,
    trigger: debugForm.trigger.value,
    rational: debugForm.rational.value
  };
  saveEntry('debugEntries', entry);
  debugForm.reset();
  renderEntries('debug');
});

curiousForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const entry = {
    question: curiousForm.question.value,
    why: curiousForm.why.value,
    learned: curiousForm.learned.value
  };
  saveEntry('curiousEntries', entry);
  curiousForm.reset();
  renderEntries('curious');
});

function saveEntry(key, entry) {
  const entries = JSON.parse(localStorage.getItem(key)) || [];
  entries.push(entry);
  localStorage.setItem(key, JSON.stringify(entries));
}

function renderEntries(type) {
  const listMap = {
    idea: document.getElementById('ideaList'),
    debug: document.getElementById('debugList'),
    curious: document.getElementById('curiousList')
  };
  const key = type + 'Entries';
  const list = listMap[type];
  const entries = JSON.parse(localStorage.getItem(key)) || [];

  list.innerHTML = '';
  entries.forEach((entry, index) => {
    const li = document.createElement('li');

    if (type === 'idea') {
      li.innerHTML = `
        <strong>${entry.name}</strong><br>
        💭 ${entry.thought}<br>
        🌱 ${entry.use}
        <button class="delete-btn" onclick="deleteEntry('${type}', ${index})">Delete</button>
      `;
    } else if (type === 'debug') {
      li.innerHTML = `
        🧠 ${entry.irrational}<br>
        ⚡ Trigger: ${entry.trigger}<br>
        🧩 Response: ${entry.rational}
        <button class="delete-btn" onclick="deleteEntry('${type}', ${index})">Delete</button>
      `;
    } else if (type === 'curious') {
      li.innerHTML = `
        ❓ ${entry.question}<br>
        🤔 Why: ${entry.why}<br>
        📘 Learned: ${entry.learned}
        <button class="delete-btn" onclick="deleteEntry('${type}', ${index})">Delete</button>
      `;
    }

    list.appendChild(li);
  });
}

function deleteEntry(type, index) {
  const key = type + 'Entries';
  const entries = JSON.parse(localStorage.getItem(key)) || [];
  entries.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(entries));
  renderEntries(type);
}
