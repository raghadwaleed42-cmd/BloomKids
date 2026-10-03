// Parent profile interactions: editing and managing the one-to-many parent/children relationship.
const editButton = document.getElementById("editButton");
const profileForm = document.getElementById("profileForm");
const parentNameInput = document.getElementById("parentName");
const phoneInput = document.getElementById("phone");
const childNameInput = document.getElementById("childName");
const ageInput = document.getElementById("age");
const gradeInput = document.getElementById("grade");
const goalInput = document.getElementById("goal");
const nextButton = document.getElementById("nextButton");

const childrenTabs = document.getElementById("childrenTabs");
const addChildButton = document.getElementById("addChildButton");
const childModal = document.getElementById("childModal");
const addChildForm = document.getElementById("addChildForm");
const newChildName = document.getElementById("newChildName");
const newChildAge = document.getElementById("newChildAge");
const newChildGrade = document.getElementById("newChildGrade");
const newChildGoal = document.getElementById("newChildGoal");

const childrenStorageKey = "bloomKidsParentChildren";
const selectedChildStorageKey = "bloomKidsSelectedChild";

let isEditing = false;
let children = loadChildren();
let activeChildId = sessionStorage.getItem(selectedChildStorageKey) || children[0].id;
if (!children.some(child => child.id === activeChildId)) activeChildId = children[0].id;

function loadChildren() {
    try {
        const stored = JSON.parse(localStorage.getItem(childrenStorageKey) || "[]");
        if (Array.isArray(stored) && stored.length) return stored;
    } catch (error) {
        // Keep the default child if local storage contains invalid demo data.
    }
    return [{
        id: "farah",
        name: childNameInput.value || "فرح",
        age: ageInput.value || "8 أعوام",
        grade: gradeInput.value || "الصف الدراسي",
        goal: goalInput.value || "هدف الانتفاع عن الدراسة"
    }];
}

function persistChildren() {
    localStorage.setItem(childrenStorageKey, JSON.stringify(children));
    sessionStorage.setItem(selectedChildStorageKey, activeChildId);
}

function getActiveChild() {
    return children.find(child => child.id === activeChildId) || children[0];
}

function saveActiveChildFromFields() {
    const child = getActiveChild();
    if (!child) return;
    child.name = childNameInput.value.trim() || child.name;
    child.age = ageInput.value.trim() || child.age;
    child.grade = gradeInput.value.trim() || child.grade;
    child.goal = goalInput.value.trim() || child.goal;
    persistChildren();
}

function loadActiveChildIntoFields() {
    const child = getActiveChild();
    if (!child) return;
    childNameInput.value = child.name;
    ageInput.value = child.age;
    gradeInput.value = child.grade;
    goalInput.value = child.goal;
}

function renderChildrenTabs() {
    childrenTabs.innerHTML = "";
    children.forEach(function (child) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `child-tab${child.id === activeChildId ? " active" : ""}`;
        button.dataset.childId = child.id;
        button.setAttribute("aria-pressed", String(child.id === activeChildId));
        button.innerHTML = `<strong>${escapeHtml(child.name)}</strong><small>${escapeHtml(child.age)}</small>`;
        button.addEventListener("click", function () {
            if (isEditing) saveActiveChildFromFields();
            activeChildId = child.id;
            persistChildren();
            loadActiveChildIntoFields();
            renderChildrenTabs();
        });
        childrenTabs.appendChild(button);
    });
}

function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, function (char) {
        return ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char];
    });
}

const editableFields = [parentNameInput, phoneInput, childNameInput, ageInput, gradeInput, goalInput];

editButton.addEventListener("click", function () {
    if (!isEditing) {
        editableFields.forEach(field => field.removeAttribute("readonly"));
        profileForm.classList.add("editing");
        editButton.innerHTML = `<i class="fa-solid fa-floppy-disk"></i><span>حفظ</span>`;
        isEditing = true;
        return;
    }

    saveActiveChildFromFields();
    editableFields.forEach(field => field.setAttribute("readonly", true));
    profileForm.classList.remove("editing");
    editButton.innerHTML = `<i class="fa-solid fa-pen"></i><span>تعديل</span>`;
    isEditing = false;
    renderChildrenTabs();
    showDashboardMessage("تم حفظ البيانات بنجاح");
});

function openChildModal() {
    childModal.classList.add("show");
    childModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("child-modal-open");
    setTimeout(() => newChildName.focus(), 0);
}

function closeChildModal() {
    childModal.classList.remove("show");
    childModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("child-modal-open");
    addChildForm.reset();
}

addChildButton.addEventListener("click", openChildModal);
document.querySelectorAll("[data-close-child-modal]").forEach(button => button.addEventListener("click", closeChildModal));
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && childModal.classList.contains("show")) closeChildModal();
});

addChildForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!addChildForm.reportValidity()) return;

    const child = {
        id: `child-${Date.now()}`,
        name: newChildName.value.trim(),
        age: `${newChildAge.value.trim()} أعوام`,
        grade: newChildGrade.value.trim(),
        goal: newChildGoal.value.trim()
    };

    children.push(child);
    activeChildId = child.id;
    persistChildren();
    renderChildrenTabs();
    loadActiveChildIntoFields();
    closeChildModal();
    showDashboardMessage(`تمت إضافة ${child.name} وربطه بحساب ولي الأمر`);
});

nextButton.addEventListener("click", function () {
    sessionStorage.setItem(selectedChildStorageKey, activeChildId);
    window.location.href = "level-test.html";
});

persistChildren();
renderChildrenTabs();
loadActiveChildIntoFields();
