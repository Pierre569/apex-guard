# Data Schema (Firestore)

## 1. Collections

### `appointments`
Stores all booked services.
```json
{
  "id": "auto-generated-id",
  "customerId": "ref:customers/id",
  "status": "confirmed" | "pending" | "completed" | "cancelled",
  "serviceType": "quarterly_defense" | "termite_inspection" | "general_consultation",
  "scheduledAt": "Timestamp",
  "durationMinutes": 60,
  "notes": "User mentioned seeing ants in the kitchen.",
  "createdAt": "Timestamp"
}
```

### `customers`
Profiles for home owners.
```json
{
  "id": "firebase-auth-uid",
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phoneNumber": "+15551234567",
  "address": {
    "street": "123 Maple Dr",
    "city": "Raleigh",
    "state": "NC",
    "zip": "27601"
  },
  "createdAt": "Timestamp"
}
```

### `leads` (from Vapi/Web)
Potential customers who haven't booked yet or incomplete bookings.
```json
{
  "id": "auto-generated-id",
  "source": "vapi" | "website",
  "transcription": "Customer called asking about termite pricing...",
  "contactInfo": {
    "phone": "+15550009999",
    "email": "optional@test.com"
  },
  "status": "new" | "contacted" | "converted" | "archived",
  "createdAt": "Timestamp"
}
```
