# Life Timeline

This app is portfolio project

## Development stack

React

Nestjs

Typescript

Typeorm(Postgresql)

Docker

## How to run

### Prerequisites

Docker

Git

### Building

Copy this repository

```bash
git clone https://github.com/CodeForBeauty/LifeTimeline
```

Go into the copied folder

```bash
cd LifeTimeline
```

Build docker image

```bash
docker build -t life-timeline .
```

### Running

Start the application with docker

```bash
docker run -p 9191:9191 life-timeline
```

The application will start on localhost using port 9191.
After starting application will be accesible on: http://localhost:9191/
