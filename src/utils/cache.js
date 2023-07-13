/**
 * 本地缓存（二次封装）
 * 设置时可通过传入type = session,决定是否使用sessionStorage
 */

class LocalCache {
	// 设置
	setCache(key, value, type) {
		type === "session"
			? window.sessionStorage.setItem(key, JSON.stringify(value))
			: window.localStorage.setItem(key, JSON.stringify(value));
	}

	// 获取
	getCache(key, type) {
		let value = type === "session" ? window.sessionStorage.getItem(key) : window.localStorage.getItem(key);
		if (value) {
			try {
				return JSON.parse(value);
			} catch (error) {
				this.clear();
				this.clear("session");
			}
		}
	}

	// 删除
	remove(key, type) {
		type === "session" ? window.sessionStorage.removeItem(key) : window.localStorage.removeItem(key);
	}

	// 清空
	clear(type) {
		type === "session" ? window.sessionStorage.clear() : window.localStorage.clear();
	}
}

export default new LocalCache();
