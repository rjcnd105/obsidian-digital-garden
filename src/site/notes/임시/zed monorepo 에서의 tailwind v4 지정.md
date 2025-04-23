---
{"dg-publish":true,"createdAt":"2025.04.23 수 오전 11:34","modifiedAt":"2025.04.23 수 오전 11:35","permalink":"/임시/zed monorepo 에서의 tailwind v4 지정/","dgPassFrontmatter":true}
---


.zed/settings.json
```json
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "experimental": {
          "configFile": {
            "my_app/src/styles/app.css": "my_app/**"
          }
        }
      }
    }
  }
}


```
