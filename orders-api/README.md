## 🧩 Run the Lambda Orchestrator (Local)

From the `lambda-orquestrator` directory, run:

```bash
npm run dev
```

This service runs on port `4001`


```bash
curl -X GET localhost:4001/orchestrator/create-and-confirm-order
-H "Content-Type: application/
-d '{
    "customer_id": 1,
    "items": [
        {
            "product_id": 1,
            "qty": 1
        }
    ],
    "idempotency_key": "yja-126-a3q"
}'
```

**Response (201 Created):**

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