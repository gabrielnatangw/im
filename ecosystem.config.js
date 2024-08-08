module.exports = {
    apps : [
        {
            name   : "backend",
            script : "npm start",
            cwd: "./service"
        },
        {
            name   : "frontend",
            script : "npm run preview",
            cwd: "./client",
        },
    ]
  }
  