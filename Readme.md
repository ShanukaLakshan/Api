sudo docker build -t learnaware-ai-service .
sudo docker run -d -p 3000:3000 birfbkdstsbhbk/learnawareai-service
sudo docker run -d -p 8080:5000 jenkins/jenkins

sudo ufw status
sudo ufw allow 3000 ========= sudo ufw allow 8081

sudo systemctl restart nginx
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nano /etc/nginx/sites-available/myapp

sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/jenkins /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

server {
listen 80;
server_name 216.244.86.210;

    location / {
        proxy_pass http://localhost:3000;  # Should match the port your app listens on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}

server {
listen 80;
server_name 216.244.86.210; # or your domain name

    location / {
        proxy_pass http://localhost:3000;  # Make sure this points to the correct host and port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}

<!-- DELETE UNTAGGED IMAGES -->

docker rmi $(docker images -f "dangling=true" -q)

docker images -f "dangling=true"
