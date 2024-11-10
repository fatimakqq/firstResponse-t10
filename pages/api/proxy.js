import fetch from 'node-fetch';

export default async (req, res) => {
  const { query } = req;
  const { data } = await fetch(`https://example.com/api?param1=${query.param1}&param2=${query.param2}`).then((res) => res.json());
  res.json(data);
};
