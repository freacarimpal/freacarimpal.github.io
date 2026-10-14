
"use strict";

// Portfolio information
const portfolioData = {
  name: "Freda A. Carimpal",
  tagline: "BS Information Technology Student",

  introduction:
    "I enjoy learning technology and building useful applications.",

  profileImage: "images/fre.jpg",

  about: {
    biography:
      "I am a second-year BS Information Technology student. " +
      "I enjoy learning about programming, computers, and networking.",

    program: "Bachelor of Science in Information Technology",

    school:
      "Nueva Vizcaya State University - Bambang Campus",

    graduation: "Expected Graduation: 2028",

    careerGoal:
      "To become a skilled IT professional and web developer.",

    interests:
      "Coding, web development, computers, and learning new technologies."
  },

  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "Java",
    "GitHub"
  ],

  projects: [
    {
      title: "Student Portfolio Website",

      description:
        "A personal website that introduces me and shows my skills and projects.",

      technologies: "HTML, CSS, JavaScript",

      role: "Student Developer",

      image:
        "https://placehold.co/600x300/eff6ff/1d4ed8?text=Student+Portfolio",

{
  title: "My Portfolio",

  description:
    "My personal portfolio website that introduces me, shows my skills, educational background, and projects as a BS Information Technology student.",

  technologies: "HTML, CSS, JavaScript",

  role: "Student Developer",

  image:
    "https://placehold.co/600x300/eff6ff/1d4ed8?text=My+Portfolio",

  link: ""
    }

    {
      title: "Java Programming Project",

      description:
        "A Java project created to practice programming fundamentals.",

      technologies: "Java",

      role: "Student Developer",

      image:
        "https://placehold.co/600x300/e0e7ff/172554?text=Java+Project",

      link: ""
    }
  ],

  contact: {
    email: "carimpalf@gmail.com",
    location: "Dupax del Norte, Nueva Vizcaya",
    linkedin: "https://www.linkedin.com/"
  },

  githubUsername: "freacarimpal"
};

// Start website features
document.addEventListener("DOMContentLoaded", function () {
  loadPortfolio();
  setupContactForm();
  setupBackToTop();
});

// Load portfolio information
function loadPortfolio() {
  const data = portfolioData;

  document.getElementById("studentName").textContent =
    data.name;

  document.getElementById("tagline").textContent =
    data.tagline;

  document.getElementById("introduction").textContent =
    data.introduction;

  const profileImage =
    document.getElementById("profileImage");

  profileImage.src = data.profileImage;

  profileImage.onerror = function () {
    profileImage.onerror = null;
    profileImage.src =
      "https://placehold.co/280x280/eff6ff/1d4ed8?text=My+Photo";
  };

  document.getElementById("biography").textContent =
    data.about.biography;

  document.getElementById("education").textContent =
    data.about.program + " - " + data.about.school;

  document.getElementById("graduation").textContent =
    data.about.graduation;

  document.getElementById("careerGoal").textContent =
    data.about.careerGoal;

  document.getElementById("interests").textContent =
    data.about.interests;

  // Contact information
  const emailLink =
    document.getElementById("contactEmail");

  emailLink.textContent = data.contact.email;
  emailLink.href = "mailto:" + data.contact.email;

  document.getElementById("contactLocation").textContent =
    "Location: " + data.contact.location;

  // Validate LinkedIn URL
  const linkedinLink =
    document.getElementById("linkedinLink");

  try {
    const linkedin = new URL(data.contact.linkedin);

    if (
      linkedin.protocol === "https:" &&
      linkedin.hostname === "www.linkedin.com"
    ) {
      linkedinLink.href = linkedin.href;
    }
  } catch (error) {
    console.info("Invalid LinkedIn URL.");
  }

  // Footer
  document.getElementById("footerText").textContent =
    "\u00A9 " + new Date().getFullYear() +
    " " + data.name + " | Student Portfolio";

  // Display skills and projects
  displaySkills(data.skills);
  displayProjects(data.projects);

  // Load GitHub repositories
  loadGitHubRepositories(data.githubUsername);
}

// Display skills
function displaySkills(skills) {
  const container =
    document.getElementById("skillsContainer");

  container.replaceChildren();

  skills.forEach(function (skill) {
    const card = document.createElement("div");

    card.className = "skill-card";
    card.textContent = skill;

    container.appendChild(card);
  });
}

// Display projects
function displayProjects(projects) {
  const container =
    document.getElementById("projectsContainer");

  const message =
    document.getElementById("projectsMessage");

  container.replaceChildren();

  if (!projects || projects.length === 0) {
    message.textContent =
      "No projects are available at the moment.";
    return;
  }

  message.textContent = "";

  projects.forEach(function (project) {
    const card = document.createElement("article");
    card.className = "project-card";

    const image = document.createElement("img");

    image.src = project.image;
    image.alt = "Screenshot of " + project.title;
    image.loading = "lazy";

    image.onerror = function () {
      image.onerror = null;
      image.src =
        "https://placehold.co/600x300/eff6ff/1d4ed8?text=Project";
    };

    const content = document.createElement("div");
    content.className = "project-content";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const technologies = document.createElement("p");
    technologies.className = "project-tech";
    technologies.textContent =
      "Technologies: " + project.technologies;

    const role = document.createElement("p");
    role.textContent = "My Role: " + project.role;

    content.append(
      title,
      description,
      technologies,
      role
    );

    // Add project link if provided
    if (project.link) {
      try {
        const projectURL = new URL(project.link);

        if (projectURL.protocol === "https:") {
          const link = document.createElement("a");

          link.href = projectURL.href;
          link.textContent = "View Project";
          link.className = "project-link";
          link.target = "_blank";
          link.rel = "noopener noreferrer";

          content.appendChild(link);
        }
      } catch (error) {
        console.info("Invalid project link.");
      }
    }

    card.append(image, content);
    container.appendChild(card);
  });
}

// Load public GitHub repositories
async function loadGitHubRepositories(username) {
  const container =
    document.getElementById("githubRepos");

  const message =
    document.getElementById("githubMessage");

  const profileLink =
    document.getElementById("githubProfile");

  container.replaceChildren();

  if (!username || !/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
    message.textContent = "Please enter a valid GitHub username.";
    return;
  }

  profileLink.href =
    "https://github.com/" + encodeURIComponent(username);

  message.textContent = "Loading GitHub repositories...";

  try {
    const apiURL =
      "https://api.github.com/users/" +
      encodeURIComponent(username) +
      "/repos?sort=updated&per_page=5&type=public";

    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error("GitHub API request failed.");
    }

    const repositories = await response.json();

    if (!Array.isArray(repositories) || repositories.length === 0) {
      message.textContent = "No public repositories were found.";
      return;
    }

    message.textContent = "";

    repositories.forEach(function (repo) {
      const item = document.createElement("li");

      const link = document.createElement("a");
      link.href = repo.html_url;
      link.textContent = repo.name;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const language = document.createElement("p");
      language.className = "repository-language";

      language.textContent =
        "Main language: " + (repo.language || "Not specified");

      item.append(link, language);
      container.appendChild(item);
    });
  } catch (error) {
    console.error("GitHub error:", error);

    message.textContent =
      "GitHub repositories are unavailable. Check your username or try again later.";
  }
}

// Validate contact form
function setupContactForm() {
  const form = document.getElementById("contactForm");

  const feedback = document.getElementById("formFeedback");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      feedback.textContent =
        "Please complete all fields correctly.";
      return;
    }

    const visitorName =
      document.getElementById("visitorName").value.trim();

    const visitorEmail =
      document.getElementById("visitorEmail").value.trim();

    const visitorMessage =
      document.getElementById("visitorMessage").value.trim();

    if (
      visitorName.length < 2 ||
      visitorEmail.length === 0 ||
      visitorMessage.length < 10
    ) {
      feedback.textContent =
        "Enter a valid name, email, and message of at least 10 characters.";
      return;
    }

    feedback.textContent =
      "Thank you, " + visitorName +
      "! Your form passed validation. " +
      "No message was sent because this is a static website.";

    form.reset();
  });
}

// Back to top button
function setupBackToTop() {
  const button = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    button.classList.toggle(
      "visible",
      window.scrollY > 300
    );
  });

  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
