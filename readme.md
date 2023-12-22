Hello guys. Eto ay isang testing na ginawa ko lang para mag-setup ng isang simple server at pagdidisplay ng data sa html.

Para mapagana to:

1. Magbukas ng terminal, type ` npm install `

2. Gumawa ng mock data sa mysql
    - open mysql sa phpmyadmin gamit xampp
    - create database named 'playground'
    - gamitin yung *employees.sql* sa data folder

3. Open server
    - Make sure na nakabukas ang xampp as admin and apache/mysql running
    - In another terminal, type ` npm run dev `

4. Open html
    - use five server or kung pano kayo magbukas ng html ang frontend/src/index.html

5. Paganahin Tailwind
    - in terminal, type `cd frontend`, `npm install -D tailwindcss` 
    ` npx tailwindcss -i ./frontend/src/input.css -o ./frontend/dist/output.css --watch `
    - Dapat maging pula ang kulay ng title para makita kung gumagana ang tailwind

# Update

Sa client folder na nakalagay ang vite template na gagamitin natin

4. Open html
    - in terminal, type 
    - `cd client `
    - ` npm install `
    - ` npm run dev`
