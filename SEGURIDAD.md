# Seguridad para Publicacion del Prototipo

Este proyecto esta pensado como una pagina web estatica para presentacion universitaria.

## Enfoque recomendado

- Publicar solo los archivos `index.html`, `styles.css`, `script.js` y `assets/`.
- Usar hosting estatico, por ejemplo GitHub Pages, Netlify, Cloudflare Pages o Vercel.
- No usar un servidor propio para este prototipo.
- No agregar base de datos.
- No pedir RUT, contrasenas, correos reales ni informacion sensible.
- Mantener el acceso como modo invitado/demo.

## Por que es mas seguro

Al ser estatica, la pagina no procesa datos personales y no expone servicios internos.
Cualquier persona puede verla, pero no hay cuentas reales ni informacion privada que proteger.

## Si el proyecto creciera

Si en el futuro se quisiera login real, certificados reales o seguimiento de progreso,
habria que agregar autenticacion, base de datos, HTTPS, control de accesos, validacion de
entradas, monitoreo y politicas de privacidad. Eso no es necesario para esta entrega.
