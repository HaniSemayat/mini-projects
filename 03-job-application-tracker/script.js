const applicationList = document.querySelector("#applicationList");

const totalApplications =
    document.querySelector("#totalApplications");

const appliedApplications =
    document.querySelector("#appliedApplications");

const interviewApplications =
    document.querySelector("#interviewApplications");

const offerApplications =
    document.querySelector("#offerApplications");

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

console.log(applications);

function renderApplications() {
    applicationList.innerHTML = "";

    applications.forEach(function (application) {
        const applicationCard = document.createElement("article");

        applicationCard.className = "application-card";

        applicationCard.innerHTML = `
            <div class="application-card-header">
                <div>
                    <h3>${application.position}</h3>
                    <p class="company-name">${application.company}</p>
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


renderApplications();
updateStatistics();