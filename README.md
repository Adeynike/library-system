School Library Management API :
A robust RESTful API for managing a school library system, built with Node.js, Express.js, MongoDB, and Mongoose.

The API manages the following core entities:

Authors
Books
Students
Library Attendants
Book Borrowing & Returns

It enforces real-world constraints such as:

A book cannot be borrowed if already issued
A book must be returned before being borrowed again
Relationships between entities using MongoDB references

Tech Stack

Node.js
Express.js
MongoDB
Mongoose
dotenv
nodemon

Project Structure

library-system/
│
├── config/
│   └── db.js
├── controllers/
│   ├── authorController.js
│   ├── bookController.js
│   ├── studentController.js
│   └── attendantController.js
├── models/
│   ├── Author.js
│   ├── Book.js
│   ├── Student.js
│   └── Attendant.js
├── routes/
│   ├── authorRoutes.js
│   ├── bookRoutes.js
│   ├── studentRoutes.js
│   └── attendantRoutes.js
├── .env
├── .gitignore
├── package.json
└── server.js


Installation & Setup

1. Clone the repository
git clone https://github.com/Adeynike/library-system.git
cd library-system

2. Install dependencies
npm install

3. Configure environment variables
Create a .env file:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/library_system

4. Start MongoDB -- Ensure MongoDB is running:

5. Run the application 

📦 Scripts
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

npm run dev
http://localhost:5000

Expected response: Library API is running

API Base URL
http://localhost:5000

API Endpoints

🧑‍💼 Authors
| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| POST   | /authors     | Create author    |
| GET    | /authors     | Get all authors  |
| GET    | /authors/:id | Get author by ID |
| PUT    | /authors/:id | Update author    |
| DELETE | /authors/:id | Delete author    |

👨‍🎓 Students
| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| POST   | /students     | Create student    |
| GET    | /students     | Get all students  |
| GET    | /students/:id | Get student by ID |

🧑‍🔧 Library Attendants
| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------ |
| POST   | /attendants | Create attendant   |
| GET    | /attendants | Get all attendants |

📚 Books
| Method | Endpoint   | Description                    |
| ------ | ---------- | ------------------------------ |
| POST   | /books     | Create book                    |
| GET    | /books     | Get all books                  |
| GET    | /books/:id | Get book (with populated data) |
| PUT    | /books/:id | Update book                    |
| DELETE | /books/:id | Delete book                    |

🔄 Borrow & Return

Borrow Book
POST /books/:id/borrow

Request Body
{
  "studentId": "STUDENT_OBJECT_ID",
  "attendantId": "ATTENDANT_OBJECT_ID",
  "returnDate": "2026-04-30"
}

Rules

Book must be available (IN)
Updates:
status → OUT
borrowedBy → student
issuedBy → attendant
returnDate → set

Return Book
POST /books/:id/return

Rules

Book must be borrowed (OUT)
Updates:
status → IN
borrowedBy → null
issuedBy → null
returnDate → null

NOTE:
A Book can have multiple Authors
A Book belongs to one Student when borrowed
A Book is issued by one Attendant

When fetching a book:

Authors are populated
Student (borrowedBy) is populated
Attendant (issuedBy) is populated

Tested using Postman

Recommended Test Order

Create Authors
Create Students
Create Attendants
Create Books
Borrow Book
Fetch Book (verify populated fields)
Return Book

⚠️ Error Handling
Examples:

Book not found
Author not found
Student not found
Attendant not found
Book already borrowed
Book already returned

📂 .gitignore
node_modules/
.env


👨‍💻 Author

Adeniji Kehinde 
adenijikehinde00@gmail.com
Backend Development – TS Academy Phoenix Cohort


