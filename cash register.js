const checkCashRegister = (price, cash, cid) => {
  const UNIT_AMOUNT = {
    "PENNY": .01,
    "NICKEL": .05,
    "DIME": .10,
    "QUARTER": .25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  }
  let totalCid = 0;
  for (let element of cid) {
    totalCid += element[1];
  }
  totalCid = totalCid.toFixed(2);
  let changeDue = cash - price;
  const change = [];
  if (changeDue > totalCid) {
    return { status: "INSUFFICIENT_FUNDS", change: change };
  } else if (changeDue.toFixed(2) === totalCid) {
    return { status: "CLOSED", change: cid };
  } else {
    cid = cid.reverse();
    for (let elem of cid) {
      let temp = [elem[0], 0];
      while (changeDue >= UNIT_AMOUNT[elem[0]] && elem[1] > 0) {
        temp[1] += UNIT_AMOUNT[elem[0]];
        elem[1] -= UNIT_AMOUNT[elem[0]];
        changeDue -= UNIT_AMOUNT[elem[0]];
        changeDue = changeDue.toFixed(2);
      }
      if (temp[1] > 0) {
        change.push(temp);
      }
    }
  }
  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  return { status: "OPEN", change: change};
}