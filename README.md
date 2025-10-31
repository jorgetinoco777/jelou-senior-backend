# Jelou - Prueba técnica


## 🚀 Project Execution

### 🔧 Build and set up all the services

```bash
docker compose up --build
```

Services to get up and ports:

| Servicio          | Puerto local | Descripción                      |
| ----------------- | ------------ | -------------------------------- |
| **customers-api** | 3001         | REST API for customer management |
| **orders-api**    | 3002         | REST API for orders and products |
| **MySQL**         | 3306         | Database                         |

---

### 🧩 Run the Lambda Orchestrator (Local)

From the `lambda-orquestrator` directory, run:

```bash
npm run dev
```

URL retrieved locally **Lambda Orchestrator local** en `https://localhost:3000`.

---

## 🔐 Customers API

### 🌐 URL Base

```
http://localhost:3001
```

---

### 🔑 Authentication

Obtain a **JWT Token** for authentication:

### ▶️ Login

```bash
curl -X POST ${CUSTOMERS_API_URL}/auth/login   -H "Content-Type: application/json"   -d '{
    "email": "jelou@jelou.com",
    "password": "12345"
  }'
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 👥 Api Customer

### ➕ Create customer

```bash
curl -X POST ${CUSTOMERS_API_URL}/customers   -H "Content-Type: application/json"   -H "Authorization: Bearer ${JWT_TOKEN}"   -d '{
    "name": "ACME Corporation",
    "email": "ops@acme.com",
    "phone": "+593987654321"
  }'
```

**Response (201 Created):**

```json
{
  "success": true,
  "customer": {
    "id": 1,
    "name": "Jorge Jelou",
    "email": "jelou@jelou.com",
    "phone": "+123123123"
  }
}
```

---

### 🔍 Get customer by id

```bash
curl -X GET ${CUSTOMERS_API_URL}/customers/1   -H "Authorization: Bearer ${JWT_TOKEN}"
```

---

### 🔎 Search customers

```bash
curl -X GET "${CUSTOMERS_API_URL}/customers?search=jor&limit=10"   -H "Authorization: Bearer ${JWT_TOKEN}"
```

---

### 🔄 Update customer

```bash
curl -X PUT ${CUSTOMERS_API_URL}/customers/1   -H "Content-Type: application/json"   -H "Authorization: Bearer ${JWT_TOKEN}"   -d '{
    "name": "Jorge Luis",
    "email": "jelou@jelou.com",
    "phone": "99989009809"
  }'
```

---

### ❌ Delete customer

```bash
curl -X DELETE ${CUSTOMERS_API_URL}/customers/1   -H "Authorization: Bearer ${JWT_TOKEN}"
```

---

# 📦 Orders API

### 🌐 URL Base

```
http://localhost:3002
```

---

## 🧰 Main Endpoints

### 🛍️ Products

- **GET** `/products/:id` → Get product by id
- **GET** `/products` → List products
- **POST** `/products` → Create product
- **PUT** `/products/:id` → Update product

---

### 🧾 Orders

- **GET** `/orders` → List orders
- **POST** `/orders` → Create order
- **GET** `/orders/:id` → Get order by id
- **POST** `/orders/:id/confirm` → Confirm order (requiere `X-Idempotency-Key`)
- **POST** `/orders/:id/cancel` → Cancel order

---

## 🧠 Order status

| State       | Description               |
| ----------- | ------------------------- |
| `CREATED`   | Pending confirmation      |
| `CONFIRMED` | Confirmed and in process  |
| `CANCELED`  | Cancelled, stock restored |

---

# 🧭 Lambda Orchestrator

### 🌐 URL Base

```
https://localhost:4001
```

### 🧩 Run lambda
From the `lambda-orquestrator` directory, run:

```bash
npm run dev
```

### 📦 Principal endpoint

`POST /orchestrator/create-and-confirm-order`

Resume:

1. Validate client (Customers API)
2. Create order (Orders API)
3. Confirm order (with idempotence)

---

## 💬 Example

```bash
curl -X POST https://localhost:3000/orchestrator/create-and-confirm-order
-H "Content-Type: application/json"
-d '{
    "customer_id": 3,
    "items": [
        {
            "product_id": 5,
            "qty": 2
        }
    ],
    "idempotency_key": "yja-126-a3q"
}'
```

---

**Success response (200):**

```json
{
    "success": true,
    "data": {
        "customer": {
            "id": 3,
            "email": "carlos.herrera@example.com",
            "name": "Carlos Herrera",
            "phone": "+593912345678"
        },
        "order": {
            "id": 55,
            "total": 498,
            "items": [
                {
                    "id": 5,
                    "qty": 2,
                    "unit_price": 249,
                    "subtotal": 498
                }
            ]
        }
    }
}
```
