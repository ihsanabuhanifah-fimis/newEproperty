**Berikut Langkah-langkah production e-property**

1. Install nodejs di komputer / laptop kita
https://nodejs.org/en/
2. Download file ini atau bisa menggunakan git clone
3. setelah terinstall di komputer kita, masuk ke folder projeck ini dan buka terminal, kemudian ketik **npm install**
4. tunggu sampai dependency yang ada berhasil terinstall semuanya
5. kemudian **npm run build** , untuk membuild ke production
6. copykan seluruh file yang ada folder build ke server
7. tambahkan file .htaccess seperti berikut agar browserrouter berjalan

<IfModule mod_rewrite.c>
  
  Options -MultiViews
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ index.html [QSA,L]
<IfModule>

selengkapnya
https://www.andreasreiterer.at/fix-browserrouter-on-apache/
