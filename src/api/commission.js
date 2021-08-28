import { runtimeSendMessage } from "@u/common.js";

export const getPlan = (data) => {
  return runtimeSendMessage(
    "GET",
    "/plugin/plan",
    data
  );
};

export const getItemTopN = (data) => {
  return runtimeSendMessage(
    "GET",
    "/plugin/itemTopN",
    data
  );
};

export const getCampaigns = (data) => {
  return runtimeSendMessage("GET", "/shopdetail/campaigns.json", data, "ali");
};

export const getCampaignDetail = (data) => {
  return runtimeSendMessage(
    "GET",
    "/openapi/param2/1/gateway.unionpub/mkt.campaign.info.json",
    data,
    "ali"
  );
};

export const getMerchandiseDetail = (data) => {
  return runtimeSendMessage(
    "GET",
    "/campaign/merchandiseDetail.json",
    data,
    "ali"
  );
};

export const getKeeper = (data) => {
  return runtimeSendMessage(
    "GET",
    "/shopdetail/keeper30DayRpt.json",
    data,
    "ali"
  );
};

export const getDxInfo = (data) => {
  return runtimeSendMessage(
    "GET",
    "/plugin/getDxInfo",
    data
  );
};
