Bloom Kids - النسخة المرتبة والمحدّثة
====================================

طريقة التشغيل
-------------
افتح ملف index.html في المتصفح.

مسار الصفحات
------------
الواجهة الرئيسية: index.html
تسجيل الدخول: login.html
إنشاء حساب: register.html
تأكيد الحساب: verify.html
نسيت كلمة المرور: forgot-password.html
تم إرسال رابط الاستعادة: reset-link-sent.html
نجاح إنشاء الحساب: success.html
لوحة التقدم والإنجازات: bloom-kids-progress-transparent-robot.html
الملف الشخصي لولي الأمر: parent-profile.html
اختبار تحديد المستوى: level-test.html
مسار الطفل: child-profile.html
المواد الدراسية: subjects.html
دروس الرياضيات: math-lessons.html
صفحة الدرس: lesson.html
النشاط والتطبيق: activity.html
لوحة المعلم: teacher-dashboard.html
لوحة المدير: admin-dashboard.html

تنظيم الصفحة الرئيسية
---------------------
index.html                  هيكل HTML فقط
js/home.js                  تفاعلات الـ Navbar فقط
css/home/base.css           الألوان والإعدادات العامة والأزرار
css/home/navbar.css         شريط التنقل
css/home/hero.css           قسم الـ Hero
css/home/sections.css       كيف تعمل المنصة + المميزات + التواصل + رحلة النمو
css/home/footer.css         التذييل
css/home/responsive.css     استجابة التابلت والجوال
images/icons/               أيقونات SVG محلية ومنظمة

تنظيم لوحة التقدم
-----------------
bloom-kids-progress-transparent-robot.html   HTML فقط
css/progress.css                              جميع تنسيقات الصفحة
js/progress.js                                جميع تفاعلات الصفحة
images/progress-* و images/badge-*            الصور التي كانت مضمّنة داخل HTML

أهم التعديلات الحالية
---------------------
- فصل HTML وCSS وJavaScript وإزالة الـ inline style والـ inline script من الصفحات.
- تقسيم CSS الصفحة الرئيسية حسب كل جزء بدل ملف واحد كبير.
- اعتماد اللوجو الذي أرسله المستخدم: رمز الشعار وحده في الـ Navbar، والنسخة الكاملة في الفوتر.
- تكبير رمز الشعار في الـ Navbar وتحسين المحاذاة والمسافات.
- جعل خلفية الـ Hero بيضاء بالكامل.
- إعادة ترتيب النص وصورة الطفلة وشبكة الخطوط داخل الـ Hero.
- إنزال صورة الطفلة إلى أسفل بشكل متوازن مع الموجة السفلية.
- تحسين أحجام العنوان والوصف والزر والمسافات الداخلية في الـ Hero.
- إضافة Hover واضح وناعم إلى بطاقات المميزات وبعض العناصر التفاعلية.
- استبدال الرموز النصية داخل البطاقات والتواصل بأيقونات SVG فعلية ومحلية.
- ترتيب أيقونات التواصل وأيقونة الاتصال وأيقونات بيانات الفوتر.
- إضافة Padding وGap متناسقين للأقسام والبطاقات وشريط التواصل.
- تحسين الـ Responsive للـ Navbar والـ Hero والبطاقات على الجوال والتابلت.
- استخراج CSS وJavaScript والصور المضمّنة من صفحة لوحة التقدم إلى ملفات مستقلة.
- التأكد من أن جميع المسارات المحلية للصور وCSS وJavaScript موجودة ولا توجد روابط ملفات مفقودة.

ملاحظة
-------
المشروع Front-end فقط. إرسال البريد وتسجيل الدخول الحقيقي يحتاجان إلى ربط النماذج
مع API من الـ Back-end. السلوك الحالي يعرض التحقق والانتقال بين الصفحات حتى يكون
المسار كاملًا وجاهزًا للربط لاحقًا.

Dashboard sidebar refinement (2026-09-06):
- Landing page left unchanged.
- Internal dashboard sidebars keep their original page-specific items and active states.
- Sidebar now shows the logo mark only, slightly larger.
- Icons are aligned on the right and closer to labels.
- Shared spacing is normalized via css/dashboard-sidebar-tweaks.css.

Frontend login + teacher navigation update:
- Login now redirects directly without API/backend.
- Demo role routing: teacher/admin emails route to their dashboards; other valid emails route to parent profile.
- Teacher dashboard sidebar now opens Educational Content and Settings pages directly.
- Added teacher-content.html and teacher-settings.html using the existing teacher dashboard layout.
- Teacher dashboard active sidebar item keeps its blue background on hover/focus; the white hover effect was removed.

=== Navigation audit (demo readiness) ===
Existing connected flows verified:
- Landing -> Login / Register / Forgot Password.
- Register -> Verify -> Success -> Login.
- Forgot Password -> Reset Link Sent -> Login.
- Parent learning flow: Parent Profile -> Level Test -> Child Profile -> Subjects -> Math Lessons -> Lesson -> Activity.
- Teacher: Dashboard <-> Educational Content <-> Settings -> Logout.
- Admin: Dashboard <-> Settings -> Logout.

Still missing as actual designed pages (not safe to invent without the approved design):
- Parent Dashboard: parent sidebar currently uses the progress/report page as the Dashboard destination.
- Parent Settings: sidebar item is intentionally disabled because there is no parent-settings.html in the project.
- Science and Arabic lesson-list pages are not present; their subject buttons therefore only show the current demo message.
- Teacher Add Lesson / Add Activity / Add Test forms are not present; only the management screen exists.

For the graduation demo, complete these pages or approve a temporary prototype before calling navigation 100% complete.

=== Graduation presentation completion ===
- Added parent-dashboard.html and linked "لوحة التحكم" from all parent pages.
- Added parent-settings.html and enabled "الإعدادات" on all parent pages.
- Added Science learning flow: science-lessons.html -> science-lesson.html -> science-activity.html.
- Added Arabic learning flow: arabic-lessons.html -> arabic-lesson.html -> arabic-activity.html.
- Linked all three subject cards from subjects.html.
- Added teacher add-content screens: teacher-add-lesson.html, teacher-add-activity.html, teacher-add-test.html.
- Added teacher-content-preview.html and connected View/Edit/Delete menu actions.
- Parent demo login now opens parent-dashboard.html directly.
- Added PRESENTATION-FLOW.txt with demo navigation notes.
- Local href/src/onclick route audit: 32 HTML pages, 0 missing local targets.

=== FINAL AUTH + SETTINGS POLISH ===
- Unified all authentication pages with larger Bloom Kids logo, orange brand accents, supporting copy, and subtle motion.
- Added reset-password.html and connected the password recovery demo flow.
- Added a shared "العودة إلى الصفحة الرئيسية" button to every internal page.
- Unified all ON/OFF switches across parent, teacher, admin, and student views to the same Bloom Kids orange ON color.
- Expanded teacher-settings.html with notifications, teaching preferences, security/privacy controls, and save feedback.
- Harmonized admin settings typography with the rest of the project using Cairo and consistent sizing.
