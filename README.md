# tour-card

Карточка тура (КТ) для модуля поиска (на текущий момент для МП5.0 и МП6.0)

## ВЫНЕСЕНО В https://gitlab.global.sletat.ru/slt/modules/tour-card

## TODO

1. обновить пакеты-зависимости
2. обновить dll зависимости для dll сборки
3. после окончания акции с МГТ, убрать все костыли с mgt и certificates discount. Переиспользовать не получится

## Continuous Integration

Для сборки используются 7 uidev площадок в pipelines gitlab.

## Test and development

Например для МП6.0 прописывать: tourCard: { jsPath: 'https://uidev5.sletat.ru/tour-card/app.js',}  
И открывать страницу с МП6.0 К примеру: https://frontdebug.sletat.ru/modules/module6/develop/examples/test/mosgortur.html

### Gitflow в пакете

[confluence](https://agile.sletat.ru/confurl/pages/viewpage.action?pageId=19204473)

### Особенности сборки и публикации

При сборке/публикации происходят следующие шаги:

1. генерация файла с константами вызовом `api-config-modifier.js`(для каждой площадки используются свои сервисы)
2. препроцессинг стилей (из gulp таски)
3. генерация файла для статики, по которому css-ки будут сервиться (из gulp таски)
4. генерация svn-спрайта (из gulp таски)
5. сборка через webpack

### Команды для запуска

- `lint` - запустить linting
- `clean` - очистка
- `build:test` - тестовая dev-сборка. не стоит использовать напрямую, нужно использовать через USERMODE
- `build:release` - сборка для релиза. используется при публикации
- `build:test:dev` - запуск локальной разработки с перебилдом при изменении jsx
- `build:css:watch` - перебилд css и отслеживание изменений
- `localNode` - позволяет использовать локальную версию node

### Типы сборок

Существует три типа сборки:

- `release` - при публикации используется
- `test` - при тестировании и разработке используется
- `dll` - может использоваться разработчиками для увеличение скорости [инкрементальных сборок](https://webpack.js.org/plugins/dll-plugin/)

### Запуск проекта для локальной разработки

1. Клонируем репозиторий (клонировать нужно по ssh):
2. Устанавливаем зависимости, используя современную версию node js (например, v16.xx.x)
3. Запускаем сборку проекта `npm run build:test:dev` (ждём когда сбилдится папка public)
4. Запускаем сервер командой `npm run server`
5. Запускам проект модуля поиска - "module6" (для этого переходим в папку module 6 и запускаем `npm run server`)
6. В проекте module6 переходим в \dist\examples\demo.html и меняем значение jsPath на `http://localhost:8080/app.js`
7. Страница либо откроется автоматически, либо нужно открыть `http://localhost:3000/examples/demo.html`

### Публикация
Общая инструкция по публикации проекта описана в [Confluence](https://agile.sletat.ru/confurl/pages/viewpage.action?pageId=198934759#id-8.%D0%9F%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F%D0%BD%D0%B0%D0%BF%D1%80%D0%BE%D0%B4%D0%B8%D0%BE%D1%82%D0%BA%D0%B0%D1%82%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D0%B8-%D0%9F%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F%D0%B4%D0%BB%D1%8F%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%B8%D0%BD%D1%81%D1%82%D0%B2%D0%B0%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BE%D0%B2).
В проекте тег не создаётся автоматически и его необходимо создать вручную.


### Особенности локальной разработки

1. Установка новых npm пакетов требует перехода на современную версию node js
2. Изменения будут видны после hot reload в браузере
