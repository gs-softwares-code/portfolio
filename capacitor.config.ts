import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.gssoftwares.admin",
  appName: "GS Admin",
  webDir: "out",
  server: {
    url: "https://gs-softwares-official.vercel.app/admin",
    cleartext: true,
  },
};

export default config;
