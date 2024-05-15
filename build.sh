git pull origin master
docker build -t ng-docker .
docker stop angular-app
docker rm angular-app
docker run -d --name angular-app -p 8093:80 --restart unless-stopped ng-docker