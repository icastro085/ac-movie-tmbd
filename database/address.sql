CREATE TABLE "address" (
  "email" character(256) NOT NULL,
  "address" character(100) NULL,
  "city" character(50) NULL,
  "state" character(20) NULL,
  "number" character(20) NULL,
  "phone" character(20) NULL
);

ALTER TABLE "address"
ADD CONSTRAINT "address_email" PRIMARY KEY ("email");
