import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { createHtmlReport } from 'axe-html-reporter';


test.describe('Accessibility', () => {
  // Pruebas paramétricas para todas las URLs de la aplicación (incluye home y about)
  const rutasAProbar: Array<{ path: string; selector: string; nombre: string }> = [
    { path: '/', selector: 'app-root', nombre: 'home' },
    { path: '/about', selector: 'app-about', nombre: 'about' },
    { path: '/genera-documentos', selector: 'app-genera-documentos', nombre: 'genera-documentos' },
    { path: '/genera-cuentas', selector: 'app-genera-cuentas', nombre: 'genera-cuentas' },
    { path: '/genera-perfiles', selector: 'app-genera-perfiles', nombre: 'genera-perfiles' },
    { path: '/genera-textos', selector: 'app-genera-textos', nombre: 'genera-textos' },
    { path: '/genera-numeros', selector: 'app-genera-numeros', nombre: 'genera-numeros' },
    { path: '/genera-fechas', selector: 'app-genera-fechas', nombre: 'genera-fechas' },
    { path: '/genera-coches', selector: 'app-genera-coches', nombre: 'genera-coches' },
    { path: '/genera-localizacion', selector: 'app-genera-localizacion', nombre: 'genera-localizacion' },
    { path: '/genera-barras', selector: 'app-genera-barras', nombre: 'genera-barras' },
    { path: '/genera-archivos', selector: 'app-genera-archivos', nombre: 'genera-archivos' },
    { path: '/genera-colores', selector: 'app-genera-colores', nombre: 'genera-colores' },
    { path: '/genera-variados', selector: 'app-genera-variados', nombre: 'genera-variados' },
  ];

  for (const ruta of rutasAProbar) {
    test(`Violaciones accesibilidad criticas/severas en pagina ${ruta.nombre}`, async ({ page }) => {
      await page.goto(ruta.path);
      await page.waitForSelector(ruta.selector, { state: 'attached' });

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Generar informe HTML específico de esta prueba
      const reportsDir = join(process.cwd(), 'axe-reports');
      mkdirSync(reportsDir, { recursive: true });
      const slug = test.info().titlePath.join('_').replace(/[^a-z0-9]+/gi, '_').toLowerCase();
      const filePath = join(reportsDir, `${slug}.html`);

      const html = createHtmlReport({
        results: accessibilityScanResults,
        options: { projectKey: 'angular-j-generadores-fe2' }
      });

      writeFileSync(filePath, html);
      await test.info().attach('axe-html-report', { path: filePath, contentType: 'text/html' });

      if (accessibilityScanResults.violations.length) {
        console.warn('[a11y] Violacion encontrada:', accessibilityScanResults.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })));
      }
      const seriousOrCritical = accessibilityScanResults.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
      expect(seriousOrCritical, 'No hay problemas de accesibilidad serios o críticos').toHaveLength(0);
    });
  }
});

// Prueba funcional separada: pulsa el botón de generar NIF en /genera-documentos
test.describe('Funcional - Genera Documentos', () => {
  test('Pulsa btnGenerarNif y muestra lista de NIFs', async ({ page }) => {
  const count = 10;
  const mockNifs = Array.from({ length: count }, (_, i) => `NIF${i + 1}`);
  let requestCount = 0;

    // Interceptar la llamada al backend y devolver datos mock
    await page.route('**/generadores/doi/nif*', async route => {
      requestCount++;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockNifs),
      });
    });

    await page.goto('/genera-documentos');
    await page.waitForSelector('app-genera-documentos', { state: 'attached' });

    // Ajustar el número de resultados a 10 antes de generar
    const numGenera = page.locator('#numGenera');
    await numGenera.fill('10');

    // Click en el botón generar NIF
    await page.click('#btnGenerarNif');

    //TEST TIPICO: comprobar que se ha mostrado la lista con los 10 NIFS
    //----------------------------------------------------------------------
    // Esperar a que aparezca la lista y validar resultados
    const nifItems = page.locator('mat-list .nif');
    await expect(nifItems).toHaveCount(count);
    await expect(nifItems.nth(0)).toHaveText(mockNifs[0]);

    // Asegurar que se invocó la API mockeada al menos una vez
    expect(requestCount).toBeGreaterThan(0);

    //TEST ACCESIBILIDAD AXE-CORE: aqui hacemos el test de accesibilidad, pero despues de haberse mostrado la lista
    // de los NIFS generados. Osea tras una transformacion de la página
    //----------------------------------------------------------------------

    //espera 2 segundos para asegurar se vean mostrados los NIFS (llevan una animacion de entrada)
    await page.waitForTimeout(2000);

    // Evidencia visual del estado tras la generación (archivo + attachment)
    const reportsDir = join(process.cwd(), 'axe-reports');
    mkdirSync(reportsDir, { recursive: true });
    const slug = test.info().titlePath.join('_').replace(/[^a-z0-9]+/gi, '_').toLowerCase();
    const screenshotPath = join(reportsDir, `${slug}-estado.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await test.info().attach('estado-despues-generar', { path: screenshotPath, contentType: 'image/png' });

    // Escaneo de accesibilidad con axe-core tras la generación
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Generar informe HTML específico de esta prueba
    const filePath = join(reportsDir, `${slug}.html`);
    const html = createHtmlReport({
      results: accessibilityScanResults,
      options: { projectKey: 'angular-j-generadores-fe2' }
    });

    // Incrustar evidencia visual (screenshot) dentro del informe HTML
    const screenshotRel = basename(screenshotPath);
    const injection = `\n<hr><h2>Estado tras generación</h2><img src="${screenshotRel}" alt="Estado tras generar NIFs" style="max-width:100%;border:1px solid #ccc"/>\n`;
    let htmlWithScreenshot: string;
    if (/<\/main>/i.test(html)) {
      htmlWithScreenshot = html.replace(/<\/main>/i, `${injection}</main>`);
    } else if (/<\/body>/i.test(html)) {
      htmlWithScreenshot = html.replace(/<\/body>/i, `${injection}</body>`);
    } else {
      htmlWithScreenshot = `${html}${injection}`;
    }

    writeFileSync(filePath, htmlWithScreenshot);
    await test.info().attach('axe-html-report', { path: filePath, contentType: 'text/html' });

    if (accessibilityScanResults.violations.length) {
      console.warn('[a11y] Violacion encontrada:', accessibilityScanResults.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })));
    }
    const seriousOrCritical = accessibilityScanResults.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
    expect(seriousOrCritical, 'No hay problemas de accesibilidad serios o críticos tras generar NIFs').toHaveLength(0);
  });
});
