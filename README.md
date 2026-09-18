
### 🔗 Relationship Summary

| Relationship | Type | Description |
|--------------|------|-------------|
| **User → Order** | One-to-Many | A user can place many orders; each order belongs to exactly one user |
| **Product → Order** | One-to-Many | A product can appear in many orders; each order references one product |

Both relationships are stored as **ObjectId references** and resolved at query time using Mongoose's `.populate()` method.

---

### 1️⃣ User Collection

Stores all system users — both admins and customers.

```js
const userSchema = new mongoose.Schema({
  ferstname: String,
  lastname:  String,
  name:      { type: String },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: v => v.includes("@"),
      message: "البريد الإلكتروني غير صحيح"
    }
  },
  role:     { type: String, enum: ["admin", "customer"] },
  password: String,
  age:      Number,
  gender:   { type: String, enum: ["male", "female"] },
  address: {
    street: String,
    city:   String
  }
});

// Auto-generate full name before saving
userSchema.pre("save", function () {
  this.name = this.ferstname + " " + this.lastname;
});
