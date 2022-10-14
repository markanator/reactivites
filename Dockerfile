FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

# copy csproj and restore as distinct layers
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["API/*.csproj", "API/"]
COPY ["Application/*.csproj", "Application/"]
COPY ["Domain/*.csproj", "Domain/"]
COPY ["Persistence/*.csproj", "Persistence/"]
COPY ["Infrastructure/*.csproj", "Infrastructure/"]
RUN dotnet restore "API/API.csproj"

# copy and build app and libraries
COPY ["API/", "API/"]
COPY ["Application/", "Application/"]
COPY ["Domain/", "Domain/"]
COPY ["Persistence/", "Persistence/"]
COPY ["Infrastructure/", "Infrastructure/"]
WORKDIR "/src/API"
RUN dotnet build -c Release --no-restore -o /app/build

FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app

# COPY ["API/appsettings.json", "."]
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080
EXPOSE 443
ENTRYPOINT ["dotnet", "API.dll"]