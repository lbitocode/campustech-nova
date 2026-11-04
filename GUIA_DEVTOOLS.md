# GUÍA PRÁCTICA: AUDITORÍA DEL BOX MODEL CON CHROME DEVTOOLS
## Sesión 06 — Unidad 2: CSS | CampusTech UTP 2026

### Pasos para Inspección en el Laboratorio:
1. Abre `index.html` con Live Server.
2. Presiona `F12` o `Ctrl + Shift + I` para abrir Chrome DevTools.
3. Activa la herramienta de selección (`Ctrl + Shift + C`) y haz clic sobre el hero banner o la tarjeta de un track.
4. En el panel **Elements > Styles**, verifica la pestaña **Computed**:
   - Observa el diagrama del **Box Model**: Content, Padding, Border y Margin.
   - Modifica en tiempo real el valor de `--primary` en `:root` y comprueba cómo cambia el color de los títulos al instante.
5. Usa la pestaña **Console** para verificar que no haya advertencias de recursos bloqueados ni 404 en las imágenes SVG.
