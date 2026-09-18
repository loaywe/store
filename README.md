<div align="center">

# 🛍️ Store

**A simple, clean PHP product management system with full CRUD and image uploads.**

[![PHP](https://img.shields.io/badge/PHP-8.0+-777BB4?logo=php&logoColor=white)](https://www.php.net)
[![MySQL](https://img.shields.io/badge/MySQL-5.7+-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](#-license)

[Overview](#-overview) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Structure](#-project-structure) · [Getting Started](#-getting-started) · [Security](#-security) · [Roadmap](#-roadmap)

</div>

---

## 📌 Overview

**Store** is a lightweight product management system built with **vanilla PHP** and **MySQL**. It provides a clean, responsive interface for managing a product catalog — with full **CRUD** operations, **image uploads**, and a **Bootstrap 5** UI.

The project is intentionally minimal: no frameworks, no ORMs, no build steps. It's perfect as a **learning project**, a **starter template**, or a foundation to extend into a bigger application.

---

## ✨ Features

- ➕ **Create** products with name, description, price, quantity, and image
- 📋 **Read** — responsive card grid with product listings
- ✏️ **Update** products with optional image replacement
- 🗑️ **Delete** products with confirmation and automatic image cleanup
- 🖼️ **Image uploads** with extension whitelist and size limit
- 🔒 **PDO prepared statements** — SQL-injection safe by design
- 🛡️ **XSS-escaped output** via `htmlspecialchars()`
- 📱 **Responsive UI** built on Bootstrap 5
- ⚡ **Zero dependencies** — no Composer, no npm, just PHP

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Language** | PHP 8.0+ (with `strict_types`) |
| **Database** | MySQL 5.7+ / MariaDB 10.3+ |
| **DB Access** | PDO with prepared statements |
| **Frontend** | HTML5, Bootstrap 5.3 (CDN) |
| **Server** | Apache, Nginx, or PHP's built-in server |

---

## 📂 Project Structure
