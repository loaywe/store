<div align="center">

# 🛍️ Store API

**A production-ready REST API for users, products, and orders — with filtering, search, and pagination built in.**

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.x-880000?logo=mongoose&logoColor=white)](https://mongoosejs.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](#-license)

[Overview](#-overview) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Structure](#-project-structure) · [Database](#-database-design) · [Filters](#-filtering-search--pagination) · [Lifting](#-what-is-lifting) · [Getting Started](#-getting-started) · [API](#-api-reference) · [Security](#-security)

</div>

---

## 📌 Overview

**Store API** is a full-featured e-commerce backend built with **Node.js**, **Express**, and **MongoDB**. It manages **users**, **products**, and **orders** with rich filtering, full-text search, and pagination on every list endpoint.

The project follows a clean **MVC + Service** architecture and demonstrates the **"lifting"** pattern — where logic is progressively lifted from routes to controllers, then to services, for maximum reusability and testability.

It's designed as a **reusable template** — fork it, rename the models, and you have a working API for any catalog, inventory, or marketplace project.

---

## ✨ Features

### 🔍 Search, Filters & Pagination (every list endpoint)
- 🔎 **Full-text search** across multiple fields
- 🎯 **Field filters** (category, role, gender, price range, date range)
- 📊 **Sorting** by any field, ascending or descending
- 📄 **Pagination** with `page` and `limit`
- 🧮 **Result metadata** — total count, total pages, current page
- 🎛️ **Field selection** — return only the fields you need
- 🗓️ **Date range filtering** (`from`, `to`)

### 👤 User Management
- First name, last name, auto-generated full name
- Email validation + uniqueness constraint
- Role enum: `admin`, `customer`
- Age, gender, nested address (street, city)

### 📦 Product Management
- Name, price, expiry date
- Category enum: `food`, `electronics`, `clothing`
- Auto-managed creation date

### 🧾 Order Management
- Reference-based user ↔ product relationship
- Populated responses (full user + product details)
- Total price and order date tracking

### 🛡️ Security & Quality
- ✅ Centralized error handling
- ✅ Input validation via Mongoose
- ✅ CORS, Helmet, rate limiting ready
- ✅ Environment-based config
- ✅ Reusable service layer

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js 20+ |
| **Framework** | Express 4 |
| **Database** | MongoDB 7 |
| **ODM** | Mongoose 8 |
| **Config** | dotenv |
| **Security** | helmet, cors, express-rate-limit |
| **Dev tools** | nodemon |

---

## 📂 Project Structure
