// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const pincode = [23456,67844,34672,23234,45545]
export default function handler(req, res) {
    res.status(200).json(pincode)
  }