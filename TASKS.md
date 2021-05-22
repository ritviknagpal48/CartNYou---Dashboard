## TASKS

    All the tasks that are in hand and need to be done in near future.

---

**Delivery API Flow**

- Make Orders Collection
- Place Order
- Send Order Info to Backend
- Pull Order Info on Wholesaler Dashboard
<!-- - Pull Order Info on Wholesaler Dashboard -->

---

**Orders Collection**

> Wholesaler ID : *wholesaler_id*

> Product ID : *product_id*

> Quantity : *product_quantity*

> Retailer ID : *retailer_id*

> Shipping Address : *shipping_address*

> Order Response : *order_response*

> Status : *status*

----------

**Orders Request JSON**

```json
{
  "auth_token": "YOUR_AUTH_TOKEN",
  "item_name": "Kryptonite",  
  "from_name": "Bruce Wayne",
  "from_phone_number": "7351857301",
  "from_address": "Basement, 1007 Mountain Drive",  
  "from_pincode": "110022",
  "pickup_gstin": "XXXXXXXXXX",
  "to_name": "Clark Kent",
  "to_phone_number": "7738828473",
  "to_pincode": "120002",
  "to_address": "344 Clinton Street",  
  "quantity": 1,  
  "invoice_value": 400,
  "cod_amount": 500,
  "client_order_id": "WAYNE007",
  "item_breadth": 10,
  "item_length": 10,
  "item_height": 5,
  "item_weight": 0.5,
  "item_tax_percentage": 12,
  "is_reverse": "False"
}
```

----------

**Orders Response JSON**

```json
{
    "success": true,
    "order_id": "12345",
    "order_pk": 236781,
    "tracking_id": "123456789",
    "manifest_link": "https://www.pickrr.com/order/generate-user-order-manifest/YOUR_AUTH_TOKEN/ORDER_PK/",
    "routing_code": "PCK/NB",
    "client_order_id": "WAYNE007",
    "courier": "Delhivery",
    "dispatch_mode": "Air",
    "child_waybill_list": [
        "S6378389939",
        "565653883",
        "56467383993"
    ]
}
```