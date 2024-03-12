# RESTAPI

API qui permet aux etudiants de 3W Academy et autres organismes de tester les differentes methodes (GET, POST, PATCH, DELETE) depuis une application ecrite en JS Vanilla, React ou autres

## Endpoints

`POST /api/v1/:user`
Exemple de body
```
{
    'title': string,
    'image': string,
    'content': string,
    'category': string
}
```

Creer un nouvel article dans une collection qui portera le nom de l'utilisateur