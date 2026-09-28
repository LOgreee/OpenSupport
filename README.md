<p align="center">
  <img src="src/opensupport_assets/opensupport_logo.svg" alt="OpenSupport Logo" width="300">
</p>

<h3 align="center">Modern Customer Support & Ticketing Platform</h3>

<p align="center">
  A free, lightweight, self-hosted alternative to expensive helpdesk giants, built with a strong focus on UI/UX, data privacy, and GDPR compliance.
</p>

<p align="center">
  <a href="https://github.com/logreee/opensupport-app/releases"><img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-PolyForm_Noncommercial_1.0.0-orange.svg" alt="License: PolyForm Noncommercial 1.0.0"></a>
  <img src="https://img.shields.io/badge/PHP-8.1%2B-777bb4.svg?logo=php&logoColor=white" alt="PHP Version">
  <img src="https://img.shields.io/badge/MySQL-PDO-4479A1.svg?logo=mysql&logoColor=white" alt="MySQL">
</p>

---

## 📖 Table of Contents

- [About](#-about)
- [Key Features](#-key-features)
- [Why OpenSupport?](#-why-opensupport)
- [System Requirements](#-system-requirements)
- [Quick Start & Installation](#-quick-start--installation)
- [Web Server Configuration](#-web-server-configuration)
- [Documentation & REST API](#-documentation--rest-api)
- [Security & GDPR Compliance](#-security--gdpr-compliance)
- [Author & License](#-author--license)

---

## 💡 About

**OpenSupport** is an all-in-one web application for customer support and ticket management. Built without heavy frameworks or unnecessary third-party bloat, it provides a comprehensive dashboard for support agents along with an intuitive, clean interface for clients.

---

## ✨ Key Features

- 💬 **Live Chat & File Sharing**: Engage in real-time conversations on tickets, securely request and receive attachments (.png, .jpg, .mp4, .pdf), and insert pre-defined canned responses.
- 📝 **Visual Form Builder**: Create tailor-made collection fields for each team (text, email, telephone, select dropdown, checkbox).
- 🔀 **Conditional Auto-Routing**: Automatically route inbound tickets to a designated agent or group based on user-selected dropdown answers.
- 🏢 **Multi-Team & Staff Roles**: Keep team tickets separated, assign job titles, define agent groups, and manage out-of-office periods to bypass auto-assignment.
- 📊 **Analytics & Feedback**: Track average resolution times, monitor monthly volume per agent, and collect post-resolution customer satisfaction scores.
- 🔌 **REST API v1 & iFrame Embeds**: Embed responsive support forms on external websites via customizable iFrames or automate workflows using Bearer-authenticated endpoints.
- 🌍 **Native Internationalization (i18n)**: Out-of-the-box support for French, English, and Spanish with persistent session language settings.

---

## 🎯 Why OpenSupport?

1. **Free Alternative to Market Giants**: Eliminate prohibitive per-agent subscription fees imposed by proprietary SaaS platforms.
2. **Uncompromising UI & UX Focus**: Designed to deliver visual clarity, speed, and an intuitive user experience for both support staff and end users.
3. **Strict GDPR & Data Sovereignty**: Self-host all your data on your own infrastructure with zero third-party tracking. Features built-in data export (JSON/CSV), automated retention cleanups, and right-to-erasure ticket anonymization.
4. **Lightweight & Transparent**: Clean, auditable PHP/MySQL architecture that is fast to deploy, maintain, and customize.

---

## 🖥️ System Requirements

- **Web Server**: Apache (with `mod_rewrite` enabled) or Nginx
- **PHP**: 8.1 or higher (PHP 8.3 fully supported) with extensions: `pdo_mysql`, `mbstring`, `gd` (for WebP image conversion)
- **Database**: MySQL 5.7+ or MariaDB 10.3+
- **File Permissions**: Write access to root directory and the `up/` upload directory

---

## 🚀 Quick Start & Installation

1. **Clone or Download the Repository**:
   ```bash
   git clone [https://github.com/logreee/opensupport-app.git](https://github.com/logreee/opensupport-app.git)
