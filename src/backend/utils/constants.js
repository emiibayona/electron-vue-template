const PAYMENT_METHOD = {
  CASH: "CASH",
  CREDIT_CARD: "CREDIT_CARD",
  DEBIT_CARD: "DEBIT_CARD",
  BANK_TRANSFER: "BANK_TRANSFER,",
};

const PAYMENT_TYPE = {
  INCOME: "INCOME",
  OUTCOME: "OUTCOME",
};

const STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PENDING: "PENDING",
};

const PEOPLE_TYPE = {
  STUDENT: "STUDENT",
  EMPLOYEE: "EMPLOYEE",
  OTHER: "OTHER",
};

module.exports = { PAYMENT_METHOD, PAYMENT_TYPE, STATUS, PEOPLE_TYPE };
