export const calculateCommissions = ({
  product_category,
  sub_category,
  sub_sub_category,
  product_mrp,
}) => {
  let commission_direct = 0;
  let commission_percent = 0;
  // console.log("price", product_mrp);
  if (!!product_category && !!product_category.commission_type) {
    // Add Product Category Commission
    if (product_category.commission_type === "direct_value")
      commission_direct += product_category.commission;
    else commission_percent += product_category.commission * 0.01;

    // If Sub Category Exists
    if (sub_category && sub_category.commission_type) {
      // Add Product Sub Category Commission
      if (sub_category.commission_type === "direct_value")
        commission_direct += sub_category.commission;
      else commission_percent += sub_category.commission * 0.01;

      // If Sub-Sub Category Exists
      if (sub_sub_category && sub_sub_category.commission_type) {
        // Add Product Sub-Sub Category Commission
        if (sub_sub_category.commission_type === "direct_value")
          commission_direct += sub_sub_category.commission;
        else commission_percent += sub_sub_category.commission * 0.01;
      }
    }
  }

  // Calculate total Commission
  let commission_value = Math.round(
    parseInt(product_mrp) * (1 + commission_percent) + commission_direct
  );

  // console.log("final", commission_value);

  return commission_value - parseInt(product_mrp);
};
