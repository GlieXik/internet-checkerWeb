import axios from "axios";
const handler = async (req, res) => {
  const status = (await axios(process.env.URL, {
    timeout: 5000,
  }))
    ? true
    : false;

  res.status(200).json({ status });
};
export default handler;
