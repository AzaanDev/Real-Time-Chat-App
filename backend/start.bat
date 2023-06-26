@echo off
cd "C:\Users\kovip\Desktop\Backend\API Gateway"
start cmd /k dotnet run

cd "C:\Users\kovip\Desktop\Backend\Microservices\AuthService"
start cmd /k dotnet run

cd "C:\Users\kovip\Desktop\Backend\Microservices\ChatService"
start cmd /k dotnet run

cd "C:\Users\kovip\Desktop\Backend\Microservices\MessageService"
start cmd /k dotnet run

cd "C:\Users\kovip\Desktop\Backend\Servers\ChatServer"
start cmd /k nodemon ./app.js