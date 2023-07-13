/**
 * 导航守卫
 * @param {*} allGuards
 * @param {*} options
 */
const loadGuards = (allGuards, options) => {
    const { router } = options;
    const { beforeEach, afterEach } = allGuards;

    // 全局前置路由守卫
    beforeEach?.length &&
        beforeEach.forEach((gurad) => {
            if (gurad && typeof gurad === "function") {
                router.beforeEach((to, from, next) => {
                    gurad(to, from, next, options);
                });
            }
        });

    // 全局后置路由守卫
    afterEach?.length &&
        afterEach.forEach((gurad) => {
            if (gurad && typeof gurad === "function") {
                router.afterEach((to, from) => {
                    gurad(to, from, options);
                });
            }
        });
};

export { loadGuards };
