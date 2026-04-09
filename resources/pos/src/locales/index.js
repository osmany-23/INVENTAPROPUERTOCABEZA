let cachedFiles = null;

export const getFiles = () => {
    if (cachedFiles) {
        return cachedFiles;
    }

    const context = require.context('./', true, /.json$/);
    const modules = {};

    context.keys().forEach((key) => {
        const fileName = key.replace('./', '');
        const resource = context(key);
        const namespace = fileName.replace('.json', '');
        modules[namespace] = resource?.default || resource;
    });

    cachedFiles = modules;
    return cachedFiles;
};
