import { BergamotApiClient } from "../shared-resources/BergamotApiClient";
import { TranslationChild } from "./TranslationChild";

const init = async () => {
  /*
  await initErrorReportingInContentScript(
    "port-from-document-translation-content-script:index",
  );
  */
  console.debug({ document, window });

  const bergamotApiClient = new BergamotApiClient();
  (window as any).bergamotApiClient = bergamotApiClient;

  window.addEventListener("DOMContentLoaded", async () => {
    console.log("DOMContentLoaded");

    const translationChild = new TranslationChild(document);
    translationChild.checkForTranslation();

    const translationResults = await bergamotApiClient.sendTranslationRequest([
      "Hello world",
      "Foo bar",
      "Una prueba",
    ]);
    console.log({ translationResults });
  });
};
// noinspection JSIgnoredPromiseFromCall
init();
