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

const submitButton =
    applicationForm.querySelector(".add-btn");


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


const statusFilter =
    document.querySelector("#statusFilter");

const searchInput =
    document.querySelector("#searchInput");

const sortFilter =
    document.querySelector("#sortFilter");


// Track whether the form is editing an application

let editingApplicationId = null;


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

    const selectedStatus =
        statusFilter.value;

    const searchText =
        searchInput.value.trim().toLowerCase();

    const selectedSort =
        sortFilter.value;


    let applicationsToRender =
        applications;


    // Filter by status

    if (selectedStatus !== "All") {

        applicationsToRender =
            applicationsToRender.filter(function (application) {

                return application.status === selectedStatus;

            });

    }


    // Filter by search

    if (searchText) {

        applicationsToRender =
            applicationsToRender.filter(function (application) {

                return (
                    application.company
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    application.position
                        .toLowerCase()
                        .includes(searchText)
                );

            });

    }


    // Create a copy before sorting

    applicationsToRender =
        [...applicationsToRender];


    // Sort applications

    if (selectedSort === "newest") {

        applicationsToRender.sort(function (a, b) {

            return new Date(b.date) - new Date(a.date);

        });

    }


    if (selectedSort === "oldest") {

        applicationsToRender.sort(function (a, b) {

            return new Date(a.date) - new Date(b.date);

        });

    }


    if (selectedSort === "companyAZ") {

        applicationsToRender.sort(function (a, b) {

            return a.company.localeCompare(b.company);

        });

    }


    if (selectedSort === "companyZA") {

        applicationsToRender.sort(function (a, b) {

            return b.company.localeCompare(a.company);

        });

    }


    // Clear current cards

    applicationList.innerHTML = "";


    // Show empty message when nothing matches

    if (applicationsToRender.length === 0) {

        applicationList.innerHTML = `
            <p class="empty-message">
                No applications found.
            </p>
        `;

        return;
    }


    // Create application cards

    applicationsToRender.forEach(function (application) {

        const applicationCard =
            document.createElement("article");


        applicationCard.className =
            "application-card";


        applicationCard.innerHTML = `

            <div class="application-card-header">

                <div>

                    <h3>
                        ${application.position}
                    </h3>

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


            <div class="application-actions">

                <button
                    class="edit-btn"
                    data-id="${application.id}"
                >
                    Edit
                </button>


                <button
                    class="delete-btn"
                    data-id="${application.id}"
                >
                    Delete
                </button>

            </div>

        `;


        applicationList.appendChild(applicationCard);

    });


    // Connect delete buttons

    const deleteButtons =
        document.querySelectorAll(".delete-btn");


    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const id =
                Number(button.dataset.id);


            deleteApplication(id);

        });

    });


    // Connect edit buttons

    const editButtons =
        document.querySelectorAll(".edit-btn");


    editButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const id =
                Number(button.dataset.id);


            editApplication(id);

        });

    });

}


// Delete application

function deleteApplication(id) {

    const applicationIndex =
        applications.findIndex(function (application) {

            return application.id === id;

        });


    if (applicationIndex !== -1) {

        applications.splice(
            applicationIndex,
            1
        );

    }


    renderApplications();

    updateStatistics();

}


// Edit application

function editApplication(id) {

    const application =
        applications.find(function (application) {

            return application.id === id;

        });


    if (!application) {

        return;

    }


    editingApplicationId =
        id;


    companyInput.value =
        application.company;

    positionInput.value =
        application.position;

    locationInput.value =
        application.location;

    dateInput.value =
        application.date;

    statusInput.value =
        application.status;

    linkInput.value =
        application.link;

    notesInput.value =
        application.notes;


    submitButton.textContent =
        "Update Application";


    applicationForm.scrollIntoView({
        behavior: "smooth"
    });

}


// Update dashboard statistics

function updateStatistics() {

    const total =
        applications.length;


    const applied =
        applications.filter(function (application) {

            return application.status === "Applied";

        }).length;


    const interviews =
        applications.filter(function (application) {

            return application.status === "Interview";

        }).length;


    const offers =
        applications.filter(function (application) {

            return application.status === "Offer";

        }).length;


    totalApplications.textContent =
        total;

    appliedApplications.textContent =
        applied;

    interviewApplications.textContent =
        interviews;

    offerApplications.textContent =
        offers;

}


// Add or update application

applicationForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const company =
            companyInput.value.trim();

        const position =
            positionInput.value.trim();

        const location =
            locationInput.value.trim();

        const date =
            dateInput.value;

        const status =
            statusInput.value;

        const link =
            linkInput.value.trim();

        const notes =
            notesInput.value.trim();


        // Validate required fields

        if (
            !company ||
            !position ||
            !location ||
            !date
        ) {

            alert(
                "Please fill in all required fields."
            );

            return;

        }


        // Update existing application

        if (editingApplicationId !== null) {

            const application =
                applications.find(function (application) {

                    return (
                        application.id ===
                        editingApplicationId
                    );

                });


            application.company =
                company;

            application.position =
                position;

            application.location =
                location;

            application.date =
                date;

            application.status =
                status;

            application.link =
                link;

            application.notes =
                notes;


            editingApplicationId =
                null;

        }


        // Create new application

        else {

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


            applications.push(
                newApplication
            );

        }


        // Refresh interface

        renderApplications();

        updateStatistics();


        // Reset form

        applicationForm.reset();


        submitButton.textContent =
            "Add Application";

    }
);


// Filter applications by status

statusFilter.addEventListener(
    "change",
    function () {

        renderApplications();

    }
);


// Search applications

searchInput.addEventListener(
    "input",
    function () {

        renderApplications();

    }
);


// Sort applications

sortFilter.addEventListener(
    "change",
    function () {

        renderApplications();

    }
);


// Initial display

renderApplications();

updateStatistics();