const getDatabaseHealthcheck = {
    title: 'Database Healthcheck',
    description: 'Check if the database is responding or not',
    type: 'object',
    required: ['status'],
    properties: {
        status: {
            description: 'Date and time',
            type: 'string'
        }
    }
};
const getContainerId = {
    title: 'Container Id',
    description: 'Returns host and ip',
    type: 'object',
    required: ['host', 'ip'],
    properties: {
        host: {
            type: 'string'
        },
        ip: {
            type: 'string'
        }
    }
};
exports.getDatabaseHealthcheck = getDatabaseHealthcheck;
exports.getContainerId = getContainerId;
//# sourceMappingURL=utilitiesSchema.schema.js.map