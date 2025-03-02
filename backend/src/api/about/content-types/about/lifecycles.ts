import OpenCC from "opencc-js";

export default {
  async afterCreate(event) {
    const { result, params } = event;

    console.log("🚀 afterCreate 觸發，正在檢查 locale...");
    console.log(`🌍 當前 locale: ${params.data.locale}, auto_copy_simplified: ${params.data.auto_copy_simplified}`);

    // ✅ 確保 `zh-Hant-HK` 也會轉換為 `zh-CN`
    if ((params.data.locale === "zh-HK" || params.data.locale === "zh-Hant-HK") && params.data.auto_copy_simplified) {
      console.log("✅ 檢測到 zh-HK，開始轉換為 zh-CN...");

      const converter = OpenCC.Converter({ from: "hk", to: "cn" });

      // 檢查 zh-CN 內容是否已存在
      const existingCn = await strapi.entityService.findMany("api::about.about", {
        filters: { slug: result.slug, locale: "zh-CN" },
      });

      if (existingCn.length === 0) {
        console.log("🆕 沒有找到 zh-CN 版本，正在創建...");
        
        await strapi.query("api::about.about").create({
          data: {
            title: converter(result.title),
            content: converter(result.content),
            seo_title: converter(result.seo_title),
            seo_description: converter(result.seo_description),
            slug: result.slug,
            locale: "zh-CN",
            auto_copy_simplified: false,
            publishedAt: result.publishedAt,
          },
        });

        console.log("🎉 zh-CN 版本已成功創建！");
      } else {
        console.log("⚠️ zh-CN 內容已存在，不重複創建。");
      }
    } else {
      console.log("⚠️ 不是 zh-HK / zh-Hant-HK 或 `auto_copy_simplified` 為 false，跳過。");
    }
  },
};
