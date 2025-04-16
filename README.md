# Dynamic Highlighter

¡Resalta texto en tu editor de VS Code de forma dinámica utilizando expresiones regulares y colores configurables!

## ¿Qué hace esta extensión?

Dynamic Highlighter te permite definir reglas personalizadas para resaltar fragmentos de texto específicos dentro de tus archivos en VS Code. Utiliza expresiones regulares para identificar las coincidencias y te permite configurar el color de primer plano (texto) y el color de fondo para cada regla.

Además, puedes especificar en qué extensiones de archivo se debe aplicar cada regla, brindándote un control preciso sobre dónde se activa el resaltado.

## ¿Cómo funciona?

La extensión lee su configuración desde los settings de VS Code (busca "Dynamic Highlighter"). Allí, puedes definir un array de reglas. Cada regla consiste en:

* **`pattern`**: Una expresión regular que define el texto que deseas resaltar. ¡Asegúrate de escapar los caracteres especiales de las expresiones regulares!
* **`foreground`**: El color del texto resaltado (puedes usar nombres de colores CSS, códigos hexadecimales como `#ffffff`, `rgb()` o `hsl()`).
* **`background`**: El color de fondo del texto resaltado.
* **`extension`** (opcional): Un array de extensiones de archivo (ej: `["js", "python", "java"]`). La regla solo se aplicará a los archivos con estas extensiones. Si no se especifica o el array está vacío, la regla se aplicará a todos los tipos de archivo.

La extensión escanea el contenido de los archivos abiertos y aplica el resaltado según las reglas definidas. Los resaltados se actualizan dinámicamente a medida que editas tus archivos. También se muestra una pequeña marca de color en la barra de la derecha (el overview ruler) para indicar dónde ocurren las coincidencias.

## ¿Cómo usarlo?

1.  **Instala la extensión:** Busca "Dynamic Highlighter" en el Marketplace de VS Code e instálala.
2.  **Configura las reglas:**
    * Ve a la configuración de VS Code:
        * En Windows/Linux: `Archivo` > `Preferencias` > `Configuración`
        * En macOS: `Code` > `Preferencias` > `Configuración`
    * Busca "Dynamic Highlighter" en la barra de búsqueda.
    * Edita la configuración `Dynamic Highlighter: Rules` como un array de objetos JSON. Cada objeto representa una regla de resaltado.

    **Ejemplo de configuración:**

    ```json
    [
      {
        "pattern": "console\\.log\\(.*\\)",
        "foreground": "#ffffff",
        "background": "#ff0000",
        "extension": ["js", "jsx"]
      },
      {
        "pattern": "TODO",
        "foreground": "#000000",
        "background": "#ffff00"
      },
      {
        "pattern": "ERROR:\\s+(.*)",
        "foreground": "#ff0000",
        "background": "#ffe0e0"
      },
      {
        "pattern": "//\\s*DEBUG:",
        "foreground": "#808080",
        "background": "#f0f8ff",
        "extension": ["js", "python"]
      },
      {
        "pattern": "var_dump\\(.*\\);?",
        "foreground": "#ffffff",
        "background": "#a52a2a",
        "extension": ["php"]
      }
    ]
    ```

3.  **Recarga la configuración (opcional):** Si modificas la configuración mientras tienes archivos abiertos, puedes recargar la configuración utilizando el comando:
    * Abre la paleta de comandos (`Ctrl+Shift+P` o `Cmd+Shift+P`).
    * Busca y ejecuta el comando "Reload Highlight Config".

4.  **¡Disfruta del resaltado dinámico!** A medida que trabajas en tus archivos, las coincidencias con tus reglas se resaltarán automáticamente.

## Comandos

* **`Dynamic Highlighter: Reload Highlight Config`**: Recarga la configuración de resaltado desde los settings.

## Licencia

[Tu licencia (ej: MIT License)](LICENSE.md)