import axios from "axios";
const handler = async (req, res) => {
  const fetching = async () => {
    try {
      const response = await axios(process.env.URL, {
        timeout: 5000,
      });
      return true;
    } catch (error) {
      return false;
    }
  };
  const status = await fetching();
  res.status(200).json({ status });
};
export default handler;
