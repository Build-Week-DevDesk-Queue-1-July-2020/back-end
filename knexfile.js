// Update with your config settings.
module.exports = {
    development: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
            filename: "./data/development-devDes.db3",
        },
        migrations: {
            directory: __dirname + "/data/migrations",
        },
        seeds: {
            directory: __dirname + "/data/seeds",
        },
    },

    production: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
            filename: "./data/production-devDes.db3",
        },
        migrations: {
            directory: __dirname + "/data/migrations",
        },
        seeds: {
            directory: __dirname + "/data/seeds",
        },
    },
};
