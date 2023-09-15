import { en } from "@formkit/i18n";
import { generateClasses } from "@formkit/themes";
import { genesisIcons } from "@formkit/icons";
import myTailwindTheme from "./tailwind-theme";

export default {
  locales: { en },
  locale: "en",
  icons: {
    ...genesisIcons,
  },
  config: {
    classes: generateClasses(myTailwindTheme),
  },
};
