const roles = {
  admin: {
    title: "مدير النظام",
    description: "صلاحيات إدارة المنصة الأساسية.",
    permissions: { dashboard_view:true, content_manage:true, reports_view:true, users_manage:true, children_manage:false, settings_manage:true, roles_manage:true },
    locked: ["dashboard_view", "roles_manage"]
  },
  teacher: {
    title: "المعلم",
    description: "صلاحيات إنشاء المحتوى ومتابعة تقدم الطلاب.",
    permissions: { dashboard_view:true, content_manage:true, reports_view:true, users_manage:false, children_manage:false, settings_manage:false, roles_manage:false },
    locked: ["dashboard_view"]
  },
  parent: {
    title: "ولي الأمر",
    description: "صلاحيات متابعة الأطفال المرتبطين بالحساب فقط.",
    permissions: { dashboard_view:true, content_manage:false, reports_view:true, users_manage:false, children_manage:true, settings_manage:false, roles_manage:false },
    locked: ["dashboard_view", "children_manage"]
  }
};

const storageKey = "bloomKidsRolePermissions";
let saved = null;
try {
  saved = JSON.parse(localStorage.getItem(storageKey) || "null");
} catch (error) {
  saved = null;
}
if (saved && typeof saved === "object") {
  Object.keys(roles).forEach(roleId => {
    if (saved[roleId]) roles[roleId].permissions = { ...roles[roleId].permissions, ...saved[roleId] };
  });
}

const roleButtons = Array.from(document.querySelectorAll(".role-option"));
const permissionRows = Array.from(document.querySelectorAll(".permission-row"));
const title = document.getElementById("permissionsTitle");
const description = document.getElementById("permissionsDescription");
const count = document.getElementById("permissionsCount");
const saveButton = document.getElementById("savePermissions");
const toast = document.getElementById("rolesToast");
let activeRole = "admin";

function renderRole() {
  const role = roles[activeRole];
  title.textContent = role.title;
  description.textContent = role.description;
  roleButtons.forEach(button => {
    const active = button.dataset.role === activeRole;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  let enabled = 0;
  permissionRows.forEach(row => {
    const key = row.dataset.permission;
    const input = row.querySelector("input");
    const checked = Boolean(role.permissions[key]);
    input.checked = checked;
    input.disabled = role.locked.includes(key);
    row.classList.toggle("is-locked", input.disabled);
    if (checked) enabled += 1;
  });
  count.textContent = `${enabled} صلاحيات مفعلة`;
}

roleButtons.forEach(button => button.addEventListener("click", () => {
  activeRole = button.dataset.role;
  renderRole();
}));

permissionRows.forEach(row => {
  const input = row.querySelector("input");
  input.addEventListener("change", () => {
    roles[activeRole].permissions[row.dataset.permission] = input.checked;
    renderRole();
  });
});

saveButton.addEventListener("click", () => {
  const payload = {};
  Object.keys(roles).forEach(roleId => payload[roleId] = roles[roleId].permissions);
  localStorage.setItem(storageKey, JSON.stringify(payload));
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
});

renderRole();
