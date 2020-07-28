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
        pool: {
            afterCreate: (conn, done) => {
                conn.run("PRAGMA foreign_keys = ON", done);
            },
        },
    },

    testing: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
            filename: "./data/testing-devDes.db3",
        },
        migrations: {
            directory: __dirname + "/data/migrations",
        },
        seeds: {
            directory: __dirname + "/data/seeds",
        },
        pool: {
            afterCreate: (conn, done) => {
                conn.run("PRAGMA foreign_keys = ON", done);
            },
        },
    },
};
