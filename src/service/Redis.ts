import * as IORedis from "ioredis";

export enum ERedisKeys {
    CATEGORIES = "categories"
}

export class Redis {
    private readonly store: IORedis.Redis;

    constructor() {
        this.store = new IORedis();
    }

    async connect(): Promise<void> {
        await this.store.ping();
        console.log("Redis connected");
    }

    async set(key: string, source: object | number | string | boolean): Promise<void> {
        await this.store.set(key, JSON.stringify(source));
    }

    async get(key: string): Promise<string> {
        return this.store.get(key);
    }

    async delete(key: string): Promise<number> {
        return this.store.del(key);
    }
}
