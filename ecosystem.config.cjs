module.exports = {
    apps: [
        {
            name: 'irsm',
            script: '/var/www/irsm.div.team/.output/server/index.mjs',
            cwd: '/var/www/irsm.div.team',
            instances: '1',
            exec_mode: 'cluster',
            max_restarts: 10,
            restart_delay: 5000,
            autorestart: true,
            watch: false,
            max_memory_restart: '2000M',
            env: {
                NODE_ENV: 'production',
                HOST: '0.0.0.0',
                PORT: 3003
            }
        }
    ]
};