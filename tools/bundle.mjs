/* Assemble les modules ES de src/ en un seul script classique (sans dépendance).
   Pourquoi : les navigateurs refusent de charger des modules quand une page est ouverte directement depuis le disque
   (adresse file://). Un script classique fonctionne partout : hébergé, installé, ou ouvert par double-clic.

   Formes acceptées dans src/ (toute autre forme fait échouer l'assemblage, pour ne rien casser en silence) :
     import { a, b as c } from './x.js';     import X from './x.js';
     export function / async function / const / let / class nom …;     export default …; */
import { readFileSync } from 'node:fs';
import { dirname, join, normalize, relative } from 'node:path';

const IMPORT_RE = /^import\s+(?:\{([^}]*)\}|([A-Za-z_$][\w$]*))\s+from\s+'([^']+)';?[ \t]*$/gm;
const EXPORT_RE = /^export\s+(?:(default)\s+|(?:async\s+)?function\*?\s+([A-Za-z_$][\w$]*)|(?:const|let|class)\s+([A-Za-z_$][\w$]*))/gm;

function parse(root, file) {
  let code = readFileSync(join(root, file), 'utf8');
  const deps = [];
  const head = [];
  code = code.replace(IMPORT_RE, (_, names, def, spec) => {
    if (!spec.startsWith('.')) throw new Error(file + ' : import non relatif ' + spec);
    const dep = normalize(join(dirname(file), spec)).replace(/\\/g, '/');
    deps.push(dep);
    const ref = `__m[${JSON.stringify(dep)}]`;
    if (def) head.push(`const ${def} = ${ref}.default;`);
    else {
      const parts = names.split(',').map((n) => n.trim()).filter(Boolean).map((n) => {
        const [a, b] = n.split(/\s+as\s+/);
        return b ? `${a}: ${b}` : a;
      });
      head.push(`const { ${parts.join(', ')} } = ${ref};`);
    }
    return '';
  });
  const names = [];
  let hasDefault = false;
  code = code.replace(EXPORT_RE, (m, dflt, fn, decl) => {
    if (dflt) {
      hasDefault = true;
      return 'const __default = ';
    }
    names.push(fn || decl);
    return m.replace(/^export\s+/, '');
  });
  if (/^(import|export)\s/m.test(code)) throw new Error(file + ' : forme d’import / export non gérée par tools/bundle.mjs');
  if (/import\.meta|(^|[^.\w$])import\s*\(\s*['"`]/m.test(code)) throw new Error(file + ' : import dynamique ou import.meta non gérés');
  const exp = names.concat(hasDefault ? ['default: __default'] : []);
  return { file, deps, body: head.join('\n') + '\n' + code.trim() + `\nreturn { ${exp.join(', ')} };` };
}

/** Renvoie le script assemblé à partir du point d'entrée (chemin relatif à root, ex. 'src/main.js'). */
export function bundle(root, entry) {
  const mods = new Map();
  const order = [];
  const visiting = new Set();
  const visit = (file, from) => {
    if (mods.has(file)) return;
    if (visiting.has(file)) throw new Error('import circulaire : ' + from + ' → ' + file);
    visiting.add(file);
    const m = parse(root, file);
    for (const d of m.deps) visit(d, file);
    visiting.delete(file);
    mods.set(file, m);
    order.push(m);
  };
  visit(entry, entry);
  return `/* Fichier généré par « npm run build » à partir de ${entry} : ne pas modifier à la main.
   Modules : ${order.map((m) => relative('src', m.file)).join(', ')} */
(function () {
'use strict';
const __m = Object.create(null);
${order.map((m) => `__m[${JSON.stringify(m.file)}] = (function () {\n${m.body}\n})();`).join('\n\n')}
})();
`;
}
