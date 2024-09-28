import cachingData from './data';
import { CACHING_IN_SECONDS } from '../../consts/environment-variables';

// no have time to implement redis client connection
export const storeInCache = (data: string[], timeout: number = CACHING_IN_SECONDS): void => {
    cachingData.ttl = Date.now() + timeout * 1000;
    cachingData.data = data;
};

export const getFromCache = (): null | string[] => {
    const ttl = cachingData.ttl;

    if (Date.now() > ttl) {
        return null;
    }

    return cachingData.data || null;
};
