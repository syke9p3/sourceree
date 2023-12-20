Hello guys. Eto ay isang testing na ginawa ko lang para mag-setup ng isang simple server at pagdidisplay ng data sa html.

Para mapagana to:

1. Magbukas ng terminal, type ` npm install `

2. Gumawa ng mock data sa mysql
    - open mysql sa phpmyadmin gamit xampp
    - create database named 'playground'
    - gamitin yung *employees.sql* sa data folder

3. Open server
    - In another terminal, type ` npm run dev `

4. Open html
    - use five server or kung pano kayo magbukas ng html ang src/index.html

5. Paganahin Tailwind
    - in terminal, type  ` npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch `  