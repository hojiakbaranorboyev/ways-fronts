import { getData } from "ui";

const server = {
  get: (req: IGetRequest) => {
    return getData({ ...req, url: "/client" + req.url });
  },
};

export default server;
