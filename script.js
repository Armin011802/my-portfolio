// Optional enhancement: typing animation cycle
console.log("PROJECT JS RUNNING");

const subtitle = document.querySelector(".subtitle");
const roles = ["Virtual Assistant", "Social Media Manager", "Web Development", "Graphic Designer"];
let index = 0;

setInterval(() => {
  subtitle.textContent = roles[index];
  index = (index + 1) % roles.length;
}, 2500);

const navLinks = document.querySelectorAll('.nav-links a');

// Highlight the clicked link 
navLinks.forEach(
 link => { link.addEventListener('click', function() { 
  navLinks.forEach(l => l.classList.remove('active'));    
  this.classList.add('active'); 
 }); 
}); 

// Highlight the section while scrolling
window.addEventListener('scroll', () => { 
 let fromTop = window.scrollY + 150; 

navLinks.forEach(link => { 
 const section = document.querySelector(link.getAttribute('href')); 
 if ( 
  section.offsetTop <= fromTop && 
  section.offsetTop + section.offsetHeight > fromTop 
 ) { 
  navLinks.forEach(l => l.classList.remove('active'));
link.classList.add('active'); 
 } 
}); 
});
// ===== Google Sheets Projects Loader =====
const SHEET_ID = "1EP1JKIE32YI3_Sy07zarMkRGnoepnCNAS8VM-ZiQHlY";
const SHEET_NAME = "Sheet1";
const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

async function loadProjects() {
  const projectGrid = document.getElementById("project-grid");

  try {
    const response = await fetch(SHEET_URL);
    const projects = await response.json();

    projectGrid.innerHTML = "";

    projects.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("project-card");

     card.innerHTML = `
  <img 
    src="${project.Image || project.image}" 
    class="project-img"
    loading="lazy"
    onerror="this.src='images/fallback.jpg'">

  <h3>${project.Title || project.title}</h3>
  <p>${project.Description || project.description}</p>

  <a href="${project.Link || project.link}" target="_blank" class="btn">
    View Project
  </a>
`;

      projectGrid.appendChild(card);
    });

  } catch (error) {
    projectGrid.innerHTML = "<p>Failed to load projects.</p>";
    console.error(error);
  }
}

loadProjects();

// ===== Google Sheets Skills Loader =====
const SKILL_SHEET = "Skills";
const SKILL_URL = `https://opensheet.elk.sh/${SHEET_ID}/${SKILL_SHEET}`;

async function loadSkills() {
  const skillsGrid = document.querySelector(".skills-grid");
  if (!skillsGrid) return;

  try {
    const response = await fetch(SKILL_URL);
    const skills = await response.json();

    skillsGrid.innerHTML = "";

    skills.forEach(skill => {
      const level = Number(skill.Level) || 0;

      const card = document.createElement("div");
      card.classList.add("skill-card");

      card.innerHTML = `
  <img src="${skill.Icon}" class="skill-icon">

  <h3>${skill.Skill}</h3>

  <div class="bar">
    <div class="fill" style="width:${skill.Level}%"></div>
  </div>

  <p>${skill.Level}%</p>
`;

      skillsGrid.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    skillsGrid.innerHTML = "<p>Failed to load skills.</p>";
  }
}

loadSkills();