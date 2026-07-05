// A RAWG às vezes concatena várias traduções da descrição no mesmo campo
// (inglês, seguido de "Español", "Русский" etc). Como o inglês sempre vem
// primeiro, cortamos o texto assim que encontramos o marcador de outro idioma.
const MARCADORES_DE_OUTRO_IDIOMA = [
  "Español",
  "Português-Brasil",
  "Português",
  "Русский",
  "Français",
  "Polski",
  "Deutsch",
  "Italiano",
  "Türkçe",
  "日本語",
  "한국어",
  "中文",
];

export function apenasDescricaoEmIngles(texto: string): string {
  let indiceCorte = texto.length;

  for (const marcador of MARCADORES_DE_OUTRO_IDIOMA) {
    const indice = texto.indexOf(marcador);
    if (indice !== -1 && indice < indiceCorte) {
      indiceCorte = indice;
    }
  }

  return texto.slice(0, indiceCorte).trim();
}