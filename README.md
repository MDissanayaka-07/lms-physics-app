# LMS Physics App

Full-stack Learning Management System starter for Advanced Level Physics classes.

## What This Starter Gives You

1. Student account system with phone number login and rich profile fields.
2. Teacher panel to add marks and review student submissions.
3. Marks progress chart (curve over time).
4. Quiz module foundation.
5. PDF assignment submission flow.
6. AI model-paper download endpoint placeholder (ready for real AI integration).
7. React frontend + Express backend + MongoDB schema setup.

## Tech Stack

1. Frontend: React + Vite + React Router + Recharts + Axios
2. Backend: Node.js + Express + Mongoose + JWT + Multer
3. Database: MongoDB

## Project Structure (Complete Lesson)

```
lms-physics-app/
	client/
		src/
			components/
				Navbar.jsx
				ProtectedRoute.jsx
			context/
				AuthContext.jsx
			layouts/
				AppLayout.jsx
			pages/
				HomePage.jsx
				LoginPage.jsx
				RegisterPage.jsx
				StudentDashboard.jsx
				TeacherDashboard.jsx
				MarksPage.jsx
				QuizPage.jsx
				SubmissionPage.jsx
				ModelPapersPage.jsx
			services/
				api.js
			App.jsx
			main.jsx
			styles.css
		.env.example
		index.html
		package.json
		vite.config.js

	server/
		src/
			config/
				db.js
			controllers/
				aiController.js
				authController.js
				quizController.js
				studentController.js
				teacherController.js
			middleware/
				auth.js
				upload.js
			models/
				Mark.js
				Quiz.js
				Submission.js
				User.js
			routes/
				aiRoutes.js
				authRoutes.js
				quizRoutes.js
				studentRoutes.js
				teacherRoutes.js
			utils/
				token.js
			app.js
			server.js
		.env.example
		package.json
		uploads/

	.gitignore
	package.json
	README.md
```

## Data Design

### User
1. role (student or teacher)
2. fullName
3. phoneNumber
4. passwordHash
5. school
6. NIC Number
7. academicYear
8. profileImageUrl
9. parentPhoneNumber
10. dateOfBirth
11. stream

### Mark
1. studentId
2. examName
3. subject
4. score
5. maxScore
6. examDate
7. remarks

### Submission
1. studentId
2. assignmentTitle
3. note
4. filePath (PDF)
5. status
6. score

### Quiz
1. title
2. description
3. createdBy
4. durationMinutes
5. questions[]

## API Modules

1. /api/auth: register and login
2. /api/student: my profile, my marks, my chart, upload submission
3. /api/teacher: list students, add marks, view progress, view/review submissions
4. /api/quizzes: list quizzes (all users), create quiz (teacher)
5. /api/ai: model-paper assistant placeholder

## Full Color Theme Used

1. Night: #031926
2. Ink: #082032
3. Sea: #176b87
4. Mint: #64ccc5
5. Sun: #f4d35e
6. Rose: #ef476f
7. Paper: #f8f9fb

This is defined in client/src/styles.css and can be adjusted quickly from one place.

## How To Run

### 1. Install dependencies

From repository root:

```powershell
npm install
```

### 2. Configure environment

Copy:

1. server/.env.example -> server/.env
2. client/.env.example -> client/.env

Set values in server/.env:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/lms_physics_app
JWT_SECRET=replace_with_secure_secret
CLIENT_URL=http://localhost:5173
```

### 3. Start backend

```powershell
npm run dev:server
```

### 4. Start frontend

In a new terminal:

```powershell
npm run dev:client
```

Frontend: http://localhost:5173
Backend health: http://localhost:5000/api/health

## Feature Coverage Against Your Request

1. Student login with phone number: included
2. Student registration details: included (name, school, NIC, year, profile image URL, parent phone, etc.)
3. Marks checking: included
4. Progress curve chart: included
5. AI bot model paper downloads: placeholder included (ready to connect real AI)
6. Quiz section: included
7. Assignment submission via PDF: included
8. Teacher panel for marks, progress, quizzes, submissions: included

## GitHub Maintenance Guide (Keep Files Safe)

Run from repository root.

### First-time setup

```powershell
git status
git add .
git commit -m "Initialize full-stack LMS physics app"
git push origin main
```

### Daily workflow

```powershell
git pull origin main
git checkout -b feature/student-attendance
# make your changes
git add .
git commit -m "Add student attendance module"
git push -u origin feature/student-attendance
```

Then open a Pull Request from feature branch to main.

### Sync main branch safely

```powershell
git checkout main
git pull origin main
```

### Check what changed

```powershell
git status
git log --oneline --graph --decorate -10
git diff
```

### Good habits

1. Never commit .env files.
2. Always pull latest main before creating a feature branch.
3. Keep commits small and meaningful.
4. Use pull requests even if you work alone.

## Next Extensions You Can Add

1. Real OTP phone verification (Firebase Auth or Twilio Verify).
2. Real AI assistant integration for model-paper recommendation and chat.
3. Attendance tracking and parent portal.
4. Exam timetable and class notices.
5. Payment/subscription module for classes.
