Order Settlement System
----

--------------------------

>**Wholersaler**  
- Product Price : product_mrp   
- Order Quantity : quantity   
- Total Order Value : product_mrp x quantity  

>**Retailer**  
- Product Price : product_mrp + admin_commission  
- Shopify Price : product_price + retailer_commission = retailer_price    
- Order Quantity :  quantity   
- Order received : retailer_price x quantity     

>**Order settlement to wholesaler from retailer end:**   
- Amount_To_Wholesaler : ( product_mrp + admin_commsion) x quantity   
- Retailer Wallet update with decriment of amount_to_wholesaler   

>**Admin Smartness**  
- *admin_to_wholesaler*   
product_mrp x quantity = Amount_To_Wholesaler - admin_commsion x quantity  
- *Wholesaler Wallet Update with admin_to_wholesale*   
Admin_transcation : Amount_To_Wholesaler - admin_to_wholesaler