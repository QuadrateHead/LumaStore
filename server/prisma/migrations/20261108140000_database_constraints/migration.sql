-- Keep independently stored address defaults unique per user.
CREATE UNIQUE INDEX "Address_one_default_shipping_per_user_key"
ON "Address" ("userId")
WHERE "isDefaultShipping" = TRUE;

CREATE UNIQUE INDEX "Address_one_default_billing_per_user_key"
ON "Address" ("userId")
WHERE "isDefaultBilling" = TRUE;

ALTER TABLE "Product"
ADD CONSTRAINT "Product_price_positive_check" CHECK ("price" > 0),
ADD CONSTRAINT "Product_discount_percentage_range_check"
  CHECK ("discountPercentage" BETWEEN 0 AND 100),
ADD CONSTRAINT "Product_rating_range_check" CHECK ("rating" BETWEEN 0 AND 5),
ADD CONSTRAINT "Product_review_count_nonnegative_check" CHECK ("reviewCount" >= 0);

ALTER TABLE "ProductVariant"
ADD CONSTRAINT "ProductVariant_stock_nonnegative_check" CHECK ("stock" >= 0),
ADD CONSTRAINT "ProductVariant_price_override_positive_check"
  CHECK ("priceOverride" IS NULL OR "priceOverride" > 0);

ALTER TABLE "CartItem"
ADD CONSTRAINT "CartItem_quantity_positive_check" CHECK ("quantity" >= 1);

ALTER TABLE "Order"
ADD CONSTRAINT "Order_totals_nonnegative_check"
  CHECK (
    "subtotal" >= 0
    AND "discountTotal" >= 0
    AND "shippingTotal" >= 0
    AND "taxTotal" >= 0
    AND "grandTotal" >= 0
  );

ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_quantity_positive_check" CHECK ("quantity" >= 1),
ADD CONSTRAINT "OrderItem_amounts_nonnegative_check"
  CHECK ("unitPriceSnapshot" >= 0 AND "lineTotal" >= 0);

ALTER TABLE "Coupon"
ADD CONSTRAINT "Coupon_discount_value_positive_check" CHECK ("discountValue" > 0),
ADD CONSTRAINT "Coupon_percentage_discount_max_check"
  CHECK ("discountType" <> 'percentage' OR "discountValue" <= 100),
ADD CONSTRAINT "Coupon_minimum_order_nonnegative_check"
  CHECK ("minimumOrderAmount" IS NULL OR "minimumOrderAmount" >= 0),
ADD CONSTRAINT "Coupon_usage_limit_nonnegative_check"
  CHECK ("usageLimit" IS NULL OR "usageLimit" >= 0),
ADD CONSTRAINT "Coupon_usage_count_nonnegative_check" CHECK ("usageCount" >= 0),
ADD CONSTRAINT "Coupon_date_range_check"
  CHECK ("startsAt" IS NULL OR "expiresAt" IS NULL OR "startsAt" <= "expiresAt");

ALTER TABLE "CouponRedemption"
ADD CONSTRAINT "CouponRedemption_discount_nonnegative_check"
  CHECK ("discountAmount" >= 0);

ALTER TABLE "Review"
ADD CONSTRAINT "Review_rating_range_check" CHECK ("rating" BETWEEN 1 AND 5);

CREATE OR REPLACE FUNCTION "refresh_product_review_aggregate"()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  target_product_id TEXT;
BEGIN
  IF TG_OP = 'UPDATE' AND NEW."productId" IS DISTINCT FROM OLD."productId" THEN
    UPDATE "Product" AS p
    SET
      "rating" = COALESCE((
        SELECT ROUND(AVG(r."rating")::numeric, 2)
        FROM "Review" AS r
        WHERE r."productId" = OLD."productId" AND r."status" = 'approved'
      ), 0),
      "reviewCount" = (
        SELECT COUNT(*)::integer
        FROM "Review" AS r
        WHERE r."productId" = OLD."productId" AND r."status" = 'approved'
      ),
      "updatedAt" = CURRENT_TIMESTAMP
    WHERE p."id" = OLD."productId";
  END IF;

  IF TG_OP = 'DELETE' THEN
    target_product_id := OLD."productId";
  ELSE
    target_product_id := NEW."productId";
  END IF;

  UPDATE "Product" AS p
  SET
    "rating" = COALESCE((
      SELECT ROUND(AVG(r."rating")::numeric, 2)
      FROM "Review" AS r
      WHERE r."productId" = target_product_id AND r."status" = 'approved'
    ), 0),
    "reviewCount" = (
      SELECT COUNT(*)::integer
      FROM "Review" AS r
      WHERE r."productId" = target_product_id AND r."status" = 'approved'
    ),
    "updatedAt" = CURRENT_TIMESTAMP
  WHERE p."id" = target_product_id;

  RETURN NULL;
END;
$$;

CREATE TRIGGER "Review_refresh_product_aggregate"
AFTER INSERT OR UPDATE OR DELETE ON "Review"
FOR EACH ROW
EXECUTE FUNCTION "refresh_product_review_aggregate"();
