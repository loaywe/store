<div align="center">

# 🛍️ Store API

**A RESTful e-commerce backend built with Node.js, Express, and MongoDB.**

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.x-880000?logo=mongoose&logoColor=white)](https://mongoosejs.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](#-license)

[Overview](#-overview) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Structure](#-project-structure) · [Getting Started](#-getting-started) · [Data Models](#-data-models) · [API](#-api-reference)

</div>

---

## 📌 Overview

**Store API** is a lightweight e-commerce backend that manages **users**, **products**, and **orders**. It exposes a clean REST API with MongoDB-backed persistence through Mongoose.

The project is intentionally minimal and framework-free — just Node.js, Express, and Mongoose — making it an excellent **starter template** for any product catalog, marketplace, or shop backend.

---

## ✨ Features

### 👤 User Management
- Store user identity: first name, last name, full name, email, password
- Auto-generate `fullName` from first + last name (Mongoose pre-save hook)
- Email validation (`@` check) + unique index
- Role-based field: `admin` or `customer`
- Profile details: age, gender, address (street, city)

### 📦 Product Management
- Product name, price, expiry date
- Category enum: `food`, `electronics`, `clothing`
- Auto-managed `criatdate` (created date)

### 🧾 Order Management
- Link a user to a product
- Record total price and order date
- Mongoose `populate()` support for full user/product details

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js 20+ |
| **Framework** | Express 4 |
| **Database** | MongoDB 7 |
| **ODM** | Mongoose 8 |
| **Config** | dotenv |
| **Dev tools** | nodemon |

---

## 📂 Project Structure
