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

---

# 📌 Retrospectiva del Sprint 5
Este Sprint se enfocó en la implementación del sistema de usuarios, incluyendo el registro, login, logout y control de accesos. También se mejoró la experiencia del usuario con navbar dinámica y protección de rutas.

## ⭐ Lo que salió bien
✅ Registro de usuarios funcionando correctamente con validaciones, subida de imagen y encriptación de contraseñas.
✅ Login y Logout con sesiones y cookies ("Recordarme") permitiendo mantener la sesión iniciada.
✅ Protección de rutas con middlewares guestMiddleware y authMiddleware, evitando accesos no permitidos.
✅ Navbar dinámica que muestra diferentes opciones dependiendo si el usuario está logueado o no.
✅ Perfil de usuario funcional, mostrando correctamente la imagen de perfil y datos personales.
✅ Corrección de errores en redirecciones al iniciar y cerrar sesión, asegurando que el flujo de navegación sea correcto.
✅ Buena gestión de errores en login y registro, mostrando mensajes claros cuando hay problemas con email o contraseña.
✅ Mejoras en el diseño para que la navbar y el perfil sean más visuales y atractivos.

## ⚠️ Lo que puedo mejorar
🔹 Detectar errores más rápido en autenticación y sesiones. Perdí tiempo con redirecciones incorrectas porque req.session.user no se estaba guardando bien.
🔹 Evitar errores por orden de ejecución, como lo que pasó con res.redirect("/profile") antes de guardar la sesión.
🔹 Hacer más pruebas con cookies y sesiones en diferentes navegadores para asegurar compatibilidad total.
🔹 Optimizar la validación en el registro para dar mensajes de error más específicos.

## 🎯 Plan de mejora para Sprint 6
🔹 Revisar bien el orden de ejecución en middlewares y controladores para evitar bugs de flujo.
🔹 Practicar más debugging con console.log() en sesiones y cookies para detectar errores más rápido.
🔹 Optimizar la validación de login y registro, permitiendo que el usuario vea en qué campo falló de manera más clara.
🔹 Seguir mejorando la interfaz de usuario, agregando pequeños detalles para hacer la experiencia más fluida.

---

💡 Conclusión: Este Sprint fue clave para establecer el sistema de usuarios y protección de rutas. Aprendí a manejar sesiones, cookies y middlewares con más precisión, aunque aún hay margen de mejora en cómo debuggeo errores de autenticación. Voy por buen camino y cada sprint el sistema es más sólido. 

---

# 📌 Retrospectiva del Sprint 6
Este Sprint estuvo enfocado en migrar el proyecto de archivos JSON a una base de datos con Sequelize, asegurando que la estructura sea sólida y compatible con el CRUD de productos y usuarios. También mejoramos la autenticación, el carrito y la búsqueda dinámica de productos.

## ⭐ Lo que salió bien
✅ Migración completa de los datos de JSON a MySQL con Sequelize.
✅ Configuración de Sequelize con modelos, relaciones y migraciones correctamente establecidas.
✅ Seeders bien estructurados para poblar la base de datos con categorías, productos, marcas y usuarios.
✅ CRUD de productos y usuarios funcionando completamente con Sequelize.
✅ Autenticación con sesiones y cookies integrada con la base de datos.
✅ Middleware de autenticación y autorización optimizados para mejorar la seguridad.
✅ Filtros de búsqueda por categoría, marca y color funcionando dinámicamente.
✅ Navbar dinámica basada en el estado del usuario (logueado o no).
✅ Interfaz de usuario mejorada con formularios que cargan dinámicamente categorías, marcas y colores desde la base de datos.
✅ Corrección de errores en la asignación de IDs en seeders, asegurando un orden correcto en la inserción de datos.

## ⚠️ Lo que puedo mejorar
🔹 Orden de ejecución de los seeders: Perdi tiempo porque algunos datos no se insertaban correctamente debido a claves foráneas.
🔹 Errores con IDs auto-incrementales: Fue necesario resetear los contadores para evitar IDs muy altos en cada rollback.
🔹 Optimización del proceso de autenticación: Al principio había problemas con sesiones y cookies que costaron debugging.
🔹 Mejor manejo de validaciones en formularios: Algunos errores podrían mostrarse de forma más clara en el frontend.
🔹 Mejorar la documentación de las relaciones en los modelos para evitar confusión al modificar la base de datos.

## 🎯 Plan de mejora para Sprint 7
🔹 Automatizar la ejecución de seeders para evitar problemas con el orden.
🔹 Optimizar la validación de formularios para mejorar la experiencia del usuario.
🔹 Hacer un mejor manejo de errores en Sequelize, evitando que crashee la app cuando hay problemas de conexión.
🔹 Seguir mejorando la UI, agregando más opciones en la búsqueda y refinando la experiencia del carrito de compras.
🔹 Integrar un sistema de roles para diferenciar entre administradores y usuarios normales.

💡 Conclusión: Este Sprint fue un gran avance en la estructuración del proyecto, pasando de archivos JSON a una base de datos completamente funcional con Sequelize. Aprendí mucho sobre migraciones, seeders y relaciones en SQL, aunque aún hay margen de mejora en el manejo de errores y validaciones. 

--- 

# 📌 Retrospectiva del Sprint 7
Este Sprint estuvo enfocado en implementar validaciones tanto en el backend como en el frontend para asegurar que los datos ingresados por los usuarios sean correctos y mejorar la seguridad del sistema. También se optimizó la experiencia del usuario al mostrar mensajes de error de manera clara y consistente en todas las vistas.

## ⭐ Lo que salió bien
✅ Implementación completa de validaciones en el backend usando Express Validator.
✅ Validaciones en el registro de usuarios: nombres, email, contraseña, confirmación de contraseña e imagen.
✅ Validaciones en el login de usuarios con errores específicos en el email y contraseña.
✅ Validaciones en la creación y edición de productos asegurando datos correctos en nombre, descripción, precios, categorías, marcas, colores e imágenes.
✅ Implementación de validaciones en el frontend con JavaScript para mejorar la experiencia del usuario.
✅ Mensajes de error mostrados debajo de cada campo en los formularios de login, registro y productos.
✅ Corrección de errores en el backend, asegurando que validationResult(req) se maneje correctamente en los controladores.
✅ Unificación del diseño de errores en todas las vistas (register.ejs, login.ejs, createProduct.ejs, editProduct.ejs).
✅ Mejor manejo de datos en los formularios, evitando que los campos se borren tras un error (oldData).
✅ Correcciones en productsController.js y usersController.js para evitar crashes y mejorar el flujo de validaciones.
✅ Optimización del código en las rutas (mainRoutes.js y usersRoutes.js) asegurando que los middlewares de validación se ejecuten correctamente.


## ⚠️ Lo que puedo mejorar
🔹 Optimizar la validación de imágenes para evitar cargas innecesarias en el servidor.
🔹 Refactorizar la lógica de validación para reducir la repetición de código en validateRegister.js y validateProduct.js.
🔹 Mejorar la validación en tiempo real en el frontend para evitar envíos innecesarios al servidor.
🔹 Manejar mejor los errores en Sequelize cuando hay problemas con duplicidad de emails o validaciones en la base de datos.
🔹 Agregar mensajes de error más específicos en los formularios de productos para que los usuarios entiendan mejor qué deben corregir.

## 🎯 Plan de mejora para Sprint 8
🔹 Implementar mensajes de validación más dinámicos en el frontend con eventos en los inputs.
🔹 Agregar una validación adicional en el backend para evitar que productos con nombres repetidos sean creados.
🔹 Optimizar la carga de imágenes asegurando que solo archivos correctos lleguen al servidor.
🔹 Integrar un sistema de permisos y roles para diferenciar accesos entre usuarios y administradores.
🔹 Mejorar la documentación del código para facilitar futuras modificaciones.

💡 Conclusión:
Este Sprint fue clave para mejorar la seguridad y la experiencia del usuario dentro del sistema. Las validaciones ahora garantizan que solo datos correctos lleguen a la base de datos, lo que previene errores y mantiene la aplicación estable. El sistema ahora es mucho más robusto y confiable.
---
📌 Retrospectiva del Sprint 8

Este Sprint estuvo enfocado en la creación de una API RESTful para la gestión de usuarios y productos, así como en el desarrollo de un dashboard en React que permitiera visualizar las principales métricas del sistema. Además, se realizaron mejoras en la arquitectura del proyecto para optimizar el consumo de datos y la experiencia del usuario.

⭐ Lo que salió bien

✅ Creación e implementación de una API RESTful para gestionar usuarios y productos.
✅ Endpoints de listado y detalle de usuarios (/api/users/, /api/users/:id) funcionando correctamente.
✅ Endpoints de listado y detalle de productos (/api/products/, /api/products/:id) estructurados de manera eficiente.
✅ Integración del dashboard en React consumiendo la API correctamente.
✅ Implementación de tarjetas de estadísticas para mostrar el total de usuarios y productos.
✅ Visualización del último producto creado, incluyendo su imagen y descripción.
✅ Creación de una tabla de usuarios y productos para mejorar la visualización de datos.
✅ Mejora de la experiencia del usuario con un diseño más limpio y responsivo.
✅ Correcciones en los estilos (styles.css), asegurando que los elementos se alinearan correctamente.
✅ Implementación de useEffect en React para optimizar las peticiones a la API.
✅ Corrección de errores en la API para evitar undefined en algunos campos.
✅ Optimización de productsController.js y usersController.js para mejorar el rendimiento de las consultas.

⚠️ Lo que puedo mejorar

🔹 Mejorar la carga de imágenes en la API para asegurar que se muestren correctamente en el frontend.
🔹 Agregar paginado en los endpoints de usuarios y productos para evitar respuestas demasiado largas.
🔹 Implementar un manejador global de errores en la API para mejorar el debugging.
🔹 Refinar la validación de datos en la API para asegurar respuestas consistentes.
🔹 Optimizar el dashboard agregando gráficos y filtros para visualizar tendencias.
🔹 Permitir la edición y eliminación de productos desde el dashboard.

🎯 Plan de mejora para futuras versiones

🔹 Implementar paginación en la API para mejorar la escalabilidad.
🔹 Agregar filtros dinámicos en el dashboard para una mejor navegación.
🔹 Optimizar las peticiones a la API reduciendo el número de llamadas innecesarias.
🔹 Desplegar la API y el dashboard en plataformas cloud para pruebas en producción.
🔹 Integrar autenticación y roles en el dashboard para administradores.

💡 Conclusión:
Este Sprint permitió una evolución significativa del proyecto, integrando una API funcional y un dashboard en React que facilita la gestión de datos. Se logró una arquitectura más robusta y escalable, con mejoras visuales y técnicas que optimizan la experiencia del usuario.

💪 El proyecto está listo para su siguiente fase de optimización y despliegue.

