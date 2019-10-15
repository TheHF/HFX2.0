class BatteryAbsoluteTime extends HFX.Feature {
  constructor() {
    super({
      section: HFX.Section.Game,
      name: "Battery Absolute Time",
      default: 1,
      description: "Show absolute timestamp for battery full charge.",
      id: "batteryabsolutetime"
    });
  }

  run() {
    if ($("#game_content_currentpage").length > 0) {
      var extractedRechargeTime = (
        $("#game_content_currentpage").find(".tinytext > span").attr("title")
          ? $("#game_content_currentpage").find(".tinytext > span").attr("title")
          : $("#game_content_currentpage").find("em").text()
      );
      var batteryTimeElement = (
        $("#game_content_currentpage").find(".tinytext > span")
          ? $("#game_content_currentpage").find(".tinytext > span")
          : $(".gmiddle").parent().find("em")
      );
      var rechargeDate = moment(extractedRechargeTime, "MM-DD-YYYY, hh:mm A"); // 06-25-2019, 07:35 PM
      batteryTimeElement.after($("<span>").text("(" + rechargeDate.format("MM-DD-YYYY @ hh:mm A") + ")"));
    }
  }
};

module.exports = new BatteryAbsoluteTime();