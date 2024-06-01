import { Quasar } from 'quasar';

const langList = import.meta.glob('../../node_modules/quasar/lang/*.mjs');

export default async function changeLanguage(langIso: string): Promise<void> {
  try {
    langList[`../../node_modules/quasar/lang/${langIso}.mjs`]().then((lang) => {
      Quasar.lang.set(lang.default);
    });
  } catch (err) { //
  }
}
