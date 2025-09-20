# Content Feed Compliance Controller

## Overview

**Content Feed Compliance Controller** is a lightweight system that validates and enforces compliance rules for syndicated content feeds (e.g., MSN, Google News). It ensures that articles meet feed-specific requirements before they're published — helping teams avoid rejections, penalties, or delisting from partner platforms.

This project provides a basic prototype of an **automated content validation tool**, featuring:

* A frontend where users can upload articles and select a target feed (e.g., MSN)
* A backend that checks the article against feed-specific rules
* Logging of every publish attempt, whether successful or not
* Simulated publishing (no actual publishing to live feeds)

> For this prototype, simple compliance rules are implemented — such as maximum title length and blocked keywords. Example: title should not exceed 100 characters.

---

## System Diagram

> A public system design diagram is available here: [View Diagram](https://www.mermaidchart.com/app/projects/45b5c0d5-94a2-4bf1-8dcb-8d37875431ae/diagrams/a4cd7bfe-6689-46fc-ba5d-d11a250e7c04/version/v0.1/edit)

```
User Upload Module
        ↓
   Frontend UI
        ↓
   Backend API
        ↓
 Validation Layer
   ↙          ↘
Fails         Passes
  ↓              ↓
Error Handler  Publisher
     ↘          ↙
        Logger
```

---

## ✅ Project Goals

* **Frontend Module**:

  * Allow users to upload article
  * Let users select the target feed
* **Backend Module**:

  * Accept article content and feed type
  * Enforce feed-specific validation rules
  * Simulate publishing if checks pass
  * Block publishing with clear feedback if checks fail
  * Log every publish attempt

---

## Prerequisites

To run the project, your system should have:

* [Node.js](https://nodejs.org/) installed

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Deepak777K/content-feed-compliance-controller.git
```

Or download the ZIP file and extract it manually.

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Project

```bash
npm start
```

Open your browser and navigate to:
👉 `http://localhost:3000`

---

## ✍️ Usage

1. Open the web interface
2. Upload an article using the form
3. Select a target feed (e.g., MSN)
4. Submit for validation
5. View pass/fail result and error messages (if any)

---

## 🧪 Testing

This project includes built-in **Jest** tests to validate the main logic.

Run tests with:

```bash
npm test
```

### Sample Test Scenarios

#### ❌ Fail – Title Too Long

```js
"This is a very long title that exceeds the maximum length limit imposed by the feed rules..........."
```

#### ❌ Fail – Contains Prohibited Word

```js
"Some content with a bad-word that is not allowed."
```

#### ✅ Pass – Valid for Google News

```js
"Clean article with valid title and no blocked terms."
```

You can view sample logs at:
📁 `/logs/publish.log`

---

## 🧩 Adding New Feeds

To support a new feed:

1. Create a validator file under `/checks/`
   Example: `/checks/google-news.js`

2. Define feed-specific rules:

```js
module.exports = function validateGoogle(article) {
	const errors = [];

	if (!article.title || article.title.length > 120) {
		errors.push("Title must be under 120 characters.");
	}
	return errors;
};
```

3. Register it in `/checks/index.js` so the engine knows about the new feed.

---

## 🛠️ Tech Stack

* **Frontend**: HTML + JavaScript
* **Backend**: Node.js + Express
* **Testing**: Jest

---

## 📁 Project Structure

```
.
├── public/                # frontend UI form and static files
├── src/
│   ├── routes/            # REST API logic
│   ├── checks/            # Feed-specific validation rules
│   └── app.js             # server
├── test/                  # Jest test cases
├── README.md
└── system_diagram.png     # System design diagram
```

