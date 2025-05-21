# Build stage
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# Kopiujemy tylko backend
COPY . ./

# Przywracanie zale¿noœci i publikacja tylko dla pliku .csproj
RUN dotnet restore "./daily-blog-app.csproj"
RUN dotnet publish "./daily-blog-app.csproj" -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/out ./

ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "daily-blog-app.dll"]
