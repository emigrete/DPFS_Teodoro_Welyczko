# 📌 Retrospectiva del Sprint 1

Reflexioné sobre lo que hice bien y lo que puedo mejorar en los siguientes sprints.

## ⭐ Lo que salió bien
✅ Elegí una temática que realmente me gusta: **tecnología**. Esto hará que trabajar en el proyecto sea más motivador y entretenido.  
✅ Logré completar la planificación con wireframes y referencias de mercado, lo que me dará una buena base para avanzar.  

## ⚠️ Lo que puedo mejorar
❌ **Pérdida de tiempo en herramientas inadecuadas.** Me costó encontrar las páginas adecuadas para hacer el prototipo, y pasé mucho tiempo en herramientas que no dominaba.  

## 🎯 Plan de mejora para Sprint 2
🔹 Evitar perder tiempo en herramientas que no sean efectivas.  
🔹 Elegir herramientas que se adapten mejor a mis necesidades y conocimientos.  
🔹 Seguir enfocándome en la temática de tecnología, ya que es lo que me motiva.  

---

💡 **Conclusión:** Para este sprint, voy a optimizar mi tiempo eligiendo mejor las herramientas y enfocándome en lo que realmente aporta valor a mi proyecto. 

# 📌 Retrospectiva del Sprint 2

## ⭐ Lo que salió bien

✅ Se completó la estructura HTML y CSS de todas las páginas principales.
✅ Diseño coherente con los colores y la identidad visual de la empresa.
✅ Mejora en la organización del CSS, separándolo en archivos por página.
✅ Uso de GitHub para versionar el código correctamente.
✅ Implementación de la navegación y el footer reutilizable en todas las páginas.

## ⚠️ Lo que puedo mejorar

⏳ Optimización del código: Hay secciones HTML y CSS repetitivas que podrían modularizarse.
📂 Estructura de carpetas: Algunos archivos pueden organizarse mejor en /views/partials/.
🔄 Reutilización de componentes: El header y el footer deberían cargarse dinámicamente.
📑 Código más limpio y ordenado: Evitar código innecesario en los estilos y mejorar la semántica del HTML.

## 🎯 Plan de mejora para Sprint 3

🔹 Implementar EJS para hacer las vistas más dinámicas y reutilizar componentes.
🔹 Separar las vistas en carpetas products/ y users/ para mayor claridad.
🔹 Crear archivos parciales (partials/) para header, footer y head.

---

💡 **Conclusión:* Para este sprint, voy a concentrarme en no repetir codigo, modularizar bien y lograr un codigo mas limpio 

# 📌 Retrospectiva del Sprint 3

## ⭐ Lo que salió bien

✅ Implementación de EJS para hacer las vistas dinámicas y reutilizar componentes.
✅ Creación de una Navbar Sticky, asegurando una navegación fluida.
✅ Corrección del Footer fijo, evitando que el contenido se superponga.
✅ Creación de la página de productos, mostrando una mejor variedad de artículos.
✅ Separación de vistas en carpetas products/ y users/ para mayor claridad.
✅ Modularización del código con archivos parciales (partials/header.ejs, partials/footer.ejs, partials/head.ejs).
✅ Implementación de sesiones de usuario y diferenciación de accesos para administradores.
✅ Correcta organización en GitHub y versionado del código al finalizar el sprint.

## ⚠️ Lo que puedo mejorar

⏳ Optimización del código: Todavía hay partes del código que podrían refactorizarse y hacerse más reutilizables.
📂 Organización de rutas: Se podrían dividir mejor las rutas en mainRoutes.js y productsRoutes.js.
🔄 Flujo de autenticación: Asegurar que el login y logout funcionen correctamente en todas las vistas.
📑 Revisión de estilos: Asegurar consistencia en botones, inputs y tipografías en todas las páginas.
📌 Corregir nombres de rutas y formularios: Algunas URLs tienen nombres inconsistentes (/product/create en lugar de /products/create).

## 🎯 Plan de mejora para Sprint 3

🔹 Implementar CRUD de productos, permitiendo crear, editar y eliminar productos desde JSON.
🔹 Definir la estructura de datos en products.json y users.json para almacenamiento.
🔹 Separar y modularizar más las rutas, creando un productsModel.js para manejar JSON.
🔹 Verificar la seguridad en las rutas, evitando accesos no autorizados.
🔹 Mejorar la validación de formularios para evitar datos incorrectos en la base de datos.

---

💡 Conclusión: Este sprint nos permitió estructurar mejor las vistas y la navegación del sitio. Para el próximo sprint, el objetivo es darle funcionalidad real al sitio mediante la carga dinámica de productos y usuarios.

# 📌 Retrospectiva del Sprint 4
El Sprint 4 fue clave en la implementación del CRUD de productos con JSON, lo que nos permitió mejorar la gestión de datos y la experiencia de usuario. 

## ⭐ Lo que salió bien

✅Estructuramos el servidor con Express, permitiendo modularizar mejor el código.
✅Implementamos un CRUD completo para la gestión de productos.
✅ Desarrollamos vistas dinámicas con EJS, optimizando la reusabilidad de componentes.
✅ Agregamos Multer para la subida de imágenes, mejorando la presentación visual.
✅Implementamos autenticación y roles para diferenciar funciones de admin y usuario.
✅ Creación de buscador y filtros para mejorar la usabilidad y navegación.
✅Mejoramos la navegación agregando botones de edición y eliminación visibles solo para admins.

## ⚠️ Lo que puedo mejorar

🔹 La estructura de las rutas y controladores podría optimizarse para mayor claridad.
🔹 Falta implementar un diseño responsive para mejorar la experiencia en móviles.
🔹 Mejorar la validación de formularios para evitar datos incompletos o erróneos.
🔹 Implementar una mejor gestión de errores y redirecciones en acciones del CRUD.

## 🎯 Plan de mejora para Sprint 5

🔹Tomarme mas tiempo de descanso cuando un error no es facil de resolver
🔹Evitar intentar solucionar problemas grandes sin antes dividirlo en problemas mas chicos, la funcion de filter la encare mal. 

---

💡 Conclusión: Este sprint logro hacer que el sitio sea mas interactivo y mas real, toca mejorar en como se encaran los problemas en lo personal pero por lo demas considero que voy a buen ritmo 
