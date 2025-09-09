import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "TradeHubPro",
  version: packageJson.version,
  copyright: `© ${currentYear}, TradeHubPro Admin.`,
  meta: {
    title: "TradeHubPro Admin - Giao diện quản trị hiện đại cho ứng dụng quản lý",
    description:
      "Quản lý ứng dụng của bạn một cách hiệu quả với TradeHubPro Admin, giao diện quản trị hiện đại và dễ sử dụng. Tối ưu hóa quy trình làm việc và nâng cao hiệu suất quản lý ngay hôm nay. ",
  },
};
