const text = `A transaction of SGD 6.00 was made with your UOB Card ending 8628 on 23/08/24 at BEARD PAPAS. If unauthorised, call 24/7 Fraud Hotline now
  UOB EMAIL DISCLAIMER
Any person receiving this email and any attachment(s) contained,
shall treat the information as confidential and not misuse, copy,
disclose, distribute or retain the information in any way that
  amounts to a breach of confidentiality. If you are not the intended
recipient, please delete all copies of this email from your computer
system. As the integrity of this message cannot be guaranteed,
neither UOB nor any entity in the UOB Group shall be responsible for
the contents. Any opinion in this email may not necessarily represent
  the opinion of UOB or any entity in the UOB Group.`;

const amountMatch = text.match(/SGD (\d+\.\d{2})/);
const cardMatch = text.match(/ending (\d{4})/);
const dateMatch = text.match(/on (\d{2}\/\d{2}\/\d{2})/);
const locationMatch = text.match(/at ([^.]+)\./);

const amount = amountMatch ? amountMatch[1] : null;
const cardNumber = cardMatch ? cardMatch[1] : null;
const date = dateMatch ? dateMatch[1] : null;
const location = locationMatch ? locationMatch[1].trim() : null;

console.log({ amount, cardNumber, date, location });
