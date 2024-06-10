export const amountDonated = (amount) => {
  return {
    type: "AMOUNT",
    payload: amount,
  };
};

export const campaignId = (id) => {
  return {
    type: "ID",
    payload: id,
  };
};
