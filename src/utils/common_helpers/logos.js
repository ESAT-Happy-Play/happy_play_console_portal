import regularLogo from "../assets/regular-logo.png";
import powerWinLogo from "../assets/power-win-logo.png";
import trippleWinLogo from "../assets/tripple-win-logo.png";
import magicWinLogo from "../assets/magic-win-logo.png";
import jackpot33 from "../assets/jackpot-3.3-logo.png";
import jackpot34 from "../assets/jackpot-3.4-logo.png";

export const getGameLogo = (gameName, subtypeName, width) => {
  if (gameName === "Regular Game") {
    switch (subtypeName) {
      case "Regular":
        return (
          <img
            src={regularLogo}
            alt={subtypeName}
            style={{ marginRight: "8px" }}
            width={width}
          />
        );
      case "Power Win":
        return (
          <img
            src={powerWinLogo}
            alt={subtypeName}
            style={{ marginRight: "8px" }}
            width={width}
          />
        );
      case "Tripple Win":
        return (
          <img
            src={trippleWinLogo}
            alt={subtypeName}
            style={{ marginRight: "8px" }}
            width={width}
          />
        );
      case "Magic Win":
        return (
          <img
            src={magicWinLogo}
            alt={subtypeName}
            style={{ marginRight: "8px" }}
            width={width}
          />
        );
      default:
        <></>;
    }
  } else {
    switch (gameName) {
      case "Jackpot 3.3":
        return (
          <img
            src={jackpot33}
            alt={subtypeName}
            style={{ marginRight: "8px" }}
            width={width}
          />
        );
      case "Jackpot 3.4":
        return (
          <img
            src={jackpot34}
            alt={subtypeName}
            style={{ marginRight: "8px" }}
            width={width}
          />
        );
      default:
        <></>;
    }
  }
};
