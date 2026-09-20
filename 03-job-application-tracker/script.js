const applicationList =
    document.querySelector("#applicationList");

const totalApplications =
    document.querySelector("#totalApplications");

const appliedApplications =
    document.querySelector("#appliedApplications");

const interviewApplications =
    document.querySelector("#interviewApplications");

const offerApplications =
    document.querySelector("#offerApplications");

const applicationForm =
    document.querySelector("#applicationForm");

const companyInput =
    document.querySelector("#company");

const positionInput =
    document.querySelector("#position");

const locationInput =
    document.querySelector("#location");

const dateInput =
    document.querySelector("#date");

const statusInput =
    document.querySelector("#status");

const linkInput =
    document.querySelector("#link");

const notesInput =
    document.querySelector("#notes");


// Application data

const applications = [
    {
        id: 1,
        company: "Ethio Software",
        position: "Python Developer Intern",
        location: "Addis Ababa",
        date: "2026-09-18",
        status: "Applied",
        link: "https://example.com",
        notes: "Applied through the company website"
    },

    {
        id: 2,
        company: "BlueTech",
        position: "Junior Frontend Developer",
        location: "Addis Ababa",
        date: "2026-09-16",
        status: "Interview",
        link: "https://example.com",
        notes: "Interview scheduled for next week"
    },

    {
        id: 3,
        company: "Nile Systems",
        position: "QA Intern",
        location: "Remote",
        date: "2026-09-12",
        status: "Offer",
        link: "https://example.com",
        notes: "Received internship offer"
    }
];


// Render applications

function renderApplications() {
    applicationList.innerHTML = "";

    applications.forEach(function (application) {
        const applicationCard =
            document.createElement("article");

        applicationCard.className = "application-card";

        applicationCard.innerHTML = `
            <div class="application-card-header">
                <div>
                    <h3>${application.position}</h3>

                    <p class="company-name">
                        ${application.company}
                    </p>
                </div>

                <span class="status-badge">
                    ${application.status}
                </span>
            </div>

            <p class="application-location">
                📍 ${application.location}
            </p>

            <p class="application-date">
                Applied: ${application.date}
            </p>

            <p class="application-notes">
                ${application.notes}
            </p>
        `;

        applicationList.appendChild(applicationCard);
    });
}


// Update dashboard statistics

function updateStatistics() {
    const total = applications.length;

    const applied = applications.filter(function (application) {
        return application.status === "Applied";
    }).length;

    const interviews = applications.filter(function (application) {
        return application.status === "Interview";
    }).length;

    const offers = applications.filter(function (application) {
        return application.status === "Offer";
    }).length;

    totalApplications.textContent = total;
    appliedApplications.textContent = applied;
    interviewApplications.textContent = interviews;
    offerApplications.textContent = offers;
}


// Initial display

renderApplications();
updateStatistics();


// Add new application

applicationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const company = companyInput.value.trim();
    const position = positionInput.value.trim();
    const location = locationInput.value.trim();
    const date = dateInput.value;
    const status = statusInput.value;
    const link = linkInput.value.trim();
    const notes = notesInput.value.trim();

    if (!company || !position || !location || !date) {
        alert("Please fill in all required fields.");
        return;
    }

    const newApplication = {
        id: Date.now(),
        company: company,
        position: position,
        location: location,
        date: date,
        status: status,
        link: link,
        notes: notes
    };

    applications.push(newApplication);

    renderApplications();
    updateStatistics();

    applicationForm.reset();
});