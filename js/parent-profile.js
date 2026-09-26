// ==========================================
// Profile Page - Edit / Save
// ==========================================

// 1. نمسك زر التعديل
const editButton = document.getElementById("editButton");

// 2. نمسك الحقول التي نريد السماح بتعديلها
const editableFields = [
    document.getElementById("parentName"),
    document.getElementById("phone"),
    document.getElementById("childName"),
    document.getElementById("age"),
    document.getElementById("grade"),
    document.getElementById("goal")
];

// 3. متغير يخبرنا: هل نحن الآن في وضع التعديل؟
let isEditing = false;


// 4. عند الضغط على زر تعديل
editButton.addEventListener("click", function () {

    // إذا لم نكن في وضع التعديل
    if (!isEditing) {

        // نفتح الحقول للتعديل
        editableFields.forEach(function (field) {
            field.removeAttribute("readonly");
        });

        document.getElementById("profileForm").classList.add("editing");

        // نغير شكل الزر من "تعديل" إلى "حفظ"
        editButton.innerHTML = `
            <i class="fa-solid fa-floppy-disk"></i>
            <span>حفظ</span>
        `;

        // أصبحنا في وضع التعديل
        isEditing = true;

    } else {

        // نرجع الحقول readonly بعد الحفظ
        editableFields.forEach(function (field) {
            field.setAttribute("readonly", true);
        });

        document.getElementById("profileForm").classList.remove("editing");

        // نرجع الزر إلى "تعديل"
        editButton.innerHTML = `
            <i class="fa-solid fa-pen"></i>
            <span>تعديل</span>
        `;

        // خرجنا من وضع التعديل
        isEditing = false;
        showDashboardMessage("تم حفظ البيانات بنجاح");
    }

});
// ==========================================
// Next Button
// الانتقال إلى اختبار تحديد المستوى
// ==========================================

const nextButton = document.getElementById("nextButton");

nextButton.addEventListener("click", function () {
    window.location.href = "level-test.html";
});
