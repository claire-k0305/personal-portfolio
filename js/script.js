
// Load projects when the Projects page is open
document.addEventListener("DOMContentLoaded", function () {
    const projectContainer = document.getElementById("project-container");

    // Other pages do not have a project container
    if (!projectContainer) {
        return;
    }

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectMessage = document.getElementById("project-message");

    let allProjects = [];

    // Get project information from the JSON file
    fetch("data/projects.json")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load project data.");
            }

            return response.json();
        })
        .then(function (projects) {
            allProjects = projects;
            displayProjects(allProjects);
        })
        .catch(function (error) {
            console.error("Error loading projects:", error);
            projectContainer.innerHTML =
                '<div class="col-12 text-center">' +
                '<p>Projects could not be loaded. Please try again using Live Server.</p>' +
                '</div>';
        });

    // Create project cards dynamically
    function displayProjects(projects) {
        projectContainer.innerHTML = "";

        if (projects.length === 0) {
            projectMessage.textContent = "No projects found in this category.";
            return;
        }

        projectMessage.textContent = "";

        projects.forEach(function (project) {
            const column = document.createElement("div");
            column.className = "col-md-6 col-lg-4";

            const card = document.createElement("article");
            card.className = "card project-card";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const category = document.createElement("span");
            category.className = "project-category";
            category.textContent = getCategoryName(project.category);

            const title = document.createElement("h3");
            title.textContent = project.title;

            const description = document.createElement("p");
            description.textContent = project.description;

            const tools = document.createElement("div");
            tools.className = "project-tools";

            project.tools.forEach(function (tool) {
                const badge = document.createElement("span");
                badge.className = "badge";
                badge.textContent = tool;
                tools.appendChild(badge);
            });

            cardBody.appendChild(category);
            cardBody.appendChild(title);
            cardBody.appendChild(description);
            cardBody.appendChild(tools);

            card.appendChild(cardBody);
            column.appendChild(card);
            projectContainer.appendChild(column);
        });
    }

    // Convert category codes into readable labels
    function getCategoryName(category) {
        const categoryNames = {
            data: "Data Analytics",
            web: "Web Development",
            business: "Business Systems"
        };

        return categoryNames[category] || "Other";
    }

    // Filter projects when a button is clicked
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory = button.dataset.filter;

            filterButtons.forEach(function (filterButton) {
                filterButton.classList.remove("active");
                filterButton.classList.remove("btn-primary");
                filterButton.classList.add("btn-outline-secondary");
            });

            button.classList.add("active");
            button.classList.remove("btn-outline-secondary");
            button.classList.add("btn-primary");

            if (selectedCategory === "all") {
                displayProjects(allProjects);
            } else {
                const filteredProjects = allProjects.filter(function (project) {
                    return project.category === selectedCategory;
                });

                displayProjects(filteredProjects);
            }
        });
    });
});
// Contact form: open a draft email
const contactForm = document.getElementById("contact-form");
console.log("Contact form script loaded:", contactForm);

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        console.log("Draft Email button clicked!");
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const subject = document.getElementById("contact-subject").value.trim();
        const message = document.getElementById("contact-message").value.trim();
        const feedback = document.getElementById("contact-feedback");

        const recipient = "clairekiesling@gmail.com";

        const body = `From: ${name}\nReply email: ${email}\n\n${message}`;
        const mailtoLink =
            `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        feedback.textContent = "Opening your email application...";
        window.location.href = mailtoLink;
    });
}
// Dark/light mode toggle
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const isDark = document.body.classList.toggle("dark-mode");

        themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
        themeToggle.setAttribute("aria-pressed", String(isDark));
    });
}