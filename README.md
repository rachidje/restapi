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

`GET /api/v1/:user`
Recupere l'ensemble des articles

`GET /api/v1/:user?sort=asc`
Recupere l'ensemble des articles du plus ancien au plus recent

`GET /api/v1/:user?sort=desc`
Recupere l'ensemble des articles du plus recent au plus ancien

`GET /api/v1/:user/:id`
Recupere l'article via son ID

`PATCH /api/v1/:user/:id`
Met a jour l'article
Exemple de body
```
{
    'title': string,
    'image': string,
    'content': string,
    'category': string
}
```